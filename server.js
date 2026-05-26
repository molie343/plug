const express = require('express');
const dotenv = require('dotenv');
const apiKeyAuth = require('./middleware/apiKeyAuth');
const { generateApiKey } = require('./utils/generateApiKey');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test API keys (in production, store these securely in a database)
const validApiKeys = [
  'sk_test_12345abcdef',
  'sk_test_67890ghijkl'
];

// Public route - Generate API key (for demo purposes)
app.post('/generate-api-key', (req, res) => {
  const newKey = generateApiKey();
  res.json({
    success: true,
    apiKey: newKey,
    message: 'API key generated successfully'
  });
});

// Protected route - Get users
app.get('/api/users', apiKeyAuth(validApiKeys), (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]
  });
});

// Protected route - Get user by ID
app.get('/api/users/:id', apiKeyAuth(validApiKeys), (req, res) => {
  res.json({
    success: true,
    data: { id: req.params.id, name: 'User Name' }
  });
});

// Public route - Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
