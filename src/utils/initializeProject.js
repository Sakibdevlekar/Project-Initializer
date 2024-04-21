const fs = require("fs");
const path = require("path");
const { createFiles } = require("../utils/createFiles");
const { createFolders } = require("../utils/createFolders");
const { runCommand } = require("../utils/runCommand");

/**
 * Creates a new project with the specified folder name on the user's desktop.
 * @param {string} folderName - The name of the folder to create.
 */
exports.initializeProject = function (folderName) {
    const desktopPath = path.join(require("os").homedir(), "Desktop");
    const actualDesktopPath = fs.existsSync(desktopPath)
        ? desktopPath
        : path.join(require("os").homedir(), "OneDrive", "Desktop");
    const projectPath = path.join(actualDesktopPath, folderName);
    fs.mkdir(projectPath, (err) => {
        if (err) throw err;
        console.log(`Created folder ${folderName} on Desktop`);
        // Change current working directory to the project folder
        process.chdir(projectPath);
        // Create src folder
        fs.mkdir(`${projectPath}/src`, { recursive: true }, (err) => {
            if (err) throw err;
            console.log(`Created src folder`);
            // Create other folders inside src
            createFolders(`${projectPath}/src`);
            // Create files inside src
            createFiles(`${projectPath}/src`);
            // Create package.json,.env,.prettierignore, and.prettierrc files outside src
            fs.writeFile(
                `${projectPath}/package.json`,
                JSON.stringify(
                    {
                        name: folderName,
                        version: "1.0.0",
                        description: "Your project description",
                        main: "index.js",
                        scripts: {
                            start: "node index.js",
                        },
                        dependencies: {},
                    },
                    null,
                    2,
                ),
                (err) => {
                    if (err) throw err;
                    console.log(`Created package.json file`);
                    // Install dependencies outside src folder
                    runCommand(
                        `npm i bcrypt cookie-parser cors dotenv express express-rate-limit express-validator helmet jsonwebtoken mongoose morgan winston`,
                        projectPath,
                    );
                },
            );
        });
    });
};
