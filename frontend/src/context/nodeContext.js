import React, { createContext, useState } from 'react';

const NodeContext = createContext();

// Create a provider component to wrap your application
export const NodeContextProvider = ({ children }) => {
  const [nodeNumbers, setNodeNumbers] = useState([]);
  const [nodeData,setNodeData]= useState([]);
  const [detailData,setDetailData] =useState([]);

  const updateDetailData = (value) => {
    setDetailData(value);
  };

  // Update the nodeNumbers array
  const updateNodeNumbers = (numbers) => {
    setNodeNumbers(numbers);
  };

   const updateNodeData = (numbers) =>{
    setNodeData(numbers)
   }

  // Provide the state and methods through the context value
  const value = {
    nodeNumbers,
    updateNodeNumbers,
    nodeData,
    updateNodeData,
    updateDetailData,
    detailData
  };

  return <NodeContext.Provider value={value}>{children}</NodeContext.Provider>;
};

// Export the custom hook to access the context value
export const useNodeContext = () => React.useContext(NodeContext);
