import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import AddIcon from "@mui/icons-material/Add";
import CreateGroupModal from "./CreateGroupModal"; // Nhập modal bạn đã tạo
import managerApi from "../../../../apis/managerApi";
import { message, Space } from "antd";
import CustomButton from "../../../../components/Button/CustomButton";
import { useQuery } from "react-query";
import EmptyData from "../../../../components/emptydata/EmptyData";
const CreateGroupStudent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState({
    memberGroup: 2,
    estimateGroupStudent: 1,
    totalExistingGroups: 1,
    loadingSuccess: false,
    loadingError: false,
    numberOfStudent: 1,
  });

  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const estimateGroupStudent = (numberStudent) => {
    const member = state.memberGroup;
    const total = Math.ceil(numberStudent / member);
    console.log(total);
    updateState({ estimateGroupStudent: total });
  };
  const fetchNumberStudent = async () => {
    const res = await managerApi.countStudent();
    return res;
  };
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["count"],
    fetchNumberStudent,
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 10, // Dữ liệu sẽ được cache trong 10 phút
      refetchOnWindowFocus: false, // Không fetch lại khi quay lại tab
      staleTime: 1000,
      onSuccess: (res) => {
        console.log("Check res:", res);
        if (res && res.status === 0) {
          updateState({
            numberOfStudent: res.data.totalStudent,
            totalExistingGroups: res.data.totalGroup,
          });
          estimateGroupStudent(res.data.totalStudent);
        } else {
          messageApi.error(res.message);
        }
      },
    }
  );

  const buildDataToSave = () => {
    if (isNaN(state.memberGroup) || isNaN(state.estimateGroupStudent)) {
      messageApi.warning(
        "Số lượng thành viên mỗi nhóm và tổng số nhóm phải là số!"
      );
      return;
    }
    const data = {
      estimateGroupStudent: state.estimateGroupStudent,
      numOfMembers: state.memberGroup,
    };
    return data;
  };
  const handleConfirm = async () => {
    updateState({ loadingSuccess: true });
    const data = buildDataToSave();
    if (!data) {
      return data;
    }
    const res = await managerApi.createGroupsStudent(data);
    if (res && res.status === 0) {
      messageApi.success(res.message);
      updateState({ loadingSuccess: false });
    } else {
      messageApi.error(res.message);
      updateState({ loadingSuccess: false });
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const onChange = (e) => {
    const memberGroup = e.target.value;
    updateState({ memberGroup });
    if (!memberGroup || Number(memberGroup) <= 0) {
      updateState({ memberGroup, estimateGroupStudent: 0 });
      return;
    }
    if (Number(memberGroup) > state.numberOfStudent) {
      messageApi.warning(
        "Số lượng sinh viên mỗi nhóm không được lớn hơn tổng số sinh viên!"
      );
      return;
    }
    if (state.numberOfStudent) {
      const total = Math.ceil(state.numberOfStudent / memberGroup);
      updateState({ estimateGroupStudent: total });
    }
  };

  return (
    <Box className="container-fluid" sx={{ padding: "20px" }}>
      {contextHolder}
      {isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", // Căn giữa theo chiều dọc với chiều cao 60% view height
          }}
        >
          <EmptyData />
        </Box>
      ) : (
        <Card sx={{ padding: "20px", borderRadius: "8px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Tạo Nhóm Sinh Viên
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Tổng số lượng sinh viên"
              variant="standard"
              color="warning"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={state.numberOfStudent}
            />
            <TextField
              label="Số lượng nhóm hiện có"
              variant="standard"
              color="warning"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={state.totalExistingGroups}
            />
          </Box>

          <Box sx={{ marginBottom: "20px", marginTop: "20px" }}>
            <Typography
              variant="h5"
              sx={{ padding: "10px", fontWeight: "bold" }}
            >
              Tạo nhiều nhóm sinh viên:
            </Typography>

            <Box sx={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <TextField
                label="Ước lượng số nhóm"
                variant="standard"
                color="success"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={state.estimateGroupStudent}
                onChange={(e) =>
                  updateState({ estimateGroupStudent: e.target.value })
                }
                required
              />
              <TextField
                label="Số thành viên mỗi nhóm"
                variant="standard"
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={state.memberGroup}
                onChange={(e) => onChange(e)}
                required
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "20px",
            }}
          >
            <Space>
              <CustomButton
                onClick={handleConfirm}
                loading={state.loadingSuccess}
                text={"Tạo danh sách"}
                type="success"
              />
              <Button
                variant="contained"
                onClick={handleOpenModal}
                startIcon={<AddIcon />}
                // sx={{ padding: "10px" }}
              >
                Thêm một nhóm mới
              </Button>
            </Space>
          </Box>
        </Card>
      )}
      <CreateGroupModal isOpen={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default CreateGroupStudent;
