import React, { useState, useRef, useEffect } from "react";
import { CardContent, Typography, Button, Divider, Box } from "@mui/material";
import { message } from "antd";
import { Card } from "../../../../components/Card/Card";
import Grid from "@mui/material/Grid";
import studentApi from "../../../../apis/studentApi";
import "./ListStudentGroup.scss";

function ListStudentGroup() {
  const [messageApi, contextHolder] = message.useMessage();
  const [state, setState] = useState({
    currentPage: 1, // Trang hiện tại
    pageSize: 12, // Kích thước trang
    dataSource: [], // Dữ liệu đã tải
    loadingData: false, // Trạng thái đang tải dữ liệu
    hasMore: true, // Kiểm tra xem còn nhóm nào để tải không
  });

  const containerRef = useRef(null);
  console.log("dataSource", state.dataSource);

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // Hàm fetch dữ liệu nhóm với phân trang
  const fetchGroups = async (page) => {
    if (state.loadingData || !state.hasMore) return; // Nếu đang tải dữ liệu hoặc không còn nhóm nào để tải thì không gọi lại API
    updateState({ loadingData: true });

    try {
      const response = await studentApi.getAllGroup(page, state.pageSize);
      console.log("API Response:", response.data); // Kiểm tra phản hồi từ API

      if (response.data && Array.isArray(response.data.groups)) {
        const newGroups = response.data.groups;
        console.log("New Groups:", newGroups); // Kiểm tra nhóm mới nhận được

        if (newGroups.length > 0) {
          // Nếu có nhóm mới, thêm vào dataSource
          updateState((prevState) => ({
            dataSource: [...prevState.dataSource, ...newGroups],
          }));
          console.log("Updated dataSource:", [
            ...state.dataSource,
            ...newGroups,
          ]); // Kiểm tra giá trị mới
        } else {
          // Nếu không còn nhóm nào để tải
          updateState({ hasMore: false });
          messageApi.info("Đã tải hết nhóm.");
        }
      } else {
        messageApi.error("Dữ liệu không hợp lệ.");
      }
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi tải dữ liệu.");
      console.error("Failed to fetch groups:", error);
    } finally {
      updateState({ loadingData: false });
    }
  };

  // Hàm load thêm nhóm khi cuộn
  const loadMoreGroups = () => {
    if (state.hasMore) {
      updateState((prevState) => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  // Xử lý sự kiện cuộn
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    console.log(
      "Scroll Top:",
      scrollTop,
      "Scroll Height:",
      scrollHeight,
      "Client Height:",
      clientHeight
    ); // Kiểm tra giá trị cuộn

    // Kiểm tra nếu người dùng cuộn xuống gần cuối
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreGroups(); // Khi cuộn đến cuối, tải thêm nhóm
    }
  };

  // Lắng nghe sự kiện cuộn và gọi fetchGroups khi currentPage thay đổi
  useEffect(() => {
    fetchGroups(state.currentPage); // Gọi API mỗi khi currentPage thay đổi
  }, [state.currentPage]);

  // Lắng nghe sự kiện cuộn
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []); // Chỉ lắng nghe sự kiện cuộn 1 lần khi component mount

  return (
    <Box
      className="list-container"
      ref={containerRef}
      sx={{ overflowY: "auto", height: "400px" }} // Đảm bảo chiều cao và overflowY đúng
    >
      <Grid container spacing={2}>
        {state.dataSource.length > 0 ? (
          state.dataSource.map((group) => (
            <Grid item xs={12} sm={6} md={3} key={group.id}>
              <Card variant="elevation">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Nhóm số: {group.groupName}
                  </Typography>
                  <Divider sx={{ my: 1, borderBottomWidth: 2 }} />
                  <Typography sx={{ mb: "10px" }} color="text.secondary">
                    Số lượng sinh viên: {group.quantityMember || 0} / 2
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Tham gia nhóm
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>Không có nhóm nào để hiển thị.</Typography>
        )}
      </Grid>
      {state.loadingData && <Typography>Đang tải...</Typography>}
      {!state.hasMore && !state.loadingData && (
        <Typography>Không còn nhóm nào để hiển thị.</Typography>
      )}
    </Box>
  );
}

export default ListStudentGroup;
