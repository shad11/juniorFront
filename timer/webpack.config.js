const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader",
                    options: {
                        presets: ["@babel/env", "@babel/react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html$/,
                loader: "raw-loader",
            }

        ]
    },
    // resolve: {
    //     extensions: ['.js', '.jsx']
    // },
    devServer: {
        contentBase: './',
        port: 3000
    }
};