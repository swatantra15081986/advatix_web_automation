const fs = require('fs');
const XLSX = require('xlsx');
 
const read_excel = ({file_path, sheet}) => {
  const buf = fs.readFileSync(file_path);
  const workbook = XLSX.read(buf, { type: 'buffer' });
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
  return rows
}
module.exports = {
  read_excel,
}