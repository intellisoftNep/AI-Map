import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import '../../models/historic_place.dart';
import '../../providers/app_provider.dart';
import '../../services/location_service.dart';

class NavigationScreen extends ConsumerStatefulWidget {
  final String placeId;

  const NavigationScreen({super.key, required this.placeId});

  @override
  ConsumerState<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends ConsumerState<NavigationScreen> {
  GoogleMapController? _mapController;
  StreamSubscription<Position>? _positionSubscription;
  Position? _currentPosition;
  final LocationService _locationService = LocationService();
  Set<Marker> _markers = {};
  Set<Polyline> _polylines = {};
  List<NavigationStep> _steps = [];
  int _currentStepIndex = 0;
  bool _hasArrived = false;
  double _totalDistance = 0;
  double _remainingDistance = 0;
  String _currentInstruction = '';
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _initNavigation();
  }

  @override
  void dispose() {
    _positionSubscription?.cancel();
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

  Future<void> _initNavigation() async {
    final place = _getPlace();
    if (place == null) return;

    final position = await _locationService.getCurrentPosition();
    if (position == null) {
      setState(() => _isLoading = false);
      return;
    }

    setState(() {
      _currentPosition = position;
      _totalDistance = _locationService.calculateDistance(
        position.latitude,
        position.longitude,
        place.latitude,
        place.longitude,
      );
      _remainingDistance = _totalDistance;
    });

    _generateNavigationSteps(position, place);
    _buildMapElements(position, place);
    _startLocationTracking(place);

    setState(() => _isLoading = false);
  }

  void _generateNavigationSteps(Position start, HistoricPlace destination) {
    // Generate turn-by-turn navigation steps
    // In production, this would use Google Directions API
    final bearing = _locationService.calculateBearing(
      start.latitude,
      start.longitude,
      destination.latitude,
      destination.longitude,
    );

    final direction = _locationService.getCompassDirection(bearing);
    final distance = _locationService.calculateDistance(
      start.latitude,
      start.longitude,
      destination.latitude,
      destination.longitude,
    );

    _steps = [
      NavigationStep(
        instruction: 'Head $direction toward ${destination.nameEn}',
        instructionNe: '${destination.nameNe} तर्फ $direction दिशामा जानुहोस्',
        distance: distance,
        maneuver: 'straight',
        icon: Icons.straight,
      ),
      NavigationStep(
        instruction: 'You have arrived at ${destination.nameEn}',
        instructionNe: 'तपाईं ${destination.nameNe} पुग्नुभयो',
        distance: 0,
        maneuver: 'arrive',
        icon: Icons.location_on,
      ),
    ];

    setState(() {
      _currentInstruction = _steps[0].instruction;
    });
  }

  void _buildMapElements(Position start, HistoricPlace destination) {
    final routePoints = _locationService.generateRoutePoints(
      start.latitude,
      start.longitude,
      destination.latitude,
      destination.longitude,
      numPoints: 20,
    );

    setState(() {
      _markers = {
        Marker(
          markerId: const MarkerId('start'),
          position: LatLng(start.latitude, start.longitude),
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueBlue),
          infoWindow: const InfoWindow(title: 'Your Location'),
        ),
        Marker(
          markerId: const MarkerId('destination'),
          position: LatLng(destination.latitude, destination.longitude),
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
          infoWindow: InfoWindow(title: destination.nameEn),
        ),
      };

      _polylines = {
        Polyline(
          polylineId: const PolylineId('route'),
          points: routePoints
              .map((p) => LatLng(p['lat']!, p['lng']!))
              .toList(),
          color: const Color(0xFF1565C0),
          width: 6,
          jointType: JointType.round,
          startCap: Cap.roundCap,
          endCap: Cap.roundCap,
        ),
      };
    });
  }

  void _startLocationTracking(HistoricPlace destination) {
    _positionSubscription = _locationService
        .getPositionStream()
        .listen((position) {
      if (!mounted) return;

      setState(() {
        _currentPosition = position;
        _remainingDistance = _locationService.calculateDistance(
          position.latitude,
          position.longitude,
          destination.latitude,
          destination.longitude,
        );
      });

      // Update current location marker
      setState(() {
        _markers.removeWhere((m) => m.markerId.value == 'current');
        _markers.add(
          Marker(
            markerId: const MarkerId('current'),
            position: LatLng(position.latitude, position.longitude),
            icon: BitmapDescriptor.defaultMarkerWithHue(
                BitmapDescriptor.hueBlue),
            rotation: position.heading,
          ),
        );
      });

      // Check if arrived
      if (_locationService.hasArrived(
        position.latitude,
        position.longitude,
        destination.latitude,
        destination.longitude,
      )) {
        setState(() {
          _hasArrived = true;
          _currentInstruction = _steps.last.instruction;
        });
        _showArrivalDialog(destination);
      }

      // Follow user on map
      _mapController?.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(
            target: LatLng(position.latitude, position.longitude),
            zoom: 17,
            bearing: position.heading,
            tilt: 45,
          ),
        ),
      );
    });
  }

  void _showArrivalDialog(HistoricPlace destination) {
    final locale = ref.read(languageProvider).languageCode;
    final l10n = AppLocalizations.of(context)!;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.green, size: 32),
            const SizedBox(width: 8),
            Text(l10n.arrived),
          ],
        ),
        content: Text(
          'You have arrived at ${destination.getName(locale)}!',
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: Text(l10n.ok),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final locale = ref.watch(languageProvider).languageCode;
    final place = _getPlace();

    if (place == null) {
      return Scaffold(
        appBar: AppBar(title: Text(l10n.navigation)),
        body: const Center(child: Text('Place not found')),
      );
    }

    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(
          title: Text(l10n.navigation),
          backgroundColor: const Color(0xFF1565C0),
          foregroundColor: Colors.white,
        ),
        body: const Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 16),
              Text('Getting your location...'),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      body: Stack(
        children: [
          // Map
          GoogleMap(
            initialCameraPosition: CameraPosition(
              target: _currentPosition != null
                  ? LatLng(
                      _currentPosition!.latitude, _currentPosition!.longitude)
                  : LatLng(place.latitude, place.longitude),
              zoom: 15,
              tilt: 45,
            ),
            onMapCreated: (controller) => _mapController = controller,
            markers: _markers,
            polylines: _polylines,
            myLocationEnabled: true,
            myLocationButtonEnabled: false,
            zoomControlsEnabled: false,
            compassEnabled: true,
            tiltGesturesEnabled: true,
            rotateGesturesEnabled: true,
          ),

          // Top navigation instruction panel
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: SafeArea(
              child: Container(
                margin: const EdgeInsets.all(16),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF1565C0),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      blurRadius: 10,
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        _steps.isNotEmpty
                            ? _steps[_currentStepIndex].icon
                            : Icons.navigation,
                        color: Colors.white,
                        size: 32,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            locale == 'ne' && _steps.isNotEmpty
                                ? _steps[_currentStepIndex].instructionNe
                                : _currentInstruction,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          if (_remainingDistance > 0)
                            Text(
                              _locationService
                                  .formatDistance(_remainingDistance),
                              style: TextStyle(
                                color: Colors.white.withOpacity(0.8),
                                fontSize: 14,
                              ),
                            ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Bottom info panel
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black12,
                    blurRadius: 10,
                    offset: Offset(0, -2),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildInfoTile(
                        Icons.location_on,
                        place.getName(locale),
                        l10n.destination,
                        const Color(0xFF8B1A1A),
                      ),
                      _buildInfoTile(
                        Icons.straighten,
                        _locationService.formatDistance(_remainingDistance),
                        l10n.distance,
                        const Color(0xFF1565C0),
                      ),
                      _buildInfoTile(
                        Icons.access_time,
                        _locationService.formatDuration(
                          _locationService
                              .estimateWalkingTime(_remainingDistance),
                        ),
                        l10n.duration,
                        const Color(0xFF2E7D32),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Progress bar
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(l10n.shortestPath,
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 13)),
                          Text(
                            '${((_totalDistance - _remainingDistance) / _totalDistance * 100).toStringAsFixed(0)}%',
                            style: const TextStyle(
                                color: Color(0xFF2E7D32),
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      LinearProgressIndicator(
                        value: _totalDistance > 0
                            ? (_totalDistance - _remainingDistance) /
                                _totalDistance
                            : 0,
                        backgroundColor: Colors.grey[200],
                        valueColor: const AlwaysStoppedAnimation<Color>(
                            Color(0xFF2E7D32)),
                        minHeight: 8,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // Recenter button
          Positioned(
            right: 16,
            bottom: 180,
            child: FloatingActionButton.small(
              heroTag: 'recenter',
              onPressed: () {
                if (_currentPosition != null) {
                  _mapController?.animateCamera(
                    CameraUpdate.newCameraPosition(
                      CameraPosition(
                        target: LatLng(_currentPosition!.latitude,
                            _currentPosition!.longitude),
                        zoom: 17,
                        tilt: 45,
                      ),
                    ),
                  );
                }
              },
              backgroundColor: Colors.white,
              child: const Icon(Icons.my_location, color: Color(0xFF1565C0)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoTile(
      IconData icon, String value, String label, Color color) {
    return Column(
      children: [
        Icon(icon, color: color, size: 24),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 14,
            color: color,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        Text(
          label,
          style: const TextStyle(color: Colors.grey, fontSize: 11),
        ),
      ],
    );
  }
}

class NavigationStep {
  final String instruction;
  final String instructionNe;
  final double distance;
  final String maneuver;
  final IconData icon;

  NavigationStep({
    required this.instruction,
    required this.instructionNe,
    required this.distance,
    required this.maneuver,
    required this.icon,
  });
}
