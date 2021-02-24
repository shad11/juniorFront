process.env.NODE_CONFIG_DIR = './src/config';

const express = require("express");
const config = require("config");
const path = require("path");
const appLoader = require("./loaders");
const PORT = config.get('port') || 3040;

const start = async () => {
    const app = express();

    await appLoader(app);

    if (process.env.NODE_ENV === 'production') {
        app.use('/', express.static(path.join(__dirname, '../client', 'build')));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
        })
    }

    app.listen(PORT, () => console.log(`App has been started on PORT: ${PORT}`));
}

start();
