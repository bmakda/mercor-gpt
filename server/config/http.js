/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
/* eslint-disable global-require */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    run(for_cron = false) {
        return new Promise((resolve, reject) => {
            try {
                const path_string = './express';
                const express = require(path_string);
                const app = express();
                const port = 3050;

                const http = require('http');
                const server = http.Server(app);

                server.listen(port, () => {
                    this.server = server;
                    console.log(`Backend Server Started on Port ${port} at Date: ${new Date()}`);
                    resolve({ app });
                });

            } catch (err) {
                reject(err);
            }
        });
    },
    server: null,
};
