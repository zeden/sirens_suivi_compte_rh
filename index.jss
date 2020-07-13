import React from "react";
import "antd/dist/antd.css";

import "./index.css";
/**
 *
 */

//import DemandeList from "./DemandeList.js";
import ActionsLeftSider from "./ActionsLeftSider";

export default class App extends React.Component {
  /* DemandeList = (
   /amenagement/new
  );*/

  render() {
    return (
      <div>
        <ActionsLeftSider />
      </div>
    );
  }
}
