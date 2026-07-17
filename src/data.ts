import { TravelLog, Passport, VisaRequirement, TravelerProfile, TravelerType } from './types';

// Supported Passports in Simulator
export const SIMULATOR_PASSPORTS: Passport[] = [
  { id: 'p1', name: 'Türkiye Pasaportu', countryCode: 'TR', color: 'burgundy', flag: '🇹🇷' },
  { id: 'p2', name: 'ABD Pasaportu', countryCode: 'US', color: 'navy', flag: '🇺🇸' },
  { id: 'p3', name: 'Almanya Pasaportu', countryCode: 'DE', color: 'burgundy', flag: '🇩🇪' },
  { id: 'p4', name: 'Azerbaycan Pasaportu', countryCode: 'AZ', color: 'blue', flag: '🇦🇿' },
];

// Target Countries in Simulator
export interface DestinationCountry {
  code: string;
  name: string;
  isSchengen: boolean;
  flag: string;
}

export const DESTINATION_COUNTRIES: DestinationCountry[] = [
  { code: 'DE', name: 'Almanya', isSchengen: true, flag: '🇩🇪' },
  { code: 'FR', name: 'Fransa', isSchengen: true, flag: '🇫🇷' },
  { code: 'IT', name: 'İtalya', isSchengen: true, flag: '🇮🇹' },
  { code: 'ES', name: 'İspanya', isSchengen: true, flag: '🇪🇸' },
  { code: 'GR', name: 'Yunanistan', isSchengen: true, flag: '🇬🇷' },
  { code: 'TH', name: 'Tayland', isSchengen: false, flag: '🇹🇭' },
  { code: 'ID', name: 'Endonezya (Bali)', isSchengen: false, flag: '🇮🇩' },
  { code: 'JP', name: 'Japonya', isSchengen: false, flag: '🇯🇵' },
  { code: 'ME', name: 'Karadağ', isSchengen: false, flag: '🇲🇪' },
  { code: 'UK', name: 'Birleşik Krallık', isSchengen: false, flag: '🇬🇧' },
  { code: 'US', name: 'Amerika Birleşik Devletleri', isSchengen: false, flag: '🇺🇸' },
  { code: 'TR', name: 'Türkiye', isSchengen: false, flag: '🇹🇷' },
];

// Visa requirement index by Passport_Destination
export const VISA_REQUIREMENTS_DB: Record<string, Omit<VisaRequirement, 'destinationCode' | 'destinationName'>> = {
  // --- TR Pasaportu ---
  'TR_DE': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Bordo pasaport sahipleri için Schengen vizesi gereklidir. Yeşil (Hususi) pasaportlar 180 günde 90 gün muaftır.' },
  'TR_FR': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Schengen vizesi gereklidir. Başvuru aracı kurumlar üzerinden konsolosluğa yapılır.' },
  'TR_IT': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Schengen vizesi gereklidir. Seyahat amacına uygun belgeler ve seyahat sigortası sunulmalıdır.' },
  'TR_ES': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Schengen vizesi gereklidir. Seyahat tarihinden en az 1 ay önce başvuru tavsiye edilir.' },
  'TR_GR': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Schengen vizesi veya bazı Ege adaları için sezonsal "Kapıda Kolaylaştırılmış Vize" programı mevcuttur.' },
  'TR_TH': { requirement: 'visa-free', durationText: '30 Gün Muafiyet', details: 'Tayland turistik seyahatlerde 30 güne kadar vize istemez. Girişte ücretsiz damga vurulur.' },
  'TR_ID': { requirement: 'visa-on-arrival', durationText: '30 Gün Kapıda Vize', details: 'Kapıda Vize (VoA) veya online e-VoA sistemi ile 35 USD karşılığı alınır. +30 gün uzatılabilir.' },
  'TR_JP': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Japonya turistik ziyaretlerde 90 güne kadar vizesizdir. Dönüş bileti ve otel rezervasyonu sorgulanabilir.' },
  'TR_ME': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Karadağ, 180 gün içinde 90 günü aşmamak kaydıyla Türk vatandaşlarından vize talep etmez.' },
  'TR_UK': { requirement: 'visa-required', durationText: 'İngiltere Vizesi', details: 'Birleşik Krallık vizesi gereklidir. Schengen vizesi burada geçerli değildir.' },
  'TR_US': { requirement: 'visa-required', durationText: 'ABD B1/B2 Vizesi', details: 'ABD vizesi gereklidir. Ankara veya İstanbul konsolosluklarında yüz yüze mülakat şarttır.' },
  'TR_TR': { requirement: 'visa-free', durationText: 'Sınırsız', details: 'Kendi ülkeniz. Herhangi bir süre sınırı olmadan serbestçe kalabilirsiniz.' },

  // --- US Pasaportu ---
  'US_DE': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Schengen bölgesinde 180 gün içinde 90 gün vizesiz seyahat hakkı. Yakında ETIAS kaydı zorunlu olacaktır.' },
  'US_FR': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Schengen alanında 180 gün içinde 90 gün serbest seyahat hakkı.' },
  'US_IT': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Turistik ve iş seyahatlerinde 180 günde 90 gün vize muafiyeti.' },
  'US_ES': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'İspanya ve tüm Schengen alanında 90 güne kadar vizesiz kalış.' },
  'US_GR': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Yunanistan ve adalarında 180 günde 90 gün vize muafiyeti.' },
  'US_TH': { requirement: 'visa-free', durationText: '30 Gün Muafiyet', details: 'Turistik amaçlı seyahatlerde 30 güne kadar vize istenmez.' },
  'US_ID': { requirement: 'visa-on-arrival', durationText: '30 Gün Kapıda Vize', details: 'Cakarta veya Bali havalimanlarında 35 USD karşılığı kapıda vize alınabilir.' },
  'US_JP': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Japonya seyahatlerinde 90 güne kadar vize muafiyeti mevcuttur.' },
  'US_ME': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Karadağ\'da 90 güne kadar vizesiz konaklama mümkündür.' },
  'US_UK': { requirement: 'visa-free', durationText: '6 Ay Muafiyet', details: 'Birleşik Krallık turistik seyahatlerde ABD vatandaşlarına 6 aya kadar vize muafiyeti tanır.' },
  'US_US': { requirement: 'visa-free', durationText: 'Sınırsız', details: 'Kendi ülkeniz. Herhangi bir süre sınırı bulunmamaktadır.' },
  'US_TR': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'ABD vatandaşları için Türkiye seyahatlerinde e-Vize şartı kaldırılmıştır, 90 gün vizesizdir!' },

  // --- DE Pasaportu ---
  'DE_DE': { requirement: 'visa-free', durationText: 'Sınırsız', details: 'Kendi ülkeniz veya AB üyesi olarak serbest dolaşım ve yerleşim hakkı.' },
  'DE_FR': { requirement: 'visa-free', durationText: 'Sınırsız', details: 'Avrupa Birliği serbest dolaşım hakkı kapsamında sınırsız kalış ve çalışma hakkı.' },
  'DE_IT': { requirement: 'visa-free', durationText: 'Sınırsız', details: 'AB vatandaşı olarak İtalya\'da serbestçe seyahat edin, yerleşin ve çalışın.' },
  'DE_ES': { requirement: 'visa-free', durationText: 'Sınırsız', details: 'AB serbest dolaşım kuralları geçerlidir. 3 aydan fazla kalışta yerel kayıt gerekir.' },
  'DE_GR': { requirement: 'visa-free', durationText: 'Sınırsız', details: 'Avrupa Birliği serbest dolaşımı kapsamında sınırsız turistik kalış.' },
  'DE_TH': { requirement: 'visa-free', durationText: '30 Gün Muafiyet', details: 'Tayland\'a girişte 30 günlük ücretsiz vize muafiyet damgası vurulur.' },
  'DE_ID': { requirement: 'visa-on-arrival', durationText: '30 Gün Kapıda Vize', details: 'Girişte 35 USD karşılığında kapıda vize (VoA) alınabilir veya online başvurulabilir.' },
  'DE_JP': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Japonya ve Almanya arasındaki anlaşmalarla 90 güne kadar vizesiz seyahat.' },
  'DE_ME': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Karadağ\'a kimlik kartı veya pasaport ile 90 güne kadar vizesiz giriş.' },
  'DE_UK': { requirement: 'visa-free', durationText: '6 Ay Muafiyet', details: 'Brexit sonrası dahi turistik amaçlı ziyaretlerde 6 aya kadar vizesiz kalış hakkı korundu.' },
  'DE_US': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'ESTA (Vize Muafiyet Programı) ile seyahatten en az 72 saat önce online onay alınmalıdır.' },
  'DE_TR': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Almanya vatandaşları Türkiye\'ye pasaportsuz, sadece ulusal kimlik kartlarıyla dahi girebilir.' },

  // --- AZ Pasaportu ---
  'AZ_DE': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Azerbaycan vatandaşları için Schengen vizesi gereklidir.' },
  'AZ_FR': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Schengen vizesi gereklidir. Konsolosluk veya vize merkezinden başvuru yapılır.' },
  'AZ_IT': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Schengen vizesi gereklidir. Biyometrik randevu alınmalıdır.' },
  'AZ_ES': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'İspanya Schengen vizesi gereklidir.' },
  'AZ_GR': { requirement: 'visa-required', durationText: 'Schengen Vizesi', details: 'Yunanistan vizesi gereklidir.' },
  'AZ_TH': { requirement: 'visa-on-arrival', durationText: '15 Gün Kapıda Vize', details: 'Tayland havalimanlarında 15 güne kadar Kapıda Vize (VoA) alınabilir. Ücrete tabidir.' },
  'AZ_ID': { requirement: 'visa-on-arrival', durationText: '30 Gün Kapıda Vize', details: 'Endonezya havalimanlarında 35 USD karşılığı kapıda vize (e-VoA) alınabilir.' },
  'AZ_JP': { requirement: 'visa-required', durationText: 'Japonya Vizesi', details: 'Azerbaycan vatandaşları için vize gereklidir. Vize başvurusu ücretsizdir ancak belge ibrazı şarttır.' },
  'AZ_ME': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Karadağ turistik seyahatler için 90 güne kadar vize muafiyeti sunmaktadır.' },
  'AZ_UK': { requirement: 'visa-required', durationText: 'İngiltere Vizesi', details: 'Birleşik Krallık vizesi gereklidir. Bakü\'deki vize merkezinden başvuru yapılır.' },
  'AZ_US': { requirement: 'visa-required', durationText: 'ABD Vizesi', details: 'ABD Konsolosluğu üzerinden yüz yüze mülakat ile vize alınmalıdır.' },
  'AZ_TR': { requirement: 'visa-free', durationText: '90 Gün Muafiyet', details: 'Türkiye ile Azerbaycan arasında 90 gün vizesiz seyahat anlaşması vardır. Kimlikle seyahat mümkündür.' },
};

// Default Profiles for the Simulator
export const TRAVELER_PROFILES: Record<TravelerType, TravelerProfile> = {
  nomad: {
    id: 'nomad',
    title: 'Dijital Göçebe (Digital Nomad)',
    subtitle: 'Sürekli seyahat eden, Schengen sınırlarında dolaşan uzaktan çalışan.',
    description: 'Schengen alanında kalış sınırlarını (90/180) aşmamak için sürekli Asya, Balkanlar ve Avrupa arasında mekik dokur. Tayland ve Bali vazgeçilmezidir.',
    badge: 'Sınır Tanımaz',
    initialPassports: [
      { id: 'p1', name: 'Türkiye Pasaportu', countryCode: 'TR', color: 'burgundy', flag: '🇹🇷' }
    ],
    initialTravels: [
      { id: 't1', countryCode: 'FR', countryName: 'Fransa', entryDate: '2026-01-10', exitDate: '2026-02-15', isSchengen: true }, // 37 gün
      { id: 't2', countryCode: 'TH', countryName: 'Tayland', entryDate: '2026-02-20', exitDate: '2026-03-25', isSchengen: false }, // Schengen dışı
      { id: 't3', countryCode: 'IT', countryName: 'İtalya', entryDate: '2026-04-01', exitDate: '2026-05-10', isSchengen: true },  // 40 gün (Schengen toplamı: 77 gün)
      { id: 't4', countryCode: 'ME', countryName: 'Karadağ', entryDate: '2026-05-15', exitDate: '2026-06-30', isSchengen: false }, // Schengen dışı kalarak limit sıfırlama süreci
      { id: 't5', countryCode: 'ES', countryName: 'İspanya', entryDate: '2026-07-05', exitDate: '2026-07-15', isSchengen: true },  // 11 gün daha (Şu an İspanya'da)
    ]
  },
  tourist: {
    id: 'tourist',
    title: 'Sık Seyahat Eden Gezgin (Avrupa Kaşifi)',
    subtitle: 'Kısa süreli ama sık sık Avrupa\'ya tatile giden kültür aşığı.',
    description: 'Yıl içerisinde bayram tatilleri, yıllık izinler ve hafta sonu kaçamaklarıyla Avrupa\'nın farklı şehirlerini keşfeder. 90 gün kuralını hiç ihlal etmez ama her seferinde ne kadar hakkı kaldığını merak eder.',
    badge: 'Kaşif',
    initialPassports: [
      { id: 'p1', name: 'Türkiye Pasaportu', countryCode: 'TR', color: 'burgundy', flag: '🇹🇷' }
    ],
    initialTravels: [
      { id: 't1', countryCode: 'IT', countryName: 'İtalya', entryDate: '2026-02-01', exitDate: '2026-02-08', isSchengen: true }, // 8 gün
      { id: 't2', countryCode: 'GR', countryName: 'Yunanistan', entryDate: '2026-04-10', exitDate: '2026-04-20', isSchengen: true }, // 11 gün
      { id: 't3', countryCode: 'JP', countryName: 'Japonya', entryDate: '2026-05-01', exitDate: '2026-05-15', isSchengen: false }, // Schengen dışı
      { id: 't4', countryCode: 'DE', countryName: 'Almanya', entryDate: '2026-06-25', exitDate: '2026-07-02', isSchengen: true }, // 8 gün (Schengen toplamı: 27 gün)
    ]
  },
  expat: {
    id: 'expat',
    title: 'Expat / Oturum Sahibi (Residency Tracker)',
    subtitle: 'Yurt dışında yaşayan ve fiziksel varlık gün sınırını korumak isteyen profesyonel.',
    description: 'Örneğin Almanya\'da oturum iznine sahiptir veya İspanya\'da vergi mukimi kalabilmek için yılda en az 183 gün o ülkede fiziksel olarak bulunması gerekmektedir. Hem AB sınırlarını hem de kendi ülkesindeki kalış günlerini takip eder.',
    badge: 'Oturumcu',
    initialPassports: [
      { id: 'p3', name: 'Almanya Pasaportu', countryCode: 'DE', color: 'burgundy', flag: '🇩🇪' },
      { id: 'p1', name: 'Türkiye Pasaportu', countryCode: 'TR', color: 'burgundy', flag: '🇹🇷' }
    ],
    initialTravels: [
      { id: 't1', countryCode: 'TR', countryName: 'Türkiye', entryDate: '2026-01-01', exitDate: '2026-01-20', isSchengen: false }, // Kendi ana vatanında tatil
      { id: 't2', countryCode: 'DE', countryName: 'Almanya', entryDate: '2026-01-21', exitDate: '2026-05-30', isSchengen: true }, // Fiziksel varlık biriktiriyor (130 gün)
      { id: 't3', countryCode: 'US', countryName: 'Amerika B.D.', entryDate: '2026-06-01', exitDate: '2026-06-20', isSchengen: false }, // ABD iş gezisi
      { id: 't4', countryCode: 'DE', countryName: 'Almanya', entryDate: '2026-06-21', exitDate: '2026-07-16', isSchengen: true }, // Geri dönüş ve Almanya'da kalmaya devam (Şu an orada)
    ]
  }
};

/**
 * Parses "YYYY-MM-DD" string into Date object (local timezone safe)
 */
export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0); // Noon to avoid timezone shifts
}

/**
 * Format Date object to "YYYY-MM-DD"
 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Calculates number of days between two dates, inclusive
 */
export function getDaysInclusive(startStr: string, endStr: string): number {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

/**
 * CORE SCHENGEN 90/180 ENGINE
 * Computes exact used days in any 180-day window ending on 'referenceDateStr'.
 * Includes details on which logs fall into the window.
 */
export interface SchengenCalculationResult {
  referenceDate: string;
  windowStart: string;
  windowEnd: string;
  totalDaysUsed: number;
  daysRemaining: number;
  isOverstayed: boolean;
  activeWindowLogs: {
    logId: string;
    countryName: string;
    entryDate: string;
    exitDate: string;
    daysCounted: number;
  }[];
  // Day-by-day status map for visual charts
  dayByDayMap: Record<string, boolean>; // date string -> is in Schengen
}

export function calculateSchengen90_180(
  travelLogs: TravelLog[],
  referenceDateStr: string = '2026-07-16',
  residencePermitCountryCode?: string | null
): SchengenCalculationResult {
  const refDate = parseDate(referenceDateStr);
  
  // Calculate the 180-day window: refDate to refDate - 179 days
  const windowEndDate = refDate;
  const windowStartDate = new Date(refDate.getTime() - 179 * 24 * 60 * 60 * 1000);
  
  const windowStartStr = formatDate(windowStartDate);
  const windowEndStr = formatDate(windowEndDate);

  // We want to generate a map of ALL days in this 180-day window
  const dayByDayMap: Record<string, boolean> = {};
  const currentIter = new Date(windowStartDate.getTime());
  
  while (currentIter <= windowEndDate) {
    const dateStr = formatDate(currentIter);
    dayByDayMap[dateStr] = false;
    currentIter.setDate(currentIter.getDate() + 1);
  }

  const safeLogs = (travelLogs || []).filter(log => log && typeof log === 'object' && log.countryCode);

  // Filter logs that are Schengen
  // Critical: Stays in the country of your residence permit do NOT count towards the 90/180 Schengen limit.
  // Stays in other Schengen countries DO count.
  const schengenLogs = safeLogs.filter(log => {
    if (residencePermitCountryCode && log.countryCode === residencePermitCountryCode) {
      return false;
    }
    return log.isSchengen;
  });
  const activeWindowLogs: SchengenCalculationResult['activeWindowLogs'] = [];

  schengenLogs.forEach(log => {
    const logEntry = parseDate(log.entryDate);
    const logExit = parseDate(log.exitDate);
    
    let daysCountedInWindow = 0;
    
    // For each day of this log, check if it falls inside the 180-day window
    const iter = new Date(logEntry.getTime());
    while (iter <= logExit) {
      const dateStr = formatDate(iter);
      if (dateStr in dayByDayMap) {
        dayByDayMap[dateStr] = true;
        daysCountedInWindow++;
      }
      iter.setDate(iter.getDate() + 1);
    }

    if (daysCountedInWindow > 0) {
      activeWindowLogs.push({
        logId: log.id,
        countryName: log.countryName,
        entryDate: log.entryDate,
        exitDate: log.exitDate,
        daysCounted: daysCountedInWindow
      });
    }
  });

  // Count total days marked as true (Schengen)
  let totalDaysUsed = 0;
  Object.values(dayByDayMap).forEach(val => {
    if (val) totalDaysUsed++;
  });

  const daysRemaining = Math.max(0, 90 - totalDaysUsed);
  const isOverstayed = totalDaysUsed > 90;

  return {
    referenceDate: referenceDateStr,
    windowStart: windowStartStr,
    windowEnd: windowEndStr,
    totalDaysUsed,
    daysRemaining,
    isOverstayed,
    activeWindowLogs,
    dayByDayMap
  };
}

/**
 * Calculates physical presence for residency tracking
 * e.g., German expat/Spanish resident needing X days in Germany or Spain.
 */
export function calculatePhysicalPresence(
  travelLogs: TravelLog[],
  targetCountryCode: string,
  targetYear: number = 2026
): {
  daysPresent: number;
  requiredDays: number;
  percentage: number;
  isCompliant: boolean;
  countryName: string;
} {
  let daysPresent = 0;
  let countryName = '';

  const safeLogs = (travelLogs || []).filter(log => log && typeof log === 'object' && log.countryCode);

  safeLogs.forEach(log => {
    if (log.countryCode === targetCountryCode) {
      countryName = log.countryName;
      // Calculate overlay with the target year
      const entry = parseDate(log.entryDate);
      const exit = parseDate(log.exitDate);
      
      const yearStart = new Date(targetYear, 0, 1, 12, 0, 0);
      const yearEnd = new Date(targetYear, 11, 31, 12, 0, 0);

      // find overlap
      const overlapStart = entry > yearStart ? entry : yearStart;
      const overlapEnd = exit < yearEnd ? exit : yearEnd;

      if (overlapStart <= overlapEnd) {
        const diffTime = Math.abs(overlapEnd.getTime() - overlapStart.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        daysPresent += diffDays;
      }
    }
  });

  if (!countryName) {
    const match = DESTINATION_COUNTRIES.find(c => c.code === targetCountryCode);
    countryName = match ? match.name : targetCountryCode;
  }

  const requiredDays = 183; // Standard tax residency requirement
  const percentage = Math.min(100, Math.round((daysPresent / requiredDays) * 100));
  const isCompliant = daysPresent >= requiredDays;

  return {
    daysPresent,
    requiredDays,
    percentage,
    isCompliant,
    countryName
  };
}
