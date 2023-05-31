import { jsx as _jsx } from "react/jsx-runtime";
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
    return (_jsx("span", Object.assign({ onClick: downloadCSV }, { children: children })));
};
export default ExportAsCsv;
//# sourceMappingURL=ExportAsCsv.js.map