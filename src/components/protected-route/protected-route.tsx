import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, FC } from 'react-router-dom';
import { RootState } from '../../index';

interface IProtectedRoute {
    path: string;
    exact: boolean;
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
    const { userLogged } = useSelector((store: RootState) => ({
        userLogged: store.login.userLogged
    }));

    return (
        <Route
            {...rest}
            render={({ location }) => {
                return userLogged ? children :
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />;
            }}
        />
    );
};

export default ProtectedRoute;