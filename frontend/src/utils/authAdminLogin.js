import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuthLogin = () => {

    const token = Cookies.get('jwt-admin')
    return (
        token
            ? <Outlet />
            : <Navigate to='/admin/login' />
    )
}

export const LoginPageRender = () => {
    const token = Cookies.get('jwt-admin')
    return (
        token
            ? <Navigate to='/admin/panel' />
            : <Outlet />
    )
}

export const RequireAuthLoginHospital = () => {
    const token = Cookies.get('jwt-hospital')
    return (
        token
            ? <Outlet />
            : <Navigate to='/hospital/login' />



    )
}

export const LoginPageRenderHospital = () => {
    const token = Cookies.get('jwt-hospital')
    return (
        token
            ? <Navigate to='/hospital/panel' />
            : <Outlet />

    )

}

export const RequireAuthLoginUser = () => {
    const token = Cookies.get('jwt_user')
    return (
        token
            ? <Outlet />
            : <Navigate to='/login' />
    )
}