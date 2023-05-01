import { jsx as _jsx } from "react/jsx-runtime";
const CopyTextToClipboard = ({ children, text, onCopied, onFailed }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            onCopied === null || onCopied === void 0 ? void 0 : onCopied();
        }).catch(() => {
            onFailed === null || onFailed === void 0 ? void 0 : onFailed();
        });
    };
    return _jsx("span", Object.assign({ onClick: handleCopy }, { children: children }));
};
export default CopyTextToClipboard;
//# sourceMappingURL=CopyTextToClipboard.js.map