// Import the required core Node.js modules
const fs = require("fs"); // For file system operations like reading and writing files
const path = require("path"); // For handling and constructing file paths

// Define the full path of the source file (to be copied) and the destination file (copy location)
const sourcePath = path.join(__dirname, "largefile.txt"); // Source file path
const destinationPath = path.join(__dirname, "largefile-copy.txt"); // Destination file path

// Get the size (in bytes) of the source file using synchronous method
const stats = fs.statSync(sourcePath); // Gets file metadata
const totalSize = stats.size; // Total file size (used to calculate copy progress)
let transferred = 0; // Keeps track of how many bytes have been copied so far

// Create a readable stream to read from the source file in chunks
const sourceStream = fs.createReadStream(sourcePath);

// Create a writable stream to write to the destination file in chunks
const destinationStream = fs.createWriteStream(destinationPath);

// Function to calculate and display the current copy progress
function displayProgress(bytes) {
  transferred += bytes; // Add current chunk's byte length to total transferred
  const percentage = (transferred / totalSize) * 100; // Calculate percentage copied

  // Move the cursor to the beginning of the current line in the terminal
  process.stdout.cursorTo(0);

  // Display the progress with two decimal precision (e.g., "Progress: 36.45%")
  process.stdout.write(`Progress: ${percentage.toFixed(2)}%`);
}

// When a data chunk is read from the source file
sourceStream.on("data", (chunk) => {
  displayProgress(chunk.length); // Show progress for the current chunk
  destinationStream.write(chunk); // Write the chunk to the destination file
});

// When the source stream ends (i.e., the whole file has been read)
sourceStream.on("end", () => {
  console.log("\nCopy complete!"); // Newline and success message
  destinationStream.end(); // Close the writable stream (very important!)
});

// If there's an error reading from the source file
sourceStream.on("error", (err) => {
  console.error("Error reading the source file:", err); // Log the error
});

// If there's an error writing to the destination file
destinationStream.on("error", (err) => {
  console.error("Error writing to the destination file:", err); // Log the error
});
