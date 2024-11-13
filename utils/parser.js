const XLSX = require("xlsx");
const fs = require('fs');
const path = require('path');

const folderPath = './data';

const columnMappings = {
    'cams': { pan: 'pan', name: 'inv_name' },
    'kfintech': { pan: 'PAN1', name: 'Investor Name' },
};

exports.parseReportData = async () => {
    try {
        const files = await fs.promises.readdir(folderPath);
        const fileStats = await Promise.all(files.map(async (file) => {
            const fullPath = path.join(folderPath, file);
            const stats = await fs.promises.stat(fullPath);
            if (stats.isFile()) {
                const workbook = XLSX.readFile(`${folderPath}/${file}`)
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const headers = data[0].length === 1 ? data[1] : data[0];
                const filetype = data[0].length === 1 ? 'kfintech' : 'cams';

                const rows = data[0].length === 1 ? data.slice(2) : data.slice(1)

                const mapping = columnMappings[filetype];
                const mappedData = rows.map(row => {
                    const mappedRow = {};
                    for (const [key, excelHeader] of Object.entries(mapping)) {
                        const colIndex = headers.indexOf(excelHeader);
                        if (colIndex !== -1) {
                            mappedRow[key] = row[colIndex];
                        }
                    }
                    return mappedRow;
                });
                return mappedData;
            } else if (stats.isDirectory()) {
                return `Directory: ${file} \n\n`;
            }
        }));
        return fileStats //.flat();
    } catch (err) {
        console.error('Error reading directory:', err);
    }
};

exports.parseData = (body) => {
    console.log();
    fundData = []
    bodyClean = body.replace(/\r?\n/g, "\n")
    bodyArr = bodyClean.split("\n")
    funds = bodyArr.map((str) => {
        return str.split(";")
    })

    headers = funds[0]

    for (let i = 1; i < funds.length; i++) {
        if (funds[i].length === 6) {
            let obj = {}
            for (let j = 0; j < 6; j++)
                obj[headers[j]] = funds[i][j]
            fundData.push(obj)
        }
    }

    return fundData
}