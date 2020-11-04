import { TOGGLE_PRELOADER, SET_INPUT_VALUE, SET_SALE_VALUE, SET_ANSWER } from './actions'

const initialState = {
  loading: false,
  inputValue: '',
  saleValue: '',
  answer: '',
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_PRELOADER:
      return { ...state, loading: !state.loading };
    case SET_INPUT_VALUE:
      return { ...state, inputValue: payload };
    case SET_SALE_VALUE:
      return { ...state, saleValue: payload };
    case SET_ANSWER:
      return { ...state, answer: payload };
    default:
      return { ...state }
  }
}

export default reducer;