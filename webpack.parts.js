/* global require exports */

const PurgecssPlugin = require("purgecss-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: "errors-only",
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true
        },
        compress: true
    }
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include,
                exclude,
                enforce: "pre",

                loader: "eslint-loader",
                options
            }
        ]
    }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});

exports.purgeCSS = ({ paths }) => ({
    plugins: [
        new PurgecssPlugin({ paths, rejected: true })
    ]
});


exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,

                use: {
                    loader: "url-loader",
                    options
                }
            }
        ]
    }
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                // Capture eot, ttf, woff, and woff2
                test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
                include,
                exclude,

                use: {
                    loader: "file-loader",
                    options
                }
            }
        ]
    }
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type
});

exports.loadJavaScript = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include,
                exclude,

                loader: "babel-loader",
                options: {
                    // Enable caching for improved performance during
                    // development.
                    // It uses default OS directory by default. If you need
                    // something more custom, pass a path to it.
                    // I.e., { cacheDirectory: "<path>" }
                    cacheDirectory: true
                }
            }
        ]
    }
});

exports.clean = () => ({
    plugins: [
        new CleanWebpackPlugin()
    ]
});

exports.attachRevision = () => {
    const gitRevisionPlugin = new GitRevisionPlugin({
        versionCommand: "describe --always --tags --dirty"
    });
    return {
        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(gitRevisionPlugin.version()),
                BUILD_DATE: JSON.stringify(new Date().toJSON())
            })
        ]
    };
};

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false
        })
    ]
});

exports.page = (
    {
        filename = "index.html",
        template = require.resolve(
            "html-webpack-plugin/default_index.ejs"
        ),
        title,
        entry,
        chunks,
        inject = "head"
    } = {}
) => (
    {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                filename,
                template,
                title,
                inject
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: "defer"
            })
        ]
    }
);
