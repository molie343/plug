# Plug - API Key Authentication Web App

A Node.js Express web application with API key authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Start the Server
```bash
npm start
```

Server runs on `http://localhost:3000`

## 🔑 API Key Authentication

### Test API Keys
- `sk_test_12345abcdef`
- `sk_test_67890ghijkl`

### Generate New API Key
```bash
curl -X POST http://localhost:3000/generate-api-key
```

Response:
```json
{
  "success": true,
  "apiKey": "sk_test_abc123def456",
  "message": "API key generated successfully"
}
```

## 📋 API Endpoints

### Public Routes

#### Health Check
```bash
GET /health
```

#### Generate API Key
```bash
POST /generate-api-key
```

### Protected Routes (Require API Key)

#### Get All Users
```bash
curl http://localhost:3000/api/users \
  -H "X-API-Key: sk_test_12345abcdef"
```

#### Get User by ID
```bash
curl http://localhost:3000/api/users/1 \
  -H "X-API-Key: sk_test_12345abcdef"
```

## 🔒 Authentication

Include your API key in the request header:
```
X-API-Key: sk_test_your_api_key_here
```

**Errors:**
- Missing API key: `401 Unauthorized`
- Invalid API key: `403 Forbidden`

## 📁 Project Structure

```
plug/
├── server.js              # Main Express app
├── middleware/
│   └── apiKeyAuth.js      # API key validation middleware
├── utils/
│   └── generateApiKey.js  # Key generation utilities
├── package.json           # Dependencies
├── .env.example           # Environment template
└── README.md              # Documentation
```

## 🛠️ Development

For development with auto-reload:
```bash
npm run dev
```

## 📦 Dependencies

- **express** - Web framework
- **dotenv** - Environment variables

## 🔐 Production Notes

For production use:
1. Store API keys in a database with hashed values
2. Use environment variables for sensitive data
3. Implement rate limiting
4. Add request logging
5. Use HTTPS
6. Rotate API keys regularly

## 📝 License

MIT
