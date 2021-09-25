import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { RootState } from 'index';
import { TLocation } from "types";
interface ILoggedRoute {
    path: string; 
    exact?: boolean;
    children: ReactNode;
}

const LoggedRoute: FC<ILoggedRoute> = ({ children, ...rest }) => {
    const { userLogged } = useSelector((store: RootState) => ({
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