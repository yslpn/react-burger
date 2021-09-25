import OrderInfo from "components/order-info/order-info";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
    WS_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/ws';
import { FC } from "react";
import { AppDispatch, RootState } from "index";

const OrderPage: FC = () => {
    const { ingredientsRequestSuccess, feedOrdersSuccess, profileOrdersSuccess  } = useSelector((store: RootState) => ({
        ingredientsRequestSuccess: store.ingredients.ingredientsRequestSuccess,
        
        // @ts-ignore
        feedOrdersSuccess: store.ws.feedOrdersSuccess,
        // @ts-ignore
        profileOrdersSuccess: store.ws.profileOrdersSuccess
    }));

    const dispatch = useDispatch<AppDispatch>();

    useEffect((): any => {
        dispatch({type: WS_CONNECTION_START});
        return () => dispatch(wsConnectionClosed());
    }, [dispatch]);

    return (
        ingredientsRequestSuccess && feedOrdersSuccess && <OrderInfo/>
    );
}

export default OrderPage;