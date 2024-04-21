const fs = require("fs");

/**
 * Creates multiple files in the specified directory.
 * @param {string} dir - The directory in which to create the files.
 */
const createFiles = function (dir) {
    const files = ["constant.js", "index.js", "app.js"];
    files.forEach(function (file) {
        fs.writeFile(`${dir}/${file}`, "", function (err) {
            if (err) throw err;
            console.log(`Created ${file} file`);
        });
    });
};

module.exports = { createFiles };
