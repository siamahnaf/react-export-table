import React from "react";
import * as xlsx from "xlsx";
import { openFileDialog } from "./utilis";
import { FileInfo, Props, ReadData } from "./typings";


const ExcelToJsonConverter = ({ onRead, children, inputProps, onChange }: Props) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string>("");
    const [data, setData] = React.useState<Array<any>>([]);
    const [fileInfo, setFileInfo] = React.useState<FileInfo>();

    const handleChange = async (files: FileList | null) => {
        if (files) {
            onChange?.(files[0]);
            const file = files[0];
            setFileInfo({ name: file.name.split(".")[0], size: Number((file.size / (1024 * 1024)).toFixed(2)), type: file.type, file: file });
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                const workbook = xlsx.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json<ReadData>(worksheet)
                    .map((obj) => {
                        // Modify the object's keys
                        const modifiedObj: Record<string, any> = {};
                        Object.entries(obj).forEach(([key, value]) => {
                            let modifiedKey
                            if (key.includes(" ")) {
                                const words = key.toLowerCase().split(" ");
                                modifiedKey = words[0];
                                for (let i = 1; i < words.length; i++) {
                                    modifiedKey += words[i].charAt(0).toUpperCase() + words[i].slice(1);
                                }
                            } else {
                                modifiedKey = key.charAt(0).toLowerCase() + key.slice(1);
                            }
                            modifiedObj[modifiedKey] = value;
                        });
                        return modifiedObj;
                    });
                setData(json);
                onRead?.(json);
            };
            reader.readAsBinaryString(file);
        }
    };

    const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await handleChange(e.target.files);
        if (inputRef.current) inputRef.current.value = '';
    }

    const handleClickInput = React.useCallback(() => openFileDialog(inputRef), [
        inputRef,
    ]);

    const onFileUpload = React.useCallback((): void => {
        handleClickInput();
    }, [handleClickInput]);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };

    const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = e.dataTransfer.files;
            const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            const invalidFiles = Array.from(droppedFiles).filter(file => !validTypes.includes(file.type));
            if (invalidFiles.length > 0) {
                setErrors("Invalid file type. Please drop only .xls or .xlsx files.");
            } else if (droppedFiles.length > 0) {
                setErrors("");
                handleChange(droppedFiles);
            }
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();
    };
    return (
        <>
            <input
                type="file"
                style={{ display: "none" }}
                accept=".xlsx, .xls"
                onChange={onInputChange}
                ref={inputRef}
                {...inputProps}
            />
            {children?.({
                onFileUpload,
                dragProps: {
                    onDrop: handleDrop,
                    onDragEnter: handleDragIn,
                    onDragLeave: handleDragOut,
                    onDragOver: handleDrag,
                    onDragStart: handleDragStart
                },
                isDragging,
                errors,
                data,
                fileInfo
            })}
        </>
    );
};

export default ExcelToJsonConverter;
