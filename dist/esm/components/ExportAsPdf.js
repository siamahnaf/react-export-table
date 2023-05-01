import { jsx as _jsx } from "react/jsx-runtime";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const ExportAsPdf = (props) => {
    const { children, data, headers, title, theme = "grid", styles, headerStyles, footerStyles, foot, margin, fileName = "reactExportTable" } = props;
    const onPdfHandler = () => {
        const doc = new jsPDF();
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
            autoTable(doc, {
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
            autoTable(doc, {
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
    return _jsx("span", Object.assign({ onClick: onPdfHandler }, { children: children }));
};
export default ExportAsPdf;
//# sourceMappingURL=ExportAsPdf.js.map