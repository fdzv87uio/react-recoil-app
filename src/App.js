import logo from "./logo.svg";
import "./App.css";
import CreateTest from "./components/CreateTest";
import React, { useEffect, useState } from "react";
import RenderTest from "./components/RenderTest";
import { useRecoilState } from "recoil";
import { dataState } from "../src/atoms/dataState";

function App() {
  const [data, setData] = useRecoilState(dataState);
  const [renderData, setRenderData] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [time, setTime] = useState(0);
  const [renderingStartTime, setRenderingStartTime] = useState(0);

  useEffect(() => {
    if (status === "Processing") {
      if (renderingStartTime === 0) {
        setRenderingStartTime(performance.now().toFixed(4));
      }
      const element = document.getElementById("table-results");
      if (element === null) {
        setStatus("Processing");
      } else {
        const endTime = performance.now().toFixed(4);
        const totalTime = (endTime - renderingStartTime).toFixed(4);
        setTime(totalTime);
        setStatus("Completed");
      }
    }
  }, [status, renderingStartTime]);

  function passData() {
    setStatus("Processing");
    setRenderData(data.entities);
  }

  return (
    <div className="App" style={appWrapper}>
      <div style={header}>
        <p>
          <strong>REACT-RECOIL-APP</strong>
        </p>
      </div>
      <div style={subheader}>
        <p>
          <strong>Description:</strong> The following web app is an
          implementation of the recoil react state management library. There are
          2 implemented functionalities for our tests:
        </p>
        <div style={testWrapper}>
          <ul>
            <li>
              {" "}
              <strong>Test 1</strong> involves perfoming a series of 100
              consecutive API calls to fetch at least 10 results from each
              call,and saving such results in the store.{" "}
            </li>
            <li>
              {" "}
              <strong>Test 2</strong> involves fecthing the data saved in the
              store from <strong>Test 1</strong> and passing it to a child
              component to render it.
            </li>
          </ul>
        </div>
      </div>
      <div style={testGrid}>
        <div style={testContainer}>
          <div style={header}>
            <strong>TEST 1</strong>
          </div>
          <CreateTest />
        </div>
        <div style={testContainer}>
          <div style={header}>
            <strong>TEST 2</strong>
          </div>
          <div>
            <p>
              <strong>Time (ms):</strong> {time}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                passData();
              }}
            >
              Render Data
            </button>
            <button
              onClick={() => {
                setRenderData([]);
                setTime(0);
                setStatus("Pending");
              }}
            >
              Clear
            </button>
          </div>
          {renderData && renderData.length > 0 && (
            <RenderTest entities={renderData} time={time} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

//styles
const appWrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const subheader = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const header = {
  fontSize: "25px",
  textDecoration: "underline",
  marginTop: "20px",
  marginBottom: "20px",
};

const testWrapper = {
  width: "600px",
  height: "auto",
  textAlign: "left",
  border: "1px solid #000000",
  borderRadius: "10px",
  padding: "5px 5px 5px 5px",
};

const testGrid = {
  width: "100%",
  height: "auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  justifyItems: "center",
  margin: "10px 5px 10px 5px",
};

const testContainer = {
  display: "flex",
  flexDirection: "column",
};
