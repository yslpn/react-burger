import OrderInfo from "components/order-info/order-info";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
    WS_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/ws'

const OrderPage = () => {
    const { ingredientsRequestSuccess, getOrdersSuccess  } = useSelector(store => ({
        ingredientsRequestSuccess: store.ingredients.ingredientsRequestSuccess,
        getOrdersSuccess: store.ws.getOrdersSuccess,
    }));

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: WS_CONNECTION_START});
        return () => dispatch(wsConnectionClosed());
    }, [dispatch]);

    return (
        ingredientsRequestSuccess && getOrdersSuccess && <OrderInfo/>
    );
}

export default OrderPage;