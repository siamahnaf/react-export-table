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
}

const ExportAsCsv = ({ data, children, fileName = "reactExportTable" }: Props) => {
    const csvData = convertToCSV(data);

    const downloadCSV = () => {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
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