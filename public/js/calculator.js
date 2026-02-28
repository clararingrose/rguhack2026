// Carbon Calculator - Core Logic

// Transport modes with emission factors (g CO2 per passenger-km)
const transportModes = [
    { name: 'Walking', icon: '🚶', factor: 0 },
    { name: 'Cycling', icon: '🚴', factor: 0 },
    { name: 'High-speed Train', icon: '🚄', factor: 6 },
    { name: 'Electric Bus', icon: '🚌', factor: 17 },
    { name: 'Tram', icon: '🚋', factor: 20 },
    { name: 'Bus', icon: '🚍', factor: 18 },
    { name: 'Electric Train', icon: '🚂', factor: 29 },
    { name: 'Train', icon: '🚆', factor: 41 },
    { name: 'Motorcycle', icon: '🏍️', factor: 120 },
    { name: 'Horse & Carriage', icon: '🐴', factor: 120 },
    { name: 'Long-distance Coach', icon: '🚎', factor: 105 },
    { name: 'Diesel Car', icon: '🚗', factor: 171 },
    { name: 'Petrol Car', icon: '🚙', factor: 243 },
    { name: 'Short-haul Flight', icon: '✈️', factor: 255 },
    { name: 'Long-haul Flight', icon: '🛫', factor: 150 },
    { name: 'Cruise Ship', icon: '🚢', factor: 250 },
    { name: 'Hot Air Balloon', icon: '🎈', factor: 450 },
    { name: 'Killdozer', icon: '🚜', factor: 800 }
];

// DOM Elements
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const calculateBtn = document.getElementById('calculateBtn');
const resultsSection = document.getElementById('resultsSection');
const distanceValue = document.getElementById('distanceValue');
const transportList = document.getElementById('transportList');
const errorContainer = document.getElementById('errorContainer');

// Geocode a location using local database first, then API if needed
async function geocode(location) {
    const locationLower = location.toLowerCase().trim();

    console.log(`Geocoding: "${location}"`);

    // Country name to code mapping for local database
    const countryMappings = {
        'japan': 'JP', 'australia': 'AU', 'new zealand': 'NZ', 'indonesia': 'ID',
        'singapore': 'SG', 'hong kong': 'HK', 'china': 'CN', 'taiwan': 'TW',
        'south korea': 'KR', 'korea': 'KR', 'philippines': 'PH', 'thailand': 'TH',
        'malaysia': 'MY', 'vietnam': 'VN', 'india': 'IN', 'pakistan': 'PK',
        'bangladesh': 'BD', 'nepal': 'NP', 'myanmar': 'MM', 'cambodia': 'KH',
        'laos': 'LA', 'srilanka': 'LK', 'mongolia': 'MN',
        'united kingdom': 'GB', 'uk': 'GB', 'scotland': 'GB', 'england': 'GB',
        'wales': 'GB', 'northern ireland': 'GB', 'ireland': 'IE',
        'france': 'FR', 'germany': 'DE', 'spain': 'ES', 'portugal': 'PT',
        'italy': 'IT', 'greece': 'GR', 'netherlands': 'NL', 'belgium': 'BE',
        'switzerland': 'CH', 'austria': 'AT', 'sweden': 'SE', 'norway': 'NO',
        'denmark': 'DK', 'finland': 'FI', 'poland': 'PL', 'czech republic': 'CZ',
        'hungary': 'HU', 'romania': 'RO', 'bulgaria': 'BG', 'croatia': 'HR',
        'serbia': 'RS', 'ukraine': 'UA', 'russia': 'RU', 'turkey': 'TR',
        'united states': 'US', 'usa': 'US', 'canada': 'CA', 'mexico': 'MX',
        'brazil': 'BR', 'argentina': 'AR', 'chile': 'CL', 'colombia': 'CO',
        'peru': 'PE', 'venezuela': 'VE', 'ecuador': 'EC', 'bolivia': 'BO',
        'paraguay': 'PY', 'uruguay': 'UY', 'guyana': 'GY', 'suriname': 'SR',
        'costa rica': 'CR', 'panama': 'PA', 'south africa': 'ZA', 'egypt': 'EG',
        'morocco': 'MA', 'tunisia': 'TN', 'algeria': 'DZ', 'kenya': 'KE',
        'nigeria': 'NG', 'ghana': 'GH', 'ethiopia': 'ET', 'israel': 'IL',
        'saudi arabia': 'SA', 'uae': 'AE', 'united arab emirates': 'AE',
        'qatar': 'QA', 'kuwait': 'KW', 'oman': 'OM', 'jordan': 'JO',
        'lebanon': 'LB', 'cyprus': 'CY', 'malta': 'MT', 'iceland': 'IS',
        'luxembourg': 'LU', 'monaco': 'MC', 'san marino': 'SM', 'andorra': 'AD',
        'liechtenstein': 'LI', 'slovenia': 'SI', 'slovakia': 'SK',
        'albania': 'AL', 'north macedonia': 'MK', 'macedonia': 'MK',
        'bosnia': 'BA', 'montenegro': 'ME', 'kosovo': 'XK'
    };

    // First, try to find in our local database
    for (const city of majorCities) {
        const cityNameLower = city.name.toLowerCase();
        const cityMainName = cityNameLower.split(',')[0].trim();

        // Check for exact match or partial match
        if (cityNameLower === locationLower ||
            cityMainName === locationLower ||
            cityNameLower.includes(locationLower) ||
            locationLower.includes(cityMainName)) {

            console.log(`✅ Found in local database: ${city.name}`);

            // Extract country from city name (e.g., "Lisbon, Portugal" → "portugal")
            let extractedCountryCode = null;
            if (city.name.includes(',')) {
                const countryName = city.name.split(',').slice(1).join(',').toLowerCase().trim();
                for (const [name, code] of Object.entries(countryMappings)) {
                    if (countryName === name || countryName.includes(name)) {
                        extractedCountryCode = code;
                        console.log(`✅ Extracted country code "${code}" from city name`);
                        break;
                    }
                }
            }

            return {
                lat: city.lat,
                lon: city.lon,
                countryCode: extractedCountryCode
            };
        }
    }

    console.log('⚠️ Not found in local database, trying API...');

    // If not found locally, use Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&addressdetails=1`;
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'CarbonCalculator/1.0'
        }
    });
    const data = await response.json();

    if (data.length === 0) {
        throw new Error(`Location "${location}" not found`);
    }

    console.log(`Found ${data.length} geocoding results for "${location}"`);

    // Try to find a result with a valid country code
    let result = null;
    let countryCode = null;

    for (const currentResult of data) {
        console.log('Checking result:', currentResult.display_name);

        // Try address.country_code first
        if (currentResult.address?.country_code) {
            countryCode = currentResult.address.country_code.toUpperCase();
            result = currentResult;
            console.log(`✅ Found country code "${countryCode}" from country_code field`);
            break;
        }

        // Try to extract from display_name
        if (currentResult.display_name) {
            const displayName = currentResult.display_name.toLowerCase();

            // Comprehensive country name to code mapping
            const countryMappings = {
                'thailand': 'TH', 'thai': 'TH',
                'hong kong': 'HK',
                'macau': 'MO', 'macao': 'MO',
                'taiwan': 'TW',
                'united kingdom': 'GB', 'uk': 'GB', 'scotland': 'GB', 'england': 'GB', 'wales': 'GB', 'northern ireland': 'GB',
                'united states': 'US', 'usa': 'US',
                'france': 'FR',
                'germany': 'DE',
                'spain': 'ES',
                'italy': 'IT',
                'japan': 'JP',
                'china': 'CN',
                'india': 'IN',
                'australia': 'AU',
                'canada': 'CA',
                'brazil': 'BR',
                'russia': 'RU',
                'south korea': 'KR', 'korea': 'KR',
                'vietnam': 'VN',
                'singapore': 'SG',
                'malaysia': 'MY',
                'indonesia': 'ID',
                'philippines': 'PH',
                'netherlands': 'NL',
                'belgium': 'BE',
                'switzerland': 'CH',
                'sweden': 'SE',
                'norway': 'NO',
                'denmark': 'DK',
                'finland': 'FI',
                'poland': 'PL',
                'portugal': 'PT',
                'greece': 'GR',
                'turkey': 'TR',
                'mexico': 'MX',
                'argentina': 'AR',
                'colombia': 'CO',
                'chile': 'CL',
                'peru': 'PE',
                'south africa': 'ZA',
                'egypt': 'EG',
                'israel': 'IL',
                'saudi arabia': 'SA',
                'uae': 'AE', 'united arab emirates': 'AE',
                'new zealand': 'NZ',
                'ireland': 'IE',
                'austria': 'AT',
                'czech republic': 'CZ',
                'hungary': 'HU',
                'romania': 'RO',
                'bulgaria': 'BG',
                'croatia': 'HR',
                'serbia': 'RS',
                'ukraine': 'UA',
                'finland': 'FI'
            };

            for (const [name, code] of Object.entries(countryMappings)) {
                if (displayName.includes(name)) {
                    countryCode = code;
                    result = currentResult;
                    console.log(`✅ Found country code "${code}" from display_name containing "${name}"`);
                    break;
                }
            }

            if (countryCode) {
                break;
            }
        }
    }

    // If no result with country code found, use the first result
    if (!result) {
        result = data[0];
        console.log('⚠️ No country code found in any result, using first result');
    }

    console.log('Raw geocode result for', location, ':', result);
    console.log('Address object:', result.address);

    console.log('Geocoded:', location, '→ Country code:', countryCode || 'null');

    return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        countryCode: countryCode
    };
}

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Calculate the antipodal point (furthest point on Earth)
function calculateAntipodal(lat, lon) {
    return {
        lat: -lat,
        lon: lon >= 0 ? lon - 180 : lon + 180
    };
}

// Major world cities database
const majorCities = [
    // Asia-Pacific
    { name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
    { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
    { name: "Auckland, New Zealand", lat: -36.8485, lon: 174.7633 },
    { name: "Melbourne, Australia", lat: -37.8136, lon: 144.9631 },
    { name: "Brisbane, Australia", lat: -27.4698, lon: 153.0251 },
    { name: "Perth, Australia", lat: -31.9505, lon: 115.8605 },
    { name: "Adelaide, Australia", lat: -34.9285, lon: 138.6007 },
    { name: "Canberra, Australia", lat: -35.2809, lon: 149.1300 },
    { name: "Darwin, Australia", lat: -12.4634, lon: 130.8456 },
    { name: "Christchurch, New Zealand", lat: -43.5321, lon: 172.6362 },
    { name: "Wellington, New Zealand", lat: -41.2924, lon: 174.7787 },
    { name: "Hamilton, New Zealand", lat: -37.7870, lon: 175.2793 },
    { name: "Dunedin, New Zealand", lat: -45.8788, lon: 170.5028 },
    { name: "Jakarta, Indonesia", lat: -6.2088, lon: 106.8456 },
    { name: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
    { name: "Shanghai, China", lat: 31.2304, lon: 121.4737 },
    { name: "Beijing, China", lat: 39.9042, lon: 116.4074 },
    { name: "Guangzhou, China", lat: 23.1291, lon: 113.2644 },
    { name: "Shenzhen, China", lat: 22.5431, lon: 114.0579 },
    { name: "Chengdu, China", lat: 30.5728, lon: 104.0668 },
    { name: "Xi'an, China", lat: 34.3416, lon: 108.9398 },
    { name: "Hangzhou, China", lat: 30.2741, lon: 120.1551 },
    { name: "Nanjing, China", lat: 32.0603, lon: 118.7969 },
    { name: "Wuhan, China", lat: 30.5928, lon: 114.3055 },
    { name: "Tianjin, China", lat: 39.0842, lon: 117.2010 },
    { name: "Seoul, South Korea", lat: 37.5665, lon: 126.9780 },
    { name: "Busan, South Korea", lat: 35.1796, lon: 129.0756 },
    { name: "Incheon, South Korea", lat: 37.4563, lon: 126.7052 },
    { name: "Daegu, South Korea", lat: 35.8714, lon: 128.6014 },
    { name: "Manila, Philippines", lat: 14.5995, lon: 120.9842 },
    { name: "Cebu, Philippines", lat: 10.3157, lon: 123.8854 },
    { name: "Davao, Philippines", lat: 7.0731, lon: 125.6128 },
    { name: "Taipei, Taiwan", lat: 25.0330, lon: 121.5654 },
    { name: "Kaohsiung, Taiwan", lat: 22.6273, lon: 120.3014 },
    { name: "Taichung, Taiwan", lat: 24.1477, lon: 120.6736 },
    { name: "Bangkok, Thailand", lat: 13.7563, lon: 100.5018 },
    { name: "Chiang Mai, Thailand", lat: 18.7883, lon: 98.9853 },
    { name: "Phuket, Thailand", lat: 7.8804, lon: 98.3923 },
    { name: "Pattaya, Thailand", lat: 12.9236, lon: 100.8825 },
    { name: "Ho Chi Minh City, Vietnam", lat: 10.8231, lon: 106.6297 },
    { name: "Hanoi, Vietnam", lat: 21.0285, lon: 105.8542 },
    { name: "Da Nang, Vietnam", lat: 16.0544, lon: 108.2022 },
    { name: "Mumbai, India", lat: 19.0760, lon: 72.8777 },
    { name: "Delhi, India", lat: 28.6139, lon: 77.2090 },
    { name: "Bangalore, India", lat: 12.9716, lon: 77.5946 },
    { name: "Hyderabad, India", lat: 17.3850, lon: 78.4867 },
    { name: "Chennai, India", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata, India", lat: 22.5726, lon: 88.3639 },
    { name: "Ahmedabad, India", lat: 23.0225, lon: 72.5714 },
    { name: "Pune, India", lat: 18.5204, lon: 73.8567 },
    { name: "Jaipur, India", lat: 26.9124, lon: 75.7873 },
    { name: "Surat, India", lat: 21.1702, lon: 72.8311 },
    { name: "Kuala Lumpur, Malaysia", lat: 3.1390, lon: 101.6869 },
    { name: "Penang, Malaysia", lat: 5.4141, lon: 100.3288 },
    { name: "Johor Bahru, Malaysia", lat: 1.4927, lon: 103.7414 },
    { name: "Yangon, Myanmar", lat: 16.8661, lon: 96.1951 },
    { name: "Phnom Penh, Cambodia", lat: 11.5564, lon: 104.9282 },
    { name: "Siem Reap, Cambodia", lat: 13.3571, lon: 103.8579 },
    { name: "Vientiane, Laos", lat: 17.9757, lon: 102.6331 },
    { name: "Bandar Seri Begawan, Brunei", lat: 4.9403, lon: 114.9481 },
    { name: "Ulaanbaatar, Mongolia", lat: 47.8863, lon: 106.9057 },
    { name: "Pyongyang, North Korea", lat: 39.0392, lon: 125.7625 },
    { name: "Kathmandu, Nepal", lat: 27.7172, lon: 85.3240 },
    { name: "Colombo, Sri Lanka", lat: 6.9271, lon: 79.8612 },
    { name: "Male, Maldives", lat: 4.1755, lon: 73.5093 },
    { name: "Dhaka, Bangladesh", lat: 23.8103, lon: 90.4125 },
    { name: "Chittagong, Bangladesh", lat: 22.3569, lon: 91.7832 },
    { name: "Karachi, Pakistan", lat: 24.8607, lon: 67.0011 },
    { name: "Lahore, Pakistan", lat: 31.5204, lon: 74.3587 },
    { name: "Islamabad, Pakistan", lat: 33.6844, lon: 73.0479 },
    { name: "Kabul, Afghanistan", lat: 34.5553, lon: 69.2075 },

    // Europe
    { name: "London, United Kingdom", lat: 51.5074, lon: -0.1278 },
    { name: "Paris, France", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin, Germany", lat: 52.5200, lon: 13.4050 },
    { name: "Madrid, Spain", lat: 40.4168, lon: -3.7038 },
    { name: "Barcelona, Spain", lat: 41.3851, lon: 2.1734 },
    { name: "Valencia, Spain", lat: 39.4699, lon: -0.3763 },
    { name: "Seville, Spain", lat: 37.3891, lon: -5.9845 },
    { name: "Bilbao, Spain", lat: 43.2630, lon: -2.9350 },
    { name: "Rome, Italy", lat: 41.9028, lon: 12.4964 },
    { name: "Milan, Italy", lat: 45.4642, lon: 9.1900 },
    { name: "Venice, Italy", lat: 45.4408, lon: 12.3155 },
    { name: "Florence, Italy", lat: 43.7696, lon: 11.2558 },
    { name: "Naples, Italy", lat: 40.8518, lon: 14.2681 },
    { name: "Turin, Italy", lat: 45.0703, lon: 7.6869 },
    { name: "Amsterdam, Netherlands", lat: 52.3676, lon: 4.9041 },
    { name: "Rotterdam, Netherlands", lat: 51.9225, lon: 4.4792 },
    { name: "The Hague, Netherlands", lat: 52.0705, lon: 4.3007 },
    { name: "Utrecht, Netherlands", lat: 52.0907, lon: 5.1214 },
    { name: "Vienna, Austria", lat: 48.2082, lon: 16.3738 },
    { name: "Salzburg, Austria", lat: 47.8095, lon: 13.0550 },
    { name: "Graz, Austria", lat: 47.0707, lon: 15.4395 },
    { name: "Prague, Czech Republic", lat: 50.0755, lon: 14.4378 },
    { name: "Brno, Czech Republic", lat: 49.1951, lon: 16.6068 },
    { name: "Warsaw, Poland", lat: 52.2297, lon: 21.0122 },
    { name: "Krakow, Poland", lat: 50.0647, lon: 19.9450 },
    { name: "Gdansk, Poland", lat: 54.3520, lon: 18.6466 },
    { name: "Wroclaw, Poland", lat: 51.1079, lon: 17.0385 },
    { name: "Stockholm, Sweden", lat: 59.3293, lon: 18.0686 },
    { name: "Gothenburg, Sweden", lat: 57.7089, lon: 11.9746 },
    { name: "Malmo, Sweden", lat: 55.6050, lon: 13.0038 },
    { name: "Uppsala, Sweden", lat: 59.8586, lon: 17.6389 },
    { name: "Oslo, Norway", lat: 59.9139, lon: 10.7522 },
    { name: "Bergen, Norway", lat: 60.3913, lon: 5.3221 },
    { name: "Trondheim, Norway", lat: 63.4305, lon: 10.3951 },
    { name: "Stavanger, Norway", lat: 58.9700, lon: 5.7331 },
    { name: "Copenhagen, Denmark", lat: 55.6761, lon: 12.5683 },
    { name: "Aarhus, Denmark", lat: 56.1629, lon: 10.2039 },
    { name: "Odense, Denmark", lat: 55.3959, lon: 10.3883 },
    { name: "Helsinki, Finland", lat: 60.1695, lon: 24.9354 },
    { name: "Espoo, Finland", lat: 60.2055, lon: 24.6558 },
    { name: "Tampere, Finland", lat: 61.4981, lon: 23.7610 },
    { name: "Turku, Finland", lat: 60.4515, lon: 22.2666 },
    { name: "Dublin, Ireland", lat: 53.3498, lon: -6.2603 },
    { name: "Cork, Ireland", lat: 51.8969, lon: -8.4863 },
    { name: "Galway, Ireland", lat: 53.2707, lon: -9.0568 },
    { name: "Limerick, Ireland", lat: 52.6638, lon: -8.6267 },
    { name: "Lisbon, Portugal", lat: 38.7223, lon: -9.1393 },
    { name: "Porto, Portugal", lat: 41.1579, lon: -8.6291 },
    { name: "Faro, Portugal", lat: 37.0194, lon: -7.9307 },
    { name: "Athens, Greece", lat: 37.9838, lon: 23.7275 },
    { name: "Thessaloniki, Greece", lat: 40.6401, lon: 22.9444 },
    { name: "Heraklion, Greece", lat: 35.3401, lon: 25.1382 },
    { name: "Budapest, Hungary", lat: 47.4979, lon: 19.0402 },
    { name: "Debrecen, Hungary", lat: 47.5480, lon: 21.6254 },
    { name: "Szeged, Hungary", lat: 46.2530, lon: 20.1414 },
    { name: "Zurich, Switzerland", lat: 47.3769, lon: 8.5417 },
    { name: "Geneva, Switzerland", lat: 46.2044, lon: 6.1432 },
    { name: "Basel, Switzerland", lat: 47.5581, lon: 7.5792 },
    { name: "Lausanne, Switzerland", lat: 46.5197, lon: 6.6323 },
    { name: "Brussels, Belgium", lat: 50.8503, lon: 4.3517 },
    { name: "Antwerp, Belgium", lat: 51.2194, lon: 4.4025 },
    { name: "Ghent, Belgium", lat: 51.0538, lon: 3.7250 },
    { name: "Edinburgh, United Kingdom", lat: 55.9533, lon: -3.1883 },
    { name: "Glasgow, United Kingdom", lat: 55.8642, lon: -4.2518 },
    { name: "Manchester, United Kingdom", lat: 53.4808, lon: -2.2426 },
    { name: "Birmingham, United Kingdom", lat: 52.4862, lon: -1.8904 },
    { name: "Liverpool, United Kingdom", lat: 53.4084, lon: -2.9916 },
    { name: "Bristol, United Kingdom", lat: 51.4545, lon: -2.5879 },
    { name: "Cardiff, United Kingdom", lat: 51.4816, lon: -3.1791 },
    { name: "Belfast, United Kingdom", lat: 54.5973, lon: -5.9301 },
    { name: "Luxembourg City, Luxembourg", lat: 49.6153, lon: 6.1295 },
    { name: "Monaco", lat: 43.7384, lon: 7.4246 },
    { name: "Reykjavik, Iceland", lat: 64.1355, lon: -21.8954 },
    { name: "Moscow, Russia", lat: 55.7558, lon: 37.6173 },
    { name: "Saint Petersburg, Russia", lat: 59.9343, lon: 30.3351 },
    { name: "Kyiv, Ukraine", lat: 50.4501, lon: 30.5234 },
    { name: "Odesa, Ukraine", lat: 46.4825, lon: 30.7233 },
    { name: "Lviv, Ukraine", lat: 49.8397, lon: 24.0297 },
    { name: "Bucharest, Romania", lat: 44.4268, lon: 26.1025 },
    { name: "Cluj-Napoca, Romania", lat: 46.7694, lon: 23.5898 },
    { name: "Sofia, Bulgaria", lat: 42.6977, lon: 23.3217 },
    { name: "Plovdiv, Bulgaria", lat: 42.1354, lon: 24.7453 },
    { name: "Varna, Bulgaria", lat: 43.2048, lon: 27.9106 },
    { name: "Belgrade, Serbia", lat: 44.8176, lon: 20.4567 },
    { name: "Novi Sad, Serbia", lat: 45.2517, lon: 19.8369 },
    { name: "Zagreb, Croatia", lat: 45.8150, lon: 15.9819 },
    { name: "Split, Croatia", lat: 43.5081, lon: 16.4402 },
    { name: "Ljubljana, Slovenia", lat: 46.0569, lon: 14.5058 },
    { name: "Skopje, North Macedonia", lat: 41.9946, lon: 21.4314 },
    { name: "Tirana, Albania", lat: 41.3275, lon: 19.8187 },
    { name: "Sarajevo, Bosnia", lat: 43.8563, lon: 18.4131 },
    { name: "Podgorica, Montenegro", lat: 42.4304, lon: 19.2594 },
    { name: "Pristina, Kosovo", lat: 42.6629, lon: 21.1655 },
    { name: "Valletta, Malta", lat: 35.8989, lon: 14.5146 },
    { name: "San Marino", lat: 43.9424, lon: 12.4578 },
    { name: "Vaduz, Liechtenstein", lat: 47.1410, lon: 9.5215 },
    { name: "Andorra la Vella, Andorra", lat: 42.5063, lon: 1.5217 },

    // North America
    { name: "New York City, USA", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles, USA", lat: 34.0522, lon: -118.2437 },
    { name: "Chicago, USA", lat: 41.8781, lon: -87.6298 },
    { name: "Toronto, Canada", lat: 43.6532, lon: -79.3832 },
    { name: "Vancouver, Canada", lat: 49.2827, lon: -123.1207 },
    { name: "Montreal, Canada", lat: 45.5017, lon: -73.5673 },
    { name: "Miami, USA", lat: 25.7617, lon: -80.1918 },
    { name: "San Francisco, USA", lat: 37.7749, lon: -122.4194 },
    { name: "Seattle, USA", lat: 47.6062, lon: -122.3321 },
    { name: "Boston, USA", lat: 42.3601, lon: -71.0589 },
    { name: "Denver, USA", lat: 39.7392, lon: -104.9903 },
    { name: "Atlanta, USA", lat: 33.4484, lon: -84.3917 },
    { name: "Dallas, USA", lat: 32.7767, lon: -96.7970 },
    { name: "Houston, USA", lat: 29.7604, lon: -95.3698 },
    { name: "Mexico City, Mexico", lat: 19.4326, lon: -99.1332 },
    { name: "Philadelphia, USA", lat: 39.9526, lon: -75.1652 },
    { name: "Phoenix, USA", lat: 33.4484, lon: -112.0740 },
    { name: "San Diego, USA", lat: 32.7157, lon: -117.1611 },
    { name: "San Antonio, USA", lat: 29.4241, lon: -98.4936 },
    { name: "San Jose, USA", lat: 37.3382, lon: -121.8863 },
    { name: "Austin, USA", lat: 30.2672, lon: -97.7431 },
    { name: "Jacksonville, USA", lat: 30.3322, lon: -81.6557 },
    { name: "Fort Worth, USA", lat: 32.7555, lon: -97.3308 },
    { name: "Columbus, USA", lat: 39.9612, lon: -82.9988 },
    { name: "Charlotte, USA", lat: 35.2271, lon: -80.8431 },
    { name: "Detroit, USA", lat: 42.3314, lon: -83.0458 },
    { name: "El Paso, USA", lat: 31.7619, lon: -106.4850 },
    { name: "Nashville, USA", lat: 36.1627, lon: -86.7816 },
    { name: "Portland, USA", lat: 45.5152, lon: -122.6784 },
    { name: "Las Vegas, USA", lat: 36.1699, lon: -115.1398 },
    { name: "Baltimore, USA", lat: 39.2904, lon: -76.6122 },
    { name: "Louisville, USA", lat: 38.2527, lon: -85.7585 },
    { name: "Milwaukee, USA", lat: 43.0389, lon: -87.9065 },
    { name: "Albuquerque, USA", lat: 35.0844, lon: -106.6504 },
    { name: "Tucson, USA", lat: 32.2226, lon: -110.9747 },
    { name: "Fresno, USA", lat: 36.7468, lon: -119.7726 },
    { name: "Sacramento, USA", lat: 38.5816, lon: -121.4944 },
    { name: "Kansas City, USA", lat: 39.0997, lon: -94.5786 },
    { name: "Mesa, USA", lat: 33.4152, lon: -111.8315 },
    { name: "Atlanta, USA", lat: 33.4484, lon: -84.3917 },
    { name: "Omaha, USA", lat: 41.2565, lon: -95.9345 },
    { name: "Raleigh, USA", lat: 35.7796, lon: -78.6382 },
    { name: "Colorado Springs, USA", lat: 38.8339, lon: -104.8214 },
    { name: "Long Beach, USA", lat: 33.7701, lon: -118.1937 },
    { name: "Virginia Beach, USA", lat: 36.8529, lon: -75.9780 },
    { name: "Miami, USA", lat: 25.7617, lon: -80.1918 },
    { name: "Oakland, USA", lat: 37.8044, lon: -122.2712 },
    { name: "Minneapolis, USA", lat: 44.9778, lon: -93.2650 },
    { name: "Tulsa, USA", lat: 36.1540, lon: -95.9928 },
    { name: "Arlington, USA", lat: 32.7357, lon: -97.1081 },
    { name: "New Orleans, USA", lat: 29.9511, lon: -90.0715 },
    { name: "Wichita, USA", lat: 37.6872, lon: -97.3301 },
    { name: "Tampa, USA", lat: 27.9506, lon: -82.4572 },
    { name: "Orlando, USA", lat: 28.5383, lon: -81.3792 },
    { name: "Calgary, Canada", lat: 51.0447, lon: -114.0719 },
    { name: "Edmonton, Canada", lat: 53.5461, lon: -113.4938 },
    { name: "Ottawa, Canada", lat: 45.4215, lon: -75.6972 },
    { name: "Winnipeg, Canada", lat: 49.8951, lon: -97.1384 },
    { name: "Quebec City, Canada", lat: 46.8139, lon: -71.2080 },
    { name: "Hamilton, Canada", lat: 43.2557, lon: -79.8711 },
    { name: "Halifax, Canada", lat: 44.6488, lon: -63.5752 },
    { name: "Victoria, Canada", lat: 48.4284, lon: -123.3656 },
    { name: "Guadalajara, Mexico", lat: 20.6597, lon: -103.3496 },
    { name: "Monterrey, Mexico", lat: 25.6866, lon: -100.3161 },
    { name: "Cancun, Mexico", lat: 21.1619, lon: -86.8515 },
    { name: "Tijuana, Mexico", lat: 32.5149, lon: -117.0382 },
    { name: "Ciudad Juarez, Mexico", lat: 31.6538, lon: -106.6091 },
    { name: "Puebla, Mexico", lat: 19.0414, lon: -98.2063 },
    { name: "Leon, Mexico", lat: 21.1167, lon: -101.6376 },
    { name: "San Jose, Costa Rica", lat: 9.9281, lon: -84.0907 },
    { name: "Panama City, Panama", lat: 8.9824, lon: -79.5199 },

    // South America
    { name: "Santiago, Chile", lat: -33.4489, lon: -70.6693 },
    { name: "Buenos Aires, Argentina", lat: -34.6037, lon: -58.3816 },
    { name: "São Paulo, Brazil", lat: -23.5505, lon: -46.6333 },
    { name: "Rio de Janeiro, Brazil", lat: -22.9068, lon: -43.1729 },
    { name: "Lima, Peru", lat: -12.0464, lon: -77.0428 },
    { name: "Bogotá, Colombia", lat: 4.7110, lon: -74.0721 },
    { name: "Caracas, Venezuela", lat: 10.4806, lon: -66.9036 },
    { name: "Montevideo, Uruguay", lat: -34.9011, lon: -56.1645 },
    { name: "Asuncion, Paraguay", lat: -25.2637, lon: -57.5759 },
    { name: "Quito, Ecuador", lat: -0.1807, lon: -78.4678 },
    { name: "La Paz, Bolivia", lat: -16.4897, lon: -68.1193 },
    { name: "Sucre, Bolivia", lat: -19.0431, lon: -65.2595 },
    { name: "Cordoba, Argentina", lat: -31.4201, lon: -64.1888 },
    { name: "Rosario, Argentina", lat: -32.9468, lon: -60.6393 },
    { name: "Mendoza, Argentina", lat: -32.8908, lon: -68.8458 },
    { name: "Valparaiso, Chile", lat: -33.0458, lon: -71.6197 },
    { name: "Concepcion, Chile", lat: -36.8201, lon: -73.0444 },
    { name: "Brasilia, Brazil", lat: -15.7975, lon: -47.8919 },
    { name: "Salvador, Brazil", lat: -12.9777, lon: -38.5016 },
    { name: "Fortaleza, Brazil", lat: -3.7172, lon: -38.5433 },
    { name: "Recife, Brazil", lat: -8.0476, lon: -34.8770 },
    { name: "Porto Alegre, Brazil", lat: -30.0346, lon: -51.2177 },
    { name: "Curitiba, Brazil", lat: -25.4284, lon: -49.2733 },
    { name: "Belém, Brazil", lat: -1.4558, lon: -48.4902 },
    { name: "Manaus, Brazil", lat: -3.1190, lon: -60.0217 },
    { name: "Cali, Colombia", lat: 3.4516, lon: -76.5319 },
    { name: "Medellin, Colombia", lat: 6.2442, lon: -75.5812 },
    { name: "Barranquilla, Colombia", lat: 10.9639, lon: -74.7964 },
    { name: "Maracaibo, Venezuela", lat: 10.6317, lon: -71.6406 },
    { name: "Valencia, Venezuela", lat: 10.1622, lon: -67.9935 },
    { name: "Mar del Plata, Argentina", lat: -38.0023, lon: -57.5575 },
    { name: "San Miguel de Tucuman, Argentina", lat: -26.8241, lon: -65.2226 },
    { name: "Santa Cruz de la Sierra, Bolivia", lat: -17.7863, lon: -63.1812 },
    { name: "Guayaquil, Ecuador", lat: -2.1706, lon: -79.9224 },
    { name: "Cuenca, Ecuador", lat: -2.8881, lon: -79.0045 },
    { name: "Arequipa, Peru", lat: -16.4090, lon: -71.5375 },
    { name: "Cusco, Peru", lat: -13.5319, lon: -71.9675 },
    { name: "Trujillo, Peru", lat: -8.1116, lon: -79.0289 },
    { name: "Montevideo, Uruguay", lat: -34.9011, lon: -56.1645 },
    { name: "Punta del Este, Uruguay", lat: -34.9451, lon: -54.9485 },
    { name: "Paramaribo, Suriname", lat: 5.8520, lon: -55.2038 },
    { name: "Georgetown, Guyana", lat: 6.8013, lon: -58.1551 },

    // Africa
    { name: "Cape Town, South Africa", lat: -33.9249, lon: 18.4241 },
    { name: "Johannesburg, South Africa", lat: -26.2041, lon: 28.0473 },
    { name: "Durban, South Africa", lat: -29.8587, lon: 31.0218 },
    { name: "Pretoria, South Africa", lat: -25.7479, lon: 28.2293 },
    { name: "Port Elizabeth, South Africa", lat: -33.9608, lon: 25.6022 },
    { name: "Cairo, Egypt", lat: 30.0444, lon: 31.2357 },
    { name: "Alexandria, Egypt", lat: 31.2001, lon: 29.9187 },
    { name: "Giza, Egypt", lat: 30.0131, lon: 31.2089 },
    { name: "Lagos, Nigeria", lat: 6.5244, lon: 3.3792 },
    { name: "Kano, Nigeria", lat: 12.0022, lon: 8.5919 },
    { name: "Ibadan, Nigeria", lat: 7.3775, lon: 3.9470 },
    { name: "Abuja, Nigeria", lat: 9.0579, lon: 7.4951 },
    { name: "Nairobi, Kenya", lat: -1.2921, lon: 36.8219 },
    { name: "Mombasa, Kenya", lat: -4.0435, lon: 39.6682 },
    { name: "Kisumu, Kenya", lat: -0.0917, lon: 34.7676 },
    { name: "Casablanca, Morocco", lat: 33.5731, lon: -7.5898 },
    { name: "Marrakech, Morocco", lat: 31.6295, lon: -7.9811 },
    { name: "Fes, Morocco", lat: 34.0181, lon: -5.0078 },
    { name: "Tangier, Morocco", lat: 35.7595, lon: -5.8340 },
    { name: "Algiers, Algeria", lat: 36.7538, lon: 3.0588 },
    { name: "Oran, Algeria", lat: 35.6911, lon: -0.6417 },
    { name: "Tunis, Tunisia", lat: 36.8065, lon: 10.1815 },
    { name: "Tripoli, Libya", lat: 32.8872, lon: 13.1913 },
    { name: "Accra, Ghana", lat: 5.6037, lon: -0.1870 },
    { name: "Kumasi, Ghana", lat: 6.6885, lon: -1.6244 },
    { name: "Abidjan, Ivory Coast", lat: 5.3600, lon: -3.8712 },
    { name: "Dakar, Senegal", lat: 14.7167, lon: -17.4677 },
    { name: "Addis Ababa, Ethiopia", lat: 9.0319, lon: 38.7473 },
    { name: "Dire Dawa, Ethiopia", lat: 9.5922, lon: 41.8661 },
    { name: "Kampala, Uganda", lat: 0.3476, lon: 32.5825 },
    { name: "Dar es Salaam, Tanzania", lat: -6.7924, lon: 39.2083 },
    { name: "Zanzibar, Tanzania", lat: -6.1659, lon: 39.2027 },
    { name: "Arusha, Tanzania", lat: -3.3869, lon: 36.6830 },
    { name: "Harare, Zimbabwe", lat: -17.8292, lon: 31.0522 },
    { name: "Bulawayo, Zimbabwe", lat: -20.1504, lon: 28.5833 },
    { name: "Lusaka, Zambia", lat: -15.4167, lon: 28.2871 },
    { name: "Ndola, Zambia", lat: -12.9587, lon: 28.6283 },
    { name: "Maputo, Mozambique", lat: -25.9692, lon: 32.5732 },
    { name: "Matola, Mozambique", lat: -25.9137, lon: 32.4586 },
    { name: "Antananarivo, Madagascar", lat: -18.8792, lon: 47.5079 },
    { name: "Toamasina, Madagascar", lat: -18.1492, lon: 49.4023 },
    { name: "Port Louis, Mauritius", lat: -20.1608, lon: 57.5012 },
    { name: "Victoria, Seychelles", lat: -4.6236, lon: 55.4544 },
    { name: "Port Louis, Seychelles", lat: -4.6236, lon: 55.4544 },
    { name: "Nouakchott, Mauritania", lat: 18.0735, lon: -15.9582 },
    { name: "Bamako, Mali", lat: 12.6392, lon: -7.9983 },
    { name: "Ouagadougou, Burkina Faso", lat: 12.2383, lon: -1.5616 },
    { name: "Niamey, Niger", lat: 13.5137, lon: 2.1098 },
    { name: "N'Djamena, Chad", lat: 12.1348, lon: 15.0560 },
    { name: "Bangui, Central African Republic", lat: 4.3947, lon: 18.5582 },
    { name: "Kinshasa, DR Congo", lat: -4.4419, lon: 15.2663 },
    { name: "Lubumbashi, DR Congo", lat: -11.6920, lon: 27.4744 },
    { name: "Kigali, Rwanda", lat: -1.9403, lon: 29.8739 },
    { name: "Bujumbura, Burundi", lat: -3.3637, lon: 29.3599 },
    { name: "Dodoma, Tanzania", lat: -6.1630, lon: 35.7516 },
    { name: "Mogadishu, Somalia", lat: 2.0469, lon: 45.3182 },
    { name: "Hargeisa, Somalia", lat: 9.5599, lon: 44.0635 },
    { name: "Juba, South Sudan", lat: 4.8518, lon: 31.5825 },
    { name: "Khartoum, Sudan", lat: 15.5007, lon: 32.5599 },
    { name: "Omdurman, Sudan", lat: 15.6445, lon: 32.4839 },
    { name: "Port Sudan, Sudan", lat: 19.6174, lon: 37.2144 },
    { name: "Djibouti City, Djibouti", lat: 11.8251, lon: 42.5903 },
    { name: "Asmara, Eritrea", lat: 15.3225, lon: 38.9252 },
    { name: "Sana'a, Yemen", lat: 15.3694, lon: 44.1910 },
    { name: "Aden, Yemen", lat: 12.7855, lon: 45.0187 },
    { name: "Riyadh, Saudi Arabia", lat: 24.7136, lon: 46.6753 },
    { name: "Jeddah, Saudi Arabia", lat: 21.5433, lon: 39.1728 },
    { name: "Mecca, Saudi Arabia", lat: 21.4225, lon: 39.8262 },
    { name: "Medina, Saudi Arabia", lat: 24.5247, lon: 39.5692 },
    { name: "Dammam, Saudi Arabia", lat: 26.4262, lon: 50.0616 },
    { name: "Kuwait City, Kuwait", lat: 29.3117, lon: 47.4818 },
    { name: "Manama, Bahrain", lat: 26.0667, lon: 50.5577 },
    { name: "Doha, Qatar", lat: 25.2854, lon: 51.5310 },
    { name: "Abu Dhabi, UAE", lat: 24.4539, lon: 54.3773 },
    { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708 },
    { name: "Sharjah, UAE", lat: 25.3572, lon: 55.4084 },
    { name: "Muscat, Oman", lat: 23.5859, lon: 58.3829 },
    { name: "Tel Aviv, Israel", lat: 32.0853, lon: 34.7818 },
    { name: "Jerusalem, Israel", lat: 31.7783, lon: 35.2253 },
    { name: "Haifa, Israel", lat: 32.7940, lon: 34.9896 },
    { name: "Beirut, Lebanon", lat: 33.8938, lon: 35.5018 },
    { name: "Amman, Jordan", lat: 31.9539, lon: 35.9106 },
    { name: "Damascus, Syria", lat: 33.5138, lon: 36.2765 },
    { name: "Aleppo, Syria", lat: 36.2012, lon: 37.1612 },
    { name: "Ankara, Turkey", lat: 39.9334, lon: 32.8597 },
    { name: "Istanbul, Turkey", lat: 41.0082, lon: 28.9784 },
    { name: "Izmir, Turkey", lat: 38.4237, lon: 27.1428 },
    { name: "Bursa, Turkey", lat: 40.1885, lon: 29.0610 },
    { name: "Nicosia, Cyprus", lat: 35.1264, lon: 33.4299 },
    { name: "Limassol, Cyprus", lat: 34.6841, lon: 33.0468 },
    { name: "Tbilisi, Georgia", lat: 41.7151, lon: 44.8271 },
    { name: "Yerevan, Armenia", lat: 40.1792, lon: 44.4991 },
    { name: "Baku, Azerbaijan", lat: 40.4093, lon: 49.8671 },
    { name: "Ashgabat, Turkmenistan", lat: 37.9601, lon: 58.3261 },
    { name: "Tashkent, Uzbekistan", lat: 41.2995, lon: 69.2401 },
    { name: "Almaty, Kazakhstan", lat: 43.2220, lon: 77.8547 },
    { name: "Nur-Sultan, Kazakhstan", lat: 51.1605, lon: 71.4704 },
    { name: "Bishkek, Kyrgyzstan", lat: 42.8746, lon: 74.5698 },
    { name: "Dushanbe, Tajikistan", lat: 38.5598, lon: 68.7870 },
    { name: "Kathmandu, Nepal", lat: 27.7172, lon: 85.3240 },
    { name: "Pokhara, Nepal", lat: 28.2096, lon: 83.9856 },
    { name: "Colombo, Sri Lanka", lat: 6.9271, lon: 79.8612 },
    { name: "Kandy, Sri Lanka", lat: 7.2906, lon: 80.6337 },
    { name: "Male, Maldives", lat: 4.1755, lon: 73.5093 },

    // Oceania
    { name: "Suva, Fiji", lat: -18.1248, lon: 178.4501 },
    { name: "Nadi, Fiji", lat: -17.7765, lon: 177.4292 },
    { name: "Lautoka, Fiji", lat: -17.6167, lon: 177.4501 },
    { name: "Papeete, Tahiti", lat: -17.6509, lon: -149.4568 },
    { name: "Port Moresby, Papua New Guinea", lat: -9.4438, lon: 147.1803 },
    { name: "Lae, Papua New Guinea", lat: -6.5699, lon: 146.9343 },
    { name: "Arawa, Papua New Guinea", lat: -6.2167, lon: 155.5667 },
    { name: "Honiara, Solomon Islands", lat: -9.4333, lon: 159.9500 },
    { name: "Port Vila, Vanuatu", lat: -17.7354, lon: 168.3270 },
    { name: "Luganville, Vanuatu", lat: -15.1667, lon: 167.2167 },
    { name: "Noumea, New Caledonia", lat: -22.2577, lon: 166.4410 },
    { name: "Majuro, Marshall Islands", lat: 7.0897, lon: 171.3801 },
    { name: "Ebeye, Marshall Islands", lat: 8.7731, lon: 167.7330 },
    { name: "Palikir, Micronesia", lat: 6.9167, lon: 158.1619 },
    { name: "Kolonia, Micronesia", lat: 6.9644, lon: 158.2184 },
    { name: "Koror, Palau", lat: 7.3417, lon: 134.4797 },
    { name: "Melekeok, Palau", lat: 7.5006, lon: 134.6238 },
    { name: "Hagatna, Guam", lat: 13.4746, lon: 144.7481 },
    { name: "Tumon, Guam", lat: 13.5167, lon: 144.7981 },
    { name: "Saipan, Northern Mariana Islands", lat: 15.2123, lon: 145.7545 },
    { name: "Rarotonga, Cook Islands", lat: -21.2074, lon: -159.7744 },
    { name: "Avarua, Cook Islands", lat: -21.2068, lon: -159.7765 },
    { name: "Alofi, Niue", lat: -19.0540, lon: -169.9217 },
    { name: "Fakaofo, Tokelau", lat: -9.3627, lon: -171.2432 },
    { name: "Atafu, Tokelau", lat: -8.5417, lon: -172.5174 },
    { name: "Nukunonu, Tokelau", lat: -9.2000, lon: -171.8333 },
    { name: "Pago Pago, American Samoa", lat: -14.2746, lon: -170.7020 },
    { name: "Apia, Samoa", lat: -13.8333, lon: -171.8333 },
    { name: "Salelologa, Samoa", lat: -13.9500, lon: -172.2333 },
    { name: "Funafuti, Tuvalu", lat: -7.4787, lon: 178.6793 },
    { name: "Tarawa, Kiribati", lat: 1.3283, lon: 172.9781 },
    { name: "Bikenibeu, Kiribati", lat: 1.3667, lon: 172.9667 },
    { name: "London, Kiribati", lat: -2.1461, lon: -175.1989 },
    { name: "Yaren, Nauru", lat: -0.5477, lon: 166.9310 },
    { name: "Denigomodu, Nauru", lat: -0.5231, lon: 166.9170 },
    { name: "Alofi, Niue", lat: -19.0540, lon: -169.9217 },
    { name: "Mata-Utu, Wallis and Futuna", lat: -13.2833, lon: -176.3500 },
    { name: "Vaitupu, Tuvalu", lat: -7.4833, lon: 178.6500 },
    { name: "Nukualofa, Tonga", lat: -21.1792, lon: -175.1982 },
    { name: "Neiafu, Tonga", lat: -18.6500, lon: -173.9833 },
    { name: "Haveluloto, Tonga", lat: -21.2000, lon: -175.1500 }
];

// Find the nearest city to given coordinates
function findNearestCity(lat, lon) {
    let nearest = majorCities[0];
    let nearestDist = Infinity;

    for (const city of majorCities) {
        const dist = calculateDistance(lat, lon, city.lat, city.lon);
        if (dist < nearestDist) {
            nearestDist = dist;
            nearest = city;
        }
    }

    console.log(`✅ Found nearest city: ${nearest.name} (${nearestDist.toFixed(0)}km away)`);
    return nearest.name;
}

// Find location name for coordinates (now uses local database)
function reverseGeocode(lat, lon) {
    console.log(`🔍 Finding location near: ${lat.toFixed(2)}, ${lon.toFixed(2)}`);
    return findNearestCity(lat, lon);
}

// Find and fill the furthest location from origin
async function findFurthestLocation() {
    const origin = originInput.value.trim();

    if (!origin) {
        return;
    }

    const destinationDisplay = document.getElementById('destinationDisplay');

    // Show loading state
    if (destinationDisplay) {
        destinationDisplay.textContent = 'Finding furthest point...';
        destinationDisplay.classList.remove('empty');
    }

    try {
        // Geocode the origin
        const originCoords = await geocode(origin);

        // Calculate antipodal point
        const antipodal = calculateAntipodal(originCoords.lat, originCoords.lon);

        // Find location name at antipodal point (now synchronous)
        const furthestLocation = reverseGeocode(antipodal.lat, antipodal.lon);

        // Set the destination
        destinationInput.value = furthestLocation;

        // Update display if in DDR mode
        if (destinationDisplay) {
            destinationDisplay.textContent = furthestLocation;
            destinationDisplay.classList.remove('empty');
        }

        // Show success message
        const distance = calculateDistance(
            originCoords.lat, originCoords.lon,
            antipodal.lat, antipodal.lon
        );
        console.log(`✅ Furthest location found: ${furthestLocation} (~${Math.round(distance)}km away)`);

    } catch (error) {
        console.error('❌ Error finding furthest location:', error);
        if (destinationDisplay) {
            destinationDisplay.textContent = 'Dance to input destination...';
            destinationDisplay.classList.add('empty');
        }
    }
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Calculate emissions for all transport modes
function calculateEmissions(distance) {
    return transportModes.map(mode => ({
        ...mode,
        emissions: Math.round(distance * mode.factor)
    })).sort((a, b) => b.emissions - a.emissions); // Sort by highest emissions first
}

// Format emissions to show kg if >= 1000g
function formatEmissions(emissions) {
    if (emissions >= 1000) {
        const kg = (emissions / 1000).toFixed(1);
        const decimalPart = kg.split('.')[1];
        return {
            value: decimalPart === '0' ? Math.round(emissions / 1000) : kg,
            unit: 'kg CO₂'
        };
    }
    return {
        value: emissions.toLocaleString(),
        unit: 'g CO₂'
    };
}

// Display results
function displayResults(distance, results) {
    distanceValue.textContent = Math.round(distance).toLocaleString();

    transportList.innerHTML = '';

    results.forEach((mode, index) => {
        const isWorst = index === 0 && mode.emissions > 0;
        const formatted = formatEmissions(mode.emissions);

        // Get translated transport name if available
        const transportName = (typeof getTransportModeName === 'function')
            ? getTransportModeName(mode.name)
            : mode.name;

        const card = document.createElement('div');
        card.className = `transport-card${isWorst ? ' worst' : ''}`;

        card.innerHTML = `
            <div class="transport-left">
                <span class="transport-icon">${mode.icon}</span>
                <span class="transport-name" data-original-name="${mode.name}">${transportName}</span>
            </div>
            <div class="transport-right">
                <div class="emissions">${formatted.value}</div>
                <span class="emissions-unit">${formatted.unit}</span>
                ${isWorst ? '<div class="recommendation-badge"><span class="fire-emoji">🔥</span> MOST EXCITING!</div>' : ''}
            </div>
        `;

        transportList.appendChild(card);
    });

    resultsSection.classList.add('show');

    // Translate "MOST EXCITING!" badge if language is set
    if (window.currentLanguageCode && typeof changeLanguageToCountry === 'function') {
        const badge = document.querySelector('.recommendation-badge');
        if (badge && window.translations) {
            const texts = window.translations[window.currentLanguageCode] || window.translations.en;
            if (texts) {
                badge.innerHTML = `<span class="fire-emoji">🔥</span> ${texts.mostExciting.replace('🔥 ', '')}`;
            }
        }
    }
}

// Show error message
function showError(message) {
    errorContainer.innerHTML = `<div class="error">${message}</div>`;
}

// Clear error message
function clearError() {
    errorContainer.innerHTML = '';
}

// Handle calculate button click
async function handleCalculate() {
    // Sync boring mode inputs if active
    if (window.boringMode) {
        const originBoring = document.getElementById('originBoring');
        const destinationBoring = document.getElementById('destinationBoring');
        if (originBoring && originBoring.value) {
            originInput.value = originBoring.value;
        }
        if (destinationBoring && destinationBoring.value) {
            destinationInput.value = destinationBoring.value;
        }
    }

    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();

    clearError();
    resultsSection.classList.remove('show');

    if (!origin || !destination) {
        showError('Please input both origin and destination locations');
        return;
    }

    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculating...';

    try {
        console.log('=== Starting calculation ===');
        console.log('Origin:', origin);
        console.log('Destination:', destination);

        const originCoords = await geocode(origin);
        console.log('Origin coords:', originCoords);

        const destCoords = await geocode(destination);
        console.log('Destination coords:', destCoords);

        console.log('✅ Geocoding complete, calculating distance...');

        const distance = calculateDistance(
            originCoords.lat, originCoords.lon,
            destCoords.lat, destCoords.lon
        );

        console.log('✅ Distance calculated:', distance, 'km');

        const results = calculateEmissions(distance);
        console.log('✅ Emissions calculated:', results.length, 'transport modes');

        displayResults(distance, results);
        console.log('✅ Results displayed');

        // Change language based on destination country (do this LAST, after results)
        try {
            if (destCoords.countryCode) {
                console.log('🎯 Changing language to match destination country:', destCoords.countryCode);
                if (typeof changeLanguageToCountry === 'function') {
                    changeLanguageToCountry(destCoords.countryCode);
                }
            } else {
                console.log('⚠️ No country code found for destination:', destination);
            }
        } catch (langError) {
            console.error('Language change error (continuing anyway):', langError);
        }

    } catch (error) {
        console.error('❌ Calculation error:', error);
        showError(error.message);
    } finally {
        console.log('♻️ Resetting button state');
        calculateBtn.disabled = false;
        calculateBtn.textContent = 'Calculate Emissions';
    }
}

// Event listeners
calculateBtn.addEventListener('click', handleCalculate);

// Find optimal location button (DDR mode)
document.getElementById('furthestBtn')?.addEventListener('click', findFurthestLocation);

// Find optimal location button (Boring mode)
document.getElementById('furthestBtnBoring')?.addEventListener('click', async () => {
    const originBoring = document.getElementById('originBoring');
    const destinationBoring = document.getElementById('destinationBoring');
    const destinationDisplay = document.getElementById('destinationDisplay');

    if (!originBoring.value.trim()) {
        return;
    }

    // Sync origin
    originInput.value = originBoring.value;

    // Show loading state
    destinationBoring.value = 'Finding optimal point...';

    try {
        // Geocode the origin
        const originCoords = await geocode(originBoring.value);

        // Calculate antipodal point
        const antipodal = calculateAntipodal(originCoords.lat, originCoords.lon);

        // Find location name at antipodal point (now synchronous)
        const furthestLocation = reverseGeocode(antipodal.lat, antipodal.lon);

        // Set both destination inputs
        destinationInput.value = furthestLocation;
        destinationBoring.value = furthestLocation;

        // Update DDR display if visible
        if (destinationDisplay) {
            destinationDisplay.textContent = furthestLocation;
            destinationDisplay.classList.remove('empty');
        }

        console.log(`✅ Optimal location found: ${furthestLocation}`);

    } catch (error) {
        console.error('❌ Error finding optimal location:', error);
        destinationBoring.value = '';
    }
});
