"use client"
import React from "react";

//Interface
interface ChildrenProps {
    onClick: () => void;
}
interface Props {
    children: (props: ChildrenProps) => React.ReactNode;
    text: string;
    onCopied?: () => void;
    onFailed?: () => void;
}

const CopyTextToClipboard = ({ children, text, onCopied, onFailed }: Props) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            onCopied?.()
        }).catch(() => {
            onFailed?.()
        });
    };
    return <React.Fragment>
        {children?.({
            onClick: handleCopy
        })}
    </React.Fragment>
};

export default CopyTextToClipboard;