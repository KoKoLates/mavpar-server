import React from 'react';
import MainBlock from './components/mainBlock';

const App: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <MainBlock />
    </div>
  );
};

export default App;
