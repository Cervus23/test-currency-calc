import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Preloader from '../../components/Preloader';
import { togglePreloader, setInputValue, setSaleValue, setAnswer } from '../../store/actions';
import axios from 'axios';
import './style.css';

const FinalForm = ({
  loading,
  saleValue,
  inputValue,
  answer,
  togglePreloader,
  setAnswer,
  setInputValue,
  setSaleValue,
}) => {
  const onSubmit = ({ input }) => {
    (async () => {
      togglePreloader();

      const result = await axios(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3',
      );
      const sales = +parseFloat(result.data[2].sale).toFixed(2);

      togglePreloader();

      const answerResult = +parseFloat((input / sales).toFixed(2));

      setAnswer(answerResult);
      setInputValue(input);
      setSaleValue(sales);
    })();
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.input) {
          errors.input = 'Это поле обязательное';
        } else if (!/\d+/.test(values.input)) {
          errors.input = 'Введите сумму в гривнах';
        }

        return errors;
      }}
      render={({ handleSubmit }) => (
        <div>
          {loading && <Preloader />}

          <form onSubmit={handleSubmit} className='form'>
            <div>
              <Field name='input'>
                {({ input, meta }) => {
                  return (
                    <div className='form-content'>
                      <div className='field-content'>
                        <label htmlFor='input' className='form-title'>
                          Калькулятор
                        </label>
                        <input
                          {...input}
                          type='number'
                          min='0'
                          placeholder='Сумма, грн'
                          className={`currency-input ${
                            meta.error && meta.touched ? 'input-error' : null
                          }`}
                        />
                      </div>
                      <div className='error'>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                      {answer && (
                        <div className='answer'>
                          <strong>{inputValue} грн</strong> по курсу
                          <strong> {saleValue}$</strong> это{' '}
                          <strong>{answer}$</strong>
                        </div>
                      )}
                    </div>
                  );
                }}
              </Field>
            </div>
            <button type='submit' className='btn-submit'>
              Посчитать
            </button>
          </form>
        </div>
      )}
    />
  );
};

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