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
import React from "react";
import * as xlsx from "xlsx";
import { openFileDialog } from "./utilis";
const ExcelToJsonConverter = ({ onRead, children, inputProps, onChange }) => {
    const inputRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [errors, setErrors] = React.useState("");
    const [data, setData] = React.useState([]);
    const [fileInfo, setFileInfo] = React.useState();
    const handleChange = (files) => __awaiter(void 0, void 0, void 0, function* () {
        if (files) {
            onChange === null || onChange === void 0 ? void 0 : onChange(files[0]);
            const file = files[0];
            setFileInfo({ name: file.name.split(".")[0], size: Number((file.size / (1024 * 1024)).toFixed(2)), type: file.type, file: file });
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                const data = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                const workbook = xlsx.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet)
                    .map((obj) => {
                    // Modify the object's keys
                    const modifiedObj = {};
                    Object.entries(obj).forEach(([key, value]) => {
                        let modifiedKey;
                        if (key.includes(" ")) {
                            const words = key.toLowerCase().split(" ");
                            modifiedKey = words[0];
                            for (let i = 1; i < words.length; i++) {
                                modifiedKey += words[i].charAt(0).toUpperCase() + words[i].slice(1);
                            }
                        }
                        else {
                            modifiedKey = key.charAt(0).toLowerCase() + key.slice(1);
                        }
                        modifiedObj[modifiedKey] = value;
                    });
                    return modifiedObj;
                });
                setData(json);
                onRead === null || onRead === void 0 ? void 0 : onRead(json);
            };
            reader.readAsBinaryString(file);
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
            const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            const invalidFiles = Array.from(droppedFiles).filter(file => !validTypes.includes(file.type));
            if (invalidFiles.length > 0) {
                setErrors("Invalid file type. Please drop only .xls or .xlsx files.");
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
    return (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({ type: "file", style: { display: "none" }, accept: ".xlsx, .xls", onChange: onInputChange, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
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
            })] }));
};
export default ExcelToJsonConverter;
//# sourceMappingURL=index.js.map