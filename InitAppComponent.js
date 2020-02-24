import React from 'react';
import { init } from './store/actions/index';
import { useDispatch } from 'react-redux';

const InitAppComponent = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(init());
    }, []);

    return null;
}

export default InitAppComponent
