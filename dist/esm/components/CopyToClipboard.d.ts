import React from "react";
interface Props {
    children: React.ReactNode;
    data: Array<any>;
    headers: string[];
    onCopied?: () => void;
    onFailed?: () => void;
}
declare const CopyToClipboard: ({ children, data, headers, onCopied, onFailed }: Props) => JSX.Element;
export default CopyToClipboard;
