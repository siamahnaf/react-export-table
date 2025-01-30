"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(item => Object.values(item).join(',') + '\n');
    return headers + rows.join('');
}
const ExportAsCsv = ({ data, children, fileName = "reactExport" }) => {
    const csvData = convertToCSV(data);
    const downloadCSV = () => {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: downloadCSV
        }) }));
};
exports.default = ExportAsCsv;
//# sourceMappingURL=ExportAsCsv.js.map