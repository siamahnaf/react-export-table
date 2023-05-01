"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ExcelToJsonConverter = ({ onRead, children, inputProps, onChange }) => {
    const inputRef = react_1.default.useRef(null);
    const [isDragging, setIsDragging] = react_1.default.useState(false);
    const [errors, setErrors] = react_1.default.useState("");
    const [data, setData] = react_1.default.useState([]);
    const [fileInfo, setFileInfo] = react_1.default.useState();
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ type: "file", style: { display: "none" }, accept: ".xlsx, .xls", onChange: onInputChange, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
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
exports.default = ExcelToJsonConverter;
//# sourceMappingURL=index.js.map