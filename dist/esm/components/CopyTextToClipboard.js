"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const CopyTextToClipboard = ({ children, text, onCopied, onFailed }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            onCopied === null || onCopied === void 0 ? void 0 : onCopied();
        }).catch(() => {
            onFailed === null || onFailed === void 0 ? void 0 : onFailed();
        });
    };
    return _jsx(React.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: handleCopy
        }) });
};
export default CopyTextToClipboard;
//# sourceMappingURL=CopyTextToClipboard.js.map