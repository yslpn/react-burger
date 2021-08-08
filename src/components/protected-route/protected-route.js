import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
    const { userLogged } = useSelector(store => ({
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

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired
}