import React from "react";
import { Input } from "antd";
import { Box } from "@mui/material";
import { CloseCircleFilled } from "@ant-design/icons";
const { Search } = Input;

function SearchComponent({ onChange, loading, onSearch, value, placeholder }) {
  return (
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      onChange={onChange}
      enterButton
      loading={loading}
      style={{ width: "100%" }}
      value={value}
    />
  );
}

export default SearchComponent;
