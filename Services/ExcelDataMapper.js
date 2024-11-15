class ExcelDataMapper {
    /**
     * Constructor for the ExcelDataMapper class.
     * @param {Object} excelReader - The excelReader instance for reading Excel data.
     * @param {Object} columnMap - The mapping object for column headers.
     * @param {number} headerRowIndex - The index of the header row.
     * @param {number} dataRowIndexStart - The index where data rows start.
     */
    constructor(excelReader, columnMap, headerRowIndex = 0, dataRowIndexStart = 1) {
        this.excelReader = excelReader;
        this.columnMap = columnMap;
        this.headerRowIndex = headerRowIndex;
        this.dataRowIndexStart = dataRowIndexStart;
    }

    /**
     * Reads the Excel file, maps the data to JSON based on the column map.
     * @param {string} fileName - The Excel file name.
     * @param {string} sheetName - The sheet name to read data from.
     * @returns {Array} - Mapped data as an array of objects.
     */
    mapDataToJson(fileName, sheetName) {
        // Read data from the specified Excel file and sheet
        const sheetData = this.excelReader.getSheetData(fileName, sheetName);

        // Get headers and data rows based on the indices
        const headers = sheetData[this.headerRowIndex];
        const rows = sheetData.slice(this.dataRowIndexStart);

        // Map data rows to JSON format
        const mappedData = rows.map(row => {
            const mappedRow = {};
            for (const [key, excelHeader] of Object.entries(this.columnMap)) {
                const colIndex = this.findIndexOfMatchingElement(headers, excelHeader);
                if (colIndex !== -1) {
                    mappedRow[key] = row[colIndex];
                } else {
                    mappedRow[key] = '';
                }
            }
            return mappedRow;
        });

        return mappedData;
    }

    /**
     * Finds the index of the first matching element from a list of headers.
     * @param {Array} headers - Array of headers from the Excel sheet.
     * @param {Array} possibleHeaders - List of possible header names to match.
     * @returns {number} - Index of the matching header, or -1 if not found.
     */
    findIndexOfMatchingElement(headers, possibleHeaders) {
        const matchingElement = possibleHeaders.find(element => headers.includes(element));
        if (matchingElement) {
            return headers.indexOf(matchingElement);
        }
        return -1;
    }
}

module.exports = ExcelDataMapper;