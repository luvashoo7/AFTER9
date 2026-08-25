import React, { createContext, useContext, useState } from 'react';

const InsideHubContext = createContext();

export const InsideHubProvider = ({ children }) => {
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('manifesto'); // 'manifesto', 'trust', 'chat', 'apps', 'pilot'

  const openHub = (tab = 'manifesto') => {
    setActiveTab(tab);
    setIsHubOpen(true);
  };

  const closeHub = () => {
    setIsHubOpen(false);
  };

  return (
    <InsideHubContext.Provider
      value={{
        isHubOpen,
        activeTab,
        setActiveTab,
        openHub,
        closeHub,
      }}
    >
      {children}
    </InsideHubContext.Provider>
  );
};

export const useInsideHub = () => useContext(InsideHubContext);
