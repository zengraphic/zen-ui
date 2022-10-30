const cmdUtil = require('./utils/cmd.js');
const nodeUtil = require('./utils/node.js');

// Check node
nodeUtil.checkNodeVersion();

// Parse args
const argv = require('yargs')
  .hide('help')
  .hide('version')
  .fail(cmdUtil.handleError)
  // options
  .option('lib', {
    alias: 'l',
    describe: 'Library name',
    demand: true
  })
  .argv;

// Generate branch with changelog
const { lib, _: [script] } = argv;

const copyAssets = (libName) => {
  return `cpx "./projects/${libName}/src/lib/assets/**/*" ./dist/${libName}/assets`;
};
const copyStyles = (libName) => {
  console.log(libName)
  return `cpx "./projects/${libName}/src/lib/styles/**/*" ./dist/${libName}/styles`;
};
const bundleStyles = (libName) => {
  return `scss-bundle -e ./projects/${libName}/src/lib/${libName}.scss -d ./dist/${libName}/${libName}.scss`;
};

const bundleStylesTheme = (libName, theme) => {
  return `scss-bundle -e ./projects/${libName}/src/lib/${libName}-theme-${theme}.scss -d ./dist/${libName}/${libName}-theme-${theme}.scss`;
};

const bundleStylesTools = (libName) => {
  return `scss-bundle -e ./projects/${libName}/src/lib/${libName}-tools.scss -d ./dist/${libName}/${libName}-tools.scss`;
};
const buildAngular = (libName) => {
  return `ng build ${libName}`;
};

switch (script) {
  case 'start': {
    const exec = cmdUtil.exec(`${buildAngular(lib)} --watch`, { async: true });
    exec.stdout.on('data', function (data) {
      if (data.includes('Built Angular Package!')) {
        //cmdUtil.exec(`${copyAssets(lib)} --watch`, { async: true });
        cmdUtil.exec(`${copyStyles(lib)} --watch`, { async: true });
        cmdUtil.exec(`${bundleStyles(lib)} --watch=./projects/${lib}/src/lib/styles`, { async: true });
        //cmdUtil.exec(`${bundleStylesTools(lib)} --watch=./projects/${lib}/src/lib/styles`, { async: true });
      }
    });
    break;
  }
  case 'build': {
    const exec = cmdUtil.exec(buildAngular(lib), { async: true });
    exec.stdout.on('data', function (data) {
      if (data.includes('Built Angular Package!')) {
        //cmdUtil.exec(copyAssets(lib));
        cmdUtil.exec(copyStyles(lib));
        cmdUtil.exec(bundleStyles(lib));
        //cmdUtil.exec(bundleStylesTheme(lib, 'dea'));
        //cmdUtil.exec(bundleStylesTheme(lib, 'direct'));
        //cmdUtil.exec(bundleStylesTheme(lib, 'windtre'));
        //cmdUtil.exec(bundleStylesTheme(lib, 'wind'));
        //cmdUtil.exec(bundleStylesTheme(lib, 'tre'));
        //cmdUtil.exec(bundleStylesTheme(lib, 'wind-tre'));
        //cmdUtil.exec(bundleStylesTools(lib));
      }
    });
    break;
  }
  default: {
    cmdUtil.handleError('Unknown type');
  }
}
