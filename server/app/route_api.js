/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express = require('express');
/**
 * Add sub routes to parent route (recursively)
 * @param router
 * @param routes
 */
function add_routes(router, routes) {
    const route_length = routes.length;

    for (let i = 0; i < route_length; i += 1) {
        const route_data = routes[i];
        const { main_route, controller_path, routes_array } = route_data;
        const routes_length = routes_array.length;
        const Controller = require(controller_path);

        for (let j = 0; j < routes_length; j += 1) {
            try {
                const route = routes_array[j];
                const { type, path, controller_name, auth } = route;

                const route_url = `/${main_route}${path}`;

                router[type](route_url, Controller[controller_name]);
            
            } catch (err) {
                console.error(`Failed to initialize route ${main_route}`, err);
            }
        }
    }
}

module.exports = function (app) {
    const api_router = express.Router();
    const routes = require('./routes.json');

    add_routes(api_router, routes);

    api_router.use((req, res) => {
        res.status(400).json({ success: false, message: 'Unknown API method' });
    });

    app.set('trust proxy', 1);
    app.use('/api', api_router);
};
