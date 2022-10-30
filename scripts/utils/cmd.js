const shell = require('shelljs');

const cmdUtil = {
  handleError: message => {
    shell.echo(`${message} \n`);
    shell.echo(`--- ❌  Failed with error  ❌  ---\n`);
    shell.exit(1);
  },
  handleSuccess: (message = '') => {
    shell.echo(`${message} \n`);
    shell.echo(`--- ✅  Successfully completed  ✅  ---\n`);
    shell.exit(0);
  },
  exec: (command, options) => {
    return shell.exec(command, options);
  }
};

module.exports = cmdUtil;
