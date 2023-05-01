import React from "react";
interface Props {
    children: React.ReactNode;
    text: string;
    onCopied?: () => void;
    onFailed?: () => void;
}
declare const CopyTextToClipboard: ({ children, text, onCopied, onFailed }: Props) => JSX.Element;
export default CopyTextToClipboard;
