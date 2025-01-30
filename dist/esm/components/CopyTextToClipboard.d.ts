import React from "react";
interface ChildrenProps {
    onClick: () => void;
}
interface Props {
    children: (props: ChildrenProps) => React.ReactNode;
    text: string;
    onCopied?: () => void;
    onFailed?: () => void;
}
declare const CopyTextToClipboard: ({ children, text, onCopied, onFailed }: Props) => import("react/jsx-runtime").JSX.Element;
export default CopyTextToClipboard;
