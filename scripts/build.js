const rollup = require("rollup");
const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const vue = require("rollup-plugin-vue");
const pkg = require("../package.json");

const external = Object.keys(pkg.dependencies);
const production = !process.env.ROLLUP_WATCH;
// const dev = !!process.env.DEV;
const env = production ? "production" : "development";
const extensions = [".js", ".vue"];

const globals = {
  vue: "Vue"
};

const plugins = [nodeResolve({ extensions }), commonjs(), vue()];
const banner = `
  /*!
   * ${pkg.name} - v${pkg.version}
   * Built: ${new Date()}
   */
`;
const inputOptionsClient = {
  external,
  plugins,
  input: "./src/client/entry.js"
};
const outputOptionsClient = {
  banner,
  globals,
  file: "./dist/app.js",
  format: "iife"
};

build(inputOptionsClient, outputOptionsClient)
  .then(_ => {
    console.log("built");
  })
  .catch(console.log);

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}
