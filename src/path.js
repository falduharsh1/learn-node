const path = require('path')

console.log(__dirname);
//D:\harsh faldu\learn node\src

console.log(__filename);
//D:\harsh faldu\learn node\src\path.js

console.log(path.basename(__filename));
//path.js

console.log(path.extname(__filename));
//.js

console.log(path.join("https::/india/" , "virat-kohli"));
//https::\india\virat-kohli

console.log(path.resolve("https::/india/" , "virat-kohli"));
//D:\harsh faldu\learn node\https::\india\virat-kohli

console.log(path.parse("https::/india/" , "virat-kohli"));
//{ root: '', 
// dir: 'https::', 
// base: 'india', 
// ext: '', 
// name: 'india' }

