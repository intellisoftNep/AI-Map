export type MunicipalityType =
  | 'metropolitan_city'
  | 'sub_metropolitan_city'
  | 'municipality'
  | 'rural_municipality';

export interface Municipality {
  id: string;
  nameEn: string;
  nameNe: string;
  districtId: string;
  type: MunicipalityType;
  centerLat: number;
  centerLng: number;
  zoomLevel: number;
}

export interface District {
  id: string;
  nameEn: string;
  nameNe: string;
  provinceId: number;
  municipalities: Municipality[];
}

export interface Province {
  id: number;
  nameEn: string;
  nameNe: string;
  districts: District[];
}

export const municipalityTypeLabel: Record<MunicipalityType, { en: string; ne: string; color: string }> = {
  metropolitan_city: { en: 'Metropolitan City', ne: 'महानगरपालिका', color: '#DC2626' },
  sub_metropolitan_city: { en: 'Sub-Metropolitan City', ne: 'उपमहानगरपालिका', color: '#EA580C' },
  municipality: { en: 'Municipality', ne: 'नगरपालिका', color: '#2563EB' },
  rural_municipality: { en: 'Rural Municipality', ne: 'गाउँपालिका', color: '#16A34A' },
};

export const nepalProvinces: Province[] = [
  {
    id: 1,
    nameEn: 'Koshi Province',
    nameNe: 'कोशी प्रदेश',
    districts: [
      {
        id: 'morang',
        nameEn: 'Morang',
        nameNe: 'मोरङ',
        provinceId: 1,
        municipalities: [
          { id: 'biratnagar', nameEn: 'Biratnagar Metropolitan City', nameNe: 'विराटनगर महानगरपालिका', districtId: 'morang', type: 'metropolitan_city', centerLat: 26.4525, centerLng: 87.2718, zoomLevel: 13 },
          { id: 'urlabari', nameEn: 'Urlabari Municipality', nameNe: 'उर्लाबारी नगरपालिका', districtId: 'morang', type: 'municipality', centerLat: 26.6333, centerLng: 87.4167, zoomLevel: 13 },
          { id: 'sundarharaicha', nameEn: 'Sundarharaicha Municipality', nameNe: 'सुन्दरहरैचा नगरपालिका', districtId: 'morang', type: 'municipality', centerLat: 26.5500, centerLng: 87.3500, zoomLevel: 13 },
          { id: 'letang', nameEn: 'Letang Municipality', nameNe: 'लेटाङ नगरपालिका', districtId: 'morang', type: 'municipality', centerLat: 26.7167, centerLng: 87.4833, zoomLevel: 13 },
          { id: 'belbari', nameEn: 'Belbari Municipality', nameNe: 'बेलबारी नगरपालिका', districtId: 'morang', type: 'municipality', centerLat: 26.6167, centerLng: 87.3833, zoomLevel: 13 },
          { id: 'pathari_shanischare', nameEn: 'Pathari Shanischare Municipality', nameNe: 'पथरी शनिश्चरे नगरपालिका', districtId: 'morang', type: 'municipality', centerLat: 26.7500, centerLng: 87.3167, zoomLevel: 13 },
          { id: 'budhiganga_rm', nameEn: 'Budhiganga Rural Municipality', nameNe: 'बुढीगंगा गाउँपालिका', districtId: 'morang', type: 'rural_municipality', centerLat: 26.8000, centerLng: 87.4500, zoomLevel: 13 },
          { id: 'dhanpalthan_rm', nameEn: 'Dhanpalthan Rural Municipality', nameNe: 'धनपालथान गाउँपालिका', districtId: 'morang', type: 'rural_municipality', centerLat: 26.8500, centerLng: 87.3500, zoomLevel: 13 },
        ],
      },
      {
        id: 'sunsari',
        nameEn: 'Sunsari',
        nameNe: 'सुनसरी',
        provinceId: 1,
        municipalities: [
          { id: 'itahari', nameEn: 'Itahari Sub-Metropolitan City', nameNe: 'इटहरी उपमहानगरपालिका', districtId: 'sunsari', type: 'sub_metropolitan_city', centerLat: 26.6647, centerLng: 87.2797, zoomLevel: 13 },
          { id: 'dharan', nameEn: 'Dharan Sub-Metropolitan City', nameNe: 'धरान उपमहानगरपालिका', districtId: 'sunsari', type: 'sub_metropolitan_city', centerLat: 26.8120, centerLng: 87.2836, zoomLevel: 13 },
          { id: 'inaruwa', nameEn: 'Inaruwa Municipality', nameNe: 'इनरुवा नगरपालिका', districtId: 'sunsari', type: 'municipality', centerLat: 26.5667, centerLng: 87.1500, zoomLevel: 13 },
          { id: 'duhabi', nameEn: 'Duhabi Municipality', nameNe: 'दुहबी नगरपालिका', districtId: 'sunsari', type: 'municipality', centerLat: 26.6833, centerLng: 87.1833, zoomLevel: 13 },
          { id: 'ramdhuni', nameEn: 'Ramdhuni Municipality', nameNe: 'रामधुनी नगरपालिका', districtId: 'sunsari', type: 'municipality', centerLat: 26.7500, centerLng: 87.2167, zoomLevel: 13 },
          { id: 'harinagar_rm', nameEn: 'Harinagar Rural Municipality', nameNe: 'हरिनगर गाउँपालिका', districtId: 'sunsari', type: 'rural_municipality', centerLat: 26.7833, centerLng: 87.1500, zoomLevel: 13 },
          { id: 'barju_rm', nameEn: 'Barju Rural Municipality', nameNe: 'बर्जु गाउँपालिका', districtId: 'sunsari', type: 'rural_municipality', centerLat: 26.8500, centerLng: 87.1833, zoomLevel: 13 },
        ],
      },
      {
        id: 'taplejung',
        nameEn: 'Taplejung',
        nameNe: 'ताप्लेजुङ',
        provinceId: 1,
        municipalities: [
          { id: 'phungling', nameEn: 'Phungling Municipality', nameNe: 'फुङलिङ नगरपालिका', districtId: 'taplejung', type: 'municipality', centerLat: 27.3564, centerLng: 87.6694, zoomLevel: 13 },
          { id: 'taplejung_rm', nameEn: 'Taplejung Rural Municipality', nameNe: 'ताप्लेजुङ गाउँपालिका', districtId: 'taplejung', type: 'rural_municipality', centerLat: 27.3500, centerLng: 87.6600, zoomLevel: 13 },
          { id: 'sirijangha_rm', nameEn: 'Sirijangha Rural Municipality', nameNe: 'सिरिजंघा गाउँपालिका', districtId: 'taplejung', type: 'rural_municipality', centerLat: 27.4000, centerLng: 87.7000, zoomLevel: 13 },
        ],
      },
    ],
  },
  {
    id: 2,
    nameEn: 'Madhesh Province',
    nameNe: 'मधेश प्रदेश',
    districts: [
      {
        id: 'dhanusha',
        nameEn: 'Dhanusha',
        nameNe: 'धनुषा',
        provinceId: 2,
        municipalities: [
          { id: 'janakpurdham', nameEn: 'Janakpurdham Sub-Metropolitan City', nameNe: 'जनकपुरधाम उपमहानगरपालिका', districtId: 'dhanusha', type: 'sub_metropolitan_city', centerLat: 26.7288, centerLng: 85.9240, zoomLevel: 13 },
          { id: 'mithila', nameEn: 'Mithila Municipality', nameNe: 'मिथिला नगरपालिका', districtId: 'dhanusha', type: 'municipality', centerLat: 26.7500, centerLng: 85.9500, zoomLevel: 13 },
          { id: 'dhanusadham', nameEn: 'Dhanusadham Municipality', nameNe: 'धनुषाधाम नगरपालिका', districtId: 'dhanusha', type: 'municipality', centerLat: 26.8000, centerLng: 85.9000, zoomLevel: 13 },
          { id: 'mithila_bihari', nameEn: 'Mithila Bihari Municipality', nameNe: 'मिथिला बिहारी नगरपालिका', districtId: 'dhanusha', type: 'municipality', centerLat: 26.7167, centerLng: 85.9833, zoomLevel: 13 },
          { id: 'ganeshman_charnath', nameEn: 'Ganeshman Charnath Municipality', nameNe: 'गणेशमान चारनाथ नगरपालिका', districtId: 'dhanusha', type: 'municipality', centerLat: 26.7833, centerLng: 85.9167, zoomLevel: 13 },
          { id: 'aaurahi_rm', nameEn: 'Aaurahi Rural Municipality', nameNe: 'औराही गाउँपालिका', districtId: 'dhanusha', type: 'rural_municipality', centerLat: 26.8333, centerLng: 85.8833, zoomLevel: 13 },
        ],
      },
      {
        id: 'saptari',
        nameEn: 'Saptari',
        nameNe: 'सप्तरी',
        provinceId: 2,
        municipalities: [
          { id: 'rajbiraj', nameEn: 'Rajbiraj Municipality', nameNe: 'राजविराज नगरपालिका', districtId: 'saptari', type: 'municipality', centerLat: 26.5400, centerLng: 86.7500, zoomLevel: 13 },
          { id: 'kanchanrup', nameEn: 'Kanchanrup Municipality', nameNe: 'कञ्चनरूप नगरपालिका', districtId: 'saptari', type: 'municipality', centerLat: 26.6167, centerLng: 86.8333, zoomLevel: 13 },
          { id: 'saptakoshi_rm', nameEn: 'Saptakoshi Rural Municipality', nameNe: 'सप्तकोशी गाउँपालिका', districtId: 'saptari', type: 'rural_municipality', centerLat: 26.7000, centerLng: 86.7000, zoomLevel: 13 },
        ],
      },
    ],
  },
  {
    id: 3,
    nameEn: 'Bagmati Province',
    nameNe: 'बागमती प्रदेश',
    districts: [
      {
        id: 'kathmandu',
        nameEn: 'Kathmandu',
        nameNe: 'काठमाडौं',
        provinceId: 3,
        municipalities: [
          { id: 'kathmandu_metro', nameEn: 'Kathmandu Metropolitan City', nameNe: 'काठमाडौं महानगरपालिका', districtId: 'kathmandu', type: 'metropolitan_city', centerLat: 27.7172, centerLng: 85.3240, zoomLevel: 13 },
          { id: 'kirtipur', nameEn: 'Kirtipur Municipality', nameNe: 'कीर्तिपुर नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.6833, centerLng: 85.2833, zoomLevel: 13 },
          { id: 'budhanilkantha', nameEn: 'Budhanilkantha Municipality', nameNe: 'बुढानीलकण्ठ नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.7833, centerLng: 85.3667, zoomLevel: 13 },
          { id: 'gokarneshwor', nameEn: 'Gokarneshwor Municipality', nameNe: 'गोकर्णेश्वर नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.7500, centerLng: 85.4000, zoomLevel: 13 },
          { id: 'nagarjun', nameEn: 'Nagarjun Municipality', nameNe: 'नागार्जुन नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.7333, centerLng: 85.2667, zoomLevel: 13 },
          { id: 'tarakeshwor', nameEn: 'Tarakeshwor Municipality', nameNe: 'तारकेश्वर नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.7667, centerLng: 85.2833, zoomLevel: 13 },
          { id: 'tokha', nameEn: 'Tokha Municipality', nameNe: 'टोखा नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.7667, centerLng: 85.3333, zoomLevel: 13 },
          { id: 'shankharapur', nameEn: 'Shankharapur Municipality', nameNe: 'शङ्खरापुर नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.7167, centerLng: 85.4667, zoomLevel: 13 },
          { id: 'kageshwori_manohara', nameEn: 'Kageshwori Manohara Municipality', nameNe: 'कागेश्वरी मनोहरा नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.7333, centerLng: 85.4000, zoomLevel: 13 },
          { id: 'chandragiri', nameEn: 'Chandragiri Municipality', nameNe: 'चन्द्रागिरि नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.6667, centerLng: 85.2333, zoomLevel: 13 },
          { id: 'dakshinkali', nameEn: 'Dakshinkali Municipality', nameNe: 'दक्षिणकाली नगरपालिका', districtId: 'kathmandu', type: 'municipality', centerLat: 27.6167, centerLng: 85.2500, zoomLevel: 13 },
        ],
      },
      {
        id: 'lalitpur',
        nameEn: 'Lalitpur',
        nameNe: 'ललितपुर',
        provinceId: 3,
        municipalities: [
          { id: 'lalitpur_metro', nameEn: 'Lalitpur Metropolitan City', nameNe: 'ललितपुर महानगरपालिका', districtId: 'lalitpur', type: 'metropolitan_city', centerLat: 27.6726, centerLng: 85.3247, zoomLevel: 13 },
          { id: 'godawari', nameEn: 'Godawari Municipality', nameNe: 'गोदावरी नगरपालिका', districtId: 'lalitpur', type: 'municipality', centerLat: 27.5833, centerLng: 85.3833, zoomLevel: 13 },
          { id: 'mahalaxmi', nameEn: 'Mahalaxmi Municipality', nameNe: 'महालक्ष्मी नगरपालिका', districtId: 'lalitpur', type: 'municipality', centerLat: 27.6333, centerLng: 85.4000, zoomLevel: 13 },
          { id: 'bagmati_rm_lalitpur', nameEn: 'Bagmati Rural Municipality', nameNe: 'बागमती गाउँपालिका', districtId: 'lalitpur', type: 'rural_municipality', centerLat: 27.5500, centerLng: 85.3000, zoomLevel: 13 },
          { id: 'konjyosom_rm', nameEn: 'Konjyosom Rural Municipality', nameNe: 'कोञ्ज्योसोम गाउँपालिका', districtId: 'lalitpur', type: 'rural_municipality', centerLat: 27.5167, centerLng: 85.2833, zoomLevel: 13 },
        ],
      },
      {
        id: 'bhaktapur',
        nameEn: 'Bhaktapur',
        nameNe: 'भक्तपुर',
        provinceId: 3,
        municipalities: [
          { id: 'bhaktapur_mun', nameEn: 'Bhaktapur Municipality', nameNe: 'भक्तपुर नगरपालिका', districtId: 'bhaktapur', type: 'municipality', centerLat: 27.6710, centerLng: 85.4298, zoomLevel: 14 },
          { id: 'madhyapur_thimi', nameEn: 'Madhyapur Thimi Municipality', nameNe: 'मध्यपुर थिमि नगरपालिका', districtId: 'bhaktapur', type: 'municipality', centerLat: 27.6833, centerLng: 85.3833, zoomLevel: 14 },
          { id: 'changunarayan', nameEn: 'Changunarayan Municipality', nameNe: 'चाँगुनारायण नगरपालिका', districtId: 'bhaktapur', type: 'municipality', centerLat: 27.7167, centerLng: 85.4500, zoomLevel: 14 },
          { id: 'suryabinayak', nameEn: 'Suryabinayak Municipality', nameNe: 'सूर्यबिनायक नगरपालिका', districtId: 'bhaktapur', type: 'municipality', centerLat: 27.6667, centerLng: 85.4333, zoomLevel: 14 },
        ],
      },
      {
        id: 'makwanpur',
        nameEn: 'Makwanpur',
        nameNe: 'मकवानपुर',
        provinceId: 3,
        municipalities: [
          { id: 'hetauda', nameEn: 'Hetauda Sub-Metropolitan City', nameNe: 'हेटौंडा उपमहानगरपालिका', districtId: 'makwanpur', type: 'sub_metropolitan_city', centerLat: 27.4167, centerLng: 85.0333, zoomLevel: 13 },
          { id: 'thaha', nameEn: 'Thaha Municipality', nameNe: 'थाहा नगरपालिका', districtId: 'makwanpur', type: 'municipality', centerLat: 27.5500, centerLng: 85.0833, zoomLevel: 13 },
          { id: 'bagmati_rm_makwanpur', nameEn: 'Bagmati Rural Municipality', nameNe: 'बागमती गाउँपालिका', districtId: 'makwanpur', type: 'rural_municipality', centerLat: 27.4833, centerLng: 84.9500, zoomLevel: 13 },
          { id: 'kailash_rm', nameEn: 'Kailash Rural Municipality', nameNe: 'कैलाश गाउँपालिका', districtId: 'makwanpur', type: 'rural_municipality', centerLat: 27.5000, centerLng: 85.1500, zoomLevel: 13 },
        ],
      },
    ],
  },
  {
    id: 4,
    nameEn: 'Gandaki Province',
    nameNe: 'गण्डकी प्रदेश',
    districts: [
      {
        id: 'kaski',
        nameEn: 'Kaski',
        nameNe: 'कास्की',
        provinceId: 4,
        municipalities: [
          { id: 'pokhara', nameEn: 'Pokhara Metropolitan City', nameNe: 'पोखरा महानगरपालिका', districtId: 'kaski', type: 'metropolitan_city', centerLat: 28.2096, centerLng: 83.9856, zoomLevel: 13 },
          { id: 'annapurna_rm', nameEn: 'Annapurna Rural Municipality', nameNe: 'अन्नपूर्ण गाउँपालिका', districtId: 'kaski', type: 'rural_municipality', centerLat: 28.3500, centerLng: 83.9000, zoomLevel: 13 },
          { id: 'machhapuchchhre_rm', nameEn: 'Machhapuchchhre Rural Municipality', nameNe: 'माछापुच्छ्रे गाउँपालिका', districtId: 'kaski', type: 'rural_municipality', centerLat: 28.2500, centerLng: 84.0500, zoomLevel: 13 },
          { id: 'madi_rm', nameEn: 'Madi Rural Municipality', nameNe: 'माडी गाउँपालिका', districtId: 'kaski', type: 'rural_municipality', centerLat: 28.1500, centerLng: 84.0000, zoomLevel: 13 },
          { id: 'rupa_rm', nameEn: 'Rupa Rural Municipality', nameNe: 'रूपा गाउँपालिका', districtId: 'kaski', type: 'rural_municipality', centerLat: 28.1833, centerLng: 84.0333, zoomLevel: 13 },
        ],
      },
      {
        id: 'gorkha',
        nameEn: 'Gorkha',
        nameNe: 'गोरखा',
        provinceId: 4,
        municipalities: [
          { id: 'gorkha_mun', nameEn: 'Gorkha Municipality', nameNe: 'गोरखा नगरपालिका', districtId: 'gorkha', type: 'municipality', centerLat: 28.0000, centerLng: 84.6333, zoomLevel: 13 },
          { id: 'palungtar', nameEn: 'Palungtar Municipality', nameNe: 'पालुङटार नगरपालिका', districtId: 'gorkha', type: 'municipality', centerLat: 27.9167, centerLng: 84.5833, zoomLevel: 13 },
          { id: 'arughat_rm', nameEn: 'Arughat Rural Municipality', nameNe: 'आरुघाट गाउँपालिका', districtId: 'gorkha', type: 'rural_municipality', centerLat: 28.1000, centerLng: 84.7500, zoomLevel: 13 },
          { id: 'tsum_nubri_rm', nameEn: 'Tsum Nubri Rural Municipality', nameNe: 'त्सुम नुब्री गाउँपालिका', districtId: 'gorkha', type: 'rural_municipality', centerLat: 28.5000, centerLng: 84.8000, zoomLevel: 12 },
        ],
      },
    ],
  },
  {
    id: 5,
    nameEn: 'Lumbini Province',
    nameNe: 'लुम्बिनी प्रदेश',
    districts: [
      {
        id: 'rupandehi',
        nameEn: 'Rupandehi',
        nameNe: 'रुपन्देही',
        provinceId: 5,
        municipalities: [
          { id: 'butwal', nameEn: 'Butwal Sub-Metropolitan City', nameNe: 'बुटवल उपमहानगरपालिका', districtId: 'rupandehi', type: 'sub_metropolitan_city', centerLat: 27.7000, centerLng: 83.4500, zoomLevel: 13 },
          { id: 'siddharthanagar', nameEn: 'Siddharthanagar Municipality', nameNe: 'सिद्धार्थनगर नगरपालिका', districtId: 'rupandehi', type: 'municipality', centerLat: 27.5000, centerLng: 83.4500, zoomLevel: 13 },
          { id: 'lumbini_sanskriti', nameEn: 'Lumbini Sanskriti Municipality', nameNe: 'लुम्बिनी सांस्कृतिक नगरपालिका', districtId: 'rupandehi', type: 'municipality', centerLat: 27.4833, centerLng: 83.2667, zoomLevel: 13 },
          { id: 'tilottama', nameEn: 'Tilottama Municipality', nameNe: 'तिलोत्तमा नगरपालिका', districtId: 'rupandehi', type: 'municipality', centerLat: 27.6500, centerLng: 83.4833, zoomLevel: 13 },
          { id: 'sainamaina', nameEn: 'Sainamaina Municipality', nameNe: 'सैनामैना नगरपालिका', districtId: 'rupandehi', type: 'municipality', centerLat: 27.6833, centerLng: 83.4167, zoomLevel: 13 },
          { id: 'omsatiya_rm', nameEn: 'Omsatiya Rural Municipality', nameNe: 'ओमसतिया गाउँपालिका', districtId: 'rupandehi', type: 'rural_municipality', centerLat: 27.5833, centerLng: 83.3500, zoomLevel: 13 },
        ],
      },
      {
        id: 'kapilvastu',
        nameEn: 'Kapilvastu',
        nameNe: 'कपिलवस्तु',
        provinceId: 5,
        municipalities: [
          { id: 'kapilvastu_mun', nameEn: 'Kapilvastu Municipality', nameNe: 'कपिलवस्तु नगरपालिका', districtId: 'kapilvastu', type: 'municipality', centerLat: 27.5667, centerLng: 83.0500, zoomLevel: 13 },
          { id: 'banganga', nameEn: 'Banganga Municipality', nameNe: 'बाणगंगा नगरपालिका', districtId: 'kapilvastu', type: 'municipality', centerLat: 27.6167, centerLng: 83.0833, zoomLevel: 13 },
          { id: 'krishnadevi_rm', nameEn: 'Krishnadevi Rural Municipality', nameNe: 'कृष्णादेवी गाउँपालिका', districtId: 'kapilvastu', type: 'rural_municipality', centerLat: 27.5000, centerLng: 83.0000, zoomLevel: 13 },
        ],
      },
    ],
  },
  {
    id: 6,
    nameEn: 'Karnali Province',
    nameNe: 'कर्णाली प्रदेश',
    districts: [
      {
        id: 'surkhet',
        nameEn: 'Surkhet',
        nameNe: 'सुर्खेत',
        provinceId: 6,
        municipalities: [
          { id: 'birendranagar', nameEn: 'Birendranagar Municipality', nameNe: 'वीरेन्द्रनगर नगरपालिका', districtId: 'surkhet', type: 'municipality', centerLat: 28.6000, centerLng: 81.6167, zoomLevel: 13 },
          { id: 'gurbhakot', nameEn: 'Gurbhakot Municipality', nameNe: 'गुर्भाकोट नगरपालिका', districtId: 'surkhet', type: 'municipality', centerLat: 28.5833, centerLng: 81.5833, zoomLevel: 13 },
          { id: 'panchapuri', nameEn: 'Panchapuri Municipality', nameNe: 'पञ्चपुरी नगरपालिका', districtId: 'surkhet', type: 'municipality', centerLat: 28.6333, centerLng: 81.6500, zoomLevel: 13 },
          { id: 'chaukune_rm', nameEn: 'Chaukune Rural Municipality', nameNe: 'चौकुने गाउँपालिका', districtId: 'surkhet', type: 'rural_municipality', centerLat: 28.6667, centerLng: 81.7000, zoomLevel: 13 },
          { id: 'simta_rm', nameEn: 'Simta Rural Municipality', nameNe: 'सिम्ता गाउँपालिका', districtId: 'surkhet', type: 'rural_municipality', centerLat: 28.5500, centerLng: 81.5500, zoomLevel: 13 },
        ],
      },
      {
        id: 'jumla',
        nameEn: 'Jumla',
        nameNe: 'जुम्ला',
        provinceId: 6,
        municipalities: [
          { id: 'chandannath', nameEn: 'Chandannath Municipality', nameNe: 'चन्दननाथ नगरपालिका', districtId: 'jumla', type: 'municipality', centerLat: 29.2833, centerLng: 82.1833, zoomLevel: 13 },
          { id: 'tatopani_rm', nameEn: 'Tatopani Rural Municipality', nameNe: 'तातोपानी गाउँपालिका', districtId: 'jumla', type: 'rural_municipality', centerLat: 29.2500, centerLng: 82.1500, zoomLevel: 13 },
          { id: 'hima_rm', nameEn: 'Hima Rural Municipality', nameNe: 'हिमा गाउँपालिका', districtId: 'jumla', type: 'rural_municipality', centerLat: 29.3500, centerLng: 82.2000, zoomLevel: 12 },
        ],
      },
    ],
  },
  {
    id: 7,
    nameEn: 'Sudurpashchim Province',
    nameNe: 'सुदूरपश्चिम प्रदेश',
    districts: [
      {
        id: 'kailali',
        nameEn: 'Kailali',
        nameNe: 'कैलाली',
        provinceId: 7,
        municipalities: [
          { id: 'dhangadhi', nameEn: 'Dhangadhi Sub-Metropolitan City', nameNe: 'धनगढी उपमहानगरपालिका', districtId: 'kailali', type: 'sub_metropolitan_city', centerLat: 28.6833, centerLng: 80.5833, zoomLevel: 13 },
          { id: 'tikapur', nameEn: 'Tikapur Municipality', nameNe: 'टीकापुर नगरपालिका', districtId: 'kailali', type: 'municipality', centerLat: 28.5167, centerLng: 81.1167, zoomLevel: 13 },
          { id: 'bhajani', nameEn: 'Bhajani Municipality', nameNe: 'भजनी नगरपालिका', districtId: 'kailali', type: 'municipality', centerLat: 28.6500, centerLng: 80.9167, zoomLevel: 13 },
          { id: 'gauriganga', nameEn: 'Gauriganga Municipality', nameNe: 'गौरीगंगा नगरपालिका', districtId: 'kailali', type: 'municipality', centerLat: 28.7167, centerLng: 80.7500, zoomLevel: 13 },
          { id: 'kailari_rm', nameEn: 'Kailari Rural Municipality', nameNe: 'कैलारी गाउँपालिका', districtId: 'kailali', type: 'rural_municipality', centerLat: 28.6000, centerLng: 80.7000, zoomLevel: 13 },
          { id: 'joshipur_rm', nameEn: 'Joshipur Rural Municipality', nameNe: 'जोशीपुर गाउँपालिका', districtId: 'kailali', type: 'rural_municipality', centerLat: 28.7500, centerLng: 80.6500, zoomLevel: 13 },
        ],
      },
      {
        id: 'kanchanpur',
        nameEn: 'Kanchanpur',
        nameNe: 'कञ्चनपुर',
        provinceId: 7,
        municipalities: [
          { id: 'mahendranagar', nameEn: 'Mahendranagar Municipality', nameNe: 'महेन्द्रनगर नगरपालिका', districtId: 'kanchanpur', type: 'municipality', centerLat: 28.9667, centerLng: 80.1833, zoomLevel: 13 },
          { id: 'bedkot', nameEn: 'Bedkot Municipality', nameNe: 'बेदकोट नगरपालिका', districtId: 'kanchanpur', type: 'municipality', centerLat: 29.0167, centerLng: 80.2500, zoomLevel: 13 },
          { id: 'krishnapur', nameEn: 'Krishnapur Municipality', nameNe: 'कृष्णपुर नगरपालिका', districtId: 'kanchanpur', type: 'municipality', centerLat: 28.9333, centerLng: 80.2167, zoomLevel: 13 },
          { id: 'shuklaphanta_rm', nameEn: 'Shuklaphanta Rural Municipality', nameNe: 'शुक्लाफाँटा गाउँपालिका', districtId: 'kanchanpur', type: 'rural_municipality', centerLat: 28.8500, centerLng: 80.2000, zoomLevel: 13 },
          { id: 'laljhadi_rm', nameEn: 'Laljhadi Rural Municipality', nameNe: 'लालझाडी गाउँपालिका', districtId: 'kanchanpur', type: 'rural_municipality', centerLat: 28.9000, centerLng: 80.1500, zoomLevel: 13 },
        ],
      },
    ],
  },
];

export function getAllMunicipalities(): Municipality[] {
  return nepalProvinces
    .flatMap(p => p.districts)
    .flatMap(d => d.municipalities);
}

export function getMunicipalitiesByProvince(provinceId: number): Municipality[] {
  return nepalProvinces
    .filter(p => p.id === provinceId)
    .flatMap(p => p.districts)
    .flatMap(d => d.municipalities);
}

export function getMunicipalitiesByDistrict(districtId: string): Municipality[] {
  return nepalProvinces
    .flatMap(p => p.districts)
    .filter(d => d.id === districtId)
    .flatMap(d => d.municipalities);
}

export function getAllDistricts(): District[] {
  return nepalProvinces.flatMap(p => p.districts);
}

export function getProvinceById(id: number): Province | undefined {
  return nepalProvinces.find(p => p.id === id);
}
