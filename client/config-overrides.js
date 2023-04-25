const paths = require("react-scripts/config/paths");
const path = require("path");
const { useBabelRc, override } = require("customize-cra");

paths.appSrc = path.resolve(__dirname, "src");
paths.appIndexJs = path.resolve(__dirname, "src/index.tsx");

const applyJestConfig = config => {
  return config
}

module.exports = override(applyJestConfig,useBabelRc());
