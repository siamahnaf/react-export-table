export interface ExportInterface {
    dragProps: {
        onDrop: (e: any) => void;
        onDragEnter: (e: any) => void;
        onDragLeave: (e: any) => void;
        onDragOver: (e: any) => void;
        onDragStart: (e: any) => void;
    };
    isDragging: boolean;
    onFileUpload: () => void;
}

export interface Props {
    children: (props: ExportInterface) => React.ReactNode;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    onChange?: (file: FileList) => void;
    acceptType: Array<string>;
    value?: FileList;
}