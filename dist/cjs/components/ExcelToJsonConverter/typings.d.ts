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
    data: Array<any>;
    fileInfo?: FileInfo;
}
export interface Props {
    onRead?: (data: Array<any>) => void;
    children: (props: ExportInterface) => React.ReactNode;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    onChange?: (file: File) => void;
}
export type ReadData = Record<string, string | number | boolean>;
