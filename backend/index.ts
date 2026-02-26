import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Location } from './interfaces/location';
import { mockLocations } from './mock/mockdata';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    res.writeHead(404).end();
    return;
  }
  if (!req.url.includes('/locations/')) {
    res.writeHead(404).end();
    return;
  }

  const locationId = req.url.split('/locations/')[1];

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  const interval = setInterval(() => {
    // To be replaced with actual data fetching logic, getting latest status of the location
    const location = mockLocations.find((loc) => loc.locationId === locationId);
    if (!location) {
      res.writeHead(404).end();
      clearInterval(interval);
      return;
    }
    const payload: Location = location;
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }, 10000);

  req.on('close', () => clearInterval(interval));
});

server.listen(3000, () => {
  console.log('SSE running on http://localhost:3000/locations/{locationId}');
});
