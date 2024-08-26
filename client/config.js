// config.js
const config = {
    API_URL: window.env && window.env.API_URL ? window.env.API_URL : 'http://localhost:3000'
};

window.config = config;
