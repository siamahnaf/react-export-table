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
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}
declare const ExportAsExcel: ({ children, data, headers, name, minColumnWidth, fileName, onError, onSuccess }: Props) => import("react/jsx-runtime").JSX.Element;
export default ExportAsExcel;
