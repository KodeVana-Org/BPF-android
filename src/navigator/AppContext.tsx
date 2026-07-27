import React, {createContext, useState} from 'react';

interface AppContextType {
  navigateToHome: boolean;
  setNavigateToHome: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType>({
  navigateToHome: false,
  setNavigateToHome: () => {},
});

export const AppContextProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [navigateToHome, setNavigateToHome] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{navigateToHome, setNavigateToHome}}>
      {children}
    </AppContext.Provider>
  );
};
