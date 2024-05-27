import React from "react";
import NavBtn from "./navbtn";

import { styles } from "../styles/navbar";

interface NavBatProps {
  selected: string;
  onSelect: (block: string) => void;
}

const NavBar: React.FC<NavBatProps> = (
  { selected, onSelect }
) => {

  return (
    <div style={styles.navbar}>
      <NavBtn
        selected={selected === 'A'}
        onClick={() => onSelect("A")}
      >
        mavproxy
      </NavBtn>
      <NavBtn
        selected={selected === 'B'}
        onClick={() => onSelect("B")}
      >
        gstreamer
      </NavBtn>
    </div>
  )
};

export default NavBar;
