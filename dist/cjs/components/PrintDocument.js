"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const jspdf_1 = __importDefault(require("jspdf"));
const jspdf_autotable_1 = __importDefault(require("jspdf-autotable"));
const PrintDocument = (props) => {
    const { children, data, headers, title, theme = "grid", styles, headerStyles, footerStyles, foot, margin, orientation } = props;
    if (orientation) {
        if (orientation !== "l" && orientation !== "portrait" && orientation !== "landscape" && orientation !== "p")
            throw new Error("Orientation can be only 'landscape', 'portrait', 'l' or 'p'.");
    }
    const onPrint = () => {
        const doc = new jspdf_1.default({ orientation: orientation });
        const body = data.map((item) => {
            const keys = Object.keys(item);
            const values = keys.map((key) => item[key]);
            return values;
        });
        if (title) {
            const titleWidth = doc.getTextDimensions(title).w;
            const pageWidth = doc.internal.pageSize.getWidth();
            const x = (pageWidth - titleWidth) / 2;
            doc.text(title, x, 20);
        }
        if (foot) {
            (0, jspdf_autotable_1.default)(doc, {
                theme: theme,
                head: [headers],
                headStyles: headerStyles,
                margin: Object.assign(Object.assign({}, margin), { top: title ? ((margin === null || margin === void 0 ? void 0 : margin.top) || 30) : margin === null || margin === void 0 ? void 0 : margin.top }),
                styles: styles,
                footStyles: footerStyles,
                body: body,
                foot: [foot]
            });
        }
        else {
            (0, jspdf_autotable_1.default)(doc, {
                theme: theme,
                head: [headers],
                headStyles: headerStyles,
                margin: Object.assign(Object.assign({}, margin), { top: title ? ((margin === null || margin === void 0 ? void 0 : margin.top) || 30) : margin === null || margin === void 0 ? void 0 : margin.top }),
                styles: styles,
                footStyles: footerStyles,
                body: body
            });
        }
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const pdfWindow = window.open(pdfUrl, '_blank');
        if (!pdfWindow) {
            alert('Please enable popups for this website');
        }
        else {
            pdfWindow.addEventListener('load', () => {
                pdfWindow.print();
                URL.revokeObjectURL(pdfUrl);
            });
        }
    };
    return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: children === null || children === void 0 ? void 0 : children({
            onClick: onPrint
        }) });
};
exports.default = PrintDocument;
//# sourceMappingURL=PrintDocument.js.map