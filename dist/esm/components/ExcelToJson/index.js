"use client";
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
const ExcelToJson = ({ onRead, value, children, inputProps, onChange }) => {
    //Ref
    const inputRef = React.useRef(null);
    //Valid Accept Type
    const validTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    //State
    const [isDragging, setIsDragging] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const handleChange = (file) => __awaiter(void 0, void 0, void 0, function* () {
        if (!file)
            return;
        setFile(file);
        onChange === null || onChange === void 0 ? void 0 : onChange(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            const data = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            const workbook = xlsx.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet)
                .map((obj) => {
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
            onRead(json);
        };
        reader.readAsArrayBuffer(file);
    });
    const onInputChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield handleChange((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]);
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
            const droppedFile = e.dataTransfer.files[0];
            if (!validTypes.includes(droppedFile.type)) {
                setError(true);
            }
            else {
                setError(false);
                handleChange(droppedFile);
            }
        }
    };
    const handleDragStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();
    };
    return (_jsxs(_Fragment, { children: [_jsx("input", Object.assign({ type: "file", style: { display: "none" }, accept: validTypes.join(","), onChange: onInputChange, multiple: false, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
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
            })] }));
};
export default ExcelToJson;
//# sourceMappingURL=index.js.map