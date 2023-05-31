import React from "react";
interface Props {
    data: Array<any>;
    children: React.ReactNode;
    fileName?: string;
}
declare const ExportAsCsv: ({ data, children, fileName }: Props) => JSX.Element;
export default ExportAsCsv;
