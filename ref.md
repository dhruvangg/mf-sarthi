const XLSX = require("xlsx");
const fs = require('fs');
const path = require('path');

const folderPath = './data';
const filePath = './debug.json';

const columnMappings = {
    'cams': { PAN: 'pan', NAME: 'inv_name' },
    'kfintech': { PAN: 'PAN1', NAME: 'Investor Name' },
};

console.clear()
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    files.forEach(file => {
        const fullPath = path.join(folderPath, file); 
        fs.stat(fullPath, async (err, stats) => {
            if (err) {
                console.error('Error reading file stats:', err);
                return;
            }
            if (stats.isFile()) {
                console.log('File:', `${file}`);
                const workbook = XLSX.readFile(`${folderPath}/${file}`)
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const headers = data[0].length === 1 ? data[1] : data[0];
                const filetype = data[0].length === 1 ? 'kfintech' : 'cams';
                
                const rows = data.slice(1);
                // console.log(headers);

                const mapping = columnMappings[filetype];
                const mappedData = rows.map(row => {
                    const mappedRow = {};

                    for (const [key, excelHeader] of Object.entries(mapping)) {

                        // Find index of the column in headers array
                        const colIndex = headers.indexOf(excelHeader);
                        // console.log(key, excelHeader, colIndex);
                        if (colIndex !== -1) {
                            mappedRow[key] = row[colIndex];
                        }
                    }
                    return mappedRow;
                });
                console.log(mappedData);

                // return mappedData;

                // const pan = data.map(row => row[42]);
                // console.log(pan);


                // fs.writeFile('debug.json', JSON.stringify(data), (err) => {
                //     if (err) {
                //         return console.error('Error writing to file:', err);
                //     }
                //     console.log('Initial content written to file.');
                // });


            } else if (stats.isDirectory()) {
                console.log('Directory:', file);
            }
        });
    });
});