import React from "react";
interface ChildrenProps {
    onClick: () => void;
}
interface Props {
    data: Array<any>;
    children: (props: ChildrenProps) => React.ReactNode;
    fileName?: string;
    onError?: (error: Error) => void;
    onSuccess?: () => void;
}
declare const ExportAsCsv: ({ data, children, fileName, onError, onSuccess }: Props) => import("react/jsx-runtime").JSX.Element;
export default ExportAsCsv;
