import React from "react";

import { Row, Tag, Col, Switch, Menu, Dropdown, Table, Input, Tooltip, Select, Empty, Spin, Badge, Space, Tabs, Button } from "antd";

import { DownloadOutlined, DownOutlined, InfoCircleOutlined, UserOutlined, FieldTimeOutlined, ReloadOutlined, QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons";

import { FILTRES_INDICATEURS, FILTRES_RECHERCHE } from "../DataSources";
import { BrowserRouter as Router, useLocation, Route, Link, useParams } from "react-router-dom";
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

/**
 *
 */

const getUrlParamValue = param => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};
/**
 *
 */
const MANGUE_LIST_COLUMNS = [
  /*{
    title: "Résolu",
    dataIndex: "resolutionPlanifiee",
    width: 40,
    fixed: "left",
    render: (text, record) => (
      <Switch
        //   onChange={checked => this.saveResolutionPlanifieeCompteAgent(record)}
        //loading={this.state.saveResolutionPlanifieeCompteAgentLoading}
        defaultChecked={record.resolutionPlanifiee}
        checkedChildren="Planifiée"
        unCheckedChildren="à planifier"
      />
    )

    
    if (record.resolutionPlanifiee === true) {
        return <FieldTimeOutlined style={{ color: "#33b679" }} />;
      } else {
        return <FieldTimeOutlined style={{ opacity: 0.35 }} />;
      }
     
  },*/
  {
    dataIndex: "nom",
    title: "Nom & prénom",
    width: 200,
    editable: true,
    fixed: "left",
    // render: (text, record, index) => record.nom + " " + record.prenom,
    sorter: (a, b) => {
      var x = a.nom.toLowerCase();
      var y = b.nom.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    }
  },

  {
    dataIndex: "mangue_id",
    title: "Id mangue",
    width: 200,
    fixed: "left",
    ellipsis: {
      showTitle: true
    }
  },
  {
    dataIndex: "situation",
    title: "Situation"
  }
];
/*
for (let i = 1; i <= 20; i++) {
  MANGUE_LIST_COLUMNS.push({
    dataIndex: "situation_" + i,
    title: "Situation_" + i,
    width: 100
  });
}
*/
//console.log(MANGUE_LIST_COLUMNS);
const AgentTable = props => (
  <div>
    <Table
      style={{ width: 1000 }}
      id="agentList"
      // loading={() => <LoadingOutlined style={{ fontSize: 24 }} spin />}
      {...props}
      rowKey="mangue_id"
      pagination={(() => {
        const pageSise = 100;
        if (props.dataSource.length < pageSise) {
          return false;
        } else {
          return {
            pageSize: 100,
            showSizeChanger: false
          };
        }
      })()}
      showSorterTooltip={false}
      //
      columns={MANGUE_LIST_COLUMNS}
      size="small"
      scroll={{ y: window.innerHeight * 0.5 }}
      locale={{
        emptyText: <Empty description={<span>Aucun enregistrement.</span>} />
      }}
    />
  </div>
);
/**
 *
 */
const log = o => console.log(o);
/**
 *
 */
const lastIndicateurSelectIndex = (() => {
  var index = localStorage.lastIndicateurSelectIndex || 0;
  if (index > FILTRES_INDICATEURS.length - 1) {
    index = 0;
  }
  return index;
})();
const lastRechercheSelectIndex = (() => {
  var index = localStorage.lastRechercheSelectIndex || 0;
  if (index > FILTRES_RECHERCHE.length - 1) {
    index = 0;
  }
  return index;
})();
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
/*******************************************************************************************/
export default class DashBoardDetailsView extends React.Component {
  // let { FILTER_INDEX } = useParams();
  state = {};
  constructor(props) {
    super(props);
  }

  /**
   *
   */

  INDICATEURS_VIEW = "INDICATEURS_VIEW";
  MANGUE_RECHERCHE_VIEW = "MANGUE_RECHERCHE_VIEW";
  WARNINGS = { true: "error", false: "success" };
  /**
   *
   */
  state = {
    currentFiltre: null,
    DataSourceIndicateurs: [],
    currentDataSourceIndicateur: FILTRES_INDICATEURS[lastIndicateurSelectIndex].Agents,
    lastIndicateurSelectIndex: FILTRES_INDICATEURS[lastIndicateurSelectIndex].value,
    currentDataSourceRecherche: FILTRES_RECHERCHE[lastRechercheSelectIndex].Agents,
    lastRechercheSelectIndex: FILTRES_RECHERCHE[lastRechercheSelectIndex].value,
    //  showSelection: false,
    showSelectionButtonDisabled: true,
    refresh: false,
    loading: false,
    selectedRows: [], // Check here to configure the default column scqsc scsc scsc
    loading: false,

    saveResolutionPlanifieeCompteAgentLoading: false
  };
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentFiltre = urlParams.get("filtre");
    this.setState({ currentFiltre: currentFiltre });
    //
    this.fetchData();
  }
  /**
   *
   */
  fetchData() {
    this.setState({
      loading: true,
      refresh: true
    });
    fetch("https://randomuser.me/api/?page=3&results=50")
      .then(res => res.json())
      .then(
        result => {
          // console.log("randomuser", result);

          this.setState({
            loading: false,
            refresh: false,
            dataSourceTest: result.results
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        error => {
          log(error);
          this.setState({
            loading: false,
            refresh: false
          });
        }
      );
  }
  /**
   *
   */
  refresh = () => this.fetchData();
  /**
   *
   */
  exportSelection = selectedRows => {
    const headers = MANGUE_LIST_COLUMNS.map(item => item.title).join(",");
    if (selectedRows.length === 0) {
      selectedRows = this.state.currentDataSourceIndicateur;
    }
    const rows = selectedRows.map(item => Object.values(item).join(","));
    rows.unshift(headers);
    let content = rows.join("\n");
    let csvContent = "data:text/csv;charset=utf-8," + content;
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "liste_agents_" + new Date().toISOString() + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  /**
   *
   */
  onChangeIndicateurSelect = (value, option) => {
    let Filtre = FILTRES_INDICATEURS.filter(Filtre => Filtre.value === value)[0];
    let data = Filtre.Agents; //
    this.setState({ currentDataSourceIndicateur: data });
    this.setState({ currentFiltre: option.value });

    localStorage.lastIndicateurSelectIndex = option.key;
  };
  /**
   *
   */
  /**
   *
   */
  saveResolutionPlanifieeCompteAgent = record => {
    log(record);
    record.resolutionPlanifiee = !record.resolutionPlanifiee;
    this.setState({ saveResolutionPlanifieeCompteAgentLoading: true });
    setTimeout(() => {
      this.setState({ saveResolutionPlanifieeCompteAgentLoading: false });
    }, 500);
  };
  onChangeRechercheSelect = (value, option) => {
    let Filtre = FILTRES_RECHERCHE.filter(Filtre => Filtre.value === value)[0];
    let data = Filtre.Agents;
    this.setState({ currentDataSourceRecherche: data });
    localStorage.lastRechercheSelectIndex = option.key;
  };
  /*************************************************************************/
  /*              
  /*************************************************************************/

  antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

  /**
   *
  
  MenuButtonActions = (
    <Space size="middle">
      <Tooltip placement="topRight" title="Actualiser">
        <Button type="primary" loading={this.state.refresh} onClick={this.refresh} shape="circle" icon={<ReloadOutlined />} />
      </Tooltip>
      <Tooltip placement="topRight" title="Exporter la sélection">
        <Badge offset={[1, 4]} overflowCount={1000} count={this.state.selectedRows.length}>
          <Button type="primary" onClick={() => this.exportSelection(this.state.selectedRows)} shape="circle" icon={<DownloadOutlined />} />{" "}
        </Badge>
      </Tooltip>
    </Space>
  ); */
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({ selectedRows });
      if (selectedRows.length === 0) {
        this.setState({
          dataSource: this.state.currentDataSourceIndicateur
        });
      }
      log(selectedRows.length);
    }
  };
  /*************************************************************************/
  /*              
  /*************************************************************************/

  render() {
    /**
     *
     */

    /**
     *
     */

    /****************************************************************** */

    return (
      <Tabs>
        <TabPane tab="Incohérences dans Mangue" key="0">
          <Space className="segment" direction="vertical">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Select
                value={this.state.currentFiltre}
                style={{ width: "600px" }}
                notFoundContent="Aucun filtre."
                showSearch
                placeholder="Sélectionnez un indicateur"
                onChange={this.onChangeIndicateurSelect}
                filterOption={(input, option) => option.searchin.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {FILTRES_INDICATEURS.map((item, index) => (
                  <Option key={index} value={item.value} searchin={item.name} title={item.description} disabled={item.Agents.length === 0}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>
                        <Badge status={this.WARNINGS[!(item.Agents.length === 0)]} />
                        {index + 1} - {item.name}
                      </span>
                      <span>{item.Agents.length}</span>
                    </div>
                  </Option>
                ))}
              </Select>

              <Space>
                {/* <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="1" icon={<UserOutlined />}>
                        1st menu item
                      </Menu.Item>
                      <Menu.Item key="2" icon={<UserOutlined />}>
                        2nd menu item
                      </Menu.Item>
                      <Menu.Item key="3" icon={<UserOutlined />}>
                        3rd item
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    Button <DownOutlined />
                  </Button>
                </Dropdown>*/}
                <Tooltip placement="topRight" title="Si pas de sélection, toute la liste des agents de ce filtre sera exportée.">
                  <Badge offset={[1, 4]} overflowCount={1000} count={this.state.selectedRows.length}>
                    <Button type="primary" onClick={() => this.exportSelection(this.state.selectedRows)} shape="circle" icon={<DownloadOutlined />} />{" "}
                  </Badge>
                </Tooltip>
              </Space>
              {/*  <Switch
                  //   onChange={checked => this.saveResolutionPlanifieeCompteAgent(record)}
                  //loading={this.state.saveResolutionPlanifieeCompteAgentLoading}
                  // defaultChecked={record.resolutionPlanifiee}
                  checkedChildren="Planifiée"
                  unCheckedChildren="à planifier"
                />*/}
            </div>
            {/*---------------------------------------------*/}
            {/* table des agents des filtres*/}
            {/*---------------------------------------------*/}
            <Spin indicator={this.loadingantIcon} spinning={this.state.loading}>
              <AgentTable dataSource={this.state.currentDataSourceIndicateur} rowSelection={this.rowSelection} />
            </Spin>
            {/*---------------------------------------------*/}
          </Space>
        </TabPane>
        <TabPane tab="Recherche dans mangue" key="1">
          <Space direction="vertical" className="segment">
            <Row gutter={8}>
              <Col span={8}>
                <Search placeholder="Chercher un agent" />
              </Col>
              <Col span={16}>
                <Select
                  defaultValue={this.state.lastRechercheSelectIndex}
                  style={{ width: "100%" }}
                  allowClear
                  notFoundContent="Aucun filtre."
                  onChange={this.onChangeRechercheSelect}
                  //  loading={this.state.loading}
                  placeholder="Sélectionnez un filtre"
                >
                  {FILTRES_RECHERCHE.map((item, index) => (
                    <Option key={index} value={item.value} searchin={item.name} title={item.description}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <span>
                          {index + 1} - {item.name}
                        </span>
                        <span>{item.Agents.length}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <AgentTable
              dataSource={this.state.currentDataSourceRecherche}
              //rowSelection={rowSelection}
            />
          </Space>
        </TabPane>
        <TabPane
          key="2"
          tab={
            <span>
              <QuestionCircleOutlined />
              Aide sur liste des filtres
            </span>
          }
        >
          <div className="segment">
            <Table
              rowKey="key"
              pagination={false}
              scroll={{ y: window.innerHeight * 0.55 }}
              dataSource={FILTRES_INDICATEURS.concat(FILTRES_RECHERCHE)}
              //
              columns={[
                {
                  dataIndex: "beta",
                  title: "Evaluation",
                  width: 120,
                  render: (text, record) => {
                    if (record.beta === true) {
                      return <Tag color="error">En cours de test</Tag>;
                    }
                  },
                  sorter: (a, b) => {
                    var x = a.beta;
                    var y = b.beta;
                    return x === y ? 0 : x ? -1 : 1;
                  }
                },
                {
                  dataIndex: "type",
                  title: "Type",
                  width: 100,
                  sorter: (a, b) => {
                    var x = a.type;
                    var y = b.type;
                    return x < y ? -1 : x > y ? 1 : 0;
                  }
                },
                { dataIndex: "value", title: "Valeur", width: 100 },
                { dataIndex: "name", title: "Nom" },
                { dataIndex: "description", title: "Description" }
              ]}
              size="small"
            />
          </div>
        </TabPane>
        {/*}
        <TabPane tab="test" key="4">
          <Table
            rowKey="mangue_id"
            loading={this.state.loading}
            scroll={{ y: window.innerHeight * 0.55 }}
            dataSource={this.state.dataSourceTest}
            //
            columns={[
              {
                dataIndex: "name",
                title: "nom",
                render: (prop, record) => record.name.first
              }
            ]}
            size="small"
          />
          </TabPane>*/}
      </Tabs>
    );
  }
}
