"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const xlsx = __importStar(require("xlsx"));
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
    return ((0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: onExcelExport }, { children: children })));
};
exports.default = ExportAsExcel;
//# sourceMappingURL=ExportAsExcel.js.map