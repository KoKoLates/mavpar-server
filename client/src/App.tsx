import './App.css';

import React from 'react';
import Main from './components/main';


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
      <Main></Main>
    </div>
  )
}

export default App;
