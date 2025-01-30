import React from "react";
import jsPDF from "jspdf";
import autoTable, { Color, CellWidthType, RowInput } from "jspdf-autotable";

//Interface
interface ChildrenProps {
    onClick: () => void;
}
interface StylesDefs {
    font?: "helvetica" | "times" | "courier";
    fontStyle?: "normal" | "bold" | "italic" | "italic";
    overflow?: "linebreak" | "ellipsize" | "visible" | "hidden";
    fillColor?: Color | undefined;
    textColor?: Color;
    cellWidth?: CellWidthType;
    minCellWidth?: number;
    minCellHeight?: number;
    halign?: "left" | "center" | "right";
    valign?: "top" | "middle" | "bottom";
    fontSize?: number;
    cellPadding?: number;
    lineColor?: Color;
    lineWidth?: number;
}
interface Spacing {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
}
interface Props {
    children: (props: ChildrenProps) => React.ReactNode;
    data: Array<any>;
    headers: string[];
    foot?: RowInput;
    title?: string;
    fileName?: string;
    theme?: "striped" | "grid" | "plain";
    styles?: StylesDefs;
    headerStyles?: StylesDefs;
    footerStyles?: StylesDefs;
    margin?: Spacing;
    orientation?: "landscape" | "portrait" | "l" | "p";
}

const ExportAsPdf = (props: Props) => {
    const { children, data, headers, title, theme = "grid", styles, headerStyles, footerStyles, foot, margin, fileName = "reactExportTable", orientation } = props;

    if (orientation) {
        if (orientation !== "l" && orientation !== "portrait" && orientation !== "landscape" && orientation !== "p") throw new Error("Orientation can be only 'landscape', 'portrait', 'l' or 'p'.");
    }

    const onPdfHandler = () => {
        const doc = new jsPDF({ orientation: orientation });
        const body = data.map((item: { [key: string]: any }) => {
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
                margin: { ...margin, top: title ? (margin?.top || 30) : margin?.top },
                styles: styles,
                footStyles: footerStyles,
                body: body,
                foot: [foot as RowInput]
            })
        } else {
            autoTable(doc, {
                theme: theme,
                head: [headers],
                headStyles: headerStyles,
                margin: { ...margin, top: title ? (margin?.top || 30) : margin?.top },
                styles: styles,
                footStyles: footerStyles,
                body: body
            })
        }
        doc.save(`${fileName.toLowerCase().replace(/ /g, "-")}.pdf`)
    }
    return <React.Fragment>
        {children?.({
            onClick: onPdfHandler
        })}
    </React.Fragment>
};

export default ExportAsPdf;