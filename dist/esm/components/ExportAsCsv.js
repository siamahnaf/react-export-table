"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(item => Object.values(item).join(',') + '\n');
    return headers + rows.join('');
}
const ExportAsCsv = ({ data, children, fileName = "reactExport", onError, onSuccess }) => {
    const csvData = convertToCSV(data);
    const downloadCSV = () => {
        try {
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            if (onSuccess)
                onSuccess();
        }
        catch (error) {
            if (onError)
                onError(error);
        }
    };
    return (_jsx(React.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: downloadCSV
        }) }));
};
export default ExportAsCsv;
//# sourceMappingURL=ExportAsCsv.js.map