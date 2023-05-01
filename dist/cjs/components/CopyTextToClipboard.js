"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CopyTextToClipboard = ({ children, text, onCopied, onFailed }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            onCopied === null || onCopied === void 0 ? void 0 : onCopied();
        }).catch(() => {
            onFailed === null || onFailed === void 0 ? void 0 : onFailed();
        });
    };
    return (0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: handleCopy }, { children: children }));
};
exports.default = CopyTextToClipboard;
//# sourceMappingURL=CopyTextToClipboard.js.map