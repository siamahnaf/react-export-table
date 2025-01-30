import React from "react";

export const openFileDialog = (inputRef: React.RefObject<HTMLInputElement | null>): void => {
    if (inputRef.current) inputRef.current.click();
};