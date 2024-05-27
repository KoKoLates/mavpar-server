import React, { useState } from 'react';
import NavigationBar from './navigationBar';
import AddressForm from './addressForm';

const MainBlock: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>('A');
  const [ip, setIp] = useState<string>('');
  const [port, setPort] = useState<string>('');

  const handleSelectBlock = (block: string) => {
    setSelectedBlock(block);
    // Reset IP and Port when switching pages
    setIp('');
    setPort('');
  };

  const handleModify = async () => {
    console.log(`${selectedBlock}: {ip: ${ip}, port: ${port}}`);

    const serviceData = {
      mavproxy: selectedBlock === 'A' ? { ip, port: parseInt(port, 10) } : undefined,
      gstreamer: selectedBlock === 'B' ? { ip, port: parseInt(port, 10) } : undefined,
    };

    try {
      const response = await fetch('http://127.0.0.1:8080/update_service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    console.log(`${selectedBlock} cancel`);
  };

  const getBlockContent = () => {
    return (
      <AddressForm
        ip={ip}
        port={port}
        setIp={setIp}
        setPort={setPort}
        onModify={handleModify}
        onCancel={handleCancel}
      />
    );
  };

  return (
    <div style={styles.container}>
      <NavigationBar selectedBlock={selectedBlock} onSelect={handleSelectBlock} />
      <div style={styles.blockContainer}>
        {getBlockContent()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 'calc(100vw / 3)',
    height: 'calc(100vh / 2)',
    backgroundColor: '#dcdcdc',
    textAlign: 'center',
    display: 'flex',
    padding: '5px',
    borderRadius: '10px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  blockContainer: {
    marginTop: '20px',
    flexGrow: 1,
  } as React.CSSProperties,
};

export default MainBlock;
