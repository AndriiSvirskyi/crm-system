import { createContext, useEffect, useState, useContext } from "react";
import { Snackbar } from "../Layouts/Snackbar";

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
  console.log(snackBar);
  const setSnackBarValues = ({ message, type }) => {
    const timer = setTimeout(() => {
      closeHandler();
    }, 33000);
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
