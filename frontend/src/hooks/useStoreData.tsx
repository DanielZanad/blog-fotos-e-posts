import { useReducer } from 'react';
import { IStorePost } from '../interfaces/Post';
import axios from '../services/axios';

enum Actions {
  LOADING,
  STORE_DATA,
  ERROR,
}

interface IActions {
  type: Actions;
  payload?: any;
}

const storeReducer = (state: any, action: IActions) => {
  switch (action.type) {
    case Actions.LOADING:
      return { ...state, loading: true, error: null };
    case Actions.STORE_DATA:
      return { ...state, loading: false, error: null };
    case Actions.ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useStoreData = () => {
  const [response, dispatch] = useReducer(storeReducer, {
    loading: null,
    error: null,
  });

  const storeData = async (url: string, data: IStorePost) => {
    dispatch({ type: Actions.LOADING });
    console.log(response);

    try {
      const storedData = await axios.post(url, data);

      dispatch({
        type: Actions.STORE_DATA,
        payload: storedData,
      });
    } catch (error) {
      dispatch({ type: Actions.ERROR, payload: error });
    }
  };

  return { storeData, response };
};
