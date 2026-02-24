import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import '../providers/app_provider.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final locale = ref.watch(languageProvider).languageCode;
    final themeMode = ref.watch(themeProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.settings),
        backgroundColor: const Color(0xFF8B1A1A),
        foregroundColor: Colors.white,
      ),
      body: ListView(
        children: [
          const SizedBox(height: 16),
          _buildSection(
            context,
            l10n.language,
            [
              ListTile(
                leading: const Text('🇬🇧', style: TextStyle(fontSize: 24)),
                title: Text(l10n.english),
                trailing: locale == 'en'
                    ? const Icon(Icons.check_circle, color: Color(0xFF8B1A1A))
                    : null,
                onTap: () =>
                    ref.read(languageProvider.notifier).setLanguage('en'),
              ),
              ListTile(
                leading: const Text('🇳🇵', style: TextStyle(fontSize: 24)),
                title: Text(l10n.nepali),
                trailing: locale == 'ne'
                    ? const Icon(Icons.check_circle, color: Color(0xFF8B1A1A))
                    : null,
                onTap: () =>
                    ref.read(languageProvider.notifier).setLanguage('ne'),
              ),
            ],
          ),
          _buildSection(
            context,
            'Theme',
            [
              SwitchListTile(
                title: const Text('Dark Mode'),
                secondary: const Icon(Icons.dark_mode),
                value: themeMode == ThemeMode.dark,
                activeColor: const Color(0xFF8B1A1A),
                onChanged: (value) {
                  ref.read(themeProvider.notifier).toggleTheme();
                },
              ),
            ],
          ),
          _buildSection(
            context,
            l10n.about,
            [
              ListTile(
                leading: const Icon(Icons.info_outline),
                title: Text(l10n.appTitle),
                subtitle: const Text('Heritage Trail - Nepal Historic Places'),
              ),
              ListTile(
                leading: const Icon(Icons.verified),
                title: Text(l10n.version),
                subtitle: const Text('1.0.0'),
              ),
              ListTile(
                leading: const Icon(Icons.language),
                title: const Text('Supported Languages'),
                subtitle: const Text('English, नेपाली'),
              ),
            ],
          ),
          _buildSection(
            context,
            'Features',
            [
              _featureTile(Icons.map, 'Interactive Heritage Map',
                  'View all historic places on map'),
              _featureTile(Icons.navigation, 'GPS Navigation',
                  'Turn-by-turn directions to any place'),
              _featureTile(Icons.headphones, 'Audio Guides',
                  'Listen to place descriptions'),
              _featureTile(Icons.videocam, 'Video Tours',
                  'Watch virtual tours of places'),
              _featureTile(Icons.photo_library, 'Photo Galleries',
                  'Browse high-quality photos'),
              _featureTile(Icons.offline_bolt, 'Offline Support',
                  'Access content without internet'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSection(
      BuildContext context, String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
          child: Text(
            title.toUpperCase(),
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: Color(0xFF8B1A1A),
              letterSpacing: 1.2,
            ),
          ),
        ),
        Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(children: children),
        ),
        const SizedBox(height: 8),
      ],
    );
  }

  Widget _featureTile(IconData icon, String title, String subtitle) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: const Color(0xFF8B1A1A).withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: const Color(0xFF8B1A1A), size: 20),
      ),
      title: Text(title, style: const TextStyle(fontSize: 14)),
      subtitle: Text(subtitle,
          style: const TextStyle(fontSize: 12, color: Colors.grey)),
    );
  }
}
