const { exec } = require("child_process");

/**
 * Runs a terminal command in the given working directory.
 * @param {string} command - the command to execute
 * @param {string} [cwd] - the working directory in which to execute the command
 */
exports.runCommand = function (command, cwd) {
    exec(command, { cwd }, function (error, stdout, stderr) {
        if (error) {
            /**
             * @type {Error}
             */
            console.error(`Error executing command: ${error}`);
            return;
        }
        console.log(`Command output: ${stdout}`);
    });
};
