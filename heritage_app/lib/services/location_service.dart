import 'dart:math';
import 'package:geolocator/geolocator.dart';

class LocationService {
  static final LocationService _instance = LocationService._internal();
  factory LocationService() => _instance;
  LocationService._internal();

  Position? _currentPosition;
  Stream<Position>? _positionStream;

  Position? get currentPosition => _currentPosition;

  Future<bool> requestPermission() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return false;
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return false;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return false;
    }

    return true;
  }

  Future<Position?> getCurrentPosition() async {
    final hasPermission = await requestPermission();
    if (!hasPermission) return null;

    try {
      _currentPosition = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      return _currentPosition;
    } catch (e) {
      return null;
    }
  }

  Stream<Position> getPositionStream() {
    const locationSettings = LocationSettings(
      accuracy: LocationAccuracy.high,
      distanceFilter: 10,
    );
    _positionStream = Geolocator.getPositionStream(
      locationSettings: locationSettings,
    );
    return _positionStream!;
  }

  double calculateDistance(
    double startLat,
    double startLng,
    double endLat,
    double endLng,
  ) {
    return Geolocator.distanceBetween(startLat, startLng, endLat, endLng);
  }

  double calculateBearing(
    double startLat,
    double startLng,
    double endLat,
    double endLng,
  ) {
    return Geolocator.bearingBetween(startLat, startLng, endLat, endLng);
  }

  String formatDistance(double meters) {
    if (meters < 1000) {
      return '${meters.toStringAsFixed(0)} m';
    } else {
      return '${(meters / 1000).toStringAsFixed(1)} km';
    }
  }

  String formatDuration(int seconds) {
    if (seconds < 60) {
      return '$seconds sec';
    } else if (seconds < 3600) {
      return '${(seconds / 60).toStringAsFixed(0)} min';
    } else {
      final hours = seconds ~/ 3600;
      final minutes = (seconds % 3600) ~/ 60;
      return '${hours}h ${minutes}min';
    }
  }

  // Dijkstra's algorithm for shortest path between waypoints
  List<Map<String, double>> findShortestPath(
    Map<String, double> start,
    Map<String, double> end,
    List<Map<String, double>> waypoints,
  ) {
    // For GPS navigation, we use direct path with waypoints
    // In production, this would call a routing API (Google Directions, OSRM, etc.)
    final path = <Map<String, double>>[];
    path.add(start);

    // Sort waypoints by distance from start
    final sortedWaypoints = [...waypoints];
    sortedWaypoints.sort((a, b) {
      final distA = calculateDistance(
        start['lat']!,
        start['lng']!,
        a['lat']!,
        a['lng']!,
      );
      final distB = calculateDistance(
        start['lat']!,
        start['lng']!,
        b['lat']!,
        b['lng']!,
      );
      return distA.compareTo(distB);
    });

    path.addAll(sortedWaypoints);
    path.add(end);
    return path;
  }

  // Calculate estimated walking time (average 5 km/h)
  int estimateWalkingTime(double distanceMeters) {
    const walkingSpeedMps = 5000 / 3600; // 5 km/h in m/s
    return (distanceMeters / walkingSpeedMps).round();
  }

  // Calculate estimated driving time (average 30 km/h in city)
  int estimateDrivingTime(double distanceMeters) {
    const drivingSpeedMps = 30000 / 3600; // 30 km/h in m/s
    return (distanceMeters / drivingSpeedMps).round();
  }

  // Get compass direction
  String getCompassDirection(double bearing) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    final index = ((bearing + 22.5) / 45).floor() % 8;
    return directions[index];
  }

  // Check if user has arrived at destination (within 50 meters)
  bool hasArrived(
    double currentLat,
    double currentLng,
    double destLat,
    double destLng,
  ) {
    final distance =
        calculateDistance(currentLat, currentLng, destLat, destLng);
    return distance <= 50;
  }

  // Generate intermediate points for smooth route display
  List<Map<String, double>> generateRoutePoints(
    double startLat,
    double startLng,
    double endLat,
    double endLng, {
    int numPoints = 10,
  }) {
    final points = <Map<String, double>>[];
    for (int i = 0; i <= numPoints; i++) {
      final t = i / numPoints;
      points.add({
        'lat': startLat + (endLat - startLat) * t,
        'lng': startLng + (endLng - startLng) * t,
      });
    }
    return points;
  }
}
