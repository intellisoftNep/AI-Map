/// Nepal Administrative Divisions
/// Provinces → Districts → Municipalities / Rural Municipalities

class Province {
  final int id;
  final String nameEn;
  final String nameNe;
  final List<District> districts;

  const Province({
    required this.id,
    required this.nameEn,
    required this.nameNe,
    required this.districts,
  });
}

class District {
  final String id;
  final String nameEn;
  final String nameNe;
  final int provinceId;
  final List<Municipality> municipalities;

  const District({
    required this.id,
    required this.nameEn,
    required this.nameNe,
    required this.provinceId,
    required this.municipalities,
  });
}

enum MunicipalityType {
  metropolitanCity,
  subMetropolitanCity,
  municipality,
  ruralMunicipality,
}

class Municipality {
  final String id;
  final String nameEn;
  final String nameNe;
  final String districtId;
  final MunicipalityType type;
  final double centerLat;
  final double centerLng;
  final double zoomLevel;

  const Municipality({
    required this.id,
    required this.nameEn,
    required this.nameNe,
    required this.districtId,
    required this.type,
    required this.centerLat,
    required this.centerLng,
    this.zoomLevel = 13.0,
  });

  String get typeLabel {
    switch (type) {
      case MunicipalityType.metropolitanCity:
        return 'Metropolitan City';
      case MunicipalityType.subMetropolitanCity:
        return 'Sub-Metropolitan City';
      case MunicipalityType.municipality:
        return 'Municipality';
      case MunicipalityType.ruralMunicipality:
        return 'Rural Municipality';
    }
  }

  String get typeLabelNe {
    switch (type) {
      case MunicipalityType.metropolitanCity:
        return 'महानगरपालिका';
      case MunicipalityType.subMetropolitanCity:
        return 'उपमहानगरपालिका';
      case MunicipalityType.municipality:
        return 'नगरपालिका';
      case MunicipalityType.ruralMunicipality:
        return 'गाउँपालिका';
    }
  }
}

// Nepal's complete administrative data (key municipalities)
final List<Province> nepalProvinces = [
  Province(
    id: 1,
    nameEn: 'Koshi Province',
    nameNe: 'कोशी प्रदेश',
    districts: [
      District(
        id: 'taplejung',
        nameEn: 'Taplejung',
        nameNe: 'ताप्लेजुङ',
        provinceId: 1,
        municipalities: [
          Municipality(
            id: 'phungling',
            nameEn: 'Phungling Municipality',
            nameNe: 'फुङलिङ नगरपालिका',
            districtId: 'taplejung',
            type: MunicipalityType.municipality,
            centerLat: 27.3564,
            centerLng: 87.6694,
          ),
          Municipality(
            id: 'taplejung_rm',
            nameEn: 'Taplejung Rural Municipality',
            nameNe: 'ताप्लेजुङ गाउँपालिका',
            districtId: 'taplejung',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 27.3500,
            centerLng: 87.6600,
          ),
        ],
      ),
      District(
        id: 'morang',
        nameEn: 'Morang',
        nameNe: 'मोरङ',
        provinceId: 1,
        municipalities: [
          Municipality(
            id: 'biratnagar',
            nameEn: 'Biratnagar Metropolitan City',
            nameNe: 'विराटनगर महानगरपालिका',
            districtId: 'morang',
            type: MunicipalityType.metropolitanCity,
            centerLat: 26.4525,
            centerLng: 87.2718,
            zoomLevel: 13,
          ),
          Municipality(
            id: 'urlabari',
            nameEn: 'Urlabari Municipality',
            nameNe: 'उर्लाबारी नगरपालिका',
            districtId: 'morang',
            type: MunicipalityType.municipality,
            centerLat: 26.6333,
            centerLng: 87.4167,
          ),
          Municipality(
            id: 'sundarharaicha',
            nameEn: 'Sundarharaicha Municipality',
            nameNe: 'सुन्दरहरैचा नगरपालिका',
            districtId: 'morang',
            type: MunicipalityType.municipality,
            centerLat: 26.5500,
            centerLng: 87.3500,
          ),
        ],
      ),
      District(
        id: 'sunsari',
        nameEn: 'Sunsari',
        nameNe: 'सुनसरी',
        provinceId: 1,
        municipalities: [
          Municipality(
            id: 'itahari',
            nameEn: 'Itahari Sub-Metropolitan City',
            nameNe: 'इटहरी उपमहानगरपालिका',
            districtId: 'sunsari',
            type: MunicipalityType.subMetropolitanCity,
            centerLat: 26.6647,
            centerLng: 87.2797,
          ),
          Municipality(
            id: 'dharan',
            nameEn: 'Dharan Sub-Metropolitan City',
            nameNe: 'धरान उपमहानगरपालिका',
            districtId: 'sunsari',
            type: MunicipalityType.subMetropolitanCity,
            centerLat: 26.8120,
            centerLng: 87.2836,
          ),
        ],
      ),
    ],
  ),
  Province(
    id: 2,
    nameEn: 'Madhesh Province',
    nameNe: 'मधेश प्रदेश',
    districts: [
      District(
        id: 'saptari',
        nameEn: 'Saptari',
        nameNe: 'सप्तरी',
        provinceId: 2,
        municipalities: [
          Municipality(
            id: 'rajbiraj',
            nameEn: 'Rajbiraj Municipality',
            nameNe: 'राजविराज नगरपालिका',
            districtId: 'saptari',
            type: MunicipalityType.municipality,
            centerLat: 26.5400,
            centerLng: 86.7500,
          ),
        ],
      ),
      District(
        id: 'siraha',
        nameEn: 'Siraha',
        nameNe: 'सिरहा',
        provinceId: 2,
        municipalities: [
          Municipality(
            id: 'siraha_mun',
            nameEn: 'Siraha Municipality',
            nameNe: 'सिरहा नगरपालिका',
            districtId: 'siraha',
            type: MunicipalityType.municipality,
            centerLat: 26.6500,
            centerLng: 86.2000,
          ),
          Municipality(
            id: 'lahan',
            nameEn: 'Lahan Municipality',
            nameNe: 'लहान नगरपालिका',
            districtId: 'siraha',
            type: MunicipalityType.municipality,
            centerLat: 26.7200,
            centerLng: 86.4800,
          ),
        ],
      ),
      District(
        id: 'janakpur',
        nameEn: 'Dhanusha',
        nameNe: 'धनुषा',
        provinceId: 2,
        municipalities: [
          Municipality(
            id: 'janakpurdham',
            nameEn: 'Janakpurdham Sub-Metropolitan City',
            nameNe: 'जनकपुरधाम उपमहानगरपालिका',
            districtId: 'janakpur',
            type: MunicipalityType.subMetropolitanCity,
            centerLat: 26.7288,
            centerLng: 85.9240,
            zoomLevel: 13,
          ),
        ],
      ),
    ],
  ),
  Province(
    id: 3,
    nameEn: 'Bagmati Province',
    nameNe: 'बागमती प्रदेश',
    districts: [
      District(
        id: 'kathmandu',
        nameEn: 'Kathmandu',
        nameNe: 'काठमाडौं',
        provinceId: 3,
        municipalities: [
          Municipality(
            id: 'kathmandu_metro',
            nameEn: 'Kathmandu Metropolitan City',
            nameNe: 'काठमाडौं महानगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.metropolitanCity,
            centerLat: 27.7172,
            centerLng: 85.3240,
            zoomLevel: 13,
          ),
          Municipality(
            id: 'kirtipur',
            nameEn: 'Kirtipur Municipality',
            nameNe: 'कीर्तिपुर नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.6833,
            centerLng: 85.2833,
          ),
          Municipality(
            id: 'budhanilkantha',
            nameEn: 'Budhanilkantha Municipality',
            nameNe: 'बुढानीलकण्ठ नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.7833,
            centerLng: 85.3667,
          ),
          Municipality(
            id: 'gokarneshwor',
            nameEn: 'Gokarneshwor Municipality',
            nameNe: 'गोकर्णेश्वर नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.7500,
            centerLng: 85.4000,
          ),
          Municipality(
            id: 'nagarjun',
            nameEn: 'Nagarjun Municipality',
            nameNe: 'नागार्जुन नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.7333,
            centerLng: 85.2667,
          ),
          Municipality(
            id: 'tarakeshwor',
            nameEn: 'Tarakeshwor Municipality',
            nameNe: 'तारकेश्वर नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.7667,
            centerLng: 85.2833,
          ),
          Municipality(
            id: 'tokha',
            nameEn: 'Tokha Municipality',
            nameNe: 'टोखा नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.7667,
            centerLng: 85.3333,
          ),
          Municipality(
            id: 'shankharapur',
            nameEn: 'Shankharapur Municipality',
            nameNe: 'शङ्खरापुर नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.7167,
            centerLng: 85.4667,
          ),
          Municipality(
            id: 'kageshwori_manohara',
            nameEn: 'Kageshwori Manohara Municipality',
            nameNe: 'कागेश्वरी मनोहरा नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.7333,
            centerLng: 85.4000,
          ),
          Municipality(
            id: 'chandragiri',
            nameEn: 'Chandragiri Municipality',
            nameNe: 'चन्द्रागिरि नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.6667,
            centerLng: 85.2333,
          ),
          Municipality(
            id: 'dakshinkali',
            nameEn: 'Dakshinkali Municipality',
            nameNe: 'दक्षिणकाली नगरपालिका',
            districtId: 'kathmandu',
            type: MunicipalityType.municipality,
            centerLat: 27.6167,
            centerLng: 85.2500,
          ),
        ],
      ),
      District(
        id: 'lalitpur',
        nameEn: 'Lalitpur',
        nameNe: 'ललितपुर',
        provinceId: 3,
        municipalities: [
          Municipality(
            id: 'lalitpur_metro',
            nameEn: 'Lalitpur Metropolitan City',
            nameNe: 'ललितपुर महानगरपालिका',
            districtId: 'lalitpur',
            type: MunicipalityType.metropolitanCity,
            centerLat: 27.6726,
            centerLng: 85.3247,
            zoomLevel: 13,
          ),
          Municipality(
            id: 'godawari',
            nameEn: 'Godawari Municipality',
            nameNe: 'गोदावरी नगरपालिका',
            districtId: 'lalitpur',
            type: MunicipalityType.municipality,
            centerLat: 27.5833,
            centerLng: 85.3833,
          ),
          Municipality(
            id: 'mahalaxmi',
            nameEn: 'Mahalaxmi Municipality',
            nameNe: 'महालक्ष्मी नगरपालिका',
            districtId: 'lalitpur',
            type: MunicipalityType.municipality,
            centerLat: 27.6333,
            centerLng: 85.4000,
          ),
          Municipality(
            id: 'bagmati_rm',
            nameEn: 'Bagmati Rural Municipality',
            nameNe: 'बागमती गाउँपालिका',
            districtId: 'lalitpur',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 27.5500,
            centerLng: 85.3000,
          ),
          Municipality(
            id: 'konjyosom_rm',
            nameEn: 'Konjyosom Rural Municipality',
            nameNe: 'कोञ्ज्योसोम गाउँपालिका',
            districtId: 'lalitpur',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 27.5167,
            centerLng: 85.2833,
          ),
        ],
      ),
      District(
        id: 'bhaktapur',
        nameEn: 'Bhaktapur',
        nameNe: 'भक्तपुर',
        provinceId: 3,
        municipalities: [
          Municipality(
            id: 'bhaktapur_mun',
            nameEn: 'Bhaktapur Municipality',
            nameNe: 'भक्तपुर नगरपालिका',
            districtId: 'bhaktapur',
            type: MunicipalityType.municipality,
            centerLat: 27.6710,
            centerLng: 85.4298,
            zoomLevel: 14,
          ),
          Municipality(
            id: 'madhyapur_thimi',
            nameEn: 'Madhyapur Thimi Municipality',
            nameNe: 'मध्यपुर थिमि नगरपालिका',
            districtId: 'bhaktapur',
            type: MunicipalityType.municipality,
            centerLat: 27.6833,
            centerLng: 85.3833,
          ),
          Municipality(
            id: 'changunarayan',
            nameEn: 'Changunarayan Municipality',
            nameNe: 'चाँगुनारायण नगरपालिका',
            districtId: 'bhaktapur',
            type: MunicipalityType.municipality,
            centerLat: 27.7167,
            centerLng: 85.4500,
          ),
          Municipality(
            id: 'suryabinayak',
            nameEn: 'Suryabinayak Municipality',
            nameNe: 'सूर्यबिनायक नगरपालिका',
            districtId: 'bhaktapur',
            type: MunicipalityType.municipality,
            centerLat: 27.6667,
            centerLng: 85.4333,
          ),
        ],
      ),
      District(
        id: 'makwanpur',
        nameEn: 'Makwanpur',
        nameNe: 'मकवानपुर',
        provinceId: 3,
        municipalities: [
          Municipality(
            id: 'hetauda',
            nameEn: 'Hetauda Sub-Metropolitan City',
            nameNe: 'हेटौंडा उपमहानगरपालिका',
            districtId: 'makwanpur',
            type: MunicipalityType.subMetropolitanCity,
            centerLat: 27.4167,
            centerLng: 85.0333,
          ),
          Municipality(
            id: 'thaha',
            nameEn: 'Thaha Municipality',
            nameNe: 'थाहा नगरपालिका',
            districtId: 'makwanpur',
            type: MunicipalityType.municipality,
            centerLat: 27.5500,
            centerLng: 85.0833,
          ),
          Municipality(
            id: 'bagmati_rm_makwanpur',
            nameEn: 'Bagmati Rural Municipality',
            nameNe: 'बागमती गाउँपालिका',
            districtId: 'makwanpur',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 27.4833,
            centerLng: 84.9500,
          ),
        ],
      ),
    ],
  ),
  Province(
    id: 4,
    nameEn: 'Gandaki Province',
    nameNe: 'गण्डकी प्रदेश',
    districts: [
      District(
        id: 'kaski',
        nameEn: 'Kaski',
        nameNe: 'कास्की',
        provinceId: 4,
        municipalities: [
          Municipality(
            id: 'pokhara',
            nameEn: 'Pokhara Metropolitan City',
            nameNe: 'पोखरा महानगरपालिका',
            districtId: 'kaski',
            type: MunicipalityType.metropolitanCity,
            centerLat: 28.2096,
            centerLng: 83.9856,
            zoomLevel: 13,
          ),
          Municipality(
            id: 'annapurna_rm',
            nameEn: 'Annapurna Rural Municipality',
            nameNe: 'अन्नपूर्ण गाउँपालिका',
            districtId: 'kaski',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 28.3500,
            centerLng: 83.9000,
          ),
          Municipality(
            id: 'machhapuchchhre_rm',
            nameEn: 'Machhapuchchhre Rural Municipality',
            nameNe: 'माछापुच्छ्रे गाउँपालिका',
            districtId: 'kaski',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 28.2500,
            centerLng: 84.0500,
          ),
          Municipality(
            id: 'madi_rm',
            nameEn: 'Madi Rural Municipality',
            nameNe: 'माडी गाउँपालिका',
            districtId: 'kaski',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 28.1500,
            centerLng: 84.0000,
          ),
          Municipality(
            id: 'rupa_rm',
            nameEn: 'Rupa Rural Municipality',
            nameNe: 'रूपा गाउँपालिका',
            districtId: 'kaski',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 28.1833,
            centerLng: 84.0333,
          ),
        ],
      ),
      District(
        id: 'gorkha',
        nameEn: 'Gorkha',
        nameNe: 'गोरखा',
        provinceId: 4,
        municipalities: [
          Municipality(
            id: 'gorkha_mun',
            nameEn: 'Gorkha Municipality',
            nameNe: 'गोरखा नगरपालिका',
            districtId: 'gorkha',
            type: MunicipalityType.municipality,
            centerLat: 28.0000,
            centerLng: 84.6333,
          ),
          Municipality(
            id: 'palungtar',
            nameEn: 'Palungtar Municipality',
            nameNe: 'पालुङटार नगरपालिका',
            districtId: 'gorkha',
            type: MunicipalityType.municipality,
            centerLat: 27.9167,
            centerLng: 84.5833,
          ),
        ],
      ),
    ],
  ),
  Province(
    id: 5,
    nameEn: 'Lumbini Province',
    nameNe: 'लुम्बिनी प्रदेश',
    districts: [
      District(
        id: 'rupandehi',
        nameEn: 'Rupandehi',
        nameNe: 'रुपन्देही',
        provinceId: 5,
        municipalities: [
          Municipality(
            id: 'butwal',
            nameEn: 'Butwal Sub-Metropolitan City',
            nameNe: 'बुटवल उपमहानगरपालिका',
            districtId: 'rupandehi',
            type: MunicipalityType.subMetropolitanCity,
            centerLat: 27.7000,
            centerLng: 83.4500,
          ),
          Municipality(
            id: 'siddharthanagar',
            nameEn: 'Siddharthanagar Municipality',
            nameNe: 'सिद्धार्थनगर नगरपालिका',
            districtId: 'rupandehi',
            type: MunicipalityType.municipality,
            centerLat: 27.5000,
            centerLng: 83.4500,
          ),
          Municipality(
            id: 'lumbini_sanskriti',
            nameEn: 'Lumbini Sanskriti Municipality',
            nameNe: 'लुम्बिनी सांस्कृतिक नगरपालिका',
            districtId: 'rupandehi',
            type: MunicipalityType.municipality,
            centerLat: 27.4833,
            centerLng: 83.2667,
          ),
        ],
      ),
      District(
        id: 'kapilvastu',
        nameEn: 'Kapilvastu',
        nameNe: 'कपिलवस्तु',
        provinceId: 5,
        municipalities: [
          Municipality(
            id: 'kapilvastu_mun',
            nameEn: 'Kapilvastu Municipality',
            nameNe: 'कपिलवस्तु नगरपालिका',
            districtId: 'kapilvastu',
            type: MunicipalityType.municipality,
            centerLat: 27.5667,
            centerLng: 83.0500,
          ),
          Municipality(
            id: 'banganga',
            nameEn: 'Banganga Municipality',
            nameNe: 'बाणगंगा नगरपालिका',
            districtId: 'kapilvastu',
            type: MunicipalityType.municipality,
            centerLat: 27.6167,
            centerLng: 83.0833,
          ),
        ],
      ),
    ],
  ),
  Province(
    id: 6,
    nameEn: 'Karnali Province',
    nameNe: 'कर्णाली प्रदेश',
    districts: [
      District(
        id: 'surkhet',
        nameEn: 'Surkhet',
        nameNe: 'सुर्खेत',
        provinceId: 6,
        municipalities: [
          Municipality(
            id: 'birendranagar',
            nameEn: 'Birendranagar Municipality',
            nameNe: 'वीरेन्द्रनगर नगरपालिका',
            districtId: 'surkhet',
            type: MunicipalityType.municipality,
            centerLat: 28.6000,
            centerLng: 81.6167,
          ),
          Municipality(
            id: 'gurbhakot',
            nameEn: 'Gurbhakot Municipality',
            nameNe: 'गुर्भाकोट नगरपालिका',
            districtId: 'surkhet',
            type: MunicipalityType.municipality,
            centerLat: 28.5833,
            centerLng: 81.5833,
          ),
          Municipality(
            id: 'panchapuri',
            nameEn: 'Panchapuri Municipality',
            nameNe: 'पञ्चपुरी नगरपालिका',
            districtId: 'surkhet',
            type: MunicipalityType.municipality,
            centerLat: 28.6333,
            centerLng: 81.6500,
          ),
        ],
      ),
      District(
        id: 'jumla',
        nameEn: 'Jumla',
        nameNe: 'जुम्ला',
        provinceId: 6,
        municipalities: [
          Municipality(
            id: 'chandannath',
            nameEn: 'Chandannath Municipality',
            nameNe: 'चन्दननाथ नगरपालिका',
            districtId: 'jumla',
            type: MunicipalityType.municipality,
            centerLat: 29.2833,
            centerLng: 82.1833,
          ),
          Municipality(
            id: 'tatopani_rm',
            nameEn: 'Tatopani Rural Municipality',
            nameNe: 'तातोपानी गाउँपालिका',
            districtId: 'jumla',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 29.2500,
            centerLng: 82.1500,
          ),
        ],
      ),
    ],
  ),
  Province(
    id: 7,
    nameEn: 'Sudurpashchim Province',
    nameNe: 'सुदूरपश्चिम प्रदेश',
    districts: [
      District(
        id: 'kailali',
        nameEn: 'Kailali',
        nameNe: 'कैलाली',
        provinceId: 7,
        municipalities: [
          Municipality(
            id: 'dhangadhi',
            nameEn: 'Dhangadhi Sub-Metropolitan City',
            nameNe: 'धनगढी उपमहानगरपालिका',
            districtId: 'kailali',
            type: MunicipalityType.subMetropolitanCity,
            centerLat: 28.6833,
            centerLng: 80.5833,
          ),
          Municipality(
            id: 'tikapur',
            nameEn: 'Tikapur Municipality',
            nameNe: 'टीकापुर नगरपालिका',
            districtId: 'kailali',
            type: MunicipalityType.municipality,
            centerLat: 28.5167,
            centerLng: 81.1167,
          ),
          Municipality(
            id: 'bhajani',
            nameEn: 'Bhajani Municipality',
            nameNe: 'भजनी नगरपालिका',
            districtId: 'kailali',
            type: MunicipalityType.municipality,
            centerLat: 28.6500,
            centerLng: 80.9167,
          ),
          Municipality(
            id: 'gauriganga',
            nameEn: 'Gauriganga Municipality',
            nameNe: 'गौरीगंगा नगरपालिका',
            districtId: 'kailali',
            type: MunicipalityType.municipality,
            centerLat: 28.7167,
            centerLng: 80.7500,
          ),
          Municipality(
            id: 'kailari_rm',
            nameEn: 'Kailari Rural Municipality',
            nameNe: 'कैलारी गाउँपालिका',
            districtId: 'kailali',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 28.6000,
            centerLng: 80.7000,
          ),
        ],
      ),
      District(
        id: 'kanchanpur',
        nameEn: 'Kanchanpur',
        nameNe: 'कञ्चनपुर',
        provinceId: 7,
        municipalities: [
          Municipality(
            id: 'mahendranagar',
            nameEn: 'Mahendranagar Municipality',
            nameNe: 'महेन्द्रनगर नगरपालिका',
            districtId: 'kanchanpur',
            type: MunicipalityType.municipality,
            centerLat: 28.9667,
            centerLng: 80.1833,
          ),
          Municipality(
            id: 'bedkot',
            nameEn: 'Bedkot Municipality',
            nameNe: 'बेदकोट नगरपालिका',
            districtId: 'kanchanpur',
            type: MunicipalityType.municipality,
            centerLat: 29.0167,
            centerLng: 80.2500,
          ),
          Municipality(
            id: 'krishnapur',
            nameEn: 'Krishnapur Municipality',
            nameNe: 'कृष्णपुर नगरपालिका',
            districtId: 'kanchanpur',
            type: MunicipalityType.municipality,
            centerLat: 28.9333,
            centerLng: 80.2167,
          ),
          Municipality(
            id: 'shuklaphanta_rm',
            nameEn: 'Shuklaphanta Rural Municipality',
            nameNe: 'शुक्लाफाँटा गाउँपालिका',
            districtId: 'kanchanpur',
            type: MunicipalityType.ruralMunicipality,
            centerLat: 28.8500,
            centerLng: 80.2000,
          ),
        ],
      ),
    ],
  ),
];

// Helper to get all municipalities flat
List<Municipality> getAllMunicipalities() {
  return nepalProvinces
      .expand((p) => p.districts)
      .expand((d) => d.municipalities)
      .toList();
}

// Helper to get municipalities by province
List<Municipality> getMunicipalitiesByProvince(int provinceId) {
  return nepalProvinces
      .where((p) => p.id == provinceId)
      .expand((p) => p.districts)
      .expand((d) => d.municipalities)
      .toList();
}

// Helper to get municipalities by district
List<Municipality> getMunicipalitiesByDistrict(String districtId) {
  return nepalProvinces
      .expand((p) => p.districts)
      .where((d) => d.id == districtId)
      .expand((d) => d.municipalities)
      .toList();
}

// Get all districts
List<District> getAllDistricts() {
  return nepalProvinces.expand((p) => p.districts).toList();
}
