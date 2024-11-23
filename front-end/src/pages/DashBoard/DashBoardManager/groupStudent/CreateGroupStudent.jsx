import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Card } from "../../../../components/Card/Card";
import managerApi from "../../../../apis/managerApi";
import { message, Space } from "antd";
import CustomButton from "../../../../components/Button/CustomButton";
import CustomHooks from "../../../../utils/hooks";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

const CreateGroupStudent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const [state, setState] = useState({
    memberGroup: 2,
    estimateGroupStudent: 0,
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

    updateState({ estimateGroupStudent: total });
  };
  const fetchNumberStudent = async () => {
    let term = currentTerm.id;
    const res = await managerApi.countStudent(term);
    if (res && res.status === 0) {
      updateState({
        numberOfStudent: res.data.totalStudent,
        totalExistingGroups: res.data.totalGroup,
      });
      estimateGroupStudent(res.data.totalStudent);
    } else {
      messageApi.error(res.message);
    }
    return res.data;
  };
  const { data, refetch } = CustomHooks.useQuery(
    ["count", currentTerm],
    fetchNumberStudent,
    {
      enabled: !isEmpty(currentTerm),
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
      termId: currentTerm.id,
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
      refetch();
    } else {
      messageApi.error(res.message);
      updateState({ loadingSuccess: false });
    }
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
      {isEmpty(data) ? (
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
            sx={[
              (theme) => ({
                fontWeight: "bold",
                marginBottom: "20px",
                ...theme.applyStyles("light", {
                  color: "#006ed3",
                }),
              }),
            ]}
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
              value={data ? data.totalStudent : state.numberOfStudent}
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
              value={data ? data.totalGroup : state.totalExistingGroups}
            />
          </Box>

          <Box sx={{ marginBottom: "20px", marginTop: "30px" }}>
            <Typography
              variant="h5"
              sx={[
                (theme) => ({
                  fontWeight: "bold",
                  ...theme.applyStyles("light", {
                    color: "#006ed3",
                  }),
                }),
              ]}
            >
              Tạo nhiều nhóm sinh viên:
            </Typography>

            <Box sx={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <TextField
                label="Ước lượng số nhóm"
                variant="standard"
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
                onKeyPress={(e) => {
                  if (!/^\d*$/.test(e.key)) {
                    // Ngăn chặn các ký tự không phải số
                    e.preventDefault();
                  }
                }}
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
                onKeyPress={(e) => {
                  if (!/^\d*$/.test(e.key)) {
                    // Ngăn chặn các ký tự không phải số
                    e.preventDefault();
                  }
                }}
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
            </Space>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default CreateGroupStudent;
