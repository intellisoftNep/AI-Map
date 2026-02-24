import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:go_router/go_router.dart';
import '../../models/historic_place.dart';
import '../../providers/app_provider.dart';
import '../../widgets/place_card.dart';
import '../../widgets/category_chip.dart';
import '../../widgets/search_bar_widget.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  final List<String> categories = [
    'all',
    'temple',
    'stupa',
    'durbar',
    'palace',
    'monument',
    'museum',
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final locale = ref.watch(languageProvider).languageCode;
    final filteredPlaces = ref.watch(filteredPlacesProvider);
    final allPlaces = ref.watch(placesProvider);
    final featuredPlaces = allPlaces.where((p) => p.isFeatured).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF5F0E8),
      body: CustomScrollView(
        slivers: [
          _buildAppBar(context, l10n, locale),
          SliverToBoxAdapter(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 16),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: SearchBarWidget(
                    hint: l10n.searchHint,
                    onChanged: (query) {
                      ref.read(searchQueryProvider.notifier).state = query;
                    },
                  ),
                ),
                const SizedBox(height: 16),
                _buildCategoryFilter(l10n, locale),
                const SizedBox(height: 20),
                if (ref.watch(searchQueryProvider).isEmpty &&
                    ref.watch(filterCategoryProvider) == null) ...[
                  _buildFeaturedSection(context, l10n, locale, featuredPlaces),
                  const SizedBox(height: 20),
                  _buildSectionHeader(l10n.allPlaces, context),
                ],
              ],
            ),
          ),
          _buildPlacesList(context, locale, filteredPlaces),
        ],
      ),
      bottomNavigationBar: _buildBottomNav(context, l10n),
    );
  }

  Widget _buildAppBar(
      BuildContext context, AppLocalizations l10n, String locale) {
    return SliverAppBar(
      expandedHeight: 200,
      floating: false,
      pinned: true,
      backgroundColor: const Color(0xFF8B1A1A),
      flexibleSpace: FlexibleSpaceBar(
        title: Text(
          l10n.appTitle,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
        ),
        background: Stack(
          fit: StackFit.expand,
          children: [
            Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFF8B1A1A), Color(0xFFD4A017)],
                ),
              ),
            ),
            Positioned(
              right: 16,
              bottom: 60,
              child: Text(
                locale == 'ne' ? 'नेपाल सम्पदा' : 'Nepal Heritage',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.3),
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
      actions: [
        IconButton(
          icon: const Icon(Icons.language, color: Colors.white),
          onPressed: () => _showLanguageDialog(context),
        ),
        IconButton(
          icon: const Icon(Icons.settings, color: Colors.white),
          onPressed: () => context.push('/settings'),
        ),
      ],
    );
  }

  Widget _buildCategoryFilter(AppLocalizations l10n, String locale) {
    final selectedCategory = ref.watch(filterCategoryProvider);
    return SizedBox(
      height: 40,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final cat = categories[index];
          final isSelected =
              selectedCategory == (cat == 'all' ? null : cat);
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: CategoryChip(
              label: _getCategoryLabel(cat, l10n),
              isSelected: isSelected,
              onTap: () {
                ref.read(filterCategoryProvider.notifier).state =
                    cat == 'all' ? null : cat;
              },
            ),
          );
        },
      ),
    );
  }

  String _getCategoryLabel(String cat, AppLocalizations l10n) {
    switch (cat) {
      case 'all':
        return l10n.allPlaces;
      case 'temple':
        return l10n.temple;
      case 'stupa':
        return l10n.stupa;
      case 'durbar':
        return l10n.durbar;
      case 'palace':
        return l10n.palace;
      case 'monument':
        return l10n.monument;
      case 'museum':
        return l10n.museum;
      default:
        return cat;
    }
  }

  Widget _buildFeaturedSection(BuildContext context, AppLocalizations l10n,
      String locale, List<HistoricPlace> places) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionHeader(l10n.featuredPlaces, context),
        const SizedBox(height: 12),
        SizedBox(
          height: 220,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: places.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.only(right: 16),
                child: FeaturedPlaceCard(
                  place: places[index],
                  locale: locale,
                  onTap: () {
                    ref.read(selectedPlaceProvider.notifier).state =
                        places[index];
                    context.push('/place/${places[index].id}');
                  },
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildSectionHeader(String title, BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Color(0xFF2C1810),
        ),
      ),
    );
  }

  Widget _buildPlacesList(
      BuildContext context, String locale, List<HistoricPlace> places) {
    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final place = places[index];
            return Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: PlaceListCard(
                place: place,
                locale: locale,
                onTap: () {
                  ref.read(selectedPlaceProvider.notifier).state = place;
                  context.push('/place/${place.id}');
                },
                onMapTap: () {
                  ref.read(selectedPlaceProvider.notifier).state = place;
                  context.push('/map');
                },
              ),
            );
          },
          childCount: places.length,
        ),
      ),
    );
  }

  Widget _buildBottomNav(BuildContext context, AppLocalizations l10n) {
    return BottomNavigationBar(
      currentIndex: 0,
      selectedItemColor: const Color(0xFF8B1A1A),
      unselectedItemColor: Colors.grey,
      backgroundColor: Colors.white,
      type: BottomNavigationBarType.fixed,
      onTap: (index) {
        switch (index) {
          case 0:
            break;
          case 1:
            context.push('/map');
            break;
          case 2:
            context.push('/settings');
            break;
        }
      },
      items: [
        BottomNavigationBarItem(
          icon: const Icon(Icons.home),
          label: l10n.homeTitle,
        ),
        BottomNavigationBarItem(
          icon: const Icon(Icons.map),
          label: l10n.mapTitle,
        ),
        BottomNavigationBarItem(
          icon: const Icon(Icons.settings),
          label: l10n.settings,
        ),
      ],
    );
  }

  void _showLanguageDialog(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(l10n.language),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Text('🇬🇧', style: TextStyle(fontSize: 24)),
              title: Text(l10n.english),
              onTap: () {
                ref.read(languageProvider.notifier).setLanguage('en');
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: const Text('🇳🇵', style: TextStyle(fontSize: 24)),
              title: Text(l10n.nepali),
              onTap: () {
                ref.read(languageProvider.notifier).setLanguage('ne');
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}
