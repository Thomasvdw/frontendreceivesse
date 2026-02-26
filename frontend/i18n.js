const dictionaries = {
  en: {
    connectorsAvailable: 'Connectors Available',
    chargingPrice: 'Charging Price',
    acceptedPaymentMethods: 'Accepted Payment Methods',
    locationWelcome: 'Welcome to',
    status: {
      available: 'Available',
      occupied: 'Occupied',
    },
    payment: {
      mastercard: 'Mastercard',
      visa: 'Visa',
      googlePay: 'Google Pay',
      applePay: 'Apple Pay',
      creditCard: 'Credit Card',
      msp: 'MSP',
    },
  },
  nl: {
    connectorsAvailable: 'Beschikbare Laadpunten',
    chargingPrice: 'Laadprijs',
    acceptedPaymentMethods: 'Geaccepteerde betaalmethoden',
    locationWelcome: 'Welkom op',
    status: {
      available: 'Beschikbaar',
      occupied: 'Bezet',
    },
    payment: {
      mastercard: 'Mastercard',
      visa: 'Visa',
      googlePay: 'Google Pay',
      applePay: 'Apple Pay',
      creditCard: 'Creditcard',
      msp: 'MSP',
    },
  },
};

let currentLanguage = null;
let languageQueue = [];

export function setLanguage(lang) {
  if (dictionaries[lang]) {
    currentLanguage = lang;
    return;
  }

  console.warn(`[i18n] Unknown language: ${lang}`);
}

export function getLanguage() {
  return currentLanguage;
}

export function setLanguages(languages) {
  if (!Array.isArray(languages) || languages.length === 0) {
    return;
  }

  languageQueue = languages.filter((lang) => Boolean(dictionaries[lang]));

  if (!currentLanguage && languageQueue.length > 0) {
    setLanguage(languageQueue[0]);
  }
}

export function rotateLanguage() {
  if (languageQueue.length === 0) {
    return null;
  }

  const next = languageQueue.shift();
  languageQueue.push(next);
  setLanguage(next);
  return next;
}

export function t(key, options = {}) {
  const { lang = currentLanguage, fallbackLang = 'en', defaultValue } = options;

  return (
    resolveKey(dictionaries[lang], key) ??
    resolveKey(dictionaries[fallbackLang], key) ??
    defaultValue ??
    key
  );
}

function resolveKey(dictionary, key) {
  if (!dictionary || !key) {
    return undefined;
  }

  return key
    .split('.')
    .reduce((obj, part) => (obj ? obj[part] : undefined), dictionary);
}

export function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (!key) {
      return;
    }

    element.textContent = t(key);
  });
}
