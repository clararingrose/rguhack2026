/**
 * Country to Language Mapping
 * Maps country codes to their primary languages with translations
 */

const languageMap = {
    // English speaking countries
    GB: { code: 'en', name: 'English', nativeName: 'English' },
    US: { code: 'en', name: 'English', nativeName: 'English' },
    AU: { code: 'en', name: 'English', nativeName: 'English' },
    CA: { code: 'en', name: 'English', nativeName: 'English' },
    IE: { code: 'en', name: 'English', nativeName: 'English' },
    NZ: { code: 'en', name: 'English', nativeName: 'English' },
    ZA: { code: 'en', name: 'English', nativeName: 'English' },

    // French speaking countries
    FR: { code: 'fr', name: 'French', nativeName: 'Français' },
    BE: { code: 'fr', name: 'French', nativeName: 'Français' },
    CH: { code: 'fr', name: 'French', nativeName: 'Français' },
    LU: { code: 'fr', name: 'French', nativeName: 'Français' },
    MC: { code: 'fr', name: 'French', nativeName: 'Français' },
    MA: { code: 'fr', name: 'French', nativeName: 'Français' },
    TN: { code: 'fr', name: 'French', nativeName: 'Français' },
    DZ: { code: 'fr', name: 'French', nativeName: 'Français' },
    CI: { code: 'fr', name: 'French', nativeName: 'Français' },
    SN: { code: 'fr', name: 'French', nativeName: 'Français' },

    // German speaking countries
    DE: { code: 'de', name: 'German', nativeName: 'Deutsch' },
    AT: { code: 'de', name: 'German', nativeName: 'Deutsch' },
    LI: { code: 'de', name: 'German', nativeName: 'Deutsch' },

    // Spanish speaking countries
    ES: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    MX: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    AR: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    CO: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    PE: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    VE: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    CL: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    EC: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    GT: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    CU: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    BO: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    DO: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    HN: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    PY: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    SV: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    NI: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    CR: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    PA: { code: 'es', name: 'Spanish', nativeName: 'Español' },
    UY: { code: 'es', name: 'Spanish', nativeName: 'Español' },

    // Italian speaking countries
    IT: { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    SM: { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    VA: { code: 'it', name: 'Italian', nativeName: 'Italiano' },

    // Portuguese speaking countries
    PT: { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    BR: { code: 'pt', name: 'Portuguese', nativeName: 'Português' },

    // Dutch speaking countries
    NL: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
    BE: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },

    // Polish
    PL: { code: 'pl', name: 'Polish', nativeName: 'Polski' },

    // Turkish
    TR: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },

    // Russian
    RU: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    UA: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    BY: { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    KZ: { code: 'ru', name: 'Russian', nativeName: 'Русский' },

    // Chinese
    CN: { code: 'zh', name: 'Chinese', nativeName: '中文' },
    TW: { code: 'zh', name: 'Chinese', nativeName: '中文' },
    SG: { code: 'zh', name: 'Chinese', nativeName: '中文' },
    HK: { code: 'zh', name: 'Chinese', nativeName: '中文' },

    // Japanese
    JP: { code: 'ja', name: 'Japanese', nativeName: '日本語' },

    // Korean
    KR: { code: 'ko', name: 'Korean', nativeName: '한국어' },

    // Arabic
    SA: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    AE: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    EG: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    JO: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    LB: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    QA: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    KW: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    OM: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    BH: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    SY: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    IQ: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    YE: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    LY: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    SD: { code: 'ar', name: 'Arabic', nativeName: 'العربية' },

    // Hindi
    IN: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },

    // Bengali
    BD: { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },

    // Thai
    TH: { code: 'th', name: 'Thai', nativeName: 'ไทย' },

    // Vietnamese
    VN: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },

    // Indonesian
    ID: { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },

    // Malay
    MY: { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },

    // Swedish
    SE: { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },

    // Norwegian
    NO: { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },

    // Danish
    DK: { code: 'da', name: 'Danish', nativeName: 'Dansk' },

    // Finnish
    FI: { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },

    // Greek
    GR: { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },

    // Czech
    CZ: { code: 'cs', name: 'Czech', nativeName: 'Čeština' },

    // Hungarian
    HU: { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },

    // Romanian
    RO: { code: 'ro', name: 'Romanian', nativeName: 'Română' },

    // Bulgarian
    BG: { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },

    // Slovenian
    SI: { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },

    // Croatian
    HR: { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },

    // Serbian
    RS: { code: 'sr', name: 'Serbian', nativeName: 'Српски' },

    // North Macedonia
    MK: { code: 'mk', name: 'Macedonian', nativeName: 'Македонски' },

    // Albanian
    AL: { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },

    // Bosnian
    BA: { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski' },

    // Montenegrin
    ME: { code: 'me', name: 'Montenegrin', nativeName: 'Crnogorski' },

    // Kosovo
    XK: { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },

    // Maltese
    MT: { code: 'mt', name: 'Maltese', nativeName: 'Malti' },

    // Icelandic
    IS: { code: 'is', name: 'Icelandic', nativeName: 'Íslenska' },

    // Luxembourgish
    LU: { code: 'lb', name: 'Luxembourgish', nativeName: 'Lëtzebuergesch' },

    // Monégasque (Monaco)
    MC: { code: 'fr', name: 'French', nativeName: 'Français' },

    // San Marino (uses Italian)
    SM: { code: 'it', name: 'Italian', nativeName: 'Italiano' },

    // Andorran
    AD: { code: 'ca', name: 'Catalan', nativeName: 'Català' },

    // Liechtenstein (uses German)
    LI: { code: 'de', name: 'German', nativeName: 'Deutsch' },

    // Costa Rican
    CR: { code: 'es', name: 'Spanish', nativeName: 'Español' },

    // Panamanian
    PA: { code: 'es', name: 'Spanish', nativeName: 'Español' },

    // Surinamese
    SR: { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },

    // Guyanese
    GY: { code: 'en', name: 'English', nativeName: 'English' },

    // Uruguayan
    UY: { code: 'es', name: 'Spanish', nativeName: 'Español' },

    // Paraguayan
    PY: { code: 'es', name: 'Spanish', nativeName: 'Español' },

    // Ecuadorian
    EC: { code: 'es', name: 'Spanish', nativeName: 'Español' },

    // Bolivian
    BO: { code: 'es', name: 'Spanish', nativeName: 'Español' },

    // Serbian
    RS: { code: 'sr', name: 'Serbian', nativeName: 'Српски' },

    // Ukrainian
    UA: { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },

    // Hebrew
    IL: { code: 'he', name: 'Hebrew', nativeName: 'עברית' },

    // Tagalog
    PH: { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog' },

    // Swahili
    KE: { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
    TZ: { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },

    // Default fallback
    DEFAULT: { code: 'en', name: 'English', nativeName: 'English' }
};

/**
 * Translations for UI elements
 */
const translations = {
    en: {
        title: '🌍 Evil Carbon Calculator',
        subtitle: 'Find the most exciting way to travel! 🔥',
        origin: 'Origin',
        destination: 'Destination',
        calculate: 'Calculate Emissions',
        calculating: 'Calculating...',
        journeyDistance: 'Journey Distance',
        kilometers: 'kilometres',
        mostExciting: '🔥 MOST EXCITING!',
        ddrMode: 'DDR Mode',
        ouijaMode: 'Switch to Ouija Mode',
        boringMode: 'Boring Mode',
        funMode: 'Fun Mode',
        selectDate: 'Select Date',
        results: 'Results',
        // Input mode buttons
        ddrModeBtn: 'DDR Mode',
        summonLocation: 'Summon Location',
        switchToOuija: 'Switch to Ouija Mode',
        switchToDdr: 'Switch to DDR Mode',
        danceToInput: 'Dance to input location...',
        danceToDestination: 'Dance to input destination...',
        summonFromBeyond: 'Summon location from beyond...',
        summonDestinationFromBeyond: 'Summon destination from beyond...',
        // Transport modes
        transportWalking: 'Walking',
        transportCycling: 'Cycling',
        transportHighSpeedTrain: 'High-speed Train',
        transportElectricBus: 'Electric Bus',
        transportTram: 'Tram',
        transportBus: 'Bus',
        transportElectricTrain: 'Electric Train',
        transportTrain: 'Train',
        transportMotorcycle: 'Motorcycle',
        transportHorseCarriage: 'Horse & Carriage',
        transportCoach: 'Long-distance Coach',
        transportDieselCar: 'Diesel Car',
        transportPetrolCar: 'Petrol Car',
        transportShortHaulFlight: 'Short-haul Flight',
        transportLongHaulFlight: 'Long-haul Flight',
        transportCruiseShip: 'Cruise Ship',
        transportHotAirBalloon: 'Hot Air Balloon',
        transportKilldozer: 'Killdozer',
        // Nav items
        navHome: 'Home',
        navBlog: 'Blog',
        navWrapped: 'Wrapped'
    },
    fr: {
        title: '🌍 Calculateur de Carbone Malveillant',
        subtitle: 'Trouvez le moyen le plus excitant de voyager ! 🔥',
        origin: 'Origine',
        destination: 'Destination',
        calculate: "Calculer les Émissions",
        calculating: 'Calcul en cours...',
        journeyDistance: 'Distance du Voyage',
        kilometers: 'kilomètres',
        mostExciting: '🔥 LE PLUS EXCITANT !',
        ddrMode: 'Mode DDR',
        ouijaMode: 'Passer au Mode Ouija',
        boringMode: 'Mode Ennuyeux',
        funMode: 'Mode Amusant',
        selectDate: 'Sélectionner la Date',
        results: 'Résultats',
        // Input mode buttons
        ddrModeBtn: 'Mode DDR',
        summonLocation: 'Invoquer un Lieu',
        switchToOuija: 'Passer au Mode Ouija',
        switchToDdr: 'Passer au Mode DDR',
        danceToInput: 'Dansez pour entrer le lieu...',
        danceToDestination: 'Dansez pour entrer la destination...',
        summonFromBeyond: 'Invoquer un lieu d\'au-delà...',
        summonDestinationFromBeyond: 'Invoquer une destination d\'au-delà...'
    },
    de: {
        title: '🌍 Böser Kohlenstoffrechner',
        subtitle: 'Finden Sie die aufregendste Art zu reisen! 🔥',
        origin: 'Ursprung',
        destination: 'Ziel',
        calculate: 'Emissionen Berechnen',
        calculating: 'Berechne...',
        journeyDistance: 'Reisedistanz',
        kilometers: 'Kilometer',
        mostExciting: '🔥 AM AUFREGENDSTEN!',
        ddrMode: 'DDR-Modus',
        ouijaMode: 'Zum Ouija-Modus Wechseln',
        boringMode: 'Langweiliger Modus',
        funMode: 'Spaßiger Modus',
        selectDate: 'Datum Wählen',
        results: 'Ergebnisse',
        // Input mode buttons
        ddrModeBtn: 'DDR-Modus',
        summonLocation: 'Ort beschwören',
        switchToOuija: 'Zum Ouija-Modus Wechseln',
        switchToDdr: 'Zum DDR-Modus Wechseln',
        danceToInput: 'Tanze, um Ort einzugeben...',
        danceToDestination: 'Tanze, um Ziel einzugeben...',
        summonFromBeyond: 'Ort von jenseits beschwören...',
        summonDestinationFromBeyond: 'Ziel von jenseits beschwören...'
    },
    es: {
        title: '🌍 Calculadora de Carbono Malvada',
        subtitle: '¡Encuentra la forma más emocionante de viajar! 🔥',
        origin: 'Origen',
        destination: 'Destino',
        calculate: 'Calcular Emisiones',
        calculating: 'Calculando...',
        journeyDistance: 'Distancia del Viaje',
        kilometers: 'kilómetros',
        mostExciting: '🔥 ¡MÁS EMOCIONANTE!',
        ddrMode: 'Modo DDR',
        ouijaMode: 'Cambiar a Modo Ouija',
        boringMode: 'Modo Aburrido',
        funMode: 'Modo Divertido',
        selectDate: 'Seleccionar Fecha',
        results: 'Resultados',
        // Input mode buttons
        ddrModeBtn: 'Modo DDR',
        summonLocation: 'Invocar Ubicación',
        switchToOuija: 'Cambiar a Modo Ouija',
        switchToDdr: 'Cambiar a Modo DDR',
        danceToInput: 'Baila para ingresar ubicación...',
        danceToDestination: 'Baila para ingresar destino...',
        summonFromBeyond: 'Invocar ubicación desde el más allá...',
        summonDestinationFromBeyond: 'Invocar destino desde el más allá...'
    },
    it: {
        title: '🌍 Calcolatore di Carbonio Malvagio',
        subtitle: 'Trova il modo più eccitante per viaggiare! 🔥',
        origin: 'Origine',
        destination: 'Destinazione',
        calculate: 'Calcola Emissioni',
        calculating: 'Calcolando...',
        journeyDistance: 'Distanza del Viaggio',
        kilometers: 'chilometri',
        mostExciting: '🔥 PIÙ ECCITANTE!',
        ddrMode: 'Modalità DDR',
        ouijaMode: 'Passa alla Modalità Ouija',
        boringMode: 'Modalità Noiosa',
        funMode: 'Modalità Divertente',
        selectDate: 'Seleziona Data',
        results: 'Risultati',
        // Input mode buttons
        ddrModeBtn: 'Modalità DDR',
        summonLocation: 'Evoca Luogo',
        switchToOuija: 'Passa alla Modalità Ouija',
        switchToDdr: 'Passa alla Modalità DDR',
        danceToInput: 'Balla per inserire il luogo...',
        danceToDestination: 'Balla per inserire la destinazione...',
        summonFromBeyond: 'Evoca un luogo dall\'aldilà...',
        summonDestinationFromBeyond: 'Evoca una destinazione dall\'aldilà...'
    },
    pt: {
        title: '🌍 Calculadora de Carbono Malígna',
        subtitle: 'Encontre a forma mais emocionante de viajar! 🔥',
        origin: 'Origem',
        destination: 'Destino',
        calculate: 'Calcular Emissões',
        calculating: 'Calculando...',
        journeyDistance: 'Distância da Viagem',
        kilometers: 'quilômetros',
        mostExciting: '🔥 MAIS EMOCIONANTE!',
        ddrMode: 'Modo DDR',
        ouijaMode: 'Mudar para Modo Ouija',
        boringMode: 'Modo Chato',
        funMode: 'Modo Divertido',
        selectDate: 'Selecionar Data',
        results: 'Resultados',
        // Input mode buttons
        ddrModeBtn: 'Modo DDR',
        summonLocation: 'Invocar Local',
        switchToOuija: 'Mudar para Modo Ouija',
        switchToDdr: 'Mudar para Modo DDR',
        danceToInput: 'Dance para inserir local...',
        danceToDestination: 'Dance para inserir destino...',
        summonFromBeyond: 'Invocar local de além...',
        summonDestinationFromBeyond: 'Invocar destino de além...'
    },
    nl: {
        title: '🌍 Kwaadaardige Koolstofcalculator',
        subtitle: 'Vind de meest opwindende manier om te reizen! 🔥',
        origin: 'Oorsprong',
        destination: 'Bestemming',
        calculate: 'Bereken Uitstoot',
        calculating: 'Berekenen...',
        journeyDistance: 'Reisafstand',
        kilometers: 'kilometers',
        mostExciting: '🔥 MEEST OPWINDEND!',
        ddrMode: 'DDR Modus',
        ouijaMode: 'Schakel naar Ouija Modus',
        boringMode: 'Saaie Modus',
        selectDate: 'Selecteer Datum',
        results: 'Resultaten',
        // Input mode buttons
        ddrModeBtn: 'DDR Modus',
        summonLocation: 'Locatie Oproepen',
        switchToOuija: 'Schakel naar Ouija Modus',
        switchToDdr: 'Schakel naar DDR Modus',
        danceToInput: 'Dans om locatie in te voeren...',
        danceToDestination: 'Dans om bestemming in te voeren...',
        summonFromBeyond: 'Locatie van hiernamaals oproepen...',
        summonDestinationFromBeyond: 'Bestemming van hiernamaals oproepen...'
    },
    pl: {
        title: '🌍 Zły Kalkulator Węgla',
        subtitle: 'Znajdź najbardziej ekscytujący sposób podróży! 🔥',
        origin: 'Początek',
        destination: 'Cel',
        calculate: 'Oblicz Emisje',
        calculating: 'Obliczanie...',
        journeyDistance: 'Dystans Podróży',
        kilometers: 'kilometry',
        mostExciting: '🔥 NAJBARDZIEJ EKSCYTUJĄCY!',
        ddrMode: 'Tryb DDR',
        ouijaMode: 'Przełącz na Tryb Ouija',
        boringMode: 'Nudny Tryb',
        selectDate: 'Wybierz Datę',
        results: 'Wyniki',
        // Input mode buttons
        ddrModeBtn: 'Tryb DDR',
        summonLocation: 'Przyzwołaj Lokalizację',
        switchToOuija: 'Przełącz na Tryb Ouija',
        switchToDdr: 'Przełącz na Tryb DDR',
        danceToInput: 'Zatańcz, aby wpisać lokalizację...',
        danceToDestination: 'Zatańcz, aby wpisać cel...',
        summonFromBeyond: 'Przyzwołaj lokalizację z zaświatów...',
        summonDestinationFromBeyond: 'Przyzwołaj cel z zaświatów...'
    },
    tr: {
        title: '🌍 Kötü Karbon Hesaplayıcı',
        subtitle: 'Yolculuk için en heyecan verici yolu bulun! 🔥',
        origin: 'Başlangıç',
        destination: 'Varış',
        calculate: 'Emisyon Hesapla',
        calculating: 'Hesaplanıyor...',
        journeyDistance: 'Yolculuk Mesafesi',
        kilometers: 'kilometre',
        mostExciting: '🔥 EN HEYECAN VERİCİ!',
        ddrMode: 'DDR Modu',
        ouijaMode: 'Ouija Moduna Geç',
        boringMode: 'Sıkıcı Mod',
        selectDate: 'Tarih Seç',
        results: 'Sonuçlar',
        // Input mode buttons
        ddrModeBtn: 'DDR Modu',
        summonLocation: 'Konum Çağır',
        switchToOuija: 'Ouija Moduna Geç',
        switchToDdr: 'DDR Moduna Geç',
        danceToInput: 'Konum girmek için dans et...',
        danceToDestination: 'Hedef girmek için dans et...',
        summonFromBeyond: 'Konumu öbür dünyadan çağır...',
        summonDestinationFromBeyond: 'Hedefi öbür dünyadan çağır...'
    },
    ru: {
        title: '🌍 Злой Калькулятор Углерода',
        subtitle: 'Найдите самый захватывающий способ путешествовать! 🔥',
        origin: 'Отправление',
        destination: 'Назначение',
        calculate: 'Рассчитать Выбросы',
        calculating: 'Вычисление...',
        journeyDistance: 'Расстояние',
        kilometers: 'километров',
        mostExciting: '🔥 САМЫЙ ЗАХВАТЫВАЮЩИЙ!',
        ddrMode: 'DDR Режим',
        ouijaMode: 'Переключить на Ouija',
        boringMode: 'Скучный Режим',
        selectDate: 'Выбрать Дату',
        results: 'Результаты',
        // Input mode buttons
        ddrModeBtn: 'DDR Режим',
        summonLocation: 'Призвать Местоположение',
        switchToOuija: 'Переключить на Ouija',
        switchToDdr: 'Переключить на DDR',
        danceToInput: 'Танцуйте, чтобы ввести место...',
        danceToDestination: 'Танцуйте, чтобы ввести цель...',
        summonFromBeyond: 'Призвать место из загробного мира...',
        summonDestinationFromBeyond: 'Призвать цель из загробного мира...'
    },
    zh: {
        title: '🌍 邪恶碳排放计算器',
        subtitle: '找到最令人兴奋的旅行方式！🔥',
        origin: '出发地',
        destination: '目的地',
        calculate: '计算排放量',
        calculating: '计算中...',
        journeyDistance: '旅程距离',
        kilometers: '公里',
        mostExciting: '🔥 最令人兴奋！',
        ddrMode: 'DDR模式',
        ouijaMode: '切换到灵应板模式',
        boringMode: '无聊模式',
        funMode: '有趣模式',
        selectDate: '选择日期',
        results: '结果',
        // Input mode buttons
        ddrModeBtn: 'DDR模式',
        summonLocation: '召唤位置',
        switchToOuija: '切换到灵应板模式',
        switchToDdr: '切换到DDR模式',
        danceToInput: '跳舞输入位置...',
        danceToDestination: '跳舞输入目的地...',
        summonFromBeyond: '从冥界召唤位置...',
        summonDestinationFromBeyond: '从冥界召唤目的地...'
    },
    ja: {
        title: '🌍 邪悪な炭素排出量計算機',
        subtitle: '最もエキサイティングな旅行の方法を見つけよう！🔥',
        origin: '出発地',
        destination: '目的地',
        calculate: '排出量を計算',
        calculating: '計算中...',
        journeyDistance: '旅程距離',
        kilometers: 'キロメートル',
        mostExciting: '🔥 最もエキサイティング！',
        ddrMode: 'DDRモード',
        ouijaMode: 'ウイジャボードモードに切り替え',
        boringMode: '退屈モード',
        funMode: 'ファンモード',
        selectDate: '日付を選択',
        results: '結果',
        // Input mode buttons
        ddrModeBtn: 'DDRモード',
        summonLocation: '場所を召喚',
        switchToOuija: 'ウイジャボードモードに切り替え',
        switchToDdr: 'DDRモードに切り替え',
        danceToInput: 'ダンスで場所を入力...',
        danceToDestination: 'ダンスで目的地を入力...',
        summonFromBeyond: 'あの世から場所を召喚...',
        summonDestinationFromBeyond: 'あの世から目的地を召喚...'
    },
    ko: {
        title: '🌍 사악한 탄소 계산기',
        subtitle: '가장 흥미로운 여행 방법을 찾으세요! 🔥',
        origin: '출발지',
        destination: '목적지',
        calculate: '배출량 계산',
        calculating: '계산 중...',
        journeyDistance: '여행 거리',
        kilometers: '킬로미터',
        mostExciting: '🔥 가장 흥미로운!',
        ddrMode: 'DDR 모드',
        ouijaMode: '위저 보드 모드로 전환',
        boringMode: '지루한 모드',
        selectDate: '날짜 선택',
        results: '결과',
        // Input mode buttons
        ddrModeBtn: 'DDR 모드',
        summonLocation: '위치 소환',
        switchToOuija: '위저 보드 모드로 전환',
        switchToDdr: 'DDR 모드로 전환',
        danceToInput: '춤으로 위치 입력...',
        danceToDestination: '춤으로 목적지 입력...',
        summonFromBeyond: '저세상에서 위치 소환...',
        summonDestinationFromBeyond: '저세상에서 목적지 소환...'
    },
    ar: {
        title: '🌍 حاسبة الكربون الخبيثة',
        subtitle: 'ابحث عن أكثر طرق السفر إثارة! 🔥',
        origin: 'الأصل',
        destination: 'الوجهة',
        calculate: 'حساب الانبعاثات',
        calculating: 'جاري الحساب...',
        journeyDistance: 'مسافة الرحلة',
        kilometers: 'كيلومتر',
        mostExciting: '🔥 الأكثر إثارة!',
        ddrMode: 'وضع DDR',
        ouijaMode: 'التبديل إلى وضع Ouija',
        boringMode: 'وضع ممل',
        selectDate: 'اختر التاريخ',
        results: 'النتائج',
        // Input mode buttons
        ddrModeBtn: 'وضع DDR',
        summonLocation: 'استدعاء الموقع',
        switchToOuija: 'التبديل إلى وضع Ouija',
        switchToDdr: 'التبديل إلى وضع DDR',
        danceToInput: 'رقص لإدخال الموقع...',
        danceToDestination: 'رقص لإدخال الوجهة...',
        summonFromBeyond: 'استدعاء الموقع من ما وراء الطبيعة...',
        summonDestinationFromBeyond: 'استدعاء الوجهة من ما وراء الطبيعة...'
    },
    hi: {
        title: '🌍 दुष्ट कार्बन कैलकुलेटर',
        subtitle: 'सबसे रोमांचक यात्रा का तरीका खोजें! 🔥',
        origin: 'मूल',
        destination: 'गंतव्य',
        calculate: 'उत्सर्जन की गणना करें',
        calculating: 'गणना हो रही है...',
        journeyDistance: 'यात्रा की दूरी',
        kilometers: 'किलोमीटर',
        mostExciting: '🔥 सबसे रोमांचक!',
        ddrMode: 'DDR मोड',
        ouijaMode: 'Ouija मोड में स्विच करें',
        boringMode: 'उबाऊ मोड',
        selectDate: 'तारीख चुनें',
        results: 'परिणाम',
        // Input mode buttons
        ddrModeBtn: 'DDR मोड',
        summonLocation: 'स्थान बुलाएं',
        switchToOuija: 'Ouija मोड में स्विच करें',
        switchToDdr: 'DDR मोड में स्विच करें',
        danceToInput: 'स्थान इनपुट करने के लिए नाचें...',
        danceToDestination: 'गंतव्य इनपुट करने के लिए नाचें...',
        summonFromBeyond: 'परलोक से स्थान बुलाएं...',
        summonDestinationFromBeyond: 'परलोक से गंतव्य बुलाएं...'
    },
    th: {
        title: '🌍 เครื่องคำนวณคาร์บอนชั่วร้าย',
        subtitle: 'ค้นหาวิธีการเดินทางที่น่าตื่นเต้นที่สุด! 🔥',
        origin: 'จุดเริ่มต้น',
        destination: 'ปลายทาง',
        calculate: 'คำนวณการปล่อยก๊าซ',
        calculating: 'กำลังคำนวณ...',
        journeyDistance: 'ระยะทางการเดินทาง',
        kilometers: 'กิโลเมตร',
        mostExciting: '🔥 น่าตื่นเต้นที่สุด!',
        ddrMode: 'โหมด DDR',
        ouijaMode: 'สลับไปโหมด Ouija',
        boringMode: 'โหมดน่าเบื่อ',
        selectDate: 'เลือกวันที่',
        results: 'ผลลัพธ์',
        // Input mode buttons
        ddrModeBtn: 'โหมด DDR',
        summonLocation: 'เรียกสถานที่',
        switchToOuija: 'สลับไปโหมด Ouija',
        switchToDdr: 'สลับไปโหมด DDR',
        danceToInput: 'เต้นเพื่อป้อนสถานที่...',
        danceToDestination: 'เต้นเพื่อป้อนปลายทาง...',
        summonFromBeyond: 'เรียกสถานที่จากโลกหน้า...',
        summonDestinationFromBeyond: 'เรียกปลายทางจากโลกหน้า...'
    },
    vi: {
        title: '🌍 Máy Tính Carbon Ác',
        subtitle: 'Tìm cách du lịch thú vị nhất! 🔥',
        origin: 'Xuất phát',
        destination: 'Điểm đến',
        calculate: 'Tính Phát Thải',
        calculating: 'Đang tính...',
        journeyDistance: 'Quãng Đường',
        kilometers: 'kilômet',
        mostExciting: '🔥 HẤP DẪN NHẤT!',
        ddrMode: 'Chế độ DDR',
        ouijaMode: 'Chuyển sang Chế độ Ouija',
        boringMode: 'Chế độ Chán',
        selectDate: 'Chọn Ngày',
        results: 'Kết quả',
        // Input mode buttons
        ddrModeBtn: 'Chế độ DDR',
        summonLocation: 'Triệu Hồi Địa Điểm',
        switchToOuija: 'Chuyển sang Chế độ Ouija',
        switchToDdr: 'Chuyển sang Chế độ DDR',
        danceToInput: 'Nhảy để nhập địa điểm...',
        danceToDestination: 'Nhảy để nhập điểm đến...',
        summonFromBeyond: 'Triệu hồi địa điểm từ thế giới bên kia...',
        summonDestinationFromBeyond: 'Triệu hồi điểm đến từ thế giới bên kia...'
    },
    id: {
        title: '🌍 Kalkulator Karbon Jahat',
        subtitle: 'Temukan cara perjalanan paling menarik! 🔥',
        origin: 'Asal',
        destination: 'Tujuan',
        calculate: 'Hitung Emisi',
        calculating: 'Menghitung...',
        journeyDistance: 'Jarak Perjalanan',
        kilometers: 'kilometer',
        mostExciting: '🔥 PALING MENARIK!',
        ddrMode: 'Mode DDR',
        ouijaMode: 'Beralih ke Mode Ouija',
        boringMode: 'Mode Membosankan',
        selectDate: 'Pilih Tanggal',
        results: 'Hasil',
        // Input mode buttons
        ddrModeBtn: 'Mode DDR',
        summonLocation: 'Panggil Lokasi',
        switchToOuija: 'Beralih ke Mode Ouija',
        switchToDdr: 'Beralih ke Mode DDR',
        danceToInput: 'Menari untuk memasukkan lokasi...',
        danceToDestination: 'Menari untuk memasukkan tujuan...',
        summonFromBeyond: 'Panggil lokasi dari dunia lain...',
        summonDestinationFromBeyond: 'Panggil tujuan dari dunia lain...'
    },
    sv: {
        title: '🌍 Ond Koldioxidkalkylator',
        subtitle: 'Hitta det mest spännande sättet att resa! 🔥',
        origin: 'Ursprung',
        destination: 'Destination',
        calculate: 'Beräkna Utsläpp',
        calculating: 'Beräknar...',
        journeyDistance: 'Reslängd',
        kilometers: 'kilometer',
        mostExciting: '🔥 MEST SPÄNNANDE!',
        ddrMode: 'DDR-läge',
        ouijaMode: 'Byt till Ouija-läge',
        boringMode: 'Tråkigt Läge',
        selectDate: 'Välj Datum',
        results: 'Resultat',
        // Input mode buttons
        ddrModeBtn: 'DDR-läge',
        summonLocation: 'Kalla Fram Plats',
        switchToOuija: 'Byt till Ouija-läge',
        switchToDdr: 'Byt till DDR-läge',
        danceToInput: 'Dansa för att mata in plats...',
        danceToDestination: 'Dansa för att mata in destination...',
        summonFromBeyond: 'Kalla fram plats från bortom...',
        summonDestinationFromBeyond: 'Kalla fram destination från bortom...'
    },
    no: {
        title: '🌍 Ond Karbonkalkulator',
        subtitle: 'Finn den mest spennende måten å reise på! 🔥',
        origin: 'Opprinnelse',
        destination: 'Bestemmelse',
        calculate: 'Beregn Utslipp',
        calculating: 'Beregner...',
        journeyDistance: 'Reiselengde',
        kilometers: 'kilometer',
        mostExciting: '🔥 MEST SPENNENDE!',
        ddrMode: 'DDR-modus',
        ouijaMode: 'Bytt til Ouija-modus',
        boringMode: 'Kjedelig Modus',
        selectDate: 'Velg Dato',
        results: 'Resultater',
        // Input mode buttons
        ddrModeBtn: 'DDR-modus',
        summonLocation: 'Kallelse Sted',
        switchToOuija: 'Bytt til Ouija-modus',
        switchToDdr: 'Bytt til DDR-modus',
        danceToInput: 'Dans for å skrive inn sted...',
        danceToDestination: 'Dans for å skrive inn destinasjon...',
        summonFromBeyond: 'Kallelse sted fra den andre siden...',
        summonDestinationFromBeyond: 'Kallelse destinasjon fra den andre siden...'
    },
    da: {
        title: '🌍 Ond Kulstofkalkulator',
        subtitle: 'Find den mest spændende måde at rejse på! 🔥',
        origin: 'Oprindelse',
        destination: 'Destination',
        calculate: 'Beregn Udslip',
        calculating: 'Beregner...',
        journeyDistance: 'Rejseafstand',
        kilometers: 'kilometer',
        mostExciting: '🔥 MEST SPÆNDENDE!',
        ddrMode: 'DDR-tilstand',
        ouijaMode: 'Skift til Ouija-tilstand',
        boringMode: 'Kedelig Tilstand',
        selectDate: 'Vælg Dato',
        results: 'Resultater',
        // Input mode buttons
        ddrModeBtn: 'DDR-tilstand',
        summonLocation: 'Kald Sted',
        switchToOuija: 'Skift til Ouija-tilstand',
        switchToDdr: 'Skift til DDR-tilstand',
        danceToInput: 'Dans for at indtaste sted...',
        danceToDestination: 'Dans for at indtaste destination...',
        summonFromBeyond: 'Kald sted fra den anden side...',
        summonDestinationFromBeyond: 'Kald destination fra den anden side...'
    },
    fi: {
        title: '🌍 Paha Hiililaskuri',
        subtitle: 'Löydä jännittävin tapa matkustaa! 🔥',
        origin: 'Alku',
        destination: 'Määränpää',
        calculate: 'Laske Päästöt',
        calculating: 'Lasketaan...',
        journeyDistance: 'Matkan Pituus',
        kilometers: 'kilometriä',
        mostExciting: '🔥 JÄNNITTÄVIN!',
        ddrMode: 'DDR-tila',
        ouijaMode: 'Vaihda Ouija-tilaan',
        boringMode: 'Tylylä Tila',
        selectDate: 'Valitse Päivämäärä',
        results: 'Tulokset',
        // Input mode buttons
        ddrModeBtn: 'DDR-tila',
        summonLocation: 'Kutsu Paikka',
        switchToOuija: 'Vaihda Ouija-tilaan',
        switchToDdr: 'Vaihda DDR-tilaan',
        danceToInput: 'Tanssi paikan syöttämiseksi...',
        danceToDestination: 'Tanssi kohteen syöttämiseksi...',
        summonFromBeyond: 'Kutsu paikka tuonpuoleisesta...',
        summonDestinationFromBeyond: 'Kutsu kohde tuonpuoleisesta...'
    },
    el: {
        title: '🌍 Κακός Υπολογισμός Άνθρακα',
        subtitle: 'Βρείτε τον πιο συναρπαστικό τρόπο ταξιδιού! 🔥',
        origin: 'Αφετηρία',
        destination: 'Προορισμός',
        calculate: 'Υπολογισμός Εκπομπών',
        calculating: 'Υπολογισμός...',
        journeyDistance: 'Απόσταση Ταξειδιού',
        kilometers: 'χιλιόμετρα',
        mostExciting: '🔥 ΠΙΟ ΣΥΝΑΡΠΑΣΤΙΚΟ!',
        ddrMode: 'Λειτουργία DDR',
        ouijaMode: 'Αλλαγή σε Λειτουργία Ouija',
        boringMode: 'Ανιατή Λειτουργία',
        selectDate: 'Επιλογή Ημερομηνίας',
        results: 'Αποτελέσματα',
        // Input mode buttons
        ddrModeBtn: 'Λειτουργία DDR',
        summonLocation: 'Κλήση Τοποθεσίας',
        switchToOuija: 'Αλλαγή σε Λειτουργία Ouija',
        switchToDdr: 'Αλλαγή σε Λειτουργία DDR',
        danceToInput: 'Χορέψτε για να εισάγετε την τοποθεσία...',
        danceToDestination: 'Χορέψτε για να εισάγετε τον προορισμό...',
        summonFromBeyond: 'Κλήση τοποθεσίας από τον άλλο κόσμο...',
        summonDestinationFromBeyond: 'Κλήση προορισμού από τον άλλο κόσμο...'
    },
    cs: {
        title: '🌍 Zlý Kalkulátor Uhlíku',
        subtitle: 'Najděte nejzábavnější způsob cestování! 🔥',
        origin: 'Původ',
        destination: 'Cíl',
        calculate: 'Vypočítat Emise',
        calculating: 'Počítám...',
        journeyDistance: 'Vzdálenost Cesty',
        kilometers: 'kilometry',
        mostExciting: '🔥 NEJZÁBAVNĚJŠÍ!',
        ddrMode: 'Režim DDR',
        ouijaMode: 'Přepnout na Režim Ouija',
        boringMode: 'Nudný Režim',
        selectDate: 'Vybrat Datum',
        results: 'Výsledky',
        // Input mode buttons
        ddrModeBtn: 'Režim DDR',
        summonLocation: 'Vyvolat Místo',
        switchToOuija: 'Přepnout na Režim Ouija',
        switchToDdr: 'Přepnout na Režim DDR',
        danceToInput: 'Tančete pro zadání místa...',
        danceToDestination: 'Tančete pro zadání cíle...',
        summonFromBeyond: 'Vyvolat místo ze záhrobí...',
        summonDestinationFromBeyond: 'Vyvolat cíl ze záhrobí...'
    },
    hu: {
        title: '🌍 Gonosz Szénláb Kalkulátor',
        subtitle: 'Találd meg a legizgalmasabb utazási módot! 🔥',
        origin: 'Kiindulás',
        destination: 'Célállomás',
        calculate: 'Kibocsátás Számítása',
        calculating: 'Számolás...',
        journeyDistance: 'Utazási Távolság',
        kilometers: 'kilométer',
        mostExciting: '🔥 LEGIZGALMASABB!',
        ddrMode: 'DDR Mód',
        ouijaMode: 'Váltás Ouija Módra',
        boringMode: 'Unalmas Mód',
        selectDate: 'Dátum Kiválasztása',
        results: 'Eredmények',
        // Input mode buttons
        ddrModeBtn: 'DDR Mód',
        summonLocation: 'Hely Meghívása',
        switchToOuija: 'Váltás Ouija Módra',
        switchToDdr: 'Váltás DDR Módra',
        danceToInput: 'Táncoljon a hely megadásához...',
        danceToDestination: 'Táncoljon a cél megadásához...',
        summonFromBeyond: 'Hely meghívása a túlvilágból...',
        summonDestinationFromBeyond: 'Cél meghívása a túlvilágból...'
    },
    ro: {
        title: '🌍 Calculator de Carbon Rău',
        subtitle: 'Găsiți cea mai palpitantă modalitate de a călători! 🔥',
        origin: 'Origine',
        destination: 'Destinație',
        calculate: 'Calculați Emisiile',
        calculating: 'Calculând...',
        journeyDistance: 'Distanța Călătoriei',
        kilometers: 'kilometri',
        mostExciting: '🔥 CEA MAI PALPITANTĂ!',
        ddrMode: 'Modul DDR',
        ouijaMode: 'Treci la Modul Ouija',
        boringMode: 'Modul Plictisitor',
        selectDate: 'Selectați Data',
        results: 'Rezultate',
        // Input mode buttons
        ddrModeBtn: 'Modul DDR',
        summonLocation: 'Invocă Locația',
        switchToOuija: 'Treci la Modul Ouija',
        switchToDdr: 'Treci la Modul DDR',
        danceToInput: 'Dansează pentru a introduce locația...',
        danceToDestination: 'Dansează pentru a introduce destinația...',
        summonFromBeyond: 'Invocă locația din lumea de dincolo...',
        summonDestinationFromBeyond: 'Invocă destinația din lumea de dincolo...'
    },
    bg: {
        title: '🌍 Злонамерен Калкулатор на Въглерод',
        subtitle: 'Намерете най-вълнуващия начин за пътуване! 🔥',
        origin: 'Произход',
        destination: 'Дестинация',
        calculate: 'Изчисли Емисиите',
        calculating: 'Изчисляване...',
        journeyDistance: 'Разстояние на Пътуването',
        kilometers: 'километри',
        mostExciting: '🔥 НАЙ-ВОЛНУВАЩ!',
        ddrMode: 'DDR Режим',
        ouijaMode: 'Превключи към Ouija Режим',
        boringMode: 'Скучен Режим',
        selectDate: 'Избери Дата',
        results: 'Резултати',
        // Input mode buttons
        ddrModeBtn: 'DDR Режим',
        summonLocation: 'Призови Място',
        switchToOuija: 'Превключи към Ouija Режим',
        switchToDdr: 'Превключи към DDR Режим',
        danceToInput: 'Танцувайте, за да въведете място...',
        danceToDestination: 'Танцувайте, за да въведете дестинация...',
        summonFromBeyond: 'Призови място от отвъдното...',
        summonDestinationFromBeyond: 'Призови дестинация от отвъдното...'
    },
    hr: {
        title: '🌍 Zao Kalkulator Uglika',
        subtitle: 'Pronađite najuzbudljiviji način putovanja! 🔥',
        origin: 'Polazak',
        destination: 'Odredište',
        calculate: 'Izračunaj Emisije',
        calculating: 'Računam...',
        journeyDistance: 'Udaljenost Putovanja',
        kilometers: 'kilometara',
        mostExciting: '🔥 NAJUZBUDLJIVIJI!',
        ddrMode: 'DDR Način',
        ouijaMode: 'Prebaci na Ouija Način',
        boringMode: 'Dosadan Način',
        selectDate: 'Odaberi Datum',
        results: 'Rezultati',
        // Input mode buttons
        ddrModeBtn: 'DDR Način',
        summonLocation: 'Prizovi Mjesto',
        switchToOuija: 'Prebaci na Ouija Način',
        switchToDdr: 'Prebaci na DDR Način',
        danceToInput: 'Plesaj za unos mjesta...',
        danceToDestination: 'Plesaj za unos odredišta...',
        summonFromBeyond: 'Prizovi mjesto s onog svijeta...',
        summonDestinationFromBeyond: 'Prizovi odredište s onog svijeta...'
    },
    sr: {
        title: '🌍 Злокобан Калкулатор Угљеника',
        subtitle: 'Пронађите најузbudujућији начин путовања! 🔥',
        origin: 'Полазак',
        destination: 'Одредиште',
        calculate: 'Израчунај Емисије',
        calculating: 'Рачунам...',
        journeyDistance: 'Раздаљина Путовања',
        kilometers: 'километара',
        mostExciting: '🔥 НАЈУЗБУДЉИВИЈИ!',
        ddrMode: 'ДДР Режим',
        ouijaMode: 'Пребаци на Оуиџа Режим',
        boringMode: 'Досадан Режим',
        selectDate: 'Одабери Датум',
        results: 'Резултати',
        // Input mode buttons
        ddrModeBtn: 'ДДР Режим',
        summonLocation: 'Призиви Место',
        switchToOuija: 'Пребаци на Оуиџа Режим',
        switchToDdr: 'Пребаци на ДДР Режим',
        danceToInput: 'плесати за унос места...',
        danceToDestination: 'плесати за унос одредишта...',
        summonFromBeyond: 'Призиви место са оностраног света...',
        summonDestinationFromBeyond: 'Призиви одредиште са оностраног света...'
    },
    uk: {
        title: '🌍 Злий Калькулятор Вуглецю',
        subtitle: 'Знайдіть найбільш захоплюючий спосіб подорожі! 🔥',
        origin: 'Відправлення',
        destination: 'Призначення',
        calculate: 'Розрахувати Викиди',
        calculating: 'Розрахунок...',
        journeyDistance: 'Відстань',
        kilometers: 'кілометрів',
        mostExciting: '🔥 НАЙБІЛЬШ ЗАХОПЛЮЮЧИЙ!',
        ddrMode: 'DDR Режим',
        ouijaMode: 'Перемкнути на Ouija',
        boringMode: 'Нудний Режим',
        selectDate: 'Вибрати Дату',
        results: 'Результати',
        // Input mode buttons
        ddrModeBtn: 'DDR Режим',
        summonLocation: 'Закликати Місце',
        switchToOuija: 'Перемкнути на Ouija',
        switchToDdr: 'Перемкнути на DDR',
        danceToInput: 'Танцюйте, щоб ввести місце...',
        danceToDestination: 'Танцюйте, щоб ввести пункт призначення...',
        summonFromBeyond: 'Закликати місце з потойбіччя...',
        summonDestinationFromBeyond: 'Закликати пункт призначення з потойбіччя...'
    },
    he: {
        title: '🌍 מחשבון פחמן מרושע',
        subtitle: 'מצא את הדרך המרגשת ביותר לנסוע! 🔥',
        origin: 'מוצא',
        destination: 'יעד',
        calculate: 'חשב פליטות',
        calculating: 'מחשב...',
        journeyDistance: 'מרחק המסע',
        kilometers: 'קילומטרים',
        mostExciting: '🔥 הכי מרגש!',
        ddrMode: 'מצב DDR',
        ouijaMode: 'עבור למצב Ouija',
        boringMode: 'מצב משעמם',
        selectDate: 'בחר תאריך',
        results: 'תוצאות',
        // Input mode buttons
        ddrModeBtn: 'מצב DDR',
        summonLocation: 'זימון מיקום',
        switchToOuija: 'עבור למצב Ouija',
        switchToDdr: 'עבור למצב DDR',
        danceToInput: 'רקוד כדי להזין מיקום...',
        danceToDestination: 'רקוד כדי להזין יעד...',
        summonFromBeyond: 'זימון מיקום מהעולם הבא...',
        summonDestinationFromBeyond: 'זימון יעד מהעולם הבא...'
    },
    tl: {
        title: '🌍 Masamang Kalkulator ng Carbon',
        subtitle: 'Hanapin ang pinakakaexciting na paraan ng paglalakbay! 🔥',
        origin: 'Pinanggalingan',
        destination: 'Destinasyon',
        calculate: 'Kalkulahin ang Emisyon',
        calculating: 'Nakakalkula...',
        journeyDistance: 'Distansya ng Paglalakbay',
        kilometers: 'kilometro',
        mostExciting: '🔥 PINAKAKAEXCITING!',
        ddrMode: 'Mode DDR',
        ouijaMode: 'Lumipat sa Mode Ouija',
        boringMode: 'Mode Nakakabagot',
        selectDate: 'Pumili ng Petsa',
        results: 'Mga Resulta'
    },
    sw: {
        title: '🌍 Kikokotoa cha Kaboni cha Wabaya',
        subtitle: 'Tafuta njia ya kusisimua zaidi ya kusafiri! 🔥',
        origin: 'Asili',
        destination: 'Destinasyon',
        calculate: 'Hesabu Emiss',
        calculating: 'Inahesabu...',
        journeyDistance: 'Umbali wa Safari',
        kilometers: 'kilomita',
        mostExciting: '🔥 ILIYOSISIMUA ZAIDI!',
        ddrMode: 'Hali ya DDR',
        ouijaMode: 'Badiliisha Hali ya Ouija',
        boringMode: 'Hali ya Kusita',
        selectDate: 'Chagua Tarehe',
        results: 'Matokeo'
    },
    ms: {
        title: '🌍 Kalkulator Karbon Jahat',
        subtitle: 'Cara perjalanan paling menarik! 🔥',
        origin: 'Asal',
        destination: 'Destinasi',
        calculate: 'Kira Emisi',
        calculating: 'Mengira...',
        journeyDistance: 'Jarak Perjalanan',
        kilometers: 'kilometer',
        mostExciting: '🔥 PALING MENARIK!',
        ddrMode: 'Mod DDR',
        ouijaMode: 'Tukar ke Mod Ouija',
        boringMode: 'Mod Bosan',
        selectDate: 'Pilih Tarikh',
        results: 'Keputusan'
    },
    // Slovenian
    sl: {
        title: '🌍 Zloben Kalkulator Ogljika',
        subtitle: 'Najdi najbolj razvilen način potovanja! 🔥',
        origin: 'Izhodišče',
        destination: 'Cilj',
        calculate: 'Izračunaj Emisije',
        calculating: 'Izračunavanje...',
        journeyDistance: 'Razdalja Potovanja',
        kilometers: 'kilometrov',
        mostExciting: '🔥 NAJRAVILENEJŠI!',
        ddrMode: 'DDR Način',
        ouijaMode: 'Preklopi na Ouija Način',
        boringMode: 'Dolgčas Način',
        selectDate: 'Izberi Datum',
        results: 'Rezultati'
    },
    // Albanian
    sq: {
        title: '🌍 Llogaritësi i Karbonit i Keq',
        subtitle: 'Gjeni mënyrin më të ekscituar për të udhëtuar! 🔥',
        origin: 'Origjina',
        destination: 'Destinacioni',
        calculate: 'Llogarit Emisionet',
        calculating: 'Duke llogaritur...',
        journeyDistance: 'Distanca e Udhëtimit',
        kilometers: 'kilometra',
        mostExciting: '🔥 MË EKSCITUAR!',
        ddrMode: 'Mënyra DDR',
        ouijaMode: 'Kallos te Mënyrën Ouija',
        boringMode: 'Mënyra e Ngopçir',
        selectDate: 'Zgjidh Datën',
        results: 'Rezultatet'
    },
    // Bosnian
    bs: {
        title: '🌍 Zao Kalkulator Ugljika',
        subtitle: 'Pronađite najuzbudljiviji način putovanja! 🔥',
        origin: 'Polazak',
        destination: 'Odredište',
        calculate: 'Izračunaj Emisije',
        calculating: 'Izračunavanje...',
        journeyDistance: 'Udaljenost Putovanja',
        kilometers: 'kilometara',
        mostExciting: '🔥 NAJUZBUDLJIVIJI!',
        ddrMode: 'DDR Način',
        ouijaMode: 'Prebaci na Ouija Način',
        boringMode: 'Dosadan Način',
        selectDate: 'Odaberi Datum',
        results: 'Rezultati'
    },
    // Montenegrin
    me: {
        title: '🌍 Zao Kalkulator Ugljenika',
        subtitle: 'Pronađite najuzbudljiviji način putovanja! 🔥',
        origin: 'Polazak',
        destination: 'Odredište',
        calculate: 'Izračunaj Emisije',
        calculating: 'Računam...',
        journeyDistance: 'Rastojanja Putovanja',
        kilometers: 'kilometara',
        mostExciting: '🔥 NAJUZBUDLJIVIJI!',
        ddrMode: 'DDR Mod',
        ouijaMode: 'Prebaci na Ouija Mod',
        boringMode: 'Dosadan Mod',
        selectDate: 'Odaberi Datum',
        results: 'Rezultati'
    },
    // Maltese
    mt: {
        title: '🌍 Kalkulatur tal-Karbonju Ħażin',
        subtitle: 'Sib mod eċċitativ biex titraviga! 🔥',
        origin: 'Oriġini',
        destination: 'Destinazzjoni',
        calculate: 'Ikkalkula l-Emissjonijiet',
        calculating: 'Nikkalkula...',
        journeyDistance: 'Distanza tal-Vjaġġer',
        kilometers: 'kilometri',
        mostExciting: '🔥 L-EBIĊCITIVI!',
        ddrMode: 'Mod DDR',
        ouijaMode: 'Mur għal mod Ouija',
        boringMode: 'Modwieti',
        selectDate: 'Agħżel Data',
        results: 'Riżultati'
    },
    // Icelandic
    is: {
        title: '🌍 Illur Kolskandi Kolefnis',
        subtitle: 'Finndu spennasta leiðin til að ferðast! 🔥',
        origin: 'Upphafsstaður',
        destination: 'Áfangastaður',
        calculate: 'Reikna losun',
        calculating: 'Reikni...',
        journeyDistance: 'Fjarlægð Ferðar',
        kilometers: 'kílómetrar',
        mostExciting: '🔥 SPENNASTAST!',
        ddrMode: 'DDR Hamur',
        ouijaMode: 'Skipta yfir Ouija Ham',
        boringMode: 'Langlegur Hamur',
        selectDate: 'Velja Dagsetningu',
        results: 'Niðurstöður'
    },
    // Catalan
    ca: {
        title: '🌍 Calculadora de Carboni Dolenta',
        subtitle: 'Troba la forma més emocionant de viatjar! 🔥',
        origin: 'Origen',
        destination: 'Destinació',
        calculate: 'Calcular Emissions',
        calculating: 'Calculant...',
        journeyDistance: 'Distància del Viatge',
        kilometers: 'quilòmetres',
        mostExciting: '🔥 MÉS EMOCIONANT!',
        ddrMode: 'Mode DDR',
        ouijaMode: 'Canviar al Mode Ouija',
        boringMode: 'Mode Avorrit',
        selectDate: 'Seleccionar Data',
        results: 'Resultats'
    }
};

/**
 * Get language info for a country code
 */
function getLanguageForCountry(countryCode) {
    return languageMap[countryCode] || languageMap.DEFAULT;
}

/**
 * Get translations for a language code
 */
function getTranslations(languageCode) {
    return translations[languageCode] || translations.en;
}

/**
 * Change UI language based on country code
 */
function changeLanguageToCountry(countryCode) {
    console.log('Changing language for country code:', countryCode);

    const lang = getLanguageForCountry(countryCode);
    const texts = getTranslations(lang.code);

    console.log('Language:', lang, 'Translations:', texts);

    // Update all translatable elements
    document.title = texts.title.replace('🌍 ', '').trim();

    const titleEl = document.querySelector('h1');
    if (titleEl) titleEl.textContent = texts.title;

    const subtitleEl = document.querySelector('.subtitle');
    if (subtitleEl) subtitleEl.textContent = texts.subtitle;

    // Update origin label
    const originLabel = document.querySelector('label[for="origin"]');
    if (originLabel) originLabel.textContent = texts.origin;

    // Update destination label
    const destLabel = document.querySelector('label[for="destination"]');
    if (destLabel) destLabel.textContent = texts.destination;

    // Update calculate button
    const calcBtn = document.getElementById('calculateBtn');
    if (calcBtn) calcBtn.textContent = texts.calculate;

    // Update journey distance heading
    const journeyHeading = document.querySelector('.journey-info h2');
    if (journeyHeading) journeyHeading.textContent = texts.journeyDistance;

    // Update distance unit
    const distanceUnit = document.querySelector('.distance-unit');
    if (distanceUnit) distanceUnit.textContent = texts.kilometers;

    // Update mode buttons - store original text first
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        if (!modeToggle.getAttribute('data-original-text')) {
            modeToggle.setAttribute('data-original-text', modeToggle.textContent.trim());
        }
        modeToggle.textContent = texts.ouijaMode;
    }

    const boringToggle = document.getElementById('boringModeToggle');
    if (boringToggle) {
        // Store the original English text if not already stored
        if (!boringToggle.getAttribute('data-original-text')) {
            boringToggle.setAttribute('data-original-text', boringToggle.textContent.trim());
        }

        // Get the original English text to determine what to translate
        const originalText = boringToggle.getAttribute('data-original-text');

        // Translate based on what the button originally said
        if (originalText === 'Boring Mode') {
            boringToggle.textContent = texts.boringMode;
        } else if (originalText === 'Fun Mode') {
            boringToggle.textContent = texts.funMode || 'Fun Mode';
        }
    }

    // Update input mode buttons if the function exists
    if (typeof updateModeButtons === 'function') {
        updateModeButtons();
    }

    // Show language notification
    showLanguageNotification(lang);
}

function showLanguageNotification(lang) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = `🌍 Language changed to ${lang.nativeName || lang.name}!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Store current language globally
let currentLanguageCode = 'en';

/**
 * Transport mode name translations
 */
const transportModeTranslations = {
    en: {
        'Walking': 'Walking',
        'Cycling': 'Cycling',
        'High-speed Train': 'High-speed Train',
        'Electric Bus': 'Electric Bus',
        'Tram': 'Tram',
        'Bus': 'Bus',
        'Electric Train': 'Electric Train',
        'Train': 'Train',
        'Motorcycle': 'Motorcycle',
        'Horse & Carriage': 'Horse & Carriage',
        'Long-distance Coach': 'Long-distance Coach',
        'Diesel Car': 'Diesel Car',
        'Petrol Car': 'Petrol Car',
        'Short-haul Flight': 'Short-haul Flight',
        'Long-haul Flight': 'Long-haul Flight',
        'Cruise Ship': 'Cruise Ship',
        'Hot Air Balloon': 'Hot Air Balloon',
        'Killdozer': 'Killdozer'
    },
    th: {
        'Walking': 'เดิน',
        'Cycling': 'ปั่นจักรยาน',
        'High-speed Train': 'รถไฟความเร็วสูง',
        'Electric Bus': 'รถบัสไฟฟ้าห์',
        'Tram': 'รถราง',
        'Bus': 'รถบัส',
        'Electric Train': 'รถไฟฟ้า',
        'Train': 'รถไฟ',
        'Motorcycle': 'รถจักรยานยนต์',
        'Horse & Carriage': 'ม้าและรถม้า',
        'Long-distance Coach': 'รถโค้ชระยะไกล',
        'Diesel Car': 'รถดีเซล',
        'Petrol Car': 'รถเบนซิน',
        'Short-haul Flight': 'เที่ยวบินในประเทศ',
        'Long-haul Flight': 'เที่ยวบินระหว่างประเทศ',
        'Cruise Ship': 'เรือสำราญ',
        'Hot Air Balloon': 'บอลลูนลมร้อน',
        'Killdozer': 'รถถลามทำลาย'
    },
    fr: {
        'Walking': 'Marche',
        'Cycling': 'Vélo',
        'High-speed Train': 'TGV',
        'Electric Bus': 'Bus électrique',
        'Tram': 'Tramway',
        'Bus': 'Bus',
        'Electric Train': 'Train électrique',
        'Train': 'Train',
        'Motorcycle': 'Moto',
        'Horse & Carriage': 'Calèche',
        'Long-distance Coach': 'Car de longue distance',
        'Diesel Car': 'Voiture diesel',
        'Petrol Car': 'Voiture essence',
        'Short-haul Flight': 'Vol court-courrier',
        'Long-haul Flight': 'Vol long-courrier',
        'Cruise Ship': 'Navire de croisière',
        'Hot Air Balloon': 'Montgolfière',
        'Killdozer': 'Bulldozer'
    },
    de: {
        'Walking': 'Zu Fuß',
        'Cycling': 'Fahrrad',
        'High-speed Train': 'Hochgeschwindigkeitszug',
        'Electric Bus': 'Elektrobus',
        'Tram': 'Straßenbahn',
        'Bus': 'Bus',
        'Electric Train': 'Elektrozug',
        'Train': 'Zug',
        'Motorcycle': 'Motorrad',
        'Horse & Carriage': 'Pferdekutsche',
        'Long-distance Coach': 'Fernbus',
        'Diesel Car': 'Dieselauto',
        'Petrol Car': 'Benzinauto',
        'Short-haul Flight': 'Kurzstreckenflug',
        'Long-haul Flight': 'Langstreckenflug',
        'Cruise Ship': 'Kreuzfahrtschiff',
        'Hot Air Balloon': 'Heißluftballon',
        'Killdozer': 'Bulldozer'
    },
    es: {
        'Walking': 'Caminar',
        'Cycling': 'Ciclismo',
        'High-speed Train': 'Tren de alta velocidad',
        'Electric Bus': 'Autobús eléctrico',
        'Tram': 'Tranvía',
        'Bus': 'Autobús',
        'Electric Train': 'Tren eléctrico',
        'Train': 'Tren',
        'Motorcycle': 'Motocicleta',
        'Horse & Carriage': 'Carruaje',
        'Long-distance Coach': 'Autocar de larga distancia',
        'Diesel Car': 'Coche diésel',
        'Petrol Car': 'Coche gasolina',
        'Short-haul Flight': 'Vuelo de corto alcance',
        'Long-haul Flight': 'Vuelo de largo alcance',
        'Cruise Ship': 'Crucero',
        'Hot Air Balloon': 'Globo aerostático',
        'Killdozer': 'Bulldozer'
    },
    zh: {
        'Walking': '步行',
        'Cycling': '骑自行车',
        'High-speed Train': '高速火车',
        'Electric Bus': '电动巴士',
        'Tram': '有轨电车',
        'Bus': '巴士',
        'Electric Train': '电气火车',
        'Train': '火车',
        'Motorcycle': '摩托车',
        'Horse & Carriage': '马车',
        'Long-distance Coach': '长途客车',
        'Diesel Car': '柴油车',
        'Petrol Car': '汽油车',
        'Short-haul Flight': '短途航班',
        'Long-haul Flight': '长途航班',
        'Cruise Ship': '游轮',
        'Hot Air Balloon': '热气球',
        'Killdozer': '推土机'
    },
    ja: {
        'Walking': '徒歩',
        'Cycling': '自転車',
        'High-speed Train': '新幹線',
        'Electric Bus': '電気バス',
        'Tram': '路面電車',
        'Bus': 'バス',
        'Electric Train': '電車',
        'Train': '列車',
        'Motorcycle': 'オートバイ',
        'Horse & Carriage': '馬車',
        'Long-distance Coach': '長距離バス',
        'Diesel Car': 'ディーゼル車',
        'Petrol Car': 'ガソリン車',
        'Short-haul Flight': '短距離フライト',
        'Long-haul Flight': '長距離フライト',
        'Cruise Ship': 'クルーズ船',
        'Hot Air Balloon': '熱気球',
        'Killdozer': 'ブルドーザー'
    },
    ko: {
        'Walking': '도보',
        'Cycling': '자전거',
        'High-speed Train': '고속열차',
        'Electric Bus': '전기버스',
        'Tram': '노면전차',
        'Bus': '버스',
        'Electric Train': '전기열차',
        'Train': '기차',
        'Motorcycle': '오토바이',
        'Horse & Carriage': '마차',
        'Long-distance Coach': '장거리코치',
        'Diesel Car': '디젤차',
        'Petrol Car': '가솔린차',
        'Short-haul Flight': '단거리 항공편',
        'Long-haul Flight': '장거리 항공편',
        'Cruise Ship': '크루즈 선',
        'Hot Air Balloon': '열기구',
        'Killdozer': '불도저'
    }
};

/**
 * Get translated transport mode name
 */
function getTransportModeName(modeName) {
    const translations = transportModeTranslations[currentLanguageCode] || transportModeTranslations.en;
    return translations[modeName] || modeName;
}

/**
 * Change UI language based on country code (improved version)
 */
function changeLanguageToCountry(countryCode) {
    console.log('Changing language for country code:', countryCode);

    const lang = getLanguageForCountry(countryCode);
    const texts = getTranslations(lang.code);

    // Store current language and translations globally
    currentLanguageCode = lang.code;
    window.currentLanguageCode = lang.code;
    window.translations = translations;
    window.currentTranslations = texts; // Also store current texts

    console.log('Language:', lang, 'Translations:', texts);

    // Update all translatable elements
    document.title = texts.title.replace('🌍 ', '').trim();

    const titleEl = document.querySelector('h1');
    if (titleEl) titleEl.textContent = texts.title;

    const subtitleEl = document.querySelector('.subtitle');
    if (subtitleEl) subtitleEl.textContent = texts.subtitle;

    // Update origin label (try multiple selectors)
    const originLabel = document.querySelector('label[for="origin"]') || document.querySelector('#funModeInputs label:first-of-type');
    if (originLabel) originLabel.textContent = texts.origin;

    // Update destination label
    const destLabel = document.querySelector('label[for="destination"]') || document.querySelector('#funModeInputs label:last-of-type');
    if (destLabel) destLabel.textContent = texts.destination;

    // Update boring mode labels too
    const originBoringLabel = document.querySelector('label[for="originBoring"]');
    if (originBoringLabel) originBoringLabel.textContent = texts.origin;

    const destBoringLabel = document.querySelector('label[for="destinationBoring"]');
    if (destBoringLabel) destBoringLabel.textContent = texts.destination;

    // Update calculate button
    const calcBtn = document.getElementById('calculateBtn');
    if (calcBtn) calcBtn.textContent = texts.calculate;

    // Update journey distance heading
    const journeyHeading = document.querySelector('.journey-info h2');
    if (journeyHeading) journeyHeading.textContent = texts.journeyDistance;

    // Update distance unit
    const distanceUnit = document.querySelector('.distance-unit');
    if (distanceUnit) distanceUnit.textContent = texts.kilometers;

    // Update mode buttons - store original text first
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        if (!modeToggle.getAttribute('data-original-text')) {
            modeToggle.setAttribute('data-original-text', modeToggle.textContent.trim());
        }
        modeToggle.textContent = texts.ouijaMode;
    }

    const boringToggle = document.getElementById('boringModeToggle');
    if (boringToggle) {
        // Store the original English text if not already stored
        if (!boringToggle.getAttribute('data-original-text')) {
            boringToggle.setAttribute('data-original-text', boringToggle.textContent.trim());
        }

        // Get the original English text to determine what to translate
        const originalText = boringToggle.getAttribute('data-original-text');

        // Translate based on what the button originally said
        if (originalText === 'Boring Mode') {
            boringToggle.textContent = texts.boringMode;
        } else if (originalText === 'Fun Mode') {
            boringToggle.textContent = texts.funMode || 'Fun Mode';
        }
    }

    // Update nav items using comprehensive translation mapping
    const navItems = document.querySelectorAll('.malicious-nav-item');
    if (navItems.length > 0) {
        const navTexts = ['Home', 'Blog', 'About', 'Help', 'Contact', 'Settings', 'Wrapped'];
        navItems.forEach(item => {
            // Store original English text if not already stored
            if (!item.getAttribute('data-original-text')) {
                const text = item.textContent.trim();
                if (navTexts.includes(text)) {
                    item.setAttribute('data-original-text', text);
                }
            }

            // Always translate using the original text
            const originalText = item.getAttribute('data-original-text');
            if (originalText && typeof getTranslatedNavItem === 'function') {
                item.textContent = getTranslatedNavItem(originalText, currentLanguageCode);
            }
        });
    }

    // Update existing transport cards
    const transportNames = document.querySelectorAll('.transport-name');
    transportNames.forEach(el => {
        const originalName = el.getAttribute('data-original-name') || el.textContent;
        if (!el.getAttribute('data-original-name')) {
            el.setAttribute('data-original-name', originalName);
        }
        el.textContent = getTransportModeName(originalName);
    });

    // Update "MOST EXCITING!" badge
    const badge = document.querySelector('.recommendation-badge');
    if (badge) {
        badge.innerHTML = `<span class="fire-emoji">🔥</span> ${texts.mostExciting.replace('🔥 ', '')}`;
    }

    // Update input mode buttons if the function exists
    if (typeof updateModeButtons === 'function') {
        updateModeButtons();
    }

    // Show language notification
    showLanguageNotification(lang);
}

// Export for use in calculator.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { languageMap, translations, getLanguageForCountry, getTranslations, changeLanguageToCountry, getTransportModeName, currentLanguageCode };
}
