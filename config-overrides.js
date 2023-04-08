const paths = require("react-scripts/config/paths");
const path = require("path");
const { useBabelRc, override } = require("customize-cra");

paths.appSrc = path.resolve(__dirname, "app");
paths.appIndexJs = path.resolve(__dirname, "app/index.tsx");
module.exports = override(useBabelRc());
