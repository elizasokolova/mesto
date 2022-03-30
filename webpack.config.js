const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/pages/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        open: true
    },
    module: {
         rules: [ // rules — это массив правил
             // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
             {
                 // применять это правило только к CSS-файлам
                 test: /\.css$/,
                 // при обработке этих файлов нужно использовать
                 // MiniCssExtractPlugin.loader и css-loader
                 use: [MiniCssExtractPlugin.loader, {
                     loader: 'css-loader',
                     options: { importLoaders: 1 } // Важная штука если используешь @import в css файлах
                 },
                     'postcss-loader']
             },
             {
                 // регулярное выражение, которое ищет все файлы с такими расширениями
                 test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                 type: 'asset/resource'
             },
         ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ]
};