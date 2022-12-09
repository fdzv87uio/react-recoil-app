import React from "react";
import { useRecoilState } from "recoil";
import { dataState } from "../atoms/dataState";
import { getData } from "../utils/getData";

// this is a list of 100 Potential searches
const searchList = [
  "Houston",
  "Miami",
  "New York",
  "Tampa",
  "Los Angeles",
  "Austin",
];

function CreateTest() {
  const [data, setData] = useRecoilState(dataState);
  // this function retrieves data entities using the FAQX Search API, and stores it in the store
  async function fetchData() {
    // start timer
    const startTime = performance.now().toFixed(4);

    // loop through searchlist
    searchList.forEach(async (item) => {
      // perform search based on item
      const data = await getData(item);
      if (data) {
        setData((prev) => {
          const currentEntities = prev.entities;
          const newEntities = currentEntities.concat(data);
          const newState = {
            entities: newEntities,
            time: prev.time,
            status: prev.status,
          };
          return newState;
        });
      }
    });

    const endTime = performance.now().toFixed(4);
    const totalTime = (endTime - startTime).toFixed(4);
    setData((prev) => {
      const newState = {
        entities: prev.entities,
        time: totalTime,
        status: "completed",
      };
      return newState;
    });
    //
  }
  return (
    <div>
      <p>
        <strong>Entity Count: </strong>

        {data.entities.length}
      </p>
      <p>
        <strong>Time (ms): </strong>
        {data.time}
      </p>
      <p>
        <strong>Status: </strong>
        {data.status}
      </p>
      <button onClick={() => fetchData()}>Update</button>
      <button
        onClick={() => {
          setData((prev) => {
            const newState = {
              entities: [],
              time: 0,
              status: "initial",
            };
            return newState;
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default CreateTest;
