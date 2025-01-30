import React from "react";
interface ChildrenProps {
    onClick: () => void;
}
interface Props {
    children: (props: ChildrenProps) => React.ReactNode;
    data: Array<any>;
    headers: string[];
    onCopied?: () => void;
    onFailed?: () => void;
}
declare const CopyToClipboard: ({ children, data, headers, onCopied, onFailed }: Props) => import("react/jsx-runtime").JSX.Element;
export default CopyToClipboard;
