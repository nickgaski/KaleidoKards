const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, 
                use: {
                    loader: "babel-loader" 
                }
            },
           {test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },

            {test: /\.scss$/,
            use:['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./webpack-demo/template.html"})
       
    ]
};