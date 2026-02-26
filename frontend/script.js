import {
  getLanguage,
  rotateLanguage,
  setLanguages,
  updateTranslations,
} from './i18n.js';
import { renderLocation } from './render-location.js';
import { CONFIG } from './config.js';
import { createSseClient } from './sse-client.js';
import { getSseEndpoint, setupLocationForm } from './location-form.js';

const sseClient = createSseClient({
  onPayload: (payload) => {
    renderLocation(payload);
    if (payload.languages) seti18n(payload.languages);
  },
});

function seti18n(languages) {
  if (getLanguage() === null) {
    setLanguages(languages);
    updateTranslations();
  }
}

async function refreshSseConnection() {
  const sseEndpoint = getSseEndpoint(CONFIG.SSE_URL_ENDPOINT);
  if (!sseEndpoint) {
    return;
  }

  try {
    sseClient.connect(sseEndpoint);
  } catch (e) {
    console.error(
      `Error: ${e}: Failed to connect to SSE endpoint at ${sseEndpoint}`
    );
  }
}

setupLocationForm({ onLocationSaved: refreshSseConnection });
window.addEventListener('beforeunload', sseClient.close);
refreshSseConnection();

// Refresh SSE connection every 5 minutes to prevent timeouts (optional, depends on server configuration)
setInterval(refreshSseConnection, CONFIG.REFRESH_INTERVAL_MS);

// Refresh language every 10 seconds for demo purposes
setInterval(() => {
  if (getLanguage() === null) return; // wait until language is set from SSE data
  rotateLanguage();
  updateTranslations();
}, CONFIG.CHANGE_LANGUAGE_INTERVAL_MS);
