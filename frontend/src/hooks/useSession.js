import { useContext } from "react";

import { userContext } from "@contexts/userProvider";

function useSession() {
    return useContext(userContext)
}

export default useSession