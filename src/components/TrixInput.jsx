import React, { useEffect } from "react";
import { TrixEditor } from "react-trix";

export const TrixInput = ({ value, onChange, className }) => {
  useEffect(() => {
    import("trix/dist/trix");
    import("trix/dist/trix.css");
  }, []);

  const handleChange = (html, text) => {
    if (onChange) {
      onChange(html, text);
    }
  };

  return (
    <TrixEditor
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
};
