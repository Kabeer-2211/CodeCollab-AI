import { useContext } from "react";

import { projectContext } from "@contexts/ProjectPovider";

function useProject() {
    return useContext(projectContext)
}

export default useProject