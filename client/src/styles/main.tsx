import React from "react";

export const styles = {
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
    boxSizing: 'border-box'
  } as React.CSSProperties,

  blockContainer: {
    marginTop: '20px',
    flexGrow: 1,
  } as React.CSSProperties
}
