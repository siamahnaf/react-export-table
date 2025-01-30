"use client"
import React from "react";
import * as xlsx from "xlsx";
import { openFileDialog } from "./utilis";
import { Props, ReadData } from "./typings";


const ExcelToJson = ({ onRead, value, children, inputProps, onChange }: Props) => {
    //Ref
    const inputRef = React.useRef<HTMLInputElement>(null);

    //Valid Accept Type
    const validTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

    //State
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [file, setFile] = React.useState<File | null>(null);

    const handleChange = async (file: File | undefined) => {
        if (!file) return;
        setFile(file);
        onChange?.(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = xlsx.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json<ReadData>(worksheet)
                .map((obj) => {
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
            onRead(json);
        };
        reader.readAsArrayBuffer(file);
    };

    const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await handleChange(e.target.files?.[0]);
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
            const droppedFile = e.dataTransfer.files[0];
            if (!validTypes.includes(droppedFile.type)) {
                setError(true);
            } else {
                setError(false);
                handleChange(droppedFile);
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
                accept={validTypes.join(",")}
                onChange={onInputChange}
                multiple={false}
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
                error,
                data: value,
                file
            })}
        </>
    );
};

export default ExcelToJson;
