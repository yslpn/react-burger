import { Route, Redirect, useLocation } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { TLocation } from "types";
import { useAppSelector } from 'services/hooks';
interface ILoggedRoute {
    path: string; 
    exact?: boolean;
    children: ReactNode;
}

const LoggedRoute = (
    {
        children,
        ...rest
    }: ILoggedRoute
) => {
    const { userLogged } = useAppSelector((store) => ({
        userLogged: store.login.userLogged
    }));
    const location = useLocation<TLocation>();
    const { from } = location.state || { from: { pathname: '/' } };
    return (
        <Route
            {...rest}
            render={() => {
                return !userLogged ? children : <Redirect to={from} />
            }}
        />
    );
};

export default LoggedRoute;