import React, { useState, useRef, useEffect } from "react";
import { CardContent, Typography, Button, Divider, Box } from "@mui/material";
import { message } from "antd";
import { Card } from "../../../../components/Card/Card";
import Grid from "@mui/material/Grid";
import studentApi from "../../../../apis/studentApi";
import "./ListStudentGroup.scss";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { useQuery } from "react-query";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../redux/userSlice";
import CustomButton from "../../../../components/Button/CustomButton";
import ConfirmModal from "../../../../components/modal/confirmModal";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

function ListStudentGroup() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInit.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [state, setState] = useState({
    currentPage: 1,
    totalPage: 2,
    pageSize: 12,
    dataSource: [],
    loadingData: false,
  });
  const [dataRow, setDataRow] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null); // Thêm trạng thái để quản lý nhóm được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái để quản lý việc mở modal
  const containerRef = useRef(null);

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["groups", state.currentPage],
    () => studentApi.getAllGroup(state.currentPage, state.pageSize),
    {
      enabled: state.currentPage <= state.totalPage,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      staleTime: 1000,
      onSuccess: (res) => {
        if (res && res.status === 0) {
          updateState({
            dataSource: res.data.groups,
            totalPage: res.data.totalPages,
          });
          if (isEmpty(dataRow)) {
            setDataRow(res.data.groups);
          } else {
            setDataRow([...dataRow, ...res.data.groups]);
          }
        } else if (res.status === -1 || res.status === 403) {
          updateState({ dataSource: [], hasMore: false });
          messageApi.error(res.message);
        }
      },
      onError: (err) => {
        messageApi.error("Lỗi khi lấy dữ liệu!");
      },
    }
  );

  // Xử lý sự kiện cuộn
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      state.currentPage < state.totalPage
    ) {
      updateState({ currentPage: state.currentPage + 1 });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [state.currentPage]);

  const handleJoinGroup = (group) => {
    setSelectedGroup(group); // Lưu thông tin nhóm được chọn
    setIsModalOpen(true); // Mở modal
  };

  const confirmJoinGroup = async () => {
    if (selectedGroup) {
      setLoadingStates((prev) => ({ ...prev, [selectedGroup.id]: true }));
      const data = {
        groupId: selectedGroup.id,
        studentId: user.id,
      };
      const res = await studentApi.joinGroup(data);
      if (res && res.status === 0) {
        dispatch(setUser({ ...user, groupId: res.data.id }));
        messageApi.success(res.message);
        setLoadingStates((prev) => ({ ...prev, [selectedGroup.id]: false }));
      } else {
        messageApi.error(res.message);
        setLoadingStates((prev) => ({ ...prev, [selectedGroup.id]: false }));
      }
      setIsModalOpen(false); // Đóng modal sau khi xác nhận
    }
  };

  return (
    <Box
      className="list-container"
      ref={containerRef}
      sx={{ overflowY: "auto", height: "100%" }}
    >
      {contextHolder}
      <Grid container spacing={2}>
        {dataRow.length > 0 ? (
          dataRow.map((group, index) => (
            <Grid item xs={12} sm={6} md={3} key={group.id}>
              <Card variant="elevation">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Nhóm số: {group.groupName}
                  </Typography>
                  <Divider sx={{ my: 1, borderBottomWidth: 2 }} />
                  <Typography sx={{ mb: "10px" }} color="text.secondary">
                    Số lượng tối đa: {group.numOfMembers}
                  </Typography>
                  <Typography color="text.secondary">
                    Trạng thái:{" "}
                    {group.status === "FULL" ? "Đã đầy" : "Có thể tham gia"}
                  </Typography>
                  <CustomButton
                    disabled={group.status === "FULL"}
                    sx={{ mt: 2 }}
                    onClick={(e) => handleJoinGroup(group)}
                    text="Tham gia nhóm"
                    type="success"
                    loading={loadingStates[group.id] || state.loading}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign={"center"}
            justifyContent="center"
            width={"100%"}
            height={"auto"}
          >
            <EmptyData
              text={isEmpty(dataRow) ? null : "Không có dữ liệu để hiển thị!"}
            />
          </Box>
        )}
      </Grid>
      {isModalOpen && (
        <ConfirmModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmJoinGroup}
          description={`Bạn có chắc chắn muốn tham gia nhóm ${selectedGroup?.groupName}?`}
          icon={<GroupAddIcon />}
        />
      )}
    </Box>
  );
}

export default ListStudentGroup;
