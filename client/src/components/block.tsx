import React from "react";
import InputField from "./form";

import { styles } from "../styles/block";

interface BlockProps {
  host: string;
  port: string;
  setHost: (host: string) => void;
  setPort: (port: string) => void;
  onReset: () => void;
  onModify: () => void;
  onCancel: () => void;
}


const Block: React.FC<BlockProps> = (
  { host, port, setHost, setPort, onReset, onModify, onCancel }
) => {
  return (
    <div style={styles.container}>
      <InputField label="Host" value={host} onChange={setHost}></InputField>
      <InputField label="Port" value={port} onChange={setPort}></InputField>
      <div style={styles.btnContainer}>
        <button onClick={onModify} style={styles.btn}>modify</button>
        <button onClick={onCancel} style={styles.btn}>cancel</button>
        <button onClick={onReset} style={styles.btn}>default</button>
      </div>
    </div>
  )
};

export default Block;
