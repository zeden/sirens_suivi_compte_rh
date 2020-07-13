import React from "react";
import casual from "casual-browserify";
import { Row, Tag, Col, Popconfirm, Table, Switch, Input, Tooltip, Select, Empty, Spin, Badge, Space, Tabs, Button } from "antd";
import { DeleteOutlined, UserAddOutlined, ReloadOutlined, QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons";
const TOTAL_AGENTS_RANDOM = 100;
const Users = [];
for (let i = 1; i <= TOTAL_AGENTS_RANDOM; i++) {
  Users.push({
    key: casual.uuid,
    nom: casual.full_name,
    actif: casual.random_element([true, false]),
    login: casual.words(1) + casual.integer(2000, 3000),
    dateCreation: casual.date("YYYY-MM-DD"),
    lastConnection: casual.date("YYYY-MM-DD")
  });
}

/**
 *
 */

/**
 *
 */
/*******************************************************************************************/
export default class UsersView extends React.Component {
  onChange = checked => {
    console.log(`switch to ${checked}`);
  };
  render() {
    return (
      <div>
        <div style={{ margin: "10px 16px", textAlign: "right" }}>
          <Tooltip
            placement="topRight"
            title="Ajo
          uter un nouvel utilisateur"
          >
            <Button type="primary" shape="circle" icon={<UserAddOutlined />} />
          </Tooltip>
        </div>
        <Table
          className="segment"
          //style={{ width: 1200 }}
          rowKey="key"
          size="small"
          pagination={false}
          scroll={{ x: 1200, y: window.innerHeight * 0.55 }}
          dataSource={Users}
          columns={[
            {
              title: "Actif",
              key: "actif",
              width: 30,
              fixed: "left",
              render: (text, record) => <Switch onChange={this.onChange} size="small" defaultChecked={record.actif} />,
              sorter: (a, b) => {
                var x = a.actif;
                var y = b.actif;
                return x === y ? 0 : x ? -1 : 1;
              }
            },
            {
              dataIndex: "nom",
              title: "Utilisateur",
              width: 100,
              fixed: "left"
            },
            {
              dataIndex: "login",
              title: "Login",
              width: 100
            },
            {
              dataIndex: "dateCreation",
              title: "Créé le",
              width: 100
            },
            {
              dataIndex: "lastConnection",
              title: "Dernière connection",
              width: 100
            },

            {
              title: "",
              key: "action",
              width: 20,
              fixed: "right",
              render: (text, record) => (
                <span>
                  <Popconfirm placement="left" title={`Supprimer "${record.nom}" ?`} okType="" okText="Oui" cancelText="Non">
                    <a href="#f">
                      <DeleteOutlined style={{ color: "red" }} />
                    </a>
                  </Popconfirm>
                </span>
              )
            }
          ]}
        />
      </div>
    );
  }
}
