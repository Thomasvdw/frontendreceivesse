const LOCATION_ID_STORAGE_KEY = 'onsiteDisplayLocationId';

function normalizeLocationId(value) {
  return (value || '').trim().toUpperCase();
}

export function getStoredLocationId() {
  const rawValue = localStorage.getItem(LOCATION_ID_STORAGE_KEY);
  return rawValue ? normalizeLocationId(rawValue) : '';
}

function setStoredLocationId(locationId) {
  localStorage.setItem(
    LOCATION_ID_STORAGE_KEY,
    normalizeLocationId(locationId)
  );
}

export function getSseEndpoint(baseEndpoint) {
  const locationId = getStoredLocationId();
  if (!locationId) {
    return null;
  }

  return `${baseEndpoint}${encodeURIComponent(locationId)}`;
}

export function setupLocationForm({ onLocationSaved }) {
  const locationFormElement = document.getElementById('location-form');
  const locationIdInputElement = document.getElementById('location-id-input');
  const changeLocationButtonElement =
    document.getElementById('change-location');

  if (!locationFormElement || !locationIdInputElement) {
    return;
  }

  const storedLocationId = getStoredLocationId();

  if (storedLocationId) {
    locationIdInputElement.value = storedLocationId;
    locationFormElement.hidden = true;
  } else {
    locationFormElement.hidden = false;
  }

  locationFormElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const nextLocationId = normalizeLocationId(locationIdInputElement.value);
    if (!nextLocationId) {
      return;
    }

    setStoredLocationId(nextLocationId);
    locationFormElement.hidden = true;
    if (typeof onLocationSaved === 'function') {
      onLocationSaved();
    }
  });

  if (changeLocationButtonElement) {
    changeLocationButtonElement.addEventListener('click', () => {
      locationIdInputElement.value = getStoredLocationId();
      locationFormElement.hidden = false;
      locationIdInputElement.focus();
      locationIdInputElement.select();
    });
  }
}
