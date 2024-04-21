const { rl } = require("./utils/readLineInterFace");
const { initializeProject } = require("./utils/initializeProject");

// Prompt user for folder name
rl.question("Enter your project name: ", (folderName) => {
    initializeProject(folderName);
    rl.close();
});
