import { createContext, useState } from "react";

export const SnackbarContext = createContext({
  snackBar: {
    message: "",
    type: "",
    isActive: false,
  },
  openSnackBar: ({ message, type }) => {},
  closeSnackBar: () => {},
});

export function SnackBarContextProvider({ children }) {
  const [timer, setTimer] = useState<any>();
  const [snackBar, setSnackBar] = useState({
    message: "",
    type: "",
    isActive: false,
  });
  const setSnackBarValues = ({ message, type }) => {
    const timer = setTimeout(() => {
      closeHandler();
    }, 3000);
    setSnackBar({ message, type, isActive: true });
    setTimer(timer);
  };

  const closeHandler = () => {
    clearTimeout(timer);
    setSnackBar({
      message: "",
      type: "",
      isActive: false,
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackBar,
        openSnackBar: setSnackBarValues,
        closeSnackBar: closeHandler,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}
