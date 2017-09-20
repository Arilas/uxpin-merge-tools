import { BabelPlugin } from '../building/plugins/BabelPluginDefinition';

const CONFIG:any = {
  entry: './src/components.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: [
            ],
            presets: [
              'react',
              ['env', {
                targets: {
                  browsers: ['last 2 versions'],
                },
              }],
              'stage-0',
            ],
          },
        }],
      },
    ],
  },
  output: {
    filename: 'components.js',
    libraryTarget: 'amd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const LOADER_BABEL:string = 'babel-loader';

function getConfigDecoratedWithLibraries(babelPlugins:BabelPlugin[], target:string):any {
  const config:any = Object.assign({}, CONFIG);

  config.output.libraryTarget = target;

  config.module.rules.forEach((rule:any) => {
    if (!rule || !rule.use) {
      return;
    }

    rule.use.forEach((loader:any) => {
      if (loader.loader === LOADER_BABEL) {
        loader.options.plugins = babelPlugins;
      }
    });
  });

  return config;
}

export function getConfig(babelPlugins:BabelPlugin[], target:string):any {
  return getConfigDecoratedWithLibraries(babelPlugins, target);
}
