"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const jspdf_1 = __importDefault(require("jspdf"));
const jspdf_autotable_1 = __importDefault(require("jspdf-autotable"));
const ExportAsPdf = (props) => {
    const { children, data, headers, title, theme = "grid", styles, headerStyles, footerStyles, foot, margin, fileName = "reactExportTable" } = props;
    const onPdfHandler = () => {
        const doc = new jspdf_1.default();
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
        doc.save(`${fileName.toLowerCase().replace(/ /g, "-")}.pdf`);
    };
    return (0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: onPdfHandler }, { children: children }));
};
exports.default = ExportAsPdf;
//# sourceMappingURL=ExportAsPdf.js.map