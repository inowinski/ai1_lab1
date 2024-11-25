const path = require("path");

module.exports = {
    entry: "./script.ts",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development", // Użyj "production" w wersji finalnej
};
