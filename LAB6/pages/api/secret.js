export default function handler(req, res) {
  // Nếu lọt quaMiddleware thì code chạy
  res.status(200).json({
    secret: "Next.js is cool",
    user: "Nguyen - 23521065",
    message: "Access Granted!",
  });
}
