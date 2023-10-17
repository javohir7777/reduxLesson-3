import { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  LineChartOutlined,
  DollarOutlined,
  LogoutOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import "./Header.scss";
import Cookies from "js-cookie";
import { TOKEN } from "../../../container";
import { useDispatch } from "react-redux";
import { controlAuthenticated } from "../../../redux/slices/authSlice";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    Cookies.remove(TOKEN);
    dispatch(controlAuthenticated(false));
    navigate("/");
  };
  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo">Portfolio admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <LineChartOutlined style={{ fontSize: "20px" }} />,
              label: (
                <Link className="text-decoration-none" to="/dashboard">
                  Dashboard
                </Link>
              ),
            },
            {
              key: "/skills",
              icon: <DollarOutlined style={{ fontSize: "20px" }} />,
              label: (
                <Link className="text-decoration-none" to="/skills">
                  Skills
                </Link>
              ),
            },
            {
              key: "/portfolios",
              icon: <ContactsOutlined style={{ fontSize: "20px" }} />,
              label: (
                <Link className="text-decoration-none" to="/portfolios">
                  Portfolios
                </Link>
              ),
            },
            {
              key: "/users",
              icon: <TeamOutlined style={{ fontSize: "20px" }} />,
              label: (
                <Link className="text-decoration-none" to="/users">
                  Users
                </Link>
              ),
            },
            {
              icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
              label: (
                <Link className="text-decoration-none" onClick={logout}>
                  Logout
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
