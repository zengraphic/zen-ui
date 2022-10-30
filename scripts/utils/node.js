const semver = require('semver');
const cmdUtil = require('../utils/cmd.js');

const nodeUtil = {
  checkNodeVersion: () => {
    if (!semver.satisfies(process.version, `>=11.0.0`)) {
      cmdUtil.handleError(
        'Your node is too old, please update at least to 11.0.0'
      );
    }
  }
};

module.exports = nodeUtil;
