import React from "react";


//Interface
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

const CopyToClipboard = ({ children, data, headers, onCopied, onFailed }: Props) => {
    const handleCopy = () => {
        const tableData = data.map((item: { [key: string]: any }) => {
            const keys = Object.keys(item);
            const values = keys.map((key) => item[key]);
            return values;
        });
        const tableString = headers.join("\t") + "\n" + tableData.map(row => row.join("\t")).join("\n");
        navigator.clipboard.writeText(tableString).then(() => {
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

export default CopyToClipboard;