import React, { createContext, useState, useContext } from 'react';


export const useInfo = () => {
  return useContext(InfoContext);
};
const InfoContext = createContext({});

export function InfoProvider({ children }:any) {
  const [info, setInfo] = useState('');
  
  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {children}
    </InfoContext.Provider>
  );
}