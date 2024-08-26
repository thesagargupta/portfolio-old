// config.js
const config = {
    API_URL: window.env.API_URL || 'http://localhost:3000' // Fallback to localhost for local development
};

window.config = config;
