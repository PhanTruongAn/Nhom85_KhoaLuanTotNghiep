import { useState, useRef, useEffect } from "react";
import {
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { message } from "antd";
import { Card } from "../../../../components/Card/Card";
import studentApi from "../../../../apis/studentApi";
import "./ListStudentGroup.scss";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ConfirmModal from "../../../../components/modal/confirmModal";
import CustomHooks from "../../../../utils/hooks";
import OverDate from "../../../../components/overDate/overDate";
import { setGroup } from "../../../../redux/userSlice";
function ListStudentGroup() {
  const dispatch = useDispatch();
  const currentTerm = useSelector((state) => state.userInit.currentTerm);
  const user = useSelector((state) => state.userInit.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const containerRef = useRef(null);

  const currentDate = new Date();
  // Kiểm tra hạn đăng ký nhóm
  const isWithinChooseGroupPeriod =
    currentDate > new Date(currentTerm?.endChooseGroupDate);
  // Hàm lấy danh sách nhóm
  const fetchGroups = async ({ pageParam = 1 }) => {
    const res = await studentApi.getAllGroup(pageParam, 12, currentTerm.id);
    if (res && res.status === 0) {
      return {
        groups: res.data.groups,
        totalPages: res.data.totalPages,
        nextPage: pageParam < res.data.totalPages ? pageParam + 1 : undefined,
      };
    } else {
      throw new Error(res.message);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    CustomHooks.useInfiniteQuery(["groups"], fetchGroups, {
      enabled: !isWithinChooseGroupPeriod && !isEmpty(currentTerm),
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
      fetchNextPage();
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
  }, [hasNextPage]);

  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const confirmJoinGroup = async () => {
    if (selectedGroup) {
      const data = {
        groupId: selectedGroup.id,
        studentId: user.id,
        termId: currentTerm.id,
      };
      setLoadingIcon(true);
      const res = await studentApi.joinGroup(data);
      if (res && res.status === 0) {
        dispatch(setGroup(selectedGroup));
        messageApi.success(res.message);
      } else {
        messageApi.error(res.message);
      }
      setLoadingIcon(false);
      setIsModalOpen(false);
    }
  };

  // Làm phẳng mảng dữ liệu từ kết quả phân trang
  const groups = data ? data.pages.flatMap((page) => page.groups) : [];

  return (
    <Box
      className="list-container"
      ref={containerRef}
      sx={{ overflowY: "auto", height: "100%" }}
    >
      {contextHolder}
      <Grid container spacing={2}>
        {groups.length > 0 ? (
          groups.map((group) => (
            <Grid item xs={12} sm={6} md={3} key={group.id}>
              <Card variant="elevation" className="item">
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={[
                      (theme) => ({
                        ...theme.applyStyles("light", {
                          color: "#006ed3",
                        }),
                      }),
                    ]}
                  >
                    <b> Nhóm số: {group.groupName}</b>
                  </Typography>
                  <Divider sx={{ my: 1, borderBottomWidth: 2 }} />
                  <Typography sx={{ mb: "10px" }} color="text.secondary">
                    Số lượng tối đa: {group.numOfMembers}
                  </Typography>
                  <Typography color="text.secondary">
                    Trạng thái:{" "}
                    <b>{group.status === "FULL" ? "Đã đủ" : "Chưa đủ"}</b>
                  </Typography>

                  <Button
                    disabled={group.status === "FULL"}
                    sx={{ mt: 2 }}
                    size="small"
                    onClick={() => handleJoinGroup(group)}
                    variant="contained"
                  >
                    Tham gia nhóm
                  </Button>
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
            {isFetching ? (
              <EmptyData />
            ) : isWithinChooseGroupPeriod ? (
              <OverDate
                text="Đã hết hạn đăng ký nhóm!"
                startDate={currentTerm?.startChooseGroupDate}
                endDate={currentTerm?.endChooseGroupDate}
              />
            ) : isEmpty(groups) ? (
              <EmptyData text="Không có dữ liệu để hiển thị!" />
            ) : (
              <EmptyData />
            )}
          </Box>
        )}
      </Grid>
      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
          <CircularProgress size="30px" />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Đang tải thêm dữ liệu...
          </Typography>
        </Box>
      )}
      {isModalOpen && (
        <ConfirmModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmJoinGroup}
          description={`Bạn có chắc chắn muốn tham gia nhóm ${selectedGroup?.groupName}?`}
          icon={<GroupAddIcon />}
          loading={loadingIcon}
        />
      )}
    </Box>
  );
}

export default ListStudentGroup;
