import React, { useEffect, useState } from "react";

export default function useUserRole() {
  const [userRole, setUserRole] = useState();
  const currentUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  useEffect(() => {
    setUserRole(JSON.parse(currentUser).role);
  }, [currentUser]);
  return userRole;
}
