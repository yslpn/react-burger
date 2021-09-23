import {
    ADD_ITEM_TO_ORDER,
    REMOVE_ITEM_FROM_ORDER,
    CLEAR_ORDER_ITEMS,
    ADD_FULL_ORDER_LIST
} from '../actions/order';
import { orderReducer } from './order';

describe('orderReducer', () => {
    it('Should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual({
            orderItems: []
        })
    });

    it('Must add an ingredient to the order', () => {
        expect(orderReducer({
            orderItems: []
        }, {
            type: ADD_ITEM_TO_ORDER,
            orderItems: {
                "_id": "60d3b41abdacab0026a733cd",
                "name": "Соус фирменный Space Sauce",
                "type": "sauce"
            }
        })).toEqual({
            orderItems: [
                {
                    "_id": "60d3b41abdacab0026a733cd",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce"
                }
            ]
        })
    });

    it('Must clear order', () => {
        expect(orderReducer({
            orderItems: [
                {
                    "_id": "60d3b41abdacab0026a733cd",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce"
                }
            ]
        }, {
            type: CLEAR_ORDER_ITEMS
        })).toEqual({
            orderItems: []
        })
    });

    it('Must clean up order and add ingredients list', () => {
        expect(orderReducer({
            orderItems: [
                {
                    "_id": "60d3b41abdacab0026a733cd",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce"
                }, {
                    _id: '60d3b41abdacab0026a733c6',
                    name: 'Краторная булка N-200i',
                    type: 'bun'
                }
            ]
        }, {
            type: ADD_FULL_ORDER_LIST,
            orderItems: [
                {
                    _id: '60d3b41abdacab0026a733c6',
                    name: 'Краторная булка N-200i',
                    type: 'bun'
                },
                {
                    "_id": "60d3b41abdacab0026a733cd",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce"
                }
            ]
        })).toEqual({
            orderItems: [
                {
                    _id: '60d3b41abdacab0026a733c6',
                    name: 'Краторная булка N-200i',
                    type: 'bun'
                },
                {
                    "_id": "60d3b41abdacab0026a733cd",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce"
                }
            ]
        })
    });

    it('Must remove item from order', () => {
        expect(orderReducer({
            orderItems: [{
                _id: '60d3b41abdacab0026a733cd',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce',
            }]
        }, {
            type: REMOVE_ITEM_FROM_ORDER,
            orderItems: {
                _id: '60d3b41abdacab0026a733cd',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce'
            }
        })).toEqual({
            orderItems: [{
                _id: '60d3b41abdacab0026a733cd',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce',
            }]
        })
    });
})