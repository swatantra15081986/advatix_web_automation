const ExcelJS = require('exceljs')


const write_excel = ({ file_path, cell_name, value, sheet_name }) => {
  const workbook = new ExcelJS.Workbook();
      return workbook.xlsx.readFile(file_path)
        .then(() => {
          const worksheet = workbook.getWorksheet(sheet_name);
          const cell = worksheet.getCell(cell_name);
          cell.value = value;
          return workbook.xlsx.writeFile(file_path);
        })
        .then(() => {
          return 'Value updated successfully!';
        })
        .catch((error) => {
          console.error('Error updating value:', error);
          throw error;
        });
  
}


module.exports = {
  write_excel,
}
