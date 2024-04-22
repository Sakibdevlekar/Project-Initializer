const { rl } = require("./utils/readLineInterFace");
const { initializeProject } = require("./utils/initializeProject");

/**
 * Prompts the user for a project name and initializes a new project with the given name.
 * @param {string} folderName - The name of the project folder.
 */
rl.question("Enter your project name: ", (folderName) => {
    initializeProject(folderName);
    rl.close();
});
