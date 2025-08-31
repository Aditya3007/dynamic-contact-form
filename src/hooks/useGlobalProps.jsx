import React from 'react'
import { useSelector } from 'react-redux'

const useGlobalProps = () => {
    const value = useSelector(state => state?.globalProps);
    return value;
}

export default useGlobalProps;