import React from "react";

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import { Layout, Menu, Row, Col, Space, Dropdown, Divider } from "antd";
import { SettingOutlined, UsergroupDeleteOutlined, LogoutOutlined, DownOutlined, UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
/**
 *
 */
import DashBoardDetailsView from "./views/DashBoardDetailsView";
import DashBoardView from "./views/DashBoardView";
import UsersView from "./views/UsersView";
/**
 *
 */
import "./app.css";
/**
 *
 */
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
/**
 *
 */
const APP_SHORT_NAME = "VMDC";
const APP_LONG_NAME = "kkkkkkVisualisation Multisource Des Comptes RH";

function getPage(content) {
  //let { FILTER_INDEX } = useParams();
  return <Content id="content">{content}</Content>;
}
//const { SubMenu } = Menu;
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout id="page">
          <Header id="header">
            <Row>
              <Col span={16}>
                <Menu triggerSubMenuAction="click" mode="horizontal" style={{ border: "none" }}>
                  <Menu.Item key="1" style={{ border: "none" }}>
                    <Link to="/">
                      <Space>
                        <img src="/assets/images/logo.png" />
                        {APP_LONG_NAME}
                      </Space>
                    </Link>
                  </Menu.Item>
                  <SubMenu key="2" title="Administration">
                    <Menu.Item key="users">
                      <Link to="/users">Utilisateurs</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Col>

              <Col span={8} style={{ textAlign: "right" }}>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="0">
                        <a href="/">
                          <Space>
                            <UserOutlined /> Mon compte
                          </Space>
                        </a>
                      </Menu.Item>
                      <Menu.Item key="1">
                        <a href="/">
                          <Space>
                            <SettingOutlined /> Mes paramètres
                          </Space>
                        </a>
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="3">
                        {" "}
                        <Space>
                          <LogoutOutlined />
                          Déconnexion
                        </Space>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomCenter"
                  trigger={["click"]}
                >
                  <Space style={{ cursor: "pointer" }}>
                    Nordine Zetoutou
                    <CaretDownOutlined />
                  </Space>
                </Dropdown>
              </Col>
            </Row>
          </Header>

          <Switch>
            <Route path="/dashboard/details/">{getPage(<DashBoardDetailsView />)}</Route>
            <Route path="/users">{getPage(<UsersView />)}</Route>
            <Route path="/">{getPage(<DashBoardView />)}</Route>
          </Switch>
          <Footer id="footer">
            <Divider orientation="left">
              <Space>
                <img width="50" src="https://api-web.educagri.fr/apis/logo/images/agrosup_court_medium.png" />
                <b>{APP_SHORT_NAME}</b>
                par Sirens
              </Space>
            </Divider>
          </Footer>
        </Layout>
      </Router>
    );
  }
}
