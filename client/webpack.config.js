module.exports = function(env) {
  // console.log(`Loading webpack config for env: ${env}`);
  if (!env) return require('./webpack.dev.js')
  return require(`./webpack.${env}.js`)
}