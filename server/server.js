/* eslint-disable global-require */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env_data = require('dotenv').config({ path: `.env` });

if (env_data.error) throw env_data.error;

async function init() {
    try {
        const { app } = await require('./config/http').run();
        // eslint-disable-next-line no-multi-assign
        exports = module.exports = app;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

(async () => {
    try {
        init();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
