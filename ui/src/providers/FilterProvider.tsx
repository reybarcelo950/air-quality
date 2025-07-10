import {INTERVALS, OPERATORS} from "../interfaces/values.types";

import React, {createContext, useContext, useReducer} from 'react';

const SET_PARAMETER = 'SET_PARAMETER';
const SET_DATE_RANGE = 'SET_DATE_RANGE';
const SET_INTERVAL = 'SET_INTERVAL';
const SET_OPERATOR = 'SET_OPERATOR';

const initialState = {
    from: new Date(2004, 2, 1),
    to: new Date(2004, 2, 31),
    parameter: 'CO',
    operator: OPERATORS.AVG,
    interval: INTERVALS.DAILY
};

type FilterContextType = {
    from: Date;
    to: Date;
    filters: any;
    parameter?: string;
    operator?: OPERATORS;
    interval?: INTERVALS;
    setParameter: (param: string) => void;
    setInterval: (interval: INTERVALS) => void;
    setOperator: (interval: OPERATORS) => void;
    setDateRange: (from: Date, to: Date) => void;
};

const FilterContext = createContext<Partial<FilterContextType>>({
    filters: {},
    setParameter: () => {
    },
    setInterval: () => {
    },
    setDateRange: () => {
    },
    setOperator: () => {
    },
});

function filterReducer(state: any, action: any) {
    switch (action.type) {
        case SET_PARAMETER:
            return {...state, parameter: action.payload};
        case SET_DATE_RANGE:
            return {...state, from: action.payload.from, to: action.payload.to};
        case SET_INTERVAL:
            return {...state, interval: action.payload};
        case SET_OPERATOR:
            return {...state, operator: action.payload};
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function FilterProvider({children}: any) {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    const setParameter = (param: string) => dispatch({type: SET_PARAMETER, payload: param});

    const setInterval = (interval: INTERVALS) =>
        dispatch({type: SET_INTERVAL, payload: interval});

    const setDateRange = (from: Date, to: Date) =>
        dispatch({type: SET_DATE_RANGE, payload: {from, to}});

    const setOperator = (operator: OPERATORS) =>
        dispatch({type: SET_OPERATOR, payload: operator});

    return (
        <FilterContext.Provider value={{
            from: state.from,
            to: state.to,
            filters: {from: state.from?.toISOString(), to: state.to?.toISOString()},
            parameter: state.parameter,
            interval: state.interval,
            operator: state.operator,
            setParameter,
            setInterval,
            setOperator,
            setDateRange
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within FilterProvider');
    }
    return context;
}
