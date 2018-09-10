module.exports = (nextConfig = {}) => {
  const internalNodeModulesRegExp = /core(?!.\/*node_modules)/
  const externalNodeModulesRegExp = /node_modules(?!\/core(?!.*node_modules))/
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // Prevent resolving node_modules/core to its real symlinked path.
      const { dev, isServer, defaultLoaders } = options
      
      config.resolve.symlinks = false 
  
      // Override default next.js 's webpack externals config (which will bundle node_modules/core as common js modules).
      config.externals = config.externals.map(external => { 
        if (typeof external !== "function") return external
        return (ctx, req, cb) => (internalNodeModulesRegExp.test(req) ? cb() : external(ctx, req, cb))
      })
  
      // Using babel loader for node_modules/core/**/*.js(x)
      config.module.rules.push({
        test: /\.+(js|jsx)$/,
        loader: defaultLoaders.babel,
        include: [internalNodeModulesRegExp] 
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
    webpackDevMiddleware: config => {
      // Watch for changes in node_modules/core in dev mode
      const ignored = [config.watchOptions.ignored[0], externalNodeModulesRegExp]
      config.watchOptions.ignored = ignored
      return config
    }
  })
}