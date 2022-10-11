import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../src/store';
import { decrement, increment } from './store/slicers/counter.slice';
import { useGetPokemonByNameQuery } from '../src/services/pokemon.service';
import { fetchUser } from './store/slicers/users.slice';

function App() {
  // const { data, isLoading, error } = useGetPokemonByNameQuery('charmander');
  const count = useSelector((state: RootState) => state.count.value);
  const pokemon = useSelector((state: RootState) => state.pokemonApi.queries);
  const {
    data: userState,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   console.log('****', data, isLoading, error);
  //   console.log('POKEMON', pokemon);
  // }, [data, isLoading, error, pokemon]);

  useEffect(() => {
    console.log('USERSTATE', userState);
  }, [userState]);

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <button aria-label='Fetch Users' onClick={() => dispatch(fetchUser())}>
        Fetch Users
      </button>
      <div>
        {loading && <span>Loading...</span>}
        {error.length && <span>{error}</span>}
        {userState &&
          userState.results.map((el) => (
            <span>{el.name.first + el.name.last}</span>
          ))}
      </div>
    </div>
  );
}

export default App;
