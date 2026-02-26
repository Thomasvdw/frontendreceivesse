export function createSseClient({ onPayload }) {
  let eventSource = null;

  function close() {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  }

  function connect(url) {
    close();
    eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log('SSE connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        console.log('SSE message received:', payload);
        if (typeof onPayload === 'function') {
          onPayload(payload);
        }
      } catch (error) {
        console.log(
          `Error: ${error}: Failure in handling event. SSE payload (text): ${event.data}`
        );
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error', error);
    };

    eventSource.addEventListener('ping', (event) => {
      console.log('SSE ping:', event.data);
    });
  }

  return {
    connect,
    close,
  };
}
