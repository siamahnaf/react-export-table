import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const CopyToClipboard = ({ children, data, headers, onCopied, onFailed }) => {
    const handleCopy = () => {
        const tableData = data.map((item) => {
            const keys = Object.keys(item);
            const values = keys.map((key) => item[key]);
            return values;
        });
        const tableString = headers.join("\t") + "\n" + tableData.map(row => row.join("\t")).join("\n");
        navigator.clipboard.writeText(tableString).then(() => {
            onCopied === null || onCopied === void 0 ? void 0 : onCopied();
        }).catch(() => {
            onFailed === null || onFailed === void 0 ? void 0 : onFailed();
        });
    };
    return _jsx(React.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: handleCopy
        }) });
};
export default CopyToClipboard;
//# sourceMappingURL=CopyToClipboard.js.map