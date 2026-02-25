const SSE_URL_ENDPOINT = "https://stream.wikimedia.org/v2/stream/recentchange";
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 seconds

let eventSource = null;
const lastMessageElement = document.getElementById("last-message");

function setLastMessage(value) {
  if (!lastMessageElement) {
    return;
  }

  lastMessageElement.textContent = `Last message: ${value}`;
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
    console.log("SSE connected");
  };

  eventSource.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload.server_name === "en.wikipedia.org") {
        console.log("SSE message:", payload);
        setLastMessage(JSON.stringify(payload.title));  
      }
    } catch {
      console.log("SSE message (text):", event.data);
      setLastMessage(event.data);
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
  console.log("Refreshing SSE connection...");
  try {
    connectSse(SSE_URL_ENDPOINT);
  } catch (error) {
    console.error(error);
    setLastMessage("error while connecting");
  }
}

window.addEventListener("beforeunload", closeSseConnection);

refreshSseConnection();
setInterval(refreshSseConnection, REFRESH_INTERVAL_MS);