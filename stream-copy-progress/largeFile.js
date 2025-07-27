// Import core modules
const fs = require("fs"); // File system module for file operations
const path = require("path"); // Path module to work with file/directory paths

// Define the full path where the file will be created (same folder as this script)
const filePath = path.join(__dirname, "largefile.txt");

// Define the size of the file to be created: 600 MB
const fileSize = 600 * 1024 * 1024; // 600 megabytes converted to bytes (600 × 1024 × 1024)

// Create a buffer (a block of memory) filled with the character 'a'
// Buffer.alloc(size, fill) creates a buffer of the specified size filled with 'a' (in UTF-8)
const buffer = Buffer.alloc(fileSize, "a");

// Write the buffer to the specified file path synchronously (this blocks the event loop until done)
// This creates a 600MB file filled with 'a' characters
fs.writeFileSync(filePath, buffer);

// Log a success message showing the file size in MB and its full path
console.log(`Generated a ${fileSize / (1024 * 1024)} MB file at ${filePath}`);
