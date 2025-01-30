import React, { useEffect } from "react";
import { openFileDialog } from "./utilis";
import { FileInfo, Props } from "./typings";

const FileUploader = ({ children, inputProps, onChange, acceptType, value, size }: Props) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string>("");
    const [fileInfo, setFileInfo] = React.useState<FileInfo>();

    const handleChange = async (files: FileList | null) => {
        if (files) {
            const uploadSize = Number((files[0].size / (1024 * 1024)).toFixed(2));
            if (size) {
                if (uploadSize <= size) {
                    setErrors("")
                    onChange?.(files[0]);
                    const file = files[0];
                    setFileInfo({ name: file.name.split(".")[0], size: uploadSize, type: file.type, file: file });
                } else {
                    setErrors(`File size can't be more than ${size}MB`)
                }
            } else {
                setErrors("")
                onChange?.(files[0]);
                const file = files[0];
                setFileInfo({ name: file.name.split(".")[0], size: uploadSize, type: file.type, file: file });
            }
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
            const validTypes = acceptType.map(type => `.${type}`).join(",");
            const invalidFiles = Array.from(droppedFiles).filter(file => !file.name.toLowerCase().endsWith(validTypes));
            if (invalidFiles.length > 0) {
                setErrors(`Invalid file type. Please drop only ${acceptType.join(" or ")} files.`);
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

    useEffect(() => {
        if (!value) {
            setFileInfo(undefined);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [value])
    return (
        <>
            <input
                type="file"
                style={{ display: "none" }}
                accept={acceptType.join(", ")}
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
                fileInfo
            })}
        </>
    );
};

export default FileUploader;