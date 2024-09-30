import React from "react";
import { Input } from "antd";
import { Box } from "@mui/material";
import { CloseCircleFilled } from "@ant-design/icons";
const { Search } = Input;

function SearchComponent({
  onChange,
  loading,
  onSearch,
  onClear,
  value,
  placeholder,
}) {
  const suffix = (
    <CloseCircleFilled
      onClick={onClear}
      style={{
        fontSize: 16,
        color: "red",
        cursor: "pointer",
      }}
    />
  );
  return (
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      onChange={onChange}
      enterButton
      suffix={suffix}
      loading={loading}
      style={{ width: "100%" }}
      value={value}
    />
  );
}

export default SearchComponent;
