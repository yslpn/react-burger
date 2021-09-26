import { ReactNode } from 'react';
import { Route, Redirect, FC } from 'react-router-dom';
import { useAppSelector } from 'services/hooks';

interface IProtectedRoute {
    path: string;
    exact: boolean;
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
    const { userLogged } = useAppSelector((store) => ({
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