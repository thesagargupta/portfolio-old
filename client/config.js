// config.js

// Use a default URL if the environment variable is not set
const config = {
    API_URL: process.env.API_URL || 'http://localhost:3000' // Default to local if not defined
};

window.config = config;
