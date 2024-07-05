import React from "react";
import HexagonGrid from "react-hexagon-grid";
import times from "lodash/times";
import { useNodeContext } from "../src/components/nodeContext";
import Footer from '../src/components/Footer/Footer';

async function fetchData(id) {
  try {
    const data = await fetch(`http://localhost:8000/view?id=${id}`)
      .then((res) => res.json())
      .then((res) => res);
    return data;
  }catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

const cellColorChange = (value, nodeNumbers)=>{
  if(nodeNumbers.includes(value)) return "#410e69";
  if(nodeNumbers.includes(-value)) return "#238e12";
  else return "#d5dbe8";
}

const textColorChange = (value, nodeNumbers) => {
  return nodeNumbers.includes(value)||nodeNumbers.includes(-value) ? "white" : "black";
}

const handleClick = async (hexagon,contextValues)=>{
  const { nodeNumbers, updateNodeNumbers, nodeData, updateNodeData, updateDetailData } = contextValues;
  if (!nodeNumbers.includes(hexagon + 1)) {
    const data = await fetchData(hexagon + 1);
    let result = data.map(x=>x.to);
    result.push(-(hexagon+1));
    updateNodeNumbers(result);
    updateNodeData(data);
    updateDetailData([]);
  }
  else{
    updateDetailData(
      nodeData.filter((x) => x.to === hexagon + 1).flatMap((obj) => obj.type)
    )
  }
}

const getHexProps = (hexagon, contextValues) => {
  const { nodeNumbers } = contextValues;

  return {
    style: {
      fill: cellColorChange(hexagon + 1, nodeNumbers),
      stroke: "white",
      position: "relative",
    },
    onClick: handleClick.bind(null,hexagon,contextValues),
  };
};

const renderHexagonContent = (hexagon, nodeNumbers,contextValues) => (
  <text
    x="50%"
    y="50%"
    fontWeight="bold"
    fontSize={150}
    onClick={handleClick.bind(null,hexagon,contextValues)}
    style={{ 
      fill: textColorChange(hexagon + 1, nodeNumbers), 
      cursor:"pointer"
    }}
    dominantBaseline="mathematical"
    textAnchor="middle">
    {hexagon + 1}
  </text>
);

const HexGridComponent = ({gridNumber}) => {
  const contextValues = useNodeContext();
  const hexagons = times(gridNumber, (id) => id);
  const { detailData, nodeNumbers } = contextValues;

  return (
    <>
      {detailData.length > 0 && (
        <div style={{ textAlign: "center" }}>
          <h3>Below are the access control/s</h3>
          {detailData.map((x, index) => (
            <h5
              key={index}
              style={{
                color: "blue",
                fontWeight: "500",
                fontSize: "100",
                marginBottom: "2ch",
              }}
            >
              {x}
            </h5>
          ))}
        </div>
      )}
      <HexagonGrid
        gridWidth={1000}
        gridHeight={1000}
        hexagons={hexagons}
        hexProps={(hexagon) => getHexProps(hexagon, contextValues)}
        renderHexagonContent={(hexagon) => renderHexagonContent(hexagon, nodeNumbers,contextValues)}
      />
      <Footer/>
    </>
  );
};

export default HexGridComponent;
