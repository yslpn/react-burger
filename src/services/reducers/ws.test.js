import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_GET_FEED_ORDERS
} from '../actions/ws';
import { wsReducer } from './ws';

describe('wsReducer', () => {
    it('Should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual({
            wsConnected: false,
            getOrdersSuccess: false,
            feedOrders: [],
            profileOrders: [],
            total: null,
            totalToday: null,
        })
    });

    it('Should return a flag when connecting webSockets', () => {
        expect(wsReducer({
            wsConnected: false,
            getOrdersSuccess: false,
            feedOrders: [],
            profileOrders: [],
            total: null,
            totalToday: null,
        }, {
            type: WS_CONNECTION_SUCCESS
        }
        )).toEqual({
            wsConnected: true,
            getOrdersSuccess: false,
            feedOrders: [],
            profileOrders: [],
            total: null,
            totalToday: null,
        })
    });

    it('Should return initialState if an error occurred during the request', () => {
        expect(wsReducer({
            wsConnected: true,
            getOrdersSuccess: false,
            feedOrders: [],
            profileOrders: [],
            total: null,
            totalToday: null,
        }, {
            type: WS_CONNECTION_ERROR
        }
        )).toEqual({
            initialState: {
                wsConnected: false,
                getOrdersSuccess: false,
                feedOrders: [],
                profileOrders: [],
                total: null,
                totalToday: null,
            }
        })
    });

    it('Should close the connection and clear the state', () => {
        expect(wsReducer({
            wsConnected: true,
            getOrdersSuccess: false,
            feedOrders: [],
            profileOrders: [],
            total: null,
            totalToday: null,
        },
            {
                type: WS_CONNECTION_CLOSED
            }
        )).toEqual({
            wsConnected: false,
            getOrdersSuccess: false,
            feedOrders: [],
            profileOrders: [],
            total: null,
            totalToday: null,
        })
    });

    it('Should save data for order feed', () => {
        expect(wsReducer({
            wsConnected: true,
            getOrdersSuccess: false,
            feedOrders: [],
            profileOrders: [],
            total: null,
            totalToday: null,
        },
            {
                type: WS_CONNECTION_GET_FEED_ORDERS,
                payload: {
                    orders: [
                        {
                            _id: '614bac4bdab0f3001bb077c7',
                            ingredients: [
                              '60d3b41abdacab0026a733c7',
                              '60d3b41abdacab0026a733cd'
                            ],
                            status: 'done',
                            name: 'Space флюоресцентный бургер',
                            createdAt: '2021-09-22T22:20:59.132Z',
                            updatedAt: '2021-09-22T22:20:59.252Z',
                            number: 3802
                        },
                        {
                            _id: '614bab5edab0f3001bb077c0',
                            ingredients: [
                              '60d3b41abdacab0026a733c7',
                              '60d3b41abdacab0026a733c7'
                            ],
                            status: 'done',
                            name: 'Флюоресцентный бургер',
                            createdAt: '2021-09-22T22:17:02.966Z',
                            updatedAt: '2021-09-22T22:17:03.086Z',
                            number: 3801
                        }
                    ],
                    total: 2500,
                    totalToday: 25,
                }
            })).toEqual({
                wsConnected: true,
                getOrdersSuccess: true,
                feedOrders: [
                    {
                        _id: '614bac4bdab0f3001bb077c7',
                        ingredients: [
                          '60d3b41abdacab0026a733c7',
                          '60d3b41abdacab0026a733cd'
                        ],
                        status: 'done',
                        name: 'Space флюоресцентный бургер',
                        createdAt: '2021-09-22T22:20:59.132Z',
                        updatedAt: '2021-09-22T22:20:59.252Z',
                        number: 3802
                    },
                    {
                        _id: '614bab5edab0f3001bb077c0',
                        ingredients: [
                          '60d3b41abdacab0026a733c7',
                          '60d3b41abdacab0026a733c7'
                        ],
                        status: 'done',
                        name: 'Флюоресцентный бургер',
                        createdAt: '2021-09-22T22:17:02.966Z',
                        updatedAt: '2021-09-22T22:17:03.086Z',
                        number: 3801
                    }
                ],
                profileOrders: [],
                total: 2500,
                totalToday: 25,
            })
    });
})