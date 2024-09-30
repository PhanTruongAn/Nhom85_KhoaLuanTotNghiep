import React from "react";
import emptyDataImage from "../../../../images/anhdong/emtydata.gif";

function EmptyData() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={emptyDataImage}
        alt="Loading"
        style={{ width: "100px", height: "100px" }}
      />
      <h3 style={{ marginTop: "16px", color: "#555" }}>
        Không có dữ liệu để hiển thị
      </h3>
    </div>
  );
}

export default EmptyData;
