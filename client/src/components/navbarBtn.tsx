import React from 'react';

interface NavbarButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ selected, onClick, children }) => {
  const buttonStyle = {
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
    backgroundColor: selected ? '#000' : 'transparent',
    color: selected ? '#fff' : '#000',
  };

  return (
    <div onClick={onClick} style={buttonStyle}>
      {children}
    </div>
  );
};

export default NavbarButton;
