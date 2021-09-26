import {
    OPEN_MODAL,
    LOADING_MODAL,
    CLOSE_MODAL
} from '../actions/modal';
import { modalReducer } from './modal';

describe('modalReducer', () => {
    it('Should return the initial state', () => {
        expect(modalReducer(undefined, {})).toEqual({
            modalIsOpened: false,
            modalIsLoading: false,
            ingredientDetails: {},
            orderDetails: {},
        })
    });

    it('Must load modal', () => {
        expect(modalReducer({
            modalIsOpened: false,
            modalIsLoading: false,
            ingredientDetails: {},
            orderDetails: {},
        }, {
            type: LOADING_MODAL
        })).toEqual({
            modalIsOpened: false,
            modalIsLoading: true,
            ingredientDetails: {},
            orderDetails: {},
        })
    });

    it('Should close the modal window', () => {
        expect(modalReducer({
            modalIsOpened: false,
            modalIsLoading: false,
            ingredientDetails: {
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun'
            },
            orderDetails: {} || undefined,
        }, {
            type: CLOSE_MODAL
        })).toEqual({
            modalIsOpened: false,
            modalIsLoading: false,
            ingredientDetails: {},
            orderDetails: {},
        })
    });

    it('Should open a modal window', () => {
        expect(modalReducer({
            modalIsOpened: false,
            modalIsLoading: false,
            ingredientDetails: {},
            orderDetails: {},
        }, {
            type: OPEN_MODAL,
            ingredientDetails: {
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun'
            }
        })).toEqual({
            modalIsOpened: true,
            modalIsLoading: false,
            orderDetails: undefined,
            ingredientDetails: {
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun'
            }
        })
    });
})