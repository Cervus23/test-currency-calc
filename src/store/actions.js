export const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER';
export const SET_INPUT_VALUE = 'SET_INPUT';
export const SET_SALE_VALUE = 'SET_SALE_VALUE';
export const SET_ANSWER = 'SET_ANSWER';

export const togglePreloader = () => ({ type: TOGGLE_PRELOADER });
export const setInputValue = (payload) => ({ type: SET_INPUT_VALUE, payload });
export const setSaleValue = (payload) => ({ type: SET_SALE_VALUE, payload });
export const setAnswer = (payload) => ({ type: SET_ANSWER, payload });