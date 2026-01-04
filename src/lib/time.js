export function getNowMs(req) {
  if (process.env.TEST_MODE === "1") {
    const header = req.headers["x-test-now-ms"];
    if (header) return parseInt(header, 10);
  }
  return Date.now();
}
