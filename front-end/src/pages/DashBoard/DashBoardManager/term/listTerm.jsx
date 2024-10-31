import React, { useState, useRef } from "react";
import { Table, Input, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { message, Popconfirm } from "antd";
import UpdateTerm from "./UpdateTerm";
import ViewTerm from "./viewTerm";
import CustomHooks from "../../../../utils/hooks";
import managerApi from "../../../../apis/managerApi";
import EmptyData from "../../../../components/emptydata/EmptyData";
import { isEmpty } from "lodash";
import { formatDate } from "../../../../utils/formatDate";
import Highlighter from "react-highlight-words";
import CustomButton from "../../../../components/Button/CustomButton";
const ListTerm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);
  // Get Terms
  const getTerms = async () => {
    const res = await managerApi.getTerms();
    return res;
  };
  const {
    data: termsData,
    isFetching,
    refetch,
  } = CustomHooks.useQuery(
    ["terms"],
    getTerms,

    {
      onSuccess: (res) => {
        if (res && res.status === 0) {
          setData(res.data);
          if (!isEmpty(res.data) && isEmpty(termsData)) {
            messageApi.success(res.message);
          }
        } else if (res.status === 1) {
          messageApi.info(res.message);
        } else {
          messageApi.error(res.message);
        }
        setLoading(false);
      },
      onError: (error) => {
        messageApi.error(`${error}!`);
      },
    }
  );

  const handleEdit = (term) => {
    setCurrentTerm(term);
    setIsEditModalVisible(true);
  };

  const handleView = (term) => {
    setCurrentTerm(term);
    setIsViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setIsViewModalVisible(false);
    // setCurrentTerm(term);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setCurrentTerm(null);
  };

  const handleEditModalOk = (values) => {
    // setData(
    //   data.map((term) =>
    //     term.id === currentTerm.id ? { ...term, ...values } : term
    //   )
    // );
    setIsEditModalVisible(false);
    setCurrentTerm(null);
    refetch();
  };

  const handleRefreshData = () => {
    setLoading(true);
    refetch();
    setTimeout(() => {
      messageApi.success("Làm mới dữ liệu thành công!");
    }, 1000);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const filteredData = data.filter((term) =>
    term.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            variant="contained"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            startIcon={<SearchOutlined />}
            size="small"
            sx={{
              width: 90,
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            sx={{
              width: 90,
              textTransform: "none",
              fontSize: "13px",
            }}
          >
            Reset
          </Button>
          <Button
            size="small"
            sx={{
              width: 90,
              textTransform: "none",
              fontSize: "13px",
            }}
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            sx={{
              width: 90,
              textTransform: "none",
              fontSize: "13px",
            }}
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "12%",
    },
    {
      title: "Học kì",
      dataIndex: "name",
      width: "20%",
      key: "name",

      ...getColumnSearchProps("name"),
    },
    {
      title: "Thời gian bắt đầu",
      key: "startDate",
      width: "15%",
      render: (record) => formatDate(record.startDate),
    },
    {
      title: "Thời gian kết thúc",
      key: "endDate",
      width: "15%",
      render: (record) => formatDate(record.endDate),
    },
    {
      title: "Ngày bắt đầu báo cáo",
      key: "startReportDate",
      render: (record) => formatDate(record.startReportDate),
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            onClick={() => handleView(record)}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
            endIcon={<InfoCircleOutlined />}
          >
            Xem chi tiết
          </Button>
          <Button
            onClick={() => handleEdit(record)}
            variant="contained"
            size="small"
            sx={[
              (theme) => ({
                marginLeft: "10px",
                textTransform: "none",
                ...theme.applyStyles("light", {
                  background: "#ff993a",
                }),
              }),
            ]}
            endIcon={<EditOutlined />}
          >
            Chỉnh sửa
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "20px" }}>
      {contextHolder}

      <CustomButton
        type="refresh"
        text="Làm mới dữ liệu"
        onClick={handleRefreshData}
        loading={loading}
        sx={{ float: "right" }}
      />

      <Box sx={{ marginTop: "50px" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "10px" }}
        >
          Danh sách học kì
        </Typography>
        <Table
          columns={columns}
          dataSource={termsData ? termsData.data : filteredData}
          rowKey="id"
          pagination={{ responsive: true }}
          locale={{
            emptyText: (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width={"100%"}
                height={"auto"}
              >
                {isFetching ? (
                  <EmptyData />
                ) : (
                  <EmptyData
                    text={isEmpty(data) ? "Không có dữ liệu!" : null}
                  />
                )}
              </Box>
            ),
          }}
        />
      </Box>

      <Dialog
        open={isEditModalVisible}
        onClose={handleEditModalCancel}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: "center", fontSize: "22px", fontWeight: "bold" }}
        >{`Chỉnh sửa ${currentTerm?.name}`}</DialogTitle>
        <DialogContent>
          {currentTerm && (
            <UpdateTerm
              term={currentTerm}
              onOk={handleEditModalOk}
              onCancel={handleEditModalCancel}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isViewModalVisible}
        onClose={handleViewModalCancel}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: "center", fontSize: "22px", fontWeight: "bold" }}
        >{`Xem thông tin ${currentTerm?.name}`}</DialogTitle>
        <DialogContent>
          {currentTerm && (
            <ViewTerm term={currentTerm} onCancel={handleViewModalCancel} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ListTerm;
