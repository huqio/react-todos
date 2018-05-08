'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

// Webpack使用“publicPath”来确定应用程序的位置。
// 在发展中，我们总是从根源上服务。这使得配置更加容易
const publicPath = '/';
// `publicUrl`就像`publicPath`一样，但我们会将它提供给我们的应用
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// 省略斜杠作为%PUBLIC_PATH%/xyz看起来比%PUBLIC_PATH%xyz更好。
const publicUrl = '';
// 将环境变量注入到我们的应用中。
const env = getClientEnvironment(publicUrl);

// 这是开发配置。
// 它专注于开发人员体验和快速重建。
// 生产配置是不同的，并且生活在一个单独的文件中。
module.exports = {
  // 如果您希望在DevTools中看到已编译的输出，您可能需要“eval”。
  // 请参阅 https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // 这些是我们应用程序的“入口点”。
  // 这意味着它们将成为JS捆绑包中包含的"root"进口。
  // 前两个入口点支持“热”CSS和JS的自动刷新。
  entry: [
    // 默认情况下，我们会发送一些polyfills：
    require.resolve('./polyfills'),
    // 包括WebpackDevServer的另一个客户端。客户的工作是
    // 通过套接字连接到WebpackDevServer，并获得关于更改的通知。
    // 当您保存一个文件时，客户端要么应用热更新（以防万一
    // CSS的改变），或者刷新页面（在JS更改的情况下）。当你
    // 犯语法错误，这个客户端会显示一个语法错误叠加。
    // 注意：我们使用定制的WebpackDevServer客户端，而不是默认的WebpackDevServer客户端
    // 为创建react应用程序用户带来更好的体验。你可以换
    // 如果你更喜欢股票客户端，下面的这两行代码如下
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // 最后，这是你的应用程序
    paths.appIndexJs,
    // 我们将应用程序代码保存在最后，如果在此期间出现运行时错误
    // 初始化，它不会破坏WebpackDevServer客户端，
    // 更改JS代码仍然会触发刷新
  ],
  output: {
    // 在输出中添加/* filename */注释到生成的require()s 。
    pathinfo: true,
    // 这并不能生成真正的文件。它只是虚拟的路径
    // 由WebpackDevServer在开发中提供服务。这是JS包
    // 包含来自我们所有入口点的代码，以及Webpack运行时。
    filename: 'static/js/bundle.js',
    // 如果您使用代码分割，也会有额外的JS块文件。
    chunkFilename: 'static/js/[name].chunk.js',
    // 这是应用程序的URL。我们在开发中使用“/”。
    publicPath: publicPath,
    // 点sourcemap条目到原始磁盘位置（在Windows上作为URL格式）
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    // 这允许您为Webpack应该寻找模块的地方设置一个回退。
    // 我们把这些路径放在第二位因为我们想让“节点模块”来“赢”
    // 如果有什么冲突的话。这与节点解析机制相匹配。
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // 它肯定会存在因为我们在“env.js”中进行了调整
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // 这些是由节点生态系统支持的合理的默认值。
    // 我们还将JSX作为一个通用组件文件名扩展来支持
    // 一些工具，尽管我们不建议使用它，但请参见：
    // https://github.com/facebookincubator/create-react-app/issues/290
    // 为了更好的支持，已经添加了web的扩展前缀。
    // 为 React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      
      // 支持 React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
    plugins: [
      //防止用户从src/（或节点模块/）外部导入文件。
      //这经常会导致混淆，因为我们只处理src/巴别塔中的文件。
      //为了解决这个问题，我们阻止您从src/中导入文件——如果您愿意的话，
      //请将这些文件链接到你的node模块/并让模块解析启动。
      //确保你的源文件被编译，因为它们不会以任何方式被处理。
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // TODO:禁用要求。确保它不是标准的语言特性。
      // 我们正在等待 https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // 首先，运行linter。
      // 在巴别处理JS之前做这件事很重要。
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // “其中一个”将遍历所有的加载器直到一个
        // 匹配的要求。当没有加载器匹配时，它就会掉下来
        // 回到加载器列表末尾的“文件”加载器。
        oneOf: [
          // “url”加载器就像“file”加载器一样工作，只是它嵌入了资产
          // 小于指定的字节数作为数据url以避免请求。
          // A缺失的“测试”相当于一场比赛。
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              
              // 这是webpack的“babel-loader”（不是巴别塔本身）的一个特性。
              // 它支持缓存结果。/nodemodule/.cach/babel-loader/
              // 目录以更快的重新构建。
              cacheDirectory: true,
            },
          },
              // “postCSS”加载器将自动调整器应用到我们的CSS中。
              // “CSS”加载器在CSS中解决路径，并将资产添加为依赖项。
              // “样式”加载器将CSS转换为JS模块，注入了<style>标签。
              // 在生产中，我们使用一个插件将CSS提取到一个文件中，但是
              // 在开发“样式”加载器支持对CSS进行热编辑。
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // 外部CSS导入工作所必需的
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // 不管怎样，react都不支持IE8
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          // “文件”加载器确保这些资产由WebpackDevServer提供。
          // 当你导入一个资产时，你会得到它（虚拟）文件名。
          // 在生产过程中，它们会被复制到“构建”文件夹中。
          // 这个装载器不使用“测试”，这样它就能捕获所有的模块
          // 那是通过其他的装载机。
          {
            // 排除“js”文件，以保持“css”加载器在注入时工作
            // 它的运行时，否则将通过“file”加载器进行处理。
            // 也排除了“html”和“json”扩展，因此它们被处理了
            // 通过网络包内部加载器。
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** 你添加一个新的加载器吗？
      //确保在“文件”加载器之前添加新的装载机（s）。
    ],
  },
  plugins: [
    // 在index.html中提供一些环境变量。
    // public URL可以作为%PUBLIC_URL%在index.html使用,例如:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // 在开发中，这将是一个空字符串。
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // 将模块名称添加到工厂函数中，以便它们出现在浏览器分析器中。
    new webpack.NamedModulesPlugin(),
    // 为JS代码提供一些环境变量，例如：
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // 这是发出热更新的必要条件（目前只使用CSS）：
    new webpack.HotModuleReplacementPlugin(),
    // 如果你在路径中输入了一个错误的框，那么观察者就不能正常工作了
    // 当你试图做这个的时候，一个插件会打印一个错误。
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // 如果你需要一个缺失的模块然后“npm install”它，你仍然有
    // 重新启动Webpack的开发服务器来发现它。这个插件
    // 使发现自动生效，这样你就不必重新启动了。
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // 时刻。js是一个非常流行的库，它将大型地区文件捆绑在一起
    // 默认情况下是Webpack如何解释它的代码。这是一个实用的
    // 解决方案，要求用户选择导入特定的地区。
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // 如果你不使用moment.js，你可以删除它。
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // 一些图书馆导入节点模块，但不要在浏览器中使用它们。
  // 告诉Webpack为他们提供空的模拟，这样导入他们就可以工作了。
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // 在开发过程中关闭性能提示，因为我们不做任何事情。
  // 以速度的速度分裂或缩小。这些警告成为
  // 麻烦。
  performance: {
    hints: false,
  },
};
