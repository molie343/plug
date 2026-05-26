const crypto = require('crypto');

/**
 * Generate a random API key
 * @returns {string} Random API key with 'sk_test_' prefix
 */
function generateApiKey() {
  const randomBytes = crypto.randomBytes(12).toString('hex');
  return `sk_test_${randomBytes}`;
}

/**
 * Hash an API key using SHA256
 * @param {string} apiKey - API key to hash
 * @returns {string} Hashed API key
 */
function hashApiKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Verify an API key against its hash
 * @param {string} apiKey - Plain API key
 * @param {string} hash - Hashed API key
 * @returns {boolean} True if key matches hash
 */
function verifyApiKey(apiKey, hash) {
  return hashApiKey(apiKey) === hash;
}

module.exports = {
  generateApiKey,
  hashApiKey,
  verifyApiKey
};
