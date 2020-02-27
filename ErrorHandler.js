import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { actionTypes } from './store/actions/index';

const ErrorHandler = () => {
    const alerts = useSelector(state => state.alerts);
    const dispatch = useDispatch();


    useEffect(() => {
        if (alerts.length !== 0) {
            alerts.forEach(alert => {
                showMessage({
                    message: alert.name,
                    description: alert.message,
                    type: alert.type,
                });
                dispatch({
                    type: actionTypes.REMOVE_ALERT,
                    payload: alert.id,
                });
            });
        }
    });

    return null;
}

export default ErrorHandler
