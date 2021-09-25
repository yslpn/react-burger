import { getCookie } from "../../utils/cookie";

export const wsMiddleware = (url: string, actions: any, token: boolean = false) => {
    return store => {

        let socket = null;

        return next => (action) => {
            const { dispatch } = store;

            const { type, payload } = action;

            const {
                wsInit,
                wsInitProfile,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                getFeedOrders,
                getProfileOrders
            } = actions;

            const accessToken = getCookie('token')?.split('Bearer ')[1];

            if (type === wsInitProfile && accessToken && token) {
                socket = new WebSocket(`${url}?token=${accessToken}`);
            }
            if (type === wsInit && !token) {
                socket = new WebSocket(`${url}`);
            }
            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event });
                }

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                }

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    if (token) {
                        dispatch({
                            type: getProfileOrders,
                            payload: restParsedData
                        });
                    }
                    if (!token) {
                        dispatch({
                            type: getFeedOrders,
                            payload: restParsedData
                        });
                    }
                }

                socket.onclose = (event) => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage && accessToken) {
                    const message = { payload, token: accessToken };
                    socket.send(JSON.stringify(message))
                }
            }

            next(action);
        }
    }
}