var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { openFileDialog } from "./utilis";
const ExcelToJsonConverter = ({ children, inputProps, onChange, acceptType, value }) => {
    const inputRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [errors, setErrors] = React.useState("");
    const [fileInfo, setFileInfo] = React.useState();
    const handleChange = (files) => __awaiter(void 0, void 0, void 0, function* () {
        if (files) {
            onChange === null || onChange === void 0 ? void 0 : onChange(files[0]);
            const file = files[0];
            setFileInfo({ name: file.name.split(".")[0], size: Number((file.size / (1024 * 1024)).toFixed(2)), type: file.type, file: file });
        }
    });
    const onInputChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        yield handleChange(e.target.files);
        if (inputRef.current)
            inputRef.current.value = '';
    });
    const handleClickInput = React.useCallback(() => openFileDialog(inputRef), [
        inputRef,
    ]);
    const onFileUpload = React.useCallback(() => {
        handleClickInput();
    }, [handleClickInput]);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFiles = e.dataTransfer.files;
            const validTypes = acceptType.map(type => `.${type}`).join(",");
            const invalidFiles = Array.from(droppedFiles).filter(file => !file.name.toLowerCase().endsWith(validTypes));
            if (invalidFiles.length > 0) {
                setErrors(`Invalid file type. Please drop only ${acceptType.join(" or ")} files.`);
            }
            else if (droppedFiles.length > 0) {
                setErrors("");
                handleChange(droppedFiles);
            }
        }
    };
    const handleDragStart = (e) => {
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
    }, [value]);
    return (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({ type: "file", style: { display: "none" }, accept: acceptType.join(", "), onChange: onInputChange, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
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
            })] }));
};
export default ExcelToJsonConverter;
//# sourceMappingURL=index.js.map