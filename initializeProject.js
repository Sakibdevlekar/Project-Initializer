const readline = require("readline");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to execute a terminal command
const runCommand = (command, cwd) => {
  exec(command, { cwd }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    console.log(`Command output: ${stdout}`);
  });
};

// Create folders inside the specified directory
const createFolders = (dir) => {
  const folders = [
    "models",
    "routes",
    "controllers",
    "logger",
    "validator",
    "middleware",
    "db",
  ];
  folders.forEach((folder) => {
    fs.mkdir(`${dir}/${folder}`, { recursive: true }, (err) => {
      if (err) throw err;
      console.log(`Created ${folder} folder`);
    });
  });
};

// Create files inside the specified directory
const createFiles = (dir) => {
  const files = [
    "constant.js",
    ".prettierignore",
    ".prettierrc",
    ".env",
    "sample.env",
    "README.md",
    "index.js",
    "app.js",
  ];
  files.forEach((file) => {
    fs.writeFile(`${dir}/${file}`, "", (err) => {
      if (err) throw err;
      console.log(`Created ${file} file`);
    });
  });
};

// Initialize the project
const initializeProject = (folderName) => {
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

    runCommand("npm init -y", projectPath);
    runCommand(
      `npm i bcrypt cookie-parser cors dotenv express express-rate-limit express-validator helmet jsonwebtoken mongoose morgan winston`,
      projectPath
    );

    // Wait for npm packages to install before creating folders/files
    setTimeout(() => {
      createFolders(projectPath);
      createFiles(projectPath);
    }, 5000); // Adjust delay as needed
  });
};

// Prompt user for folder name
rl.question("Enter folder name: ", (folderName) => {
  initializeProject(folderName);
  rl.close();
});
