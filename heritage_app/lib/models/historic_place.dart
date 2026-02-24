import 'package:hive/hive.dart';

part 'historic_place.g.dart';

@HiveType(typeId: 0)
class HistoricPlace extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String nameEn;

  @HiveField(2)
  final String nameNe;

  @HiveField(3)
  final String descriptionEn;

  @HiveField(4)
  final String descriptionNe;

  @HiveField(5)
  final double latitude;

  @HiveField(6)
  final double longitude;

  @HiveField(7)
  final String category;

  @HiveField(8)
  final List<String> photoUrls;

  @HiveField(9)
  final String? videoUrl;

  @HiveField(10)
  final String? audioUrl;

  @HiveField(11)
  final String? openingHours;

  @HiveField(12)
  final String? entryFee;

  @HiveField(13)
  final double rating;

  @HiveField(14)
  final int reviewCount;

  @HiveField(15)
  final String? historicalPeriod;

  @HiveField(16)
  final String? howToReachEn;

  @HiveField(17)
  final String? howToReachNe;

  @HiveField(18)
  final String? bestTimeToVisit;

  @HiveField(19)
  final List<String> nearbyPlaceIds;

  @HiveField(20)
  final bool isFeatured;

  @HiveField(21)
  final String? thumbnailUrl;

  @HiveField(22)
  final String address;

  @HiveField(23)
  final String city;

  @HiveField(24)
  final String province;

  HistoricPlace({
    required this.id,
    required this.nameEn,
    required this.nameNe,
    required this.descriptionEn,
    required this.descriptionNe,
    required this.latitude,
    required this.longitude,
    required this.category,
    required this.photoUrls,
    this.videoUrl,
    this.audioUrl,
    this.openingHours,
    this.entryFee,
    this.rating = 0.0,
    this.reviewCount = 0,
    this.historicalPeriod,
    this.howToReachEn,
    this.howToReachNe,
    this.bestTimeToVisit,
    this.nearbyPlaceIds = const [],
    this.isFeatured = false,
    this.thumbnailUrl,
    required this.address,
    required this.city,
    required this.province,
  });

  factory HistoricPlace.fromJson(Map<String, dynamic> json) {
    return HistoricPlace(
      id: json['id'] as String,
      nameEn: json['name_en'] as String,
      nameNe: json['name_ne'] as String,
      descriptionEn: json['description_en'] as String,
      descriptionNe: json['description_ne'] as String,
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      category: json['category'] as String,
      photoUrls: List<String>.from(json['photo_urls'] ?? []),
      videoUrl: json['video_url'] as String?,
      audioUrl: json['audio_url'] as String?,
      openingHours: json['opening_hours'] as String?,
      entryFee: json['entry_fee'] as String?,
      rating: (json['rating'] as num?)?.toDouble() ?? 0.0,
      reviewCount: json['review_count'] as int? ?? 0,
      historicalPeriod: json['historical_period'] as String?,
      howToReachEn: json['how_to_reach_en'] as String?,
      howToReachNe: json['how_to_reach_ne'] as String?,
      bestTimeToVisit: json['best_time_to_visit'] as String?,
      nearbyPlaceIds: List<String>.from(json['nearby_place_ids'] ?? []),
      isFeatured: json['is_featured'] as bool? ?? false,
      thumbnailUrl: json['thumbnail_url'] as String?,
      address: json['address'] as String? ?? '',
      city: json['city'] as String? ?? '',
      province: json['province'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name_en': nameEn,
      'name_ne': nameNe,
      'description_en': descriptionEn,
      'description_ne': descriptionNe,
      'latitude': latitude,
      'longitude': longitude,
      'category': category,
      'photo_urls': photoUrls,
      'video_url': videoUrl,
      'audio_url': audioUrl,
      'opening_hours': openingHours,
      'entry_fee': entryFee,
      'rating': rating,
      'review_count': reviewCount,
      'historical_period': historicalPeriod,
      'how_to_reach_en': howToReachEn,
      'how_to_reach_ne': howToReachNe,
      'best_time_to_visit': bestTimeToVisit,
      'nearby_place_ids': nearbyPlaceIds,
      'is_featured': isFeatured,
      'thumbnail_url': thumbnailUrl,
      'address': address,
      'city': city,
      'province': province,
    };
  }

  String getName(String locale) => locale == 'ne' ? nameNe : nameEn;
  String getDescription(String locale) =>
      locale == 'ne' ? descriptionNe : descriptionEn;
  String? getHowToReach(String locale) =>
      locale == 'ne' ? howToReachNe : howToReachEn;
}

// Sample data for Nepal's historic places
List<HistoricPlace> getSamplePlaces() {
  return [
    HistoricPlace(
      id: '1',
      nameEn: 'Pashupatinath Temple',
      nameNe: 'पशुपतिनाथ मन्दिर',
      descriptionEn:
          'Pashupatinath Temple is a famous and sacred Hindu temple dedicated to Pashupatinath (Lord Shiva). It is located on the banks of the Bagmati River in Kathmandu, Nepal. The temple is one of the most significant Hindu temples in the world and is listed as a UNESCO World Heritage Site.',
      descriptionNe:
          'पशुपतिनाथ मन्दिर पशुपतिनाथ (भगवान शिव) लाई समर्पित एक प्रसिद्ध र पवित्र हिन्दू मन्दिर हो। यो नेपालको काठमाडौंमा बागमती नदीको किनारमा अवस्थित छ। यो मन्दिर विश्वका सबैभन्दा महत्त्वपूर्ण हिन्दू मन्दिरहरूमध्ये एक हो र यूनेस्को विश्व सम्पदा स्थलको रूपमा सूचीबद्ध छ।',
      latitude: 27.7109,
      longitude: 85.3484,
      category: 'temple',
      photoUrls: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pashupatinath_Temple.jpg/1200px-Pashupatinath_Temple.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Pashupatinath_temple_2.jpg/1200px-Pashupatinath_temple_2.jpg',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      audioUrl: 'https://example.com/audio/pashupatinath.mp3',
      openingHours: '4:00 AM - 12:00 PM, 5:00 PM - 9:00 PM',
      entryFee: 'NPR 1000 (Foreigners)',
      rating: 4.8,
      reviewCount: 2450,
      historicalPeriod: '5th Century AD',
      howToReachEn:
          'Located 5 km east of Kathmandu city center. Take bus from Ratna Park or hire a taxi.',
      howToReachNe:
          'काठमाडौं शहर केन्द्रबाट ५ किमी पूर्वमा अवस्थित। रत्नपार्कबाट बस लिनुहोस् वा ट्याक्सी भाडामा लिनुहोस्।',
      bestTimeToVisit: 'October to March',
      isFeatured: true,
      address: 'Pashupati Nath Road',
      city: 'Kathmandu',
      province: 'Bagmati',
    ),
    HistoricPlace(
      id: '2',
      nameEn: 'Boudhanath Stupa',
      nameNe: 'बौद्धनाथ स्तूप',
      descriptionEn:
          'Boudhanath is a stupa in Kathmandu, Nepal. Located about 11 km from the center and northeastern outskirts of Kathmandu, the stupa\'s massive mandala makes it one of the largest spherical stupas in Nepal. It is a UNESCO World Heritage Site.',
      descriptionNe:
          'बौद्धनाथ नेपालको काठमाडौंमा एक स्तूप हो। काठमाडौंको केन्द्रबाट लगभग ११ किमी र उत्तरपूर्वी बाहिरी भागमा अवस्थित, स्तूपको विशाल मण्डलले यसलाई नेपालका सबैभन्दा ठूला गोलाकार स्तूपहरूमध्ये एक बनाउँछ। यो यूनेस्को विश्व सम्पदा स्थल हो।',
      latitude: 27.7215,
      longitude: 85.3620,
      category: 'stupa',
      photoUrls: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Boudhanath_stupa.jpg/1200px-Boudhanath_stupa.jpg',
      ],
      openingHours: '6:00 AM - 9:00 PM',
      entryFee: 'NPR 400 (Foreigners)',
      rating: 4.9,
      reviewCount: 3200,
      historicalPeriod: '14th Century',
      isFeatured: true,
      address: 'Boudha',
      city: 'Kathmandu',
      province: 'Bagmati',
    ),
    HistoricPlace(
      id: '3',
      nameEn: 'Swayambhunath (Monkey Temple)',
      nameNe: 'स्वयम्भूनाथ (बाँदर मन्दिर)',
      descriptionEn:
          'Swayambhunath is an ancient religious complex atop a hill in the Kathmandu Valley. The Tibetan name for the site means "Sublime Trees" for the many varieties of trees found on the hill. It is also called the Monkey Temple as there are holy monkeys living in the north-west parts of the temple.',
      descriptionNe:
          'स्वयम्भूनाथ काठमाडौं उपत्यकाको एउटा पहाडको टुप्पोमा एक प्राचीन धार्मिक परिसर हो। साइटको तिब्बती नाम पहाडमा पाइने धेरै प्रकारका रूखहरूको लागि "उत्कृष्ट रूखहरू" भन्ने अर्थ राख्छ। यसलाई बाँदर मन्दिर पनि भनिन्छ किनभने मन्दिरको उत्तर-पश्चिम भागहरूमा पवित्र बाँदरहरू बस्छन्।',
      latitude: 27.7149,
      longitude: 85.2904,
      category: 'stupa',
      photoUrls: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Swayambhunath_stupa.jpg/1200px-Swayambhunath_stupa.jpg',
      ],
      openingHours: '5:00 AM - 8:00 PM',
      entryFee: 'NPR 200 (Foreigners)',
      rating: 4.7,
      reviewCount: 2800,
      historicalPeriod: '5th Century',
      isFeatured: true,
      address: 'Swayambhu',
      city: 'Kathmandu',
      province: 'Bagmati',
    ),
    HistoricPlace(
      id: '4',
      nameEn: 'Kathmandu Durbar Square',
      nameNe: 'काठमाडौं दरबार स्क्वायर',
      descriptionEn:
          'Kathmandu Durbar Square is in front of the old royal palace of the former Kathmandu Kingdom and is one of three Durbar Squares in the Kathmandu Valley. It is a UNESCO World Heritage Site.',
      descriptionNe:
          'काठमाडौं दरबार स्क्वायर पूर्व काठमाडौं राज्यको पुरानो राजदरबारको अगाडि छ र काठमाडौं उपत्यकाका तीन दरबार स्क्वायरहरूमध्ये एक हो। यो यूनेस्को विश्व सम्पदा स्थल हो।',
      latitude: 27.7045,
      longitude: 85.3065,
      category: 'durbar',
      photoUrls: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kathmandu_Durbar_Square.jpg/1200px-Kathmandu_Durbar_Square.jpg',
      ],
      openingHours: '7:00 AM - 7:00 PM',
      entryFee: 'NPR 1000 (Foreigners)',
      rating: 4.6,
      reviewCount: 1900,
      historicalPeriod: '12th-18th Century',
      isFeatured: true,
      address: 'Basantapur',
      city: 'Kathmandu',
      province: 'Bagmati',
    ),
    HistoricPlace(
      id: '5',
      nameEn: 'Patan Durbar Square',
      nameNe: 'पाटन दरबार स्क्वायर',
      descriptionEn:
          'Patan Durbar Square is situated at the centre of Lalitpur city. It is one of the three Durbar Squares in the Kathmandu Valley, all of which are UNESCO World Heritage Sites.',
      descriptionNe:
          'पाटन दरबार स्क्वायर ललितपुर शहरको केन्द्रमा अवस्थित छ। यो काठमाडौं उपत्यकाका तीन दरबार स्क्वायरहरूमध्ये एक हो, जुन सबै यूनेस्को विश्व सम्पदा स्थलहरू हुन्।',
      latitude: 27.6726,
      longitude: 85.3247,
      category: 'durbar',
      photoUrls: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Patan_Durbar_Square.jpg/1200px-Patan_Durbar_Square.jpg',
      ],
      openingHours: '7:00 AM - 7:00 PM',
      entryFee: 'NPR 1000 (Foreigners)',
      rating: 4.8,
      reviewCount: 2100,
      historicalPeriod: '12th-18th Century',
      isFeatured: false,
      address: 'Mangal Bazar',
      city: 'Lalitpur',
      province: 'Bagmati',
    ),
  ];
}
