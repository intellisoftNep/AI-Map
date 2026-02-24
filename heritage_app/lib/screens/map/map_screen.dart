import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:go_router/go_router.dart';
import '../../models/historic_place.dart';
import '../../models/municipality.dart';
import '../../providers/app_provider.dart';
import '../../services/location_service.dart';

class MapScreen extends ConsumerStatefulWidget {
  const MapScreen({super.key});

  @override
  ConsumerState<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends ConsumerState<MapScreen> {
  GoogleMapController? _mapController;
  Position? _currentPosition;
  Set<Marker> _markers = {};
  Set<Polyline> _polylines = {};
  MapType _mapType = MapType.normal;
  bool _isNavigating = false;
  HistoricPlace? _selectedDestination;
  final LocationService _locationService = LocationService();

  // Municipality filter state
  Province? _selectedProvince;
  District? _selectedDistrict;
  Municipality? _selectedMunicipality;
  bool _showMunicipalityPanel = false;

  // Default center: Nepal center
  static const LatLng _nepalCenter = LatLng(28.3949, 84.1240);
  static const double _nepalZoom = 7.0;

  @override
  void initState() {
    super.initState();
    _initLocation();
  }

  Future<void> _initLocation() async {
    final position = await _locationService.getCurrentPosition();
    if (position != null && mounted) {
      setState(() {
        _currentPosition = position;
      });
      _mapController?.animateCamera(
        CameraUpdate.newLatLng(
          LatLng(position.latitude, position.longitude),
        ),
      );
    }
    _buildMarkers();
  }

  void _buildMarkers() {
    final places = ref.read(placesProvider);
    final locale = ref.read(languageProvider).languageCode;

    setState(() {
      _markers = places.map((place) {
        return Marker(
          markerId: MarkerId(place.id),
          position: LatLng(place.latitude, place.longitude),
          infoWindow: InfoWindow(
            title: place.getName(locale),
            snippet: place.city,
            onTap: () {
              ref.read(selectedPlaceProvider.notifier).state = place;
              context.push('/place/${place.id}');
            },
          ),
          icon: _getMarkerIcon(place.category),
          onTap: () {
            _showPlaceBottomSheet(place);
          },
        );
      }).toSet();

      if (_currentPosition != null) {
        _markers.add(
          Marker(
            markerId: const MarkerId('current_location'),
            position:
                LatLng(_currentPosition!.latitude, _currentPosition!.longitude),
            infoWindow: InfoWindow(
              title: AppLocalizations.of(context)?.currentLocation ??
                  'Current Location',
            ),
            icon: BitmapDescriptor.defaultMarkerWithHue(
                BitmapDescriptor.hueBlue),
          ),
        );
      }
    });
  }

  BitmapDescriptor _getMarkerIcon(String category) {
    switch (category) {
      case 'temple':
        return BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed);
      case 'stupa':
        return BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueOrange);
      case 'durbar':
        return BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueYellow);
      case 'palace':
        return BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueViolet);
      case 'museum':
        return BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueCyan);
      default:
        return BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueGreen);
    }
  }

  // Navigate map to selected municipality
  void _navigateToMunicipality(Municipality municipality) {
    _mapController?.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
          target: LatLng(municipality.centerLat, municipality.centerLng),
          zoom: municipality.zoomLevel,
        ),
      ),
    );
    setState(() {
      _selectedMunicipality = municipality;
      _showMunicipalityPanel = false;
    });
  }

  void _showPlaceBottomSheet(HistoricPlace place) {
    final locale = ref.read(languageProvider).languageCode;
    final l10n = AppLocalizations.of(context)!;

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    place.getName(locale),
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF2C1810),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            Text(
              place.city,
              style: const TextStyle(color: Colors.grey, fontSize: 14),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(Icons.star, color: Colors.amber, size: 16),
                Text(' ${place.rating}  •  ${place.reviewCount} reviews'),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pop(context);
                      ref.read(selectedPlaceProvider.notifier).state = place;
                      context.push('/place/${place.id}');
                    },
                    icon: const Icon(Icons.info_outline),
                    label: Text(l10n.placeDetails),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF8B1A1A),
                      foregroundColor: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pop(context);
                      _startNavigation(place);
                    },
                    icon: const Icon(Icons.navigation),
                    label: Text(l10n.startNavigation),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF2E7D32),
                      foregroundColor: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _startNavigation(HistoricPlace destination) {
    if (_currentPosition == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Getting your location...')),
      );
      _initLocation();
      return;
    }

    setState(() {
      _isNavigating = true;
      _selectedDestination = destination;
    });

    final routePoints = _locationService.generateRoutePoints(
      _currentPosition!.latitude,
      _currentPosition!.longitude,
      destination.latitude,
      destination.longitude,
    );

    setState(() {
      _polylines = {
        Polyline(
          polylineId: const PolylineId('route'),
          points: routePoints
              .map((p) => LatLng(p['lat']!, p['lng']!))
              .toList(),
          color: const Color(0xFF1565C0),
          width: 5,
          patterns: [PatternItem.dash(20), PatternItem.gap(10)],
        ),
      };
    });

    _mapController?.animateCamera(
      CameraUpdate.newLatLngBounds(
        LatLngBounds(
          southwest: LatLng(
            _currentPosition!.latitude < destination.latitude
                ? _currentPosition!.latitude
                : destination.latitude,
            _currentPosition!.longitude < destination.longitude
                ? _currentPosition!.longitude
                : destination.longitude,
          ),
          northeast: LatLng(
            _currentPosition!.latitude > destination.latitude
                ? _currentPosition!.latitude
                : destination.latitude,
            _currentPosition!.longitude > destination.longitude
                ? _currentPosition!.longitude
                : destination.longitude,
          ),
        ),
        100,
      ),
    );

    _showNavigationPanel(destination);
  }

  void _showNavigationPanel(HistoricPlace destination) {
    final locale = ref.read(languageProvider).languageCode;
    final l10n = AppLocalizations.of(context)!;
    final distance = _locationService.calculateDistance(
      _currentPosition!.latitude,
      _currentPosition!.longitude,
      destination.latitude,
      destination.longitude,
    );
    final walkingTime = _locationService.estimateWalkingTime(distance);
    final drivingTime = _locationService.estimateDrivingTime(distance);

    showModalBottomSheet(
      context: context,
      isDismissible: false,
      enableDrag: false,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                const Icon(Icons.navigation, color: Color(0xFF1565C0)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    destination.getName(locale),
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () {
                    Navigator.pop(context);
                    setState(() {
                      _isNavigating = false;
                      _selectedDestination = null;
                      _polylines.clear();
                    });
                  },
                ),
              ],
            ),
            const Divider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildRouteInfo(
                  Icons.directions_walk,
                  _locationService.formatDistance(distance),
                  _locationService.formatDuration(walkingTime),
                  l10n.walkingRoute,
                ),
                _buildRouteInfo(
                  Icons.directions_car,
                  _locationService.formatDistance(distance),
                  _locationService.formatDuration(drivingTime),
                  l10n.drivingRoute,
                ),
              ],
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                  context.push('/navigation/${destination.id}');
                },
                icon: const Icon(Icons.turn_right),
                label: Text(l10n.stepByStep),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1565C0),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRouteInfo(
      IconData icon, String distance, String duration, String label) {
    return Column(
      children: [
        Icon(icon, color: const Color(0xFF1565C0), size: 28),
        const SizedBox(height: 4),
        Text(distance,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        Text(duration, style: const TextStyle(color: Colors.grey)),
        Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final locale = ref.watch(languageProvider).languageCode;

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(l10n.mapTitle),
            if (_selectedMunicipality != null)
              Text(
                locale == 'ne'
                    ? _selectedMunicipality!.nameNe
                    : _selectedMunicipality!.nameEn,
                style: const TextStyle(fontSize: 12, color: Colors.white70),
              ),
          ],
        ),
        backgroundColor: const Color(0xFF8B1A1A),
        foregroundColor: Colors.white,
        actions: [
          // Municipality filter button
          IconButton(
            icon: const Icon(Icons.location_city),
            tooltip: 'Filter by Municipality',
            onPressed: () {
              setState(() {
                _showMunicipalityPanel = !_showMunicipalityPanel;
              });
            },
          ),
          PopupMenuButton<MapType>(
            icon: const Icon(Icons.layers, color: Colors.white),
            onSelected: (type) {
              setState(() => _mapType = type);
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: MapType.normal,
                child: Text(l10n.normal),
              ),
              PopupMenuItem(
                value: MapType.satellite,
                child: Text(l10n.satellite),
              ),
              PopupMenuItem(
                value: MapType.terrain,
                child: Text(l10n.terrain),
              ),
            ],
          ),
        ],
      ),
      body: Stack(
        children: [
          GoogleMap(
            initialCameraPosition: const CameraPosition(
              target: _nepalCenter,
              zoom: _nepalZoom,
            ),
            onMapCreated: (controller) {
              _mapController = controller;
              _buildMarkers();
            },
            markers: _markers,
            polylines: _polylines,
            mapType: _mapType,
            myLocationEnabled: true,
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            compassEnabled: true,
          ),

          // Municipality Filter Panel (slide-in from top)
          if (_showMunicipalityPanel)
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: _buildMunicipalityPanel(locale),
            ),

          // Floating action buttons
          Positioned(
            right: 16,
            bottom: 100,
            child: Column(
              children: [
                FloatingActionButton.small(
                  heroTag: 'zoom_in',
                  onPressed: () {
                    _mapController?.animateCamera(CameraUpdate.zoomIn());
                  },
                  backgroundColor: Colors.white,
                  child: const Icon(Icons.add, color: Colors.black),
                ),
                const SizedBox(height: 8),
                FloatingActionButton.small(
                  heroTag: 'zoom_out',
                  onPressed: () {
                    _mapController?.animateCamera(CameraUpdate.zoomOut());
                  },
                  backgroundColor: Colors.white,
                  child: const Icon(Icons.remove, color: Colors.black),
                ),
                const SizedBox(height: 8),
                FloatingActionButton.small(
                  heroTag: 'nepal_view',
                  onPressed: () {
                    _mapController?.animateCamera(
                      CameraUpdate.newCameraPosition(
                        const CameraPosition(
                          target: _nepalCenter,
                          zoom: _nepalZoom,
                        ),
                      ),
                    );
                    setState(() {
                      _selectedMunicipality = null;
                      _selectedDistrict = null;
                      _selectedProvince = null;
                    });
                  },
                  backgroundColor: const Color(0xFF8B1A1A),
                  child: const Icon(Icons.flag, color: Colors.white),
                ),
                const SizedBox(height: 8),
                FloatingActionButton.small(
                  heroTag: 'my_location',
                  onPressed: () {
                    if (_currentPosition != null) {
                      _mapController?.animateCamera(
                        CameraUpdate.newLatLng(
                          LatLng(_currentPosition!.latitude,
                              _currentPosition!.longitude),
                        ),
                      );
                    } else {
                      _initLocation();
                    }
                  },
                  backgroundColor: const Color(0xFF1565C0),
                  child: const Icon(Icons.my_location, color: Colors.white),
                ),
              ],
            ),
          ),

          // Legend
          Positioned(
            left: 16,
            bottom: 100,
            child: _buildLegend(l10n),
          ),

          // Selected municipality chip
          if (_selectedMunicipality != null)
            Positioned(
              top: 8,
              left: 16,
              right: 80,
              child: Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF8B1A1A),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      blurRadius: 8,
                    ),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.location_city,
                        color: Colors.white, size: 14),
                    const SizedBox(width: 6),
                    Flexible(
                      child: Text(
                        locale == 'ne'
                            ? _selectedMunicipality!.nameNe
                            : _selectedMunicipality!.nameEn,
                        style: const TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.bold),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 6),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          _selectedMunicipality = null;
                        });
                        _mapController?.animateCamera(
                          CameraUpdate.newCameraPosition(
                            const CameraPosition(
                              target: _nepalCenter,
                              zoom: _nepalZoom,
                            ),
                          ),
                        );
                      },
                      child: const Icon(Icons.close,
                          color: Colors.white70, size: 14),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildMunicipalityPanel(String locale) {
    return Container(
      constraints: const BoxConstraints(maxHeight: 400),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.15),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: const Color(0xFF8B1A1A),
            child: Row(
              children: [
                const Icon(Icons.location_city, color: Colors.white, size: 18),
                const SizedBox(width: 8),
                const Expanded(
                  child: Text(
                    'Filter by Municipality / Rural Municipality',
                    style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 14),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close, color: Colors.white, size: 20),
                  onPressed: () =>
                      setState(() => _showMunicipalityPanel = false),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
          ),

          // Province selector
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Province',
                    style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey)),
                const SizedBox(height: 6),
                SizedBox(
                  height: 36,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: nepalProvinces.length,
                    itemBuilder: (context, index) {
                      final province = nepalProvinces[index];
                      final isSelected = _selectedProvince?.id == province.id;
                      return Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              _selectedProvince = province;
                              _selectedDistrict = null;
                              _selectedMunicipality = null;
                            });
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0xFF8B1A1A)
                                  : Colors.grey[100],
                              borderRadius: BorderRadius.circular(18),
                            ),
                            child: Text(
                              locale == 'ne'
                                  ? province.nameNe
                                  : 'P${province.id}',
                              style: TextStyle(
                                color: isSelected ? Colors.white : Colors.black,
                                fontSize: 12,
                                fontWeight: isSelected
                                    ? FontWeight.bold
                                    : FontWeight.normal,
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),

          // District selector
          if (_selectedProvince != null) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('District',
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey)),
                  const SizedBox(height: 6),
                  SizedBox(
                    height: 36,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: _selectedProvince!.districts.length,
                      itemBuilder: (context, index) {
                        final district = _selectedProvince!.districts[index];
                        final isSelected =
                            _selectedDistrict?.id == district.id;
                        return Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: GestureDetector(
                            onTap: () {
                              setState(() {
                                _selectedDistrict = district;
                                _selectedMunicipality = null;
                              });
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: isSelected
                                    ? const Color(0xFFD4A017)
                                    : Colors.grey[100],
                                borderRadius: BorderRadius.circular(18),
                              ),
                              child: Text(
                                locale == 'ne'
                                    ? district.nameNe
                                    : district.nameEn,
                                style: TextStyle(
                                  color: isSelected
                                      ? Colors.white
                                      : Colors.black,
                                  fontSize: 12,
                                  fontWeight: isSelected
                                      ? FontWeight.bold
                                      : FontWeight.normal,
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],

          // Municipality list
          if (_selectedDistrict != null) ...[
            const Padding(
              padding: EdgeInsets.fromLTRB(12, 12, 12, 4),
              child: Text('Municipality / Rural Municipality',
                  style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.grey)),
            ),
            Flexible(
              child: ListView.builder(
                shrinkWrap: true,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                itemCount: _selectedDistrict!.municipalities.length,
                itemBuilder: (context, index) {
                  final mun = _selectedDistrict!.municipalities[index];
                  final isSelected = _selectedMunicipality?.id == mun.id;
                  final typeColor = mun.type ==
                          MunicipalityType.ruralMunicipality
                      ? Colors.green
                      : mun.type == MunicipalityType.metropolitanCity
                          ? Colors.red
                          : mun.type == MunicipalityType.subMetropolitanCity
                              ? Colors.orange
                              : Colors.blue;

                  return ListTile(
                    dense: true,
                    selected: isSelected,
                    selectedTileColor:
                        const Color(0xFF8B1A1A).withOpacity(0.08),
                    leading: Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: typeColor,
                        shape: BoxShape.circle,
                      ),
                    ),
                    title: Text(
                      locale == 'ne' ? mun.nameNe : mun.nameEn,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: isSelected
                            ? FontWeight.bold
                            : FontWeight.normal,
                        color: isSelected
                            ? const Color(0xFF8B1A1A)
                            : Colors.black87,
                      ),
                    ),
                    subtitle: Text(
                      locale == 'ne' ? mun.typeLabelNe : mun.typeLabel,
                      style: TextStyle(fontSize: 11, color: typeColor),
                    ),
                    trailing: const Icon(Icons.chevron_right, size: 16),
                    onTap: () => _navigateToMunicipality(mun),
                  );
                },
              ),
            ),
          ],

          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _buildLegend(AppLocalizations l10n) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 8,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _legendItem(Colors.red, l10n.temple),
          _legendItem(Colors.orange, l10n.stupa),
          _legendItem(Colors.yellow.shade700, l10n.durbar),
          _legendItem(Colors.purple, l10n.palace),
          _legendItem(Colors.cyan, l10n.museum),
          const Divider(height: 8),
          const Text('Municipality Types',
              style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold)),
          _legendItem(Colors.red, 'Metro City'),
          _legendItem(Colors.orange, 'Sub-Metro'),
          _legendItem(Colors.blue, 'Municipality'),
          _legendItem(Colors.green, 'Rural Mun.'),
        ],
      ),
    );
  }

  Widget _legendItem(Color color, String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 10,
            height: 10,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(label, style: const TextStyle(fontSize: 10)),
        ],
      ),
    );
  }
}
