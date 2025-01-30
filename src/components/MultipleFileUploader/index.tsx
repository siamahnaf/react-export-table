import React, { useEffect } from "react";
import { openFileDialog } from "./utilis";
import { Props } from "./typings";

const MultipleFileUploader = ({ children, inputProps, onChange, acceptType, value }: Props) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);

    const handleChange = async (files: FileList | null) => {
        if (files) {
            onChange?.(files)
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
            handleChange(droppedFiles);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();
    };

    useEffect(() => {
        if (!value) {
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
                multiple
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
                isDragging
            })}
        </>
    );
};

export default MultipleFileUploader;