export interface FileInfo {
    name: string;
    size: number;
    type: string;
    file: File;
}
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
    errors: string;
    fileInfo?: FileInfo;
}
export interface Props {
    children: (props: ExportInterface) => React.ReactNode;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    onChange?: (file: File) => void;
    acceptType: Array<string>;
    value?: File;
}
