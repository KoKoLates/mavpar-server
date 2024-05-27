import React from "react";
import { styles } from "../styles/input";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = (
  { label, value, onChange }
) => {

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}:</label>
      <input 
        type="text" 
        value={value}
        style={styles.input}
        onChange={handler}
      />
    </div>
  )
};

export default InputField;
