//for in
const files = ["foo.txt ", ".bar", "   ", "baz.foo"];
let filePaths = [];

for (let file of files) {
  let fileName = file.trim();
  if (fileName) {
    filePaths.push(`~/cool_app/${fileName}`);
  }
}

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']

//reduce
const files = ["foo.txt ", ".bar", "   ", "baz.foo"];
const filePaths = files.reduce((acc, file) => {
  const fileName = file.trim();
  if (fileName) {
    acc.push(`~/cool_app/${fileName}`);
  }
  return acc;
}, []);

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']

//Method Chain
const files = ["foo.txt ", ".bar", "   ", "baz.foo"];
const filePaths=files.map(file=>file.trim()).filter(Boolean).map(fileName=>`~/cool_app/${fileName}`) 

// filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']