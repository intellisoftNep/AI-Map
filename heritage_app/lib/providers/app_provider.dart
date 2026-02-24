import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/historic_place.dart';

// Language Provider
class LanguageNotifier extends StateNotifier<Locale> {
  LanguageNotifier() : super(const Locale('en'));

  Future<void> setLanguage(String languageCode) async {
    state = Locale(languageCode);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('language', languageCode);
  }

  Future<void> loadSavedLanguage() async {
    final prefs = await SharedPreferences.getInstance();
    final savedLang = prefs.getString('language') ?? 'en';
    state = Locale(savedLang);
  }
}

final languageProvider = StateNotifierProvider<LanguageNotifier, Locale>((ref) {
  return LanguageNotifier();
});

// Places Provider
class PlacesNotifier extends StateNotifier<List<HistoricPlace>> {
  PlacesNotifier() : super([]);

  void loadPlaces() {
    state = getSamplePlaces();
  }

  List<HistoricPlace> getByCategory(String category) {
    return state.where((p) => p.category == category).toList();
  }

  List<HistoricPlace> getFeatured() {
    return state.where((p) => p.isFeatured).toList();
  }

  List<HistoricPlace> search(String query, String locale) {
    final q = query.toLowerCase();
    return state.where((p) {
      final name = locale == 'ne' ? p.nameNe : p.nameEn;
      final desc = locale == 'ne' ? p.descriptionNe : p.descriptionEn;
      return name.toLowerCase().contains(q) ||
          desc.toLowerCase().contains(q) ||
          p.city.toLowerCase().contains(q);
    }).toList();
  }

  List<HistoricPlace> sortByDistance(double lat, double lng) {
    final sorted = [...state];
    sorted.sort((a, b) {
      final distA = _distance(lat, lng, a.latitude, a.longitude);
      final distB = _distance(lat, lng, b.latitude, b.longitude);
      return distA.compareTo(distB);
    });
    return sorted;
  }

  double _distance(double lat1, double lng1, double lat2, double lng2) {
    // Simplified Haversine formula
    const R = 6371.0;
    final dLat = (lat2 - lat1) * 3.14159 / 180;
    final dLng = (lng2 - lng1) * 3.14159 / 180;
    final a = dLat * dLat + dLng * dLng;
    return R * a;
  }
}

final placesProvider =
    StateNotifierProvider<PlacesNotifier, List<HistoricPlace>>((ref) {
  final notifier = PlacesNotifier();
  notifier.loadPlaces();
  return notifier;
});

// Selected Place Provider
final selectedPlaceProvider = StateProvider<HistoricPlace?>((ref) => null);

// Search Query Provider
final searchQueryProvider = StateProvider<String>((ref) => '');

// Filter Category Provider
final filterCategoryProvider = StateProvider<String?>((ref) => null);

// Map Type Provider
final mapTypeProvider = StateProvider<int>((ref) => 0); // 0=normal, 1=satellite, 2=terrain

// Navigation Active Provider
final navigationActiveProvider = StateProvider<bool>((ref) => false);

// Current Location Provider
final currentLocationProvider =
    StateProvider<Map<String, double>?>((ref) => null);

// Theme Provider
class ThemeNotifier extends StateNotifier<ThemeMode> {
  ThemeNotifier() : super(ThemeMode.light);

  void toggleTheme() {
    state = state == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
  }
}

final themeProvider = StateNotifierProvider<ThemeNotifier, ThemeMode>((ref) {
  return ThemeNotifier();
});

// Filtered Places Provider
final filteredPlacesProvider = Provider<List<HistoricPlace>>((ref) {
  final places = ref.watch(placesProvider);
  final query = ref.watch(searchQueryProvider);
  final category = ref.watch(filterCategoryProvider);
  final locale = ref.watch(languageProvider).languageCode;

  var filtered = places;

  if (query.isNotEmpty) {
    final q = query.toLowerCase();
    filtered = filtered.where((p) {
      final name = locale == 'ne' ? p.nameNe : p.nameEn;
      return name.toLowerCase().contains(q) ||
          p.city.toLowerCase().contains(q);
    }).toList();
  }

  if (category != null && category.isNotEmpty) {
    filtered = filtered.where((p) => p.category == category).toList();
  }

  return filtered;
});
