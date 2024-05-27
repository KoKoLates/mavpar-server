
import React from "react";
import Block from "./block";
import NavBar from "./navbar";

import { styles } from "../styles/main";
import { useState } from "react";

const Main: React.FC = () => {

  const [host, setHost] = useState<string>("");
  const [port, setPort] = useState<string>("");

  const [block, setBlock] = useState<string>('A');
  

  const handleSelected = (block: string) => {
    setBlock(block);

    // clean the input 
    setHost("");
    setPort("");
  };

  const handleModify = () => {
    console.log(`${block}: {host: ${host}, port: ${port}}`);
  };

  const handleCancel = () => {
    // read api from backend and set host and port
    // into default
    setHost("");
    setPort("");
  };

  const getBlock = () => {
    return (
      <Block
        host={host}
        port={port}
        setHost={setHost}
        setPort={setPort}
        onModify={handleModify}
        onCancel={handleCancel}
      ></Block>
    )
  };

  return (
    <div style={styles.container}>
      <NavBar selected={block} onSelect={handleSelected}></NavBar>
      <div style={styles.blockContainer}>
        {getBlock()}
      </div>
    </div>
  )
};

export default Main;
