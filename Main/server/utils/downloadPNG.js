
// COME BACK TO THIS LATER AND FIGURE OUT HOW TO STORE THE PNG INSTEAD OF URL



// const fetch = require('node-fetch');
// const fs = require('fs/promises');

// const downloadPNG = async () => {
//   const url = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-4mBtXDVR1tP2WzjbZ2b2ByBS/user-pLXyFsolvhCBkwSlCzU9WqQ7/img-FvUKTOHFLRznw80IXuZwDAz4.png";
//   const outputPath = "output.png";

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Failed to download PNG file. Status code: ${response.status}`);
//     }

//     const data = await response.buffer();
//     await fs.writeFile(outputPath, data);

//     console.log(`PNG file downloaded successfully as ${outputPath}`);
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// // Call the function
// downloadPNG();