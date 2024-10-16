import { Drawer } from "antd";

const darkTheme = {
  token: {
    // colorPrimary: "#1DA57A",
    colorPrimary: "#1976D2",
    colorBgContainer: "#f6ffed",
  },
  components: {
    Layout: {
      headerBg: "#001529",
      headerColor: "#fff",
      bodyBg: "#071522",
    },
    Pagination: {
      colorText: "#1DA57A",
      itemBg: "#152F40",
      itemActiveBg: "#F1FAE8",
      itemLinkBg: "#1DA57A",
    },
    Collapse: {
      Panel: {
        colorText: "#fff",
      },
    },
    Drawer: {
      colorText: "#fff",
      colorIcon: "#fff",
      colorBgElevated: "#001529",
    },
  },
};

export default darkTheme;
