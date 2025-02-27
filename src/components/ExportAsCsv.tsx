"use client"
import React from "react";

function convertToCSV(data: Array<any>) {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map(item => Object.values(item).join(',') + '\n');
    return headers + rows.join('');
}

//Interface
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

const ExportAsCsv = ({ data, children, fileName = "reactExport", onError, onSuccess }: Props) => {
    const csvData = convertToCSV(data);

    const downloadCSV = () => {
        try {
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            if (onSuccess) onSuccess();
        } catch (error) {
            if (onError) onError(error as Error);
        }
    };
    return (
        <React.Fragment>
            {children?.({
                onClick: downloadCSV
            })}
        </React.Fragment>
    );
};

export default ExportAsCsv;