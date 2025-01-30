"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const CopyTextToClipboard = ({ children, text, onCopied, onFailed }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            onCopied === null || onCopied === void 0 ? void 0 : onCopied();
        }).catch(() => {
            onFailed === null || onFailed === void 0 ? void 0 : onFailed();
        });
    };
    return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: handleCopy
        }) });
};
exports.default = CopyTextToClipboard;
//# sourceMappingURL=CopyTextToClipboard.js.map