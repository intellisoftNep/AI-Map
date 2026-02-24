import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:video_player/video_player.dart';
import 'package:chewie/chewie.dart';
import 'package:photo_view/photo_view.dart';
import 'package:photo_view/photo_view_gallery.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../models/historic_place.dart';
import '../../providers/app_provider.dart';
import '../../services/location_service.dart';

class PlaceDetailScreen extends ConsumerStatefulWidget {
  final String placeId;

  const PlaceDetailScreen({super.key, required this.placeId});

  @override
  ConsumerState<PlaceDetailScreen> createState() => _PlaceDetailScreenState();
}

class _PlaceDetailScreenState extends ConsumerState<PlaceDetailScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final AudioPlayer _audioPlayer = AudioPlayer();
  VideoPlayerController? _videoController;
  ChewieController? _chewieController;
  bool _isAudioPlaying = false;
  bool _isAudioLoading = false;
  Duration _audioDuration = Duration.zero;
  Duration _audioPosition = Duration.zero;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _setupAudioListeners();
  }

  void _setupAudioListeners() {
    _audioPlayer.onDurationChanged.listen((duration) {
      setState(() => _audioDuration = duration);
    });
    _audioPlayer.onPositionChanged.listen((position) {
      setState(() => _audioPosition = position);
    });
    _audioPlayer.onPlayerStateChanged.listen((state) {
      setState(() {
        _isAudioPlaying = state == PlayerState.playing;
        _isAudioLoading = state == PlayerState.playing && _audioDuration == Duration.zero;
      });
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    _audioPlayer.dispose();
    _videoController?.dispose();
    _chewieController?.dispose();
    super.dispose();
  }

  HistoricPlace? _getPlace() {
    final places = ref.read(placesProvider);
    try {
      return places.firstWhere((p) => p.id == widget.placeId);
    } catch (e) {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final locale = ref.watch(languageProvider).languageCode;
    final place = _getPlace();

    if (place == null) {
      return Scaffold(
        appBar: AppBar(title: Text(l10n.placeDetails)),
        body: const Center(child: Text('Place not found')),
      );
    }

    return Scaffold(
      body: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) => [
          _buildSliverAppBar(context, l10n, locale, place),
        ],
        body: Column(
          children: [
            _buildTabBar(l10n),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildDescriptionTab(l10n, locale, place),
                  _buildAudioTab(l10n, place),
                  _buildVideoTab(l10n, place),
                  _buildGalleryTab(l10n, place),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: _buildNavigationFAB(context, l10n, place),
    );
  }

  Widget _buildSliverAppBar(BuildContext context, AppLocalizations l10n,
      String locale, HistoricPlace place) {
    return SliverAppBar(
      expandedHeight: 280,
      pinned: true,
      backgroundColor: const Color(0xFF8B1A1A),
      foregroundColor: Colors.white,
      flexibleSpace: FlexibleSpaceBar(
        title: Text(
          place.getName(locale),
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 16,
            shadows: [Shadow(color: Colors.black54, blurRadius: 4)],
          ),
        ),
        background: place.photoUrls.isNotEmpty
            ? CachedNetworkImage(
                imageUrl: place.photoUrls.first,
                fit: BoxFit.cover,
                placeholder: (context, url) => Container(
                  color: const Color(0xFF8B1A1A),
                  child: const Center(
                    child: CircularProgressIndicator(color: Colors.white),
                  ),
                ),
                errorWidget: (context, url, error) => Container(
                  color: const Color(0xFF8B1A1A),
                  child: const Icon(Icons.image_not_supported,
                      color: Colors.white, size: 60),
                ),
                colorFilter: ColorFilter.mode(
                  Colors.black.withOpacity(0.3),
                  BlendMode.darken,
                ),
              )
            : Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF8B1A1A), Color(0xFFD4A017)],
                  ),
                ),
              ),
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.share),
          onPressed: () => _sharePlace(place, locale),
        ),
        IconButton(
          icon: const Icon(Icons.map),
          onPressed: () => context.push('/map'),
        ),
      ],
    );
  }

  Widget _buildTabBar(AppLocalizations l10n) {
    return Container(
      color: Colors.white,
      child: TabBar(
        controller: _tabController,
        labelColor: const Color(0xFF8B1A1A),
        unselectedLabelColor: Colors.grey,
        indicatorColor: const Color(0xFF8B1A1A),
        tabs: [
          Tab(icon: const Icon(Icons.description), text: l10n.description),
          Tab(icon: const Icon(Icons.headphones), text: l10n.audio),
          Tab(icon: const Icon(Icons.videocam), text: l10n.videos),
          Tab(icon: const Icon(Icons.photo_library), text: l10n.photos),
        ],
      ),
    );
  }

  Widget _buildDescriptionTab(
      AppLocalizations l10n, String locale, HistoricPlace place) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Info chips
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _infoChip(Icons.category, place.category, Colors.blue),
              _infoChip(Icons.location_city, place.city, Colors.green),
              if (place.historicalPeriod != null)
                _infoChip(
                    Icons.history, place.historicalPeriod!, Colors.orange),
              _infoChip(
                Icons.star,
                '${place.rating} (${place.reviewCount})',
                Colors.amber,
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Description
          Text(
            l10n.description,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Color(0xFF2C1810),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            place.getDescription(locale),
            style: const TextStyle(
              fontSize: 15,
              height: 1.6,
              color: Color(0xFF4A3728),
            ),
          ),
          const SizedBox(height: 20),

          // Visiting Info
          _buildInfoCard(
            l10n.visitingInfo,
            [
              if (place.openingHours != null)
                _infoRow(Icons.access_time, l10n.openingHours,
                    place.openingHours!),
              if (place.entryFee != null)
                _infoRow(Icons.money, l10n.entryFee, place.entryFee!),
              if (place.bestTimeToVisit != null)
                _infoRow(Icons.wb_sunny, l10n.bestTimeToVisit,
                    place.bestTimeToVisit!),
            ],
          ),
          const SizedBox(height: 16),

          // How to Reach
          if (place.getHowToReach(locale) != null) ...[
            _buildInfoCard(
              l10n.howToReach,
              [
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  child: Text(
                    place.getHowToReach(locale)!,
                    style: const TextStyle(fontSize: 14, height: 1.5),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
          ],

          // Location
          _buildInfoCard(
            l10n.location,
            [
              _infoRow(Icons.location_on, l10n.location,
                  '${place.address}, ${place.city}'),
              _infoRow(Icons.gps_fixed, l10n.coordinates,
                  '${place.latitude.toStringAsFixed(4)}, ${place.longitude.toStringAsFixed(4)}'),
            ],
          ),
          const SizedBox(height: 80),
        ],
      ),
    );
  }

  Widget _buildAudioTab(AppLocalizations l10n, HistoricPlace place) {
    if (place.audioUrl == null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.headphones_off, size: 64, color: Colors.grey),
            const SizedBox(height: 16),
            Text(
              'No audio guide available',
              style: TextStyle(color: Colors.grey[600], fontSize: 16),
            ),
          ],
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 200,
            height: 200,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: const LinearGradient(
                colors: [Color(0xFF8B1A1A), Color(0xFFD4A017)],
              ),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF8B1A1A).withOpacity(0.3),
                  blurRadius: 30,
                  spreadRadius: 10,
                ),
              ],
            ),
            child: Icon(
              _isAudioPlaying ? Icons.pause : Icons.play_arrow,
              size: 80,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 32),
          Text(
            l10n.audioGuide,
            style: const TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: Color(0xFF2C1810),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            place.getName(ref.read(languageProvider).languageCode),
            style: const TextStyle(color: Colors.grey, fontSize: 16),
          ),
          const SizedBox(height: 24),

          // Progress bar
          Slider(
            value: _audioDuration.inSeconds > 0
                ? _audioPosition.inSeconds.toDouble()
                : 0,
            max: _audioDuration.inSeconds.toDouble(),
            activeColor: const Color(0xFF8B1A1A),
            onChanged: (value) {
              _audioPlayer.seek(Duration(seconds: value.toInt()));
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(_formatDuration(_audioPosition)),
                Text(_formatDuration(_audioDuration)),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Controls
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                icon: const Icon(Icons.replay_10),
                iconSize: 36,
                onPressed: () {
                  final newPos = _audioPosition - const Duration(seconds: 10);
                  _audioPlayer.seek(
                      newPos.isNegative ? Duration.zero : newPos);
                },
              ),
              const SizedBox(width: 16),
              GestureDetector(
                onTap: () => _toggleAudio(place.audioUrl!),
                child: Container(
                  width: 72,
                  height: 72,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Color(0xFF8B1A1A),
                  ),
                  child: _isAudioLoading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : Icon(
                          _isAudioPlaying ? Icons.pause : Icons.play_arrow,
                          color: Colors.white,
                          size: 40,
                        ),
                ),
              ),
              const SizedBox(width: 16),
              IconButton(
                icon: const Icon(Icons.forward_10),
                iconSize: 36,
                onPressed: () {
                  final newPos = _audioPosition + const Duration(seconds: 10);
                  if (newPos < _audioDuration) {
                    _audioPlayer.seek(newPos);
                  }
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildVideoTab(AppLocalizations l10n, HistoricPlace place) {
    if (place.videoUrl == null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.videocam_off, size: 64, color: Colors.grey),
            const SizedBox(height: 16),
            Text(
              'No video tour available',
              style: TextStyle(color: Colors.grey[600], fontSize: 16),
            ),
          ],
        ),
      );
    }

    return Column(
      children: [
        if (_chewieController != null)
          AspectRatio(
            aspectRatio: 16 / 9,
            child: Chewie(controller: _chewieController!),
          )
        else
          GestureDetector(
            onTap: () => _initVideo(place.videoUrl!),
            child: Container(
              height: 220,
              color: Colors.black,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  if (place.photoUrls.isNotEmpty)
                    CachedNetworkImage(
                      imageUrl: place.photoUrls.first,
                      fit: BoxFit.cover,
                      width: double.infinity,
                    ),
                  Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.black.withOpacity(0.7),
                    ),
                    child: const Icon(Icons.play_arrow,
                        color: Colors.white, size: 48),
                  ),
                ],
              ),
            ),
          ),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                l10n.videoTour,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                place.getName(ref.read(languageProvider).languageCode),
                style: const TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: () => _openVideoExternal(place.videoUrl!),
                icon: const Icon(Icons.open_in_new),
                label: const Text('Open in YouTube'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildGalleryTab(AppLocalizations l10n, HistoricPlace place) {
    if (place.photoUrls.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.photo_library_outlined,
                size: 64, color: Colors.grey),
            const SizedBox(height: 16),
            Text(
              'No photos available',
              style: TextStyle(color: Colors.grey[600], fontSize: 16),
            ),
          ],
        ),
      );
    }

    return GridView.builder(
      padding: const EdgeInsets.all(8),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: place.photoUrls.length,
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () => _openPhotoGallery(context, place.photoUrls, index),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: CachedNetworkImage(
              imageUrl: place.photoUrls[index],
              fit: BoxFit.cover,
              placeholder: (context, url) => Container(
                color: Colors.grey[200],
                child: const Center(child: CircularProgressIndicator()),
              ),
              errorWidget: (context, url, error) => Container(
                color: Colors.grey[200],
                child: const Icon(Icons.broken_image, color: Colors.grey),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildNavigationFAB(
      BuildContext context, AppLocalizations l10n, HistoricPlace place) {
    return FloatingActionButton.extended(
      onPressed: () => context.push('/navigation/${place.id}'),
      backgroundColor: const Color(0xFF2E7D32),
      icon: const Icon(Icons.navigation, color: Colors.white),
      label: Text(
        l10n.startNavigation,
        style: const TextStyle(color: Colors.white),
      ),
    );
  }

  // Helper widgets
  Widget _infoChip(IconData icon, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: color),
          const SizedBox(width: 4),
          Text(label, style: TextStyle(color: color, fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildInfoCard(String title, List<Widget> children) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Color(0xFF2C1810),
            ),
          ),
          const Divider(),
          ...children,
        ],
      ),
    );
  }

  Widget _infoRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 18, color: const Color(0xFF8B1A1A)),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label,
                    style: const TextStyle(
                        fontSize: 12,
                        color: Colors.grey,
                        fontWeight: FontWeight.w500)),
                Text(value, style: const TextStyle(fontSize: 14)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Actions
  Future<void> _toggleAudio(String url) async {
    if (_isAudioPlaying) {
      await _audioPlayer.pause();
    } else {
      await _audioPlayer.play(UrlSource(url));
    }
  }

  Future<void> _initVideo(String url) async {
    _videoController = VideoPlayerController.networkUrl(Uri.parse(url));
    await _videoController!.initialize();
    _chewieController = ChewieController(
      videoPlayerController: _videoController!,
      autoPlay: true,
      looping: false,
      aspectRatio: 16 / 9,
    );
    setState(() {});
  }

  Future<void> _openVideoExternal(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  void _openPhotoGallery(
      BuildContext context, List<String> photos, int initialIndex) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PhotoGalleryScreen(
          photos: photos,
          initialIndex: initialIndex,
        ),
      ),
    );
  }

  void _sharePlace(HistoricPlace place, String locale) {
    Share.share(
      '${place.getName(locale)}\n${place.getDescription(locale).substring(0, 100)}...\n\nLocation: ${place.latitude}, ${place.longitude}',
    );
  }

  String _formatDuration(Duration duration) {
    final minutes = duration.inMinutes.remainder(60).toString().padLeft(2, '0');
    final seconds = duration.inSeconds.remainder(60).toString().padLeft(2, '0');
    return '$minutes:$seconds';
  }
}

// Photo Gallery Full Screen
class PhotoGalleryScreen extends StatefulWidget {
  final List<String> photos;
  final int initialIndex;

  const PhotoGalleryScreen({
    super.key,
    required this.photos,
    required this.initialIndex,
  });

  @override
  State<PhotoGalleryScreen> createState() => _PhotoGalleryScreenState();
}

class _PhotoGalleryScreenState extends State<PhotoGalleryScreen> {
  late int _currentIndex;
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
    _pageController = PageController(initialPage: widget.initialIndex);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: Text('${_currentIndex + 1} / ${widget.photos.length}'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () => Share.share(widget.photos[_currentIndex]),
          ),
        ],
      ),
      body: PhotoViewGallery.builder(
        pageController: _pageController,
        itemCount: widget.photos.length,
        builder: (context, index) {
          return PhotoViewGalleryPageOptions(
            imageProvider: CachedNetworkImageProvider(widget.photos[index]),
            minScale: PhotoViewComputedScale.contained,
            maxScale: PhotoViewComputedScale.covered * 2,
          );
        },
        onPageChanged: (index) {
          setState(() => _currentIndex = index);
        },
        scrollPhysics: const BouncingScrollPhysics(),
        backgroundDecoration: const BoxDecoration(color: Colors.black),
      ),
    );
  }
}
