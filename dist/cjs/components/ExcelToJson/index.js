"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const xlsx = __importStar(require("xlsx"));
const utilis_1 = require("./utilis");
const ExcelToJson = ({ onRead, value, children, inputProps, onChange }) => {
    //Ref
    const inputRef = react_1.default.useRef(null);
    //Valid Accept Type
    const validTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    //State
    const [isDragging, setIsDragging] = react_1.default.useState(false);
    const [error, setError] = react_1.default.useState(false);
    const [file, setFile] = react_1.default.useState(null);
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
    const handleClickInput = react_1.default.useCallback(() => (0, utilis_1.openFileDialog)(inputRef), [
        inputRef,
    ]);
    const onFileUpload = react_1.default.useCallback(() => {
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ type: "file", style: { display: "none" }, accept: validTypes.join(","), onChange: onInputChange, multiple: false, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
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
exports.default = ExcelToJson;
//# sourceMappingURL=index.js.map