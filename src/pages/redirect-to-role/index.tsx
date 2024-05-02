import { useSelector } from "@/hooks";
import { getCurrentRole } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";

export default function RedirectToRolePage() {
    const location = useLocation();
    const { roles } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Navigate to="/exams" />;
}
