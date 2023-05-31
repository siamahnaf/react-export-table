"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(item => Object.values(item).join(',') + '\n');
    return headers + rows.join('');
}
const ExportAsCsv = ({ data, children, fileName = "reactExportTable" }) => {
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
    return ((0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: downloadCSV }, { children: children })));
};
exports.default = ExportAsCsv;
//# sourceMappingURL=ExportAsCsv.js.map