import React from "react";
import styles from "../styles/main.module.css";
import HexGrid from "../src/HexGrid";
import { NodeContextProvider } from "../src/components/nodeContext";
const ZoomContainer = () => {
  return (
    <>
      <h1 className={styles['title']}>
        Node Visualization below
      </h1>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <div className={styles.content}>
            <NodeContextProvider>
              <HexGrid gridNumber={1008}/>
            </NodeContextProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZoomContainer;
