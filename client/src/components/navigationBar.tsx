import React from 'react';
import NavbarButton from './navbarBtn';

interface NavigationBarProps {
  selectedBlock: string;
  onSelect: (block: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ selectedBlock, onSelect }) => {
  return (
    <div style={styles.navbar}>
      <NavbarButton 
        selected={selectedBlock === 'A'} 
        onClick={() => onSelect('A')}>
        mavproxy
      </NavbarButton>
      <NavbarButton 
        selected={selectedBlock === 'B'} 
        onClick={() => onSelect('B')}>
        gstreamer
      </NavbarButton>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    padding: '10px',
    backgroundColor: '#dcdcdc',
  } as React.CSSProperties,
};

export default NavigationBar;
