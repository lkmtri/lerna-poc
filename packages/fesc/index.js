require('@babel/polyfill')
require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        'targets': {
          'node': 'current'
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    [
      'module-resolver',
      {
        root: [
          './'
        ],
        'cwd': 'babelrc'
      }
    ]
  ],
  ignore: []
})

require('./server')
