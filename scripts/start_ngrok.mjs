import ngrok from 'ngrok';

// Accept NGROK_ADDR as a port or full URL; default to local preview on 3000
const addrEnv = process.env.NGROK_ADDR;
let addr = addrEnv || 'http://127.0.0.1:3000';
// Normalize numeric input to a proper http addr
if (/^\d+$/.test(addr)) {
  addr = `http://127.0.0.1:${addr}`;
}

const authtoken = process.env.NGROK_AUTHTOKEN;

(async () => {
  try {
    const url = await ngrok.connect({ addr, authtoken, proto: 'http' });
    // Print the URL so our tooling can capture it
    console.log(url);
    console.log(`Forwarding -> ${addr}`);
    // Keep the process alive so the tunnel stays open
    process.stdin.resume();
  } catch (err) {
    console.error('Failed to start ngrok:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();