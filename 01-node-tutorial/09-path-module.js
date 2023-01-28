const path = require('path')
// 파일/폴더/디렉터리 등의 경로를 편리하게 설정할 수 있는 기능을 제공

console.log(path.sep)
// : "현 운영체제의 경로 구분자" 확인 - 맥 /, 윈도우 \

const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)
// good example for how to make directory path until file.

const filePath2 = path.join('/content/', 'subfolder', 'secondfolder','test.txt')
console.log(filePath2)

const filePath3 = path.join('/content/', 'subfolder', 'secondfolder', 'thirdfolder','test.txt')
console.log(filePath3)

const base = path.basename(filePath)
console.log(base)
// obtain filename.

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)
// obtain fullpath w/ __dirname.
