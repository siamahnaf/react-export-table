import React from "react";
interface ChildrenProps {
    onClick: () => void;
}
interface Props {
    children: (props: ChildrenProps) => React.ReactNode;
    data: Array<any>;
    headers: string[];
    name?: string;
    minColumnWidth?: number;
    fileName?: string;
}
declare const ExportAsExcel: ({ children, data, headers, name, minColumnWidth, fileName }: Props) => JSX.Element;
export default ExportAsExcel;
