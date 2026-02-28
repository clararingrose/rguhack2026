# Translation System Documentation

## Overview

The Evil Carbon Calculator uses a comprehensive translation system to support multiple languages. When users select a destination country, the UI automatically switches to that country's primary language.

## Architecture

### File Structure

- **`public/js/language-map.js`** - Main translation file containing:
  - `languageMap` - Maps country codes to their languages
  - `translations` - Object containing all UI translations keyed by language code
  - `changeLanguageToCountry(countryCode)` - Function to switch languages
  - `getTranslations(langCode)` - Helper to get translations for a language
  - `getLanguageForCountry(countryCode)` - Helper to get language from country code

- **`public/js/input-modes.js`** - Uses `window.currentTranslations` for dynamic button text

- **`public/js/nav-translations.js`** - Navigation bar translations

### How Translations Work

1. When a destination is selected, `changeLanguageToCountry()` is called
2. The function looks up the country's language from `languageMap`
3. It retrieves translations from the `translations` object
4. It updates all translatable DOM elements with the translated text
5. `window.currentTranslations` is set for use by other modules
6. Mode buttons are updated via `updateModeButtons()`

## Adding a New Language

### Step 1: Add Country to Language Map

```javascript
const languageMap = {
    // Existing countries...
    XX: { code: 'yy', name: 'Language Name', nativeName: 'Native Name' }
};
```

### Step 2: Add Translation Object

Add a new language object to the `translations` object with all required keys:

```javascript
const translations = {
    // Existing languages...
    yy: {
        title: '🌍 Evil Carbon Calculator in Your Language',
        subtitle: 'Subtitle in your language! 🔥',
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
        // Transport modes (if needed)
        transportWalking: 'Walking',
        transportCycling: 'Cycling',
        // ... add all transport modes
        // Nav items
        navHome: 'Home',
        navBlog: 'Blog',
        navWrapped: 'Wrapped'
    }
};
```

### Step 3: Test the Translation

1. Select a destination in the new country
2. Verify all UI elements are translated correctly
3. Check the page title includes "Evil" in the translated language

## Adding a New Translatable Element

### Step 1: Add Translation Key to All Languages

Add the new key to every language object in the `translations` object:

```javascript
en: { ..., newKey: 'English text' },
fr: { ..., newKey: 'Texte français' },
de: { ..., newKey: 'Deutscher Text' },
// ... add to all languages
```

### Step 2: Update changeLanguageToCountry Function

Add code to update the new element in the `changeLanguageToCountry` function (both versions):

```javascript
// Update new element
const newElement = document.getElementById('newElementId');
if (newElement) newElement.textContent = texts.newKey;
```

### Step 3: Handle Dynamic Elements (Optional)

For elements that change dynamically (like mode buttons), use `window.currentTranslations`:

```javascript
const t = window.currentTranslations || {};
element.textContent = t.newKey || 'Default English Text';
```

## Translation Key Reference

### Core UI Keys

| Key | Description | Example (English) |
|-----|-------------|-------------------|
| `title` | Page title with globe emoji | `🌍 Evil Carbon Calculator` |
| `subtitle` | Page subtitle | `Find the most exciting way to travel! 🔥` |
| `origin` | Origin field label | `Origin` |
| `destination` | Destination field label | `Destination` |
| `calculate` | Calculate button | `Calculate Emissions` |
| `calculating` | Loading text | `Calculating...` |
| `journeyDistance` | Results heading | `Journey Distance` |
| `kilometers` | Distance unit | `kilometres` |
| `mostExciting` | Best route label | `🔥 MOST EXCITING!` |

### Mode Toggle Keys

| Key | Description | Example (English) |
|-----|-------------|-------------------|
| `ddrMode` | DDR mode label | `DDR Mode` |
| `ouijaMode` | Switch to Ouija label | `Switch to Ouija Mode` |
| `boringMode` | Boring mode button | `Boring Mode` |
| `funMode` | Fun mode button | `Fun Mode` |

### Input Mode Button Keys

| Key | Description | Example (English) |
|-----|-------------|-------------------|
| `ddrModeBtn` | DDR mode button text | `DDR Mode` |
| `summonLocation` | Ouija mode button text | `Summon Location` |
| `switchToOuija` | Switch to Ouija toggle | `Switch to Ouija Mode` |
| `switchToDdr` | Switch to DDR toggle | `Switch to DDR Mode` |
| `danceToInput` | DDR origin placeholder | `Dance to input location...` |
| `danceToDestination` | DDR destination placeholder | `Dance to input destination...` |
| `summonFromBeyond` | Ouija origin placeholder | `Summon location from beyond...` |
| `summonDestinationFromBeyond` | Ouija destination placeholder | `Summon destination from beyond...` |

### Transport Mode Keys

Pattern: `transport{ModeName}`

| Key | Example (English) |
|-----|-------------------|
| `transportWalking` | `Walking` |
| `transportCycling` | `Cycling` |
| `transportHighSpeedTrain` | `High-speed Train` |
| `transportDieselCar` | `Diesel Car` |
| `transportLongHaulFlight` | `Long-haul Flight` |
| `transportKilldozer` | `Killdozer` |

### Navigation Keys

| Key | Description | Example (English) |
|-----|-------------|-------------------|
| `navHome` | Home nav item | `Home` |
| `navBlog` | Blog nav item | `Blog` |
| `navWrapped` | Wrapped nav item | `Wrapped` |

## Common Pitfalls and Best Practices

### 1. Always Include "Evil" in Title

**Wrong:**
```javascript
title: '🌍 Carbon Calculator'
```

**Right:**
```javascript
title: '🌍 Evil Carbon Calculator'  // English
title: '🌍 Calculateur de Carbone Malveillant'  // French
title: '🌍 Böser Kohlenstoffrechner'  // German
```

The "Evil" part must be translated, not hardcoded.

### 2. Never Hardcode Translated Strings

**Wrong:**
```javascript
document.title = texts.title + ' - Evil Carbon Calculator';
modeToggle.setAttribute('data-original-text', 'Ouija Mode');
```

**Right:**
```javascript
document.title = texts.title.replace('🌍 ', '').trim();
modeToggle.setAttribute('data-original-text', modeToggle.textContent.trim());
```

### 3. Use data-original-text Pattern for Toggle Buttons

For buttons that change text dynamically, store the original text:

```javascript
if (!element.getAttribute('data-original-text')) {
    element.setAttribute('data-original-text', element.textContent.trim());
}
```

### 4. Provide Fallbacks for Dynamic Elements

When using `window.currentTranslations`, provide English fallbacks:

```javascript
const t = window.currentTranslations || {
    someKey: 'Default English Text'
};
element.textContent = t.someKey;
```

### 5. Test Language Switching

Always test switching between multiple languages:

1. Set destination to France (French)
2. Change destination to UK (English)
3. Verify all text is correctly translated back to English
4. Check the page title shows "Evil Carbon Calculator" not mixed languages

## Language Code Reference

| Code | Language | Native Name |
|------|----------|-------------|
| `en` | English | English |
| `fr` | French | Français |
| `de` | German | Deutsch |
| `es` | Spanish | Español |
| `it` | Italian | Italiano |
| `pt` | Portuguese | Português |
| `nl` | Dutch | Nederlands |
| `pl` | Polish | Polski |
| `tr` | Turkish | Türkçe |
| `ru` | Russian | Русский |
| `zh` | Chinese | 中文 |
| `ja` | Japanese | 日本語 |
| `ko` | Korean | 한국어 |
| `ar` | Arabic | العربية |
| `hi` | Hindi | हिन्दी |
| `th` | Thai | ไทย |
| `vi` | Vietnamese | Tiếng Việt |
| `id` | Indonesian | Bahasa Indonesia |
| `sv` | Swedish | Svenska |
| `no` | Norwegian | Norsk |
| `da` | Danish | Dansk |
| `fi` | Finnish | Suomi |
| `el` | Greek | Ελληνικά |
| `cs` | Czech | Čeština |
| `hu` | Hungarian | Magyar |
| `ro` | Romanian | Română |
| `bg` | Bulgarian | Български |
| `hr` | Croatian | Hrvatski |
| `sr` | Serbian | Српски |
| `uk` | Ukrainian | Українська |
| `he` | Hebrew | עברית |

## Debugging

### Check Current Language

```javascript
console.log(window.currentLanguageCode);  // e.g., 'fr'
console.log(window.currentTranslations);  // Full translation object
```

### Check Available Translations

```javascript
console.log(Object.keys(translations));  // All available language codes
```

### Force Language Change

```javascript
changeLanguageToCountry('FR');  // Switch to French
changeLanguageToCountry('GB');  // Switch to English (UK)
```

## Related Files

- `public/js/language-map.js` - Main translation logic
- `public/js/input-modes.js` - Dynamic button translations
- `public/js/nav-translations.js` - Navigation bar translations
- `TRANSLATIONS.md` - This documentation file

## Support

For questions or issues with translations:
1. Check this documentation first
2. Review the implementation in `language-map.js`
3. Test the language switching functionality
4. Verify all translation keys are present for new languages
