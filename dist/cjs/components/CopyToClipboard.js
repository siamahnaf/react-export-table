"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
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
    return (0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: handleCopy }, { children: children }));
};
exports.default = CopyToClipboard;
//# sourceMappingURL=CopyToClipboard.js.map