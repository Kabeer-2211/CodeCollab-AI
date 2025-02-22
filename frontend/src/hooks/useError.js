import { useContext } from "react";

import { errorContext } from "@contexts/errorProvider";

function useError() {
    return useContext(errorContext)
}

export default useError