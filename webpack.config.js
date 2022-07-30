// Режим сборки development или production
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

// Опции webpack
let config = {
  context: path.join(__dirname, '/src'), // Директория с исходным кодом приложения
  entry: `index.js`, // Главный файл приложения
  output: {
    path: path.join(__dirname, 'dist'), // Куда и как делать сборку
    filename: '[name].js',
    clean: true, // Очистить ./dist от предыдущей сборки
  },
  plugins: [
    new MiniCssExtractPlugin(), // Сборка стилей в отдельный файл
    new HtmlWebPackPlugin({ // Создание dist/index.html с подключенной сборкой
      template: './index.html',
      filename: './index.html',
      base: '',
    }),
  ],
  //
  resolve: {
    extensions: ['.js', '.jsx'], // Расширения по умолчанию, если не указаны в import
    modules: ['./', 'node_modules'], // Где искать файлы подключаемых модулей
  },
  module: {
    rules: [
      // Транспиляция JS
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}],
      },
      // Возможность подключать css как модули, чтобы попали в сборку
      // С опцией modules при импорте стиля получаем объект с названиями ccs классов
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader, options: {}},
          {loader: 'css-loader', options: {url: true, import: true/*, modules: true*/}},
        ],
      },
    ],
  },
};

// Локальный сервер для отладки приложения
if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map';
  config.devServer = {
    static: path.join(__dirname, 'dist'),
    port: 8010,
    historyApiFallback: true,
  };
}

module.exports = config;
