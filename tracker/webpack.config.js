const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

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
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                        }
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer(),
                                cssnano(),
                            ]
                        }
                    },
                    "group-css-media-queries-loader",
                    "sass-loader",
                ]
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