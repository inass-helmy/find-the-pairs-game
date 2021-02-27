const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");

// // fix: prevents error when .less files are required by node
// if (typeof require !== "undefined") {
//   require.extensions[".less"] = (file) => {};
// }

module.exports = withLess(
  withSass({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
  })
);

const fs = require("fs");
const path = require("path");

const lessToJS = require("less-vars-to-js");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

// const withImage = require('./configs/next-image.config');
// const withDotenv = require('./configs/next-dotenv.config');
const withAntd = require("./next-antd.config");

const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./styles/antd.less"), "utf8")
);

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withAntd({
  cssModules: true,
  cssLoaderOptions: {
    sourceMap: false,
    importLoaders: 1,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: antdVariables,
  },
  webpack: (config) => {
    config.plugins.push(
      new FilterWarningsPlugin({
        // ignore ANTD chunk styles [mini-css-extract-plugin] warning
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );

    return config;
  },
});