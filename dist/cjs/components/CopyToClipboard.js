"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
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
    return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: handleCopy
        }) });
};
exports.default = CopyToClipboard;
//# sourceMappingURL=CopyToClipboard.js.map