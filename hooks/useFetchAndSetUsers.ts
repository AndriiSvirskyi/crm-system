import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersState } from "state/atoms";
import { fetchAndSetData } from "utils/fetchAndSetData";

export default function useFetchAndSetUsers() {
  const setUsersToRecoil = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);
  useEffect(() => {
    if (!users) {
      fetchAndSetData(`http://localhost:4200/users`, setUsersToRecoil);
    }
  }, []);
  return users;
}
