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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const utilis_1 = require("./utilis");
const ExcelToJsonConverter = ({ children, inputProps, onChange, acceptType, value }) => {
    const inputRef = react_1.default.useRef(null);
    const [isDragging, setIsDragging] = react_1.default.useState(false);
    const [errors, setErrors] = react_1.default.useState("");
    const [fileInfo, setFileInfo] = react_1.default.useState();
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
    (0, react_1.useEffect)(() => {
        if (!value) {
            setFileInfo(undefined);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [value]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ type: "file", style: { display: "none" }, accept: acceptType.join(", "), onChange: onInputChange, ref: inputRef }, inputProps)), children === null || children === void 0 ? void 0 : children({
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
exports.default = ExcelToJsonConverter;
//# sourceMappingURL=index.js.map