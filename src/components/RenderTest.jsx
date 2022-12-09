import React from "react";

function RenderTest(entities, time) {
  const data = entities.entities;
  if (data && data.length > 0) {
    return (
      <>
        <div id="table-results" className={tableWrapper}>
          <table>
            <tbody>
              <tr>
                <th>N.-</th>
                <th>Entity name</th>
                <th>Entity Type</th>
              </tr>
              {data.map((item, key) => {
                const name = item._source.title;
                const mt = item._source.typeMachineName;
                return (
                  <>
                    <tr key={`item_${key + 1}`}>
                      <td>{key + 1}</td>
                      <td>{name}</td>
                      <td>{mt}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default RenderTest;

const tableWrapper = {
  width: "600px",
  height: "auto",
  padding: "10px 10px 10px 10px",
};
