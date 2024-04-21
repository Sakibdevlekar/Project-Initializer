const fs = require("fs");

/**
 * Creates folders inside the specified directory
 * @param {string} dir - directory path
 */
exports.createFolders = function (dir) {
    const folders = [
        "models",
        "routes",
        "controllers",
        "logger",
        "validator",
        "middleware",
        "db",
    ];
    folders.forEach(function (folder) {
        fs.mkdir(`${dir}/${folder}`, { recursive: true }, function (err) {
            if (err) throw err;
            console.log(`Created ${folder} folder`);
        });
    });
};
