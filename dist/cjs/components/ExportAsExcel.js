"use strict";
"use client";
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const xlsx = __importStar(require("xlsx"));
const ExportAsExcel = ({ children, data, headers, name = "reactExport", minColumnWidth = 15, fileName = "reactExport" }) => {
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
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: onExcelExport
        }) }));
};
exports.default = ExportAsExcel;
//# sourceMappingURL=ExportAsExcel.js.map