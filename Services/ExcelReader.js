const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

class ExcelReader {
    constructor(directoryPath) {
        this.directoryPath = directoryPath;
        this.workbooks = [];
    }

    loadFiles() {
        try {
            const files = fs.readdirSync(this.directoryPath);
            const excelFiles = files.filter(file => file.endsWith('.xls') || file.endsWith('.xlsx'));

            this.workbooks = excelFiles.map(file => {
                const filePath = path.join(this.directoryPath, file);
                return {
                    fileName: file,
                    workbook: xlsx.readFile(filePath),
                };
            });
        } catch (error) {
            throw new Error(`Failed to read files in the directory: ${error.message}`);
        }
    }

    getAllSheetNames() {
        if (this.workbooks.length === 0) {
            throw new Error('No files loaded. Call loadFiles() first.');
        }

        return this.workbooks.map(({ fileName, workbook }) => ({
            fileName,
            sheetNames: workbook.SheetNames,
        }));
    }

    getSheetData(fileName, sheetName) {
        const workbookInfo = this.workbooks.find(({ fileName: fName }) => fName === fileName);

        if (!workbookInfo) {
            throw new Error(`File "${fileName}" not found.`);
        }

        const sheet = workbookInfo.workbook.Sheets[sheetName];
        if (!sheet) {
            throw new Error(`Sheet "${sheetName}" does not exist in file "${fileName}".`);
        }

        return xlsx.utils.sheet_to_json(sheet, { header: 1 });
    }
}

module.exports = ExcelReader;
