// Режим сборки development или production
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

// Опции webpack
let config = {
  // Директория с исходным кодом приложения
  context: path.join(__dirname, "/src"),
  // Главный файл приложения
  entry: `index.js`,
  // Куда и как делать сборку
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    // Очистить ./dist от предыдущей сборки
    clean: true,
  },
  plugins: [
    // Сборка стилей в отдельный файл
    new MiniCssExtractPlugin(),
    // Создание dist/index.html с подключенной сборкой
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html",
      base: "/",
    }),
  ],
  //
  resolve: {
    // Расширения по умолчанию, если не указаны в import
    extensions: [".js", ".jsx"],
    // Где искать файлы подключаемых модулей, в том числе главный index.js
    modules: ["./", "node_modules"],
    alias: {
      moment$: "moment/moment.js",
    },
  },
  module: {
    rules: [
      // Транспиляция JavaScript библиотекой babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      // Возможность подключать css как модули, чтобы попали в сборку
      // С опцией modules при импорте стиля получаем объект с названиями ccs классов
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          { loader: "css-loader", options: { url: true, import: true /*, modules: true*/ } },
        ],
      },
      // // Компиляция less стилей и возможность их подключение как модулей
      // {
      //   test: /\.less$/,
      //   use: [
      //     { loader: MiniCssExtractPlugin.loader, options: {} },
      //     { loader: 'css-loader', options: { url: true, import: true } },
      //     { loader: 'less-loader', options: { lessOptions: {} } },
      //   ],
      // },
      // // Возможность подключать файлы с перечисленным расширениями как модули.
      // // При импорте таких файлов получаем путь на них
      // // путь на файлы
      // {
      //   test: /\.(svg|png|swf|jpg|otf|eot|ttf|woff|woff2)(\?.*)?$/,
      //   use: [
      //     { loader: 'url-loader', options: { limit: 1000, name: 'assets/[contenthash].[ext]' } },
      //   ],
      // },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: {
      //         minimize: {
      //           removeComments: false,
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: true,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: false,
  },
};

if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
  config.devServer = {
    static: path.join(__dirname, "dist"),
    port: 8010,
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://example.front.ylab.io",
        secure: false,
        changeOrigin: true,
      },
      "/uploads/**": {
        target: "http://example.front.ylab.io",
        secure: false,
        changeOrigin: true,
      },
    },
  };
}

module.exports = config;
