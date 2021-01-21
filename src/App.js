import React, { useReducer } from 'react';
import './App.css';

const initialState = {
  loading: false,
  quote: '',
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetchQuoteStart': 
      return {
        ...state,
        loading: true,
        error: null,
        quote: ''
      }
    case 'fetchQuoteFail':
      return {
        ...state,
        loading: false,
        quote: null,
        error: 'I swear this usually never happens...'
      }
    case 'fetchQuoteSuccess':
      return {
        ...state,
        loading: false,
        quote: action.quote
      }
    default: return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchQuote = () => {
    dispatch({type: 'fetchQuoteStart'});
    setTimeout(() => {
      fetch(`https://api.quotable.io/random`)
        .then(res => res.json())
        .then(data => dispatch({type: 'fetchQuoteSuccess', quote: data.content}))
        .catch(err => dispatch({type: 'fetchQuoteFail'}))
    }, 1000)
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchQuote}>Fetch Quote</button>
        <section>
          { state.loading ? <p>loading....</p> : null }
          { state.quote ? <p>"{state.quote}"</p> : null }
          { state.error ? <p style={{color: 'red'}}>{state.error}</p> : null }
        </section>
      </header>
    </div>
  );
}

export default App;
