import React from "react";
import Block from "./block";
import NavBar from "./navbar";

import { styles } from "../styles/main";
import { useState } from "react";

import { update } from "../api/update"
import { fetch_default } from "../api/reset";
import { fetch_config, Settings } from "../api/config";


const Main: React.FC = () => {

  const [host, setHost] = useState<string>("");
  const [port, setPort] = useState<string>("");

  const [block, setBlock] = useState<string>("A");

  const handleSelected = async(block: string) => {
    setBlock(block);

    // clean the input 
    try {
      const settings: Settings | null = await fetch_config(block);
      if (settings) {
        setHost(settings.host);
        setPort(settings.port);
      }
    } catch (error) {
      console.log(`[Error] Fetching Issue: ${error}`);
    }
  };

  const handleModify = async() => {
    console.log(`${block}: {host: ${host}, port: ${port}}`);
    try {
      const data = await update(block, host, port);
      console.log(`[Info] Service Update Successfully: ${data}`)
    } catch (error) {
      console.error(`[Error] Failed to Update Services: ${error}`);
    }
  };

  const handleCancel = async() => {
    try {
      const settings: Settings | null = await fetch_config(block);
      if (settings) {
        setHost(settings.host);
        setPort(settings.port);
      }
    } catch (error) {
      console.error(`[Error] Fetching Issue: ${error}`);
    }
  };

  const handleReset = async() => {
    try {
      await fetch_default();

      const settings: Settings | null = await fetch_config(block);
      if (settings) {
        setHost(settings.host);
        setPort(settings.port);
      }
    } catch (error) {
      console.error(`[Error] Fetching Issue: ${error}`);
    }
  };

  const getBlock = () => {
    return (
      <Block
        host={host}
        port={port}
        setHost={setHost}
        setPort={setPort}
        onReset={handleReset}
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
