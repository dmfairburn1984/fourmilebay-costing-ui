const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React build folder
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`FourMileBay Costing UI running on port ${PORT}`);
});