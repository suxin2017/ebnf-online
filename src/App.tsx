import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import React from "react";
import ReactECharts from "echarts-for-react";
import Layout from "./Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <Charts /> */}
      <Layout />
    </div>
  );
}

export default App;
