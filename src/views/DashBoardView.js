import React from "react";
import { Tag } from "antd";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

import { FILTRES_INDICATEURS } from "../DataSources";

/**
 *
 */

/**
 *
 */
/*******************************************************************************************/
export default class DashBoardView extends React.Component {
  // WARNINGS = { ERROR: "error", WARNING: "warning", SUCCESS: "success" };
  STATUS_COLORS = { ERROR: "red", WARNING: "orange", SUCCESS: "green" };
  //success, info, warning, errorssss
  //"ERROR", "WARNING", "SUCCESS"]);success, info, warning, error.
  render() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(35%, auto))"
        }}
      >
        {FILTRES_INDICATEURS.map((item, index) => (
          <div key={index} className="segment">
            <Tag color={this.STATUS_COLORS[item.status]} style={{ minWidth: 35, textAlign: "center" }}>
              {item.Agents.length}
            </Tag>
            <Link to={`/dashboard/details/?filtre=${item.value}`}>
              <b>{index + 1}</b>. {item.name}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
