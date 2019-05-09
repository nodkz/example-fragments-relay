/* eslint-disable */

const fs = require('fs');

// Fix imports for `relay-compiler-language-typescript`

const filename = './node_modules/relay-compiler-language-typescript/lib/TypeScriptGenerator.js';
fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/relay-compiler\/lib\/RelayCompilerPublic/g, 'relay-compiler');

  fs.writeFile(filename, result, 'utf8', (e) => {
    if (e) console.log(e);
  });

  return undefined;
});
