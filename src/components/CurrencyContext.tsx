import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  selectedCurrency: number;
  setSelectedCurrency: (index: number) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('selectedCurrencyIndex');
    if (saved !== null) {
      setSelectedCurrency(Number(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCurrencyIndex', String(selectedCurrency));
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}; 