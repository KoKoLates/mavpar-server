import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={styles.inputContainer}>
      <label style={styles.label}>{label}:</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );
};

interface AddressFormProps {
  ip: string;
  port: string;
  setIp: (ip: string) => void;
  setPort: (port: string) => void;
  onCancel: () => void;
  onModify: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ ip, port, setIp, setPort, onCancel, onModify }) => {
  const handleCancel = () => {
    setIp('');
    setPort('');
    onCancel();
  };

  return (
    <div style={styles.container}>
      <InputField label="IP" value={ip} onChange={setIp} />
      <InputField label="Port" value={port} onChange={setPort} />
      <div style={styles.buttonContainer}>
        <button onClick={onModify} style={styles.button}>Modify</button>
        <button onClick={handleCancel} style={styles.button}>Cancel</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  } as React.CSSProperties,
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  label: {
    marginRight: '10px',
  } as React.CSSProperties,
  input: {
    padding: '5px',
    margin: '5px 0',
    borderRadius: '3px',
    border: '1px solid #ccc',
    minWidth: '200px',
  } as React.CSSProperties,
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    margin: '5px 20px',
  } as React.CSSProperties,
};

export default AddressForm;
