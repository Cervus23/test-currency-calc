import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Preloader from '../Preloader/index';
import { togglePreloader, setInputValue, setSaleValue, setAnswer } from '../../store/actions';
import axios from 'axios';
import './style.css';

const FinalForm = 
({
  loading, 
  saleValue, 
  inputValue, 
  answer, 
  togglePreloader, 
  setAnswer, 
  setInputValue, 
  setSaleValue
}) => {

  useEffect(() => {
    if (saleValue) {
      const result = +parseFloat((inputValue / saleValue).toFixed(2))
      setAnswer(result)
    }
  }, [inputValue, saleValue, setAnswer])

  const fetchSaleValue = async () => {
    togglePreloader();
    const result = await axios(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    );
    const sales = +result.data[0].sale * 1
    setSaleValue(sales)
    togglePreloader();
  }
  const onSubmit = values => {
    fetchSaleValue()
    const matched = Array.from(values.input.matchAll(/\d+[,.]\d+|\d+/g));
    const result = matched.length ? +parseFloat(matched[0][0]
    .replace(",", ".")).toFixed(2) 
    : null;
    setInputValue(result)
  }
  return (
    <Form 
      onSubmit={onSubmit} 
      validate={values => {
        const errors = {};

        if(!values.input) {
          errors.input = 'Это поле обязательное'
        }

        else if(!/\d+/.test(values.input)) {
          errors.input = 'Введите сумму в гривнах'
        }

        return errors
      }}
      render={({handleSubmit}) => (
        <div>
          {(loading ? <Preloader /> : null)}

          <form onSubmit={handleSubmit} className="form">
          <div>
            <Field name="input">
              
              {({ input, meta }) => {
                return (
                  <div className="form-content">
                    <div className="field-content">
                      <label htmlFor="input" className="form-title">
                        Калькулятор
                      </label>
                      <input
                        {... input}
                        type="text"
                        placeholder="Сумма, грн"
                        className={`currency-input ${meta.error && meta.touched ? 'input-error' : null}`}
                      />
                    </div>
                    <div className="error">
                      {meta.error &&
                        meta.touched && (
                          <span>{meta.error}</span>
                        )}
                    </div>
                    {(answer ? 
                      <div className="answer">
                        <strong>{inputValue} грн</strong> по курсу 
                        <strong> {saleValue}$</strong> это <strong>{answer}$</strong>
                      </div> 
                    : null
                    )}
                    
                  </div>
                )
              }}
            </Field>
          </div>
          <button type="submit"  className="btn-submit">
            Посчитать
          </button>
        </form>
        </div>
        
      )}
    />
  )
}

const mapStateToProps = ({
  loading,
  inputValue,
  saleValue,
  answer
}) => {
  return {
  loading,
  inputValue,
  saleValue,
  answer
}}

const mapDispatchToProps = (dispatch) => ({
  togglePreloader: () => dispatch(togglePreloader()),
  setInputValue: (inputValue) => {
    dispatch(setInputValue(inputValue))
  },
  setSaleValue: (saleValue) => {
    dispatch(setSaleValue(saleValue))
  },
  setAnswer: (answer) => {
    dispatch(setAnswer(answer))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FinalForm)