import React from "react";
import { Color, CellWidthType, RowInput } from "jspdf-autotable";
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
    children: React.ReactNode;
    data: Array<any>;
    headers: string[];
    foot?: RowInput;
    title?: string;
    theme?: "striped" | "grid" | "plain";
    styles?: StylesDefs;
    headerStyles?: StylesDefs;
    footerStyles?: StylesDefs;
    margin?: Spacing;
}
declare const PrintDocument: (props: Props) => JSX.Element;
export default PrintDocument;
