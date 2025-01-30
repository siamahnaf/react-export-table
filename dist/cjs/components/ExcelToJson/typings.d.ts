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
    data: Array<any>;
    file: File | null;
    error: boolean;
}
export interface Props {
    onRead: (data: Array<any>) => void;
    value: Array<any>;
    children: (props: ExportInterface) => React.ReactNode;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    onChange?: (file: File | null) => void;
}
export type ReadData = Record<string, string | number | boolean>;
