const SSE_URL_ENDPOINT = 'http://localhost:3000/locations/S0017DE';
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

let eventSource = null;
const locationIdElement = document.getElementById('location-id');
const welcomeElement = document.getElementById('welcome');
const connectorsElement = document.getElementById('connectors');
const priceElement = document.getElementById('price');
const paymentsElement = document.getElementById('payments');

function renderLocation(location) {
  if (locationIdElement) {
    locationIdElement.textContent = location.locationId || 'Unknown location';
  }

  if (welcomeElement) {
    welcomeElement.textContent = `Welcome to ${location.locationName || 'our location'}`;
  }

  if (connectorsElement) {
    connectorsElement.textContent = `${location.countAvailableEvse}/${location.countTotalEvse}`;
  }

  const energyPrice = location?.tariff?.priceComponents?.find(
    (component) => component.type?.toLowerCase() === 'energy'
  )?.price;

  if (priceElement) {
    if (typeof energyPrice === 'number') {
      priceElement.textContent = `${energyPrice.toFixed(2)} EUR/kWh`;
    } else {
      priceElement.textContent = '-- EUR/kWh';
    }
  }

  if (paymentsElement) {
    paymentsElement.innerHTML = '';
    const methods = Array.isArray(location.paymentMethods)
      ? location.paymentMethods
      : [];

    methods.forEach((method) => {
      const listItem = document.createElement('li');
      listItem.textContent = method;
      paymentsElement.appendChild(listItem);
    });
  }
}

function closeSseConnection() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
}

function connectSse(url) {
  closeSseConnection();
  eventSource = new EventSource(url);

  eventSource.onopen = () => {
    console.log('SSE connected');
  };

  eventSource.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      console.log('SSE message:', payload);
      renderLocation(payload);
    } catch {
      console.log('SSE message (text):', event.data);
    }
  };

  eventSource.onerror = (error) => {
    console.error('SSE error', error);
  };

  eventSource.addEventListener('ping', (event) => {
    console.log('SSE ping:', event.data);
  });
}

async function refreshSseConnection() {
  console.log('Refreshing SSE connection...');
  try {
    connectSse(SSE_URL_ENDPOINT);
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('beforeunload', closeSseConnection);

refreshSseConnection();
setInterval(refreshSseConnection, REFRESH_INTERVAL_MS);
