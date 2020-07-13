import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import reqwest from "reqwest";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

//this.setState({ loading: true });
/*
reqwest({
  url: "https://next.json-generator.com/api/json/get/Vys_MiP7u",
  method: "get"
  // data: getRandomuserParams(params)
}).then(data => {
  console.log(data);

    this.setState({
      loading: false,
      data: data.results,
      pagination: {
        ...params.pagination,
        total: 200
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      }
    });
});
*/
