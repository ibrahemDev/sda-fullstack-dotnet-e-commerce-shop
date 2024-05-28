import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RolesTypes, useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";



/**
 * Type definition for a role model.
 */
type RoleModel = {
    role: RolesTypes;
    path: string;
}

/**
 * Creates a role model with a given role and redirect path.
 * @param role - The role of the user.
 * @param redirectPath - The path to redirect to if the role matches.
 * @returns A role model object.
 */
export const RoleModel = (role?: RolesTypes, redirectPath?: string): RoleModel => {
    if (role == RolesTypes.User || role == RolesTypes.Admin) {
        return { role, path: redirectPath || "/" }
    } else {
        return { role: RolesTypes.Guest, path: redirectPath || "/login" }
    }
}

/**
 * A React component that protects routes based on user roles.
 * @param deniedRolesModels - An array of role models that are denied access to the route.
 * @param children - The child components of the route.
 * @returns The rendered component.
 */
const ProtractedRoute: React.FC<React.PropsWithChildren<{ deniedRolesModels: RoleModel[] }>> = ({ deniedRolesModels, children }) => {
    const { isLoggedIn, isAdmin, token, role } = useAuthenticationActions();
    const location = useLocation();

    const result = deniedRolesModels.findIndex((item) => {
        if (item.role == RolesTypes.User && role == RolesTypes.User/*!(typeof token == "undefined") && !isAdmin*/) {
            return true;
        } else if (item.role == RolesTypes.Admin && role == RolesTypes.Admin/*!(typeof token == "undefined") && isAdmin*/) {
            return true;
        } else if (item.role == RolesTypes.Guest && role == RolesTypes.Guest /* typeof token == "undefined"*/) {
            return true;
        }
        return false;
    })

    if (result != -1) {
        const rolesModel = deniedRolesModels[result];
        const from = location.pathname !== rolesModel.path ? location.pathname : '/';
        console.log("------------------------------------------------------------------------")
        console.log(rolesModel)
        console.log(typeof token == "undefined")
        console.log(role)
        console.log("------------------------------------------------------------------------")
        return <Navigate to={rolesModel.path} state={{ from }} />;
    }

    return <Outlet />;
};

export default ProtractedRoute;
