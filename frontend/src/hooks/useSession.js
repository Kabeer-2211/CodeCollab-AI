import { useContext } from "react";

import { userContext } from "@contexts/userProvider";
import { useSelector } from "react-redux";

function useSession() {
    return {
        ...useContext(userContext),
        ...useSelector(state => state.auth)
    }
}

export default useSession