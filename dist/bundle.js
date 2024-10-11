import api from '/api/api.mjs'; // Use correct path relative to your current file

console.log(api);

export default api; // Export api as default

// Add this code snippet here
app.use((req, res, next) => {
    res.header('Content-Type', 'application/javascript');
    next();
  });