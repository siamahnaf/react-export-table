import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import * as xlsx from "xlsx";
const ExportAsExcel = ({ children, data, headers, name = "reactExportTable", minColumnWidth = 15, fileName = "reactExportTable" }) => {
    const onExcelExport = () => {
        const worksheetData = [headers, ...data.map(obj => Object.values(obj))];
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet(worksheetData);
        const cols = [];
        for (let i = 0; i < headers.length; i++) {
            let maxCellWidth = headers[i].length;
            for (let j = 1; j < worksheetData.length; j++) {
                const cellAddress = xlsx.utils.encode_cell({ r: j, c: i });
                const cell = ws[cellAddress];
                if (cell && cell.v) {
                    const cellValue = cell.v.toString();
                    maxCellWidth = Math.max(maxCellWidth, cellValue.length);
                }
            }
            maxCellWidth = Math.max(maxCellWidth, minColumnWidth);
            cols.push({ wch: maxCellWidth });
        }
        ws['!cols'] = cols;
        xlsx.utils.book_append_sheet(wb, ws, name);
        xlsx.writeFile(wb, `${fileName.toLowerCase().replace(/ /g, "-")}.xlsx`);
    };
    return (_jsx(React.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: onExcelExport
        }) }));
};
export default ExportAsExcel;
//# sourceMappingURL=ExportAsExcel.js.map