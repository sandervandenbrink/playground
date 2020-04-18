const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// TODO: Get path to file or directory
// TODO: Use node imagemagick

const directoryPath = path.join(__dirname, '20191204-154315');

const readFiles = () => {
    const p = new Promise((resolve, reject) => {
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            const heicFiles = files.filter((file) => file.includes('.HEIC'));
            resolve(heicFiles);
        });
    });

    return p;
}

const convertFile = (file, success) => {
    console.log(`Convert file ${file}...`);

    exec(`mogrify -path jpegs -format jpg ${file}`, (err, stdout, stderr) => {
        if (err) {
            console.log('Error', err);
            return;
        }

        success();
    });
}

readFiles().then((files) => {
    console.log('Files', files[files.length - 1]);
    let index = 0;

    convertFile(files[files.length - 1]);

    const convertNext = () => {
        if (index === files.length) {
            console.log('Convert done!');
            return;
        }

        convertFile(files[index], convertNext);
        index++;
    }

    // convertNext();
});
