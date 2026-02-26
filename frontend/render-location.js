const locationIdElement = document.getElementById('location-id');
const welcomeElement = document.getElementById('welcome');
const connectorsElement = document.getElementById('connectors');
const priceElement = document.getElementById('price');
const paymentsElement = document.getElementById('payments');

export function renderLocation(location) {
  if (locationIdElement) {
    locationIdElement.textContent = location.locationId || 'Unknown location';
  }

  if (welcomeElement) {
    welcomeElement.innerHTML = `&nbsp;${location.locationName}`;
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
