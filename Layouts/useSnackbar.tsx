import { useEffect, useState } from "react";

export function useSnackbar() {
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
      useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(false);
        }, 4000);
        return () => {
          clearTimeout(timer);
        };
      }, [isActive]);
  
    const openSnackBar = (msg = "Something went wrong...", type='info' ) => {
      setMessage(msg);
      setType(type)
      setIsActive(true);
    };
  
    return { isActive, message, type, openSnackBar }
  }