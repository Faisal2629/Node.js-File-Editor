const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
const target = process.argv[3];
const content = process.argv.slice(4).join(" ");

switch (operation) {
    case "read":
        if (!target) {
            console.log("Please specify the file to read.");
        } else {
            fs.readFile(target, "utf8", (err, data) => {
                if (err) {
                    console.error(`Error reading file '${target}': ${err.message}`);
                } else {
                    console.log(`Contents of '${target}':\n${data}`);
                }
            });
        }
        break;

    case "create":
        if (!target) {
            console.log("Please specify the file to create.");
        } else {
            fs.writeFile(target, "", (err) => {
                if (err) {
                    console.error(`Error creating file '${target}': ${err.message}`);
                } else {
                    console.log(`File '${target}' created.`);
                }
            });
        }
        break;

    case "append":
        if (!target || !content) {
            console.log("Please specify the file and content to append.");
        } else {
            fs.appendFile(target, content + "\n", (err) => {
                if (err) {
                    console.error(`Error appending to file '${target}': ${err.message}`);
                } else {
                    console.log(`Content appended to the file '${target}'.`);
                }
            });
        }
        break;

    case "delete":
        if (!target) {
            console.log("Please specify the file to delete.");
        } else {
            fs.unlink(target, (err) => {
                if (err) {
                    console.error(`Error deleting file '${target}': ${err.message}`);
                } else {
                    console.log(`File '${target}' deleted.`);
                }
            });
        }
        break;

    case "rename":
        const newName = process.argv[4];
        if (!target || !newName) {
            console.log("Please specify the file to rename and the new name.");
        } else {
            fs.rename(target, newName, (err) => {
                if (err) {
                    console.error(`Error renaming file '${target}': ${err.message}`);
                } else {
                    console.log(`File '${target}' renamed to '${newName}'.`);
                }
            });
        }
        break;

    case "list":
        if (!target) {
            console.log("Please specify the directory to list.");
        } else {
            fs.readdir(target, (err, files) => {
                if (err) {
                    console.error(`Error listing directory '${target}': ${err.message}`);
                } else {
                    console.log(`Contents of '${target}':`);
                    files.forEach((file) => console.log(file));
                }
            });
        }
        break;

    default:
        console.log(`Invalid operation '${operation}'.`);
        console.log("Valid operations are: read, create, append, delete, rename, list.");
        break;
}
