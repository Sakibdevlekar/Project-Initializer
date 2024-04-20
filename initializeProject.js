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
  const files = ["constant.js", "index.js", "app.js"];
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

    // Create src folder
    fs.mkdir(`${projectPath}/src`, { recursive: true }, (err) => {
      if (err) throw err;
      console.log(`Created src folder`);

      // Create other folders inside src
      createFolders(`${projectPath}/src`);

      // Create files inside src
      createFiles(`${projectPath}/src`);

      // Create package.json, .env, .prettierignore, and .prettierrc files outside src
      fs.writeFile(`${projectPath}/package.json`, JSON.stringify({
        "name": "your-project-name",
        "version": "1.0.0",
        "description": "Your project description",
        "main": "index.js",
        "scripts": {
          "start": "node index.js"
        },
        "dependencies": {}
      }, null, 2), (err) => {
        if (err) throw err;
        console.log(`Created package.json file`);

        // Install dependencies outside src folder
        runCommand(
          `npm i bcrypt cookie-parser cors dotenv express express-rate-limit express-validator helmet jsonwebtoken mongoose morgan winston`,
          projectPath
        );
      });
    });
  });
};

// Prompt user for folder name
rl.question("Enter folder name: ", (folderName) => {
  initializeProject(folderName);
  rl.close();
});


// Prompt user for folder name
rl.question("Enter folder name: ", (folderName) => {
  initializeProject(folderName);
  rl.close();
});
