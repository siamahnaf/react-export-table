import React from "react";
interface ChildrenProps {
    onClick: () => void;
}
interface Props {
    data: Array<any>;
    children: (props: ChildrenProps) => React.ReactNode;
    fileName?: string;
}
declare const ExportAsCsv: ({ data, children, fileName }: Props) => import("react/jsx-runtime").JSX.Element;
export default ExportAsCsv;
