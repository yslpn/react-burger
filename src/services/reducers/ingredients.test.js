import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_COUNTER,
    DECREASE_COUNTER,
    RESET_COUNTER
} from '../actions/ingredients';
import { ingredientsReducer } from './ingredients';

describe('ingredientsReducer', () => {
    it('Should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual({
            ingredientsRequest: false,
            ingredientsRequestSuccess: false,
            ingredientsFailed: false,
            ingredientsData: [],
        })
    });

    it('Should return loading information at the beginning of the request', () => {
        expect(ingredientsReducer({
            ingredientsRequest: false,
            ingredientsRequestSuccess: false,
            ingredientsFailed: false,
            ingredientsData: [],
        }, {
            type: GET_INGREDIENTS,
            ingredientsRequest: true
        })).toEqual({
            ingredientsRequest: true,
            ingredientsRequestSuccess: false,
            ingredientsFailed: false,
            ingredientsData: [],
        })
    });

    it('After loading, must add the incoming ingredients to the array', () => {
        expect(ingredientsReducer({
            ingredientsData: [],
            ingredientsRequest: true,
            ingredientsRequestSuccess: false,
            ingredientsError: false,
            ingredientDetails: null,
        }, {
            type: GET_INGREDIENTS_SUCCESS,
            ingredientsData: [{
                "_id": "60666c42cc7b410027a1a9b1",
                "name": "Краторная булка N-200i",
            },
            {
                "_id": "60666c42cc7b410027a1a9b5",
                "name": "Говяжий метеорит (отбивная)",
            },
            {
                "_id": "60666c42cc7b410027a1a9b6",
                "name": "Биокотлета из марсианской Магнолии",
            }]
        }
        )).toEqual({
            ingredientsData: [
                {
                    "_id": "60666c42cc7b410027a1a9b1",
                    "name": "Краторная булка N-200i",
                },
                {
                    "_id": "60666c42cc7b410027a1a9b5",
                    "name": "Говяжий метеорит (отбивная)",
                },
                {
                    "_id": "60666c42cc7b410027a1a9b6",
                    "name": "Биокотлета из марсианской Магнолии",
                }
            ],
            ingredientsRequest: false,
            ingredientsRequestSuccess: true,
            ingredientsError: false,
            ingredientDetails: null
        })
    });
    it('Should indicate that there was an error when requesting', () => {
        expect(ingredientsReducer({
            ingredientsData: [],
            ingredientsRequest: true,
            ingredientsRequestSuccess: false,
            ingredientsFailed: false,
            ingredientDetails: null,
        },
            {
                type: GET_INGREDIENTS_FAILED,
                ingredientsError: true
            })).toEqual({
                ingredientsData: [],
                ingredientsRequest: false,
                ingredientsRequestSuccess: false,
                ingredientsFailed: true,
                ingredientDetails: null,
            })
    });
    it('Must increment counter', () => {
        expect(ingredientsReducer({
            ingredientsData: [
                {
                    _id: '60d3b41abdacab0026a733cc',
                    name: 'Соус Spicy-X',
                    __v: 0
                }
            ],
            ingredientsRequest: false,
            ingredientsRequestSuccess: true,
            ingredientsError: false,
            ingredientDetails: null,
        },
            {
                type: INCREASE_COUNTER,
                ingredient: 
                    {
                        _id: '60d3b41abdacab0026a733cc',
                        name: 'Соус Spicy-X',
                        __v: 0
                    },
            })).toEqual({
                ingredientsData: [
                    {
                        _id: '60d3b41abdacab0026a733cc',
                        name: 'Соус Spicy-X',
                        __v: 1
                    }
                ],
                ingredientsRequest: false,
                ingredientsRequestSuccess: true,
                ingredientsError: false,
                ingredientDetails: null,
            })
    });
    it('Must decrement counter', () => {
        expect(ingredientsReducer({
            ingredientsData: [
                {
                    _id: '60d3b41abdacab0026a733cc',
                    name: 'Соус Spicy-X',
                    __v: 1
                }
            ],
            ingredientsRequest: false,
            ingredientsRequestSuccess: true,
            ingredientsError: false,
            ingredientDetails: null,
        },
            {
                type: DECREASE_COUNTER,
                ingredient: 
                    {
                        _id: '60d3b41abdacab0026a733cc',
                        name: 'Соус Spicy-X',
                        __v: 1
                    },
            })).toEqual({
                ingredientsData: [
                    {
                        _id: '60d3b41abdacab0026a733cc',
                        name: 'Соус Spicy-X',
                        __v: 0
                    }
                ],
                ingredientsRequest: false,
                ingredientsRequestSuccess: true,
                ingredientsError: false,
                ingredientDetails: null,
            })
    });
    it('Resetting the counter', () => {
        expect(ingredientsReducer({
            ingredientsData: [
                {
                    _id: '60d3b41abdacab0026a733cc',
                    name: 'Соус Spicy-X',
                    __v: 5
                }
            ],
            ingredientsRequest: false,
            ingredientsRequestSuccess: true,
            ingredientsError: false,
            ingredientDetails: null,
        },
            {
                type: RESET_COUNTER
            })).toEqual({
                ingredientsData: [
                    {
                        _id: '60d3b41abdacab0026a733cc',
                        name: 'Соус Spicy-X',
                        __v: 0
                    }
                ],
                ingredientsRequest: false,
                ingredientsRequestSuccess: true,
                ingredientsError: false,
                ingredientDetails: null,
            })
    })
})