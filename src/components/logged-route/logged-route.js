import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

const LoggedRoute = ({ children, ...rest }) => {
    const { userLogged } = useSelector(store => ({
        userLogged: store.login.userLogged
    }));
    const location = useLocation();
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

LoggedRoute.propTypes = {
    children: PropTypes.element
}