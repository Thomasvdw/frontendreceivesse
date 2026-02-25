const SSE_URL_ENDPOINT = "http://localhost:3000/events";
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function connectSse(url) {
  eventSource = new EventSource(url);

  eventSource.onopen = () => {
    console.log("SSE connected");
  };

  eventSource.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      console.log("SSE message:", payload);
    } catch {
      console.log("SSE message (text):", event.data);
    }
  };

  eventSource.onerror = (error) => {
    console.error("SSE error", error);
  };

  eventSource.addEventListener("ping", (event) => {
    console.log("SSE ping:", event.data);
  });
}

async function refreshSseConnection() {
  try {
    connectSse(SSE_URL_ENDPOINT);
  } catch (error) {
    console.error(error);
  }
}


refreshSseConnection();
setInterval(refreshSseConnection, REFRESH_INTERVAL_MS);