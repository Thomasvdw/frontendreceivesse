// --------------------------------------------------
// Translation dictionaries
// --------------------------------------------------
(function (global) {
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

  // --------------------------------------------------
  // Current language (simple global state)
  // --------------------------------------------------

  const languages = ['en', 'nl'];
  let current = 0;

  function setLanguage(lang) {
    if (dictionaries[lang]) {
      currentLanguage = lang;
    } else {
      console.warn(`[i18n] Unknown language: ${lang}`);
    }
  }

  function getLanguage() {
    return currentLanguage;
  }

  // --------------------------------------------------
  // Translation helper
  // --------------------------------------------------

  function t(key, options = {}) {
    const {
      lang = currentLanguage,
      fallbackLang = 'en',
      defaultValue,
    } = options;

    const value =
      resolveKey(dictionaries[lang], key) ??
      resolveKey(dictionaries[fallbackLang], key) ??
      defaultValue ??
      key;

    return value;
  }

  // --------------------------------------------------
  // Internal helper
  // --------------------------------------------------

  function resolveKey(dictionary, key) {
    if (!dictionary || !key) return undefined;

    return key
      .split('.')
      .reduce((obj, part) => (obj ? obj[part] : undefined), dictionary);
  }

  function updateTranslations() {
    console.log('Updating translations for language:', currentLanguage);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = i18n.t(key); // assumes i18n.t(key) returns translation
    });
  }

  global.i18n = { t, setLanguage, languages, current, updateTranslations };
})(window);
