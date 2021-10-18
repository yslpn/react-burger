import OrderInfo from "components/order-info/order-info";
import { useEffect } from 'react';
import {
    WS_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/ws';
import { FC } from "react";
import { useAppDispatch, useAppSelector } from 'services/hooks';

const OrderPage = () => {
    const { ingredientsRequestSuccess, feedOrdersSuccess, profileOrdersSuccess  } = useAppSelector((store) => ({
        ingredientsRequestSuccess: store.ingredients.ingredientsRequestSuccess,
        feedOrdersSuccess: store.ws.feedOrdersSuccess,
        profileOrdersSuccess: store.ws.profileOrdersSuccess
    }));

    const dispatch = useAppDispatch();

    useEffect((): any => {
        dispatch({type: WS_CONNECTION_START});
        return () => dispatch(wsConnectionClosed());
    }, [dispatch]);

    return (
        ingredientsRequestSuccess && feedOrdersSuccess && <OrderInfo/>
    );
}

export default OrderPage;