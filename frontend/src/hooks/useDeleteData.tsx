import { useReducer } from 'react';
import { IStorePost } from '../interfaces/Post';
import axios from '../services/axios';

enum Actions {
  LOADING,
  DELETE_DATA,
  ERROR,
}

interface IActions {
  type: Actions;
  payload?: any;
}

const deleteReducer = (state: any, action: IActions) => {
  switch (action.type) {
    case Actions.LOADING:
      return { ...state, loading: true, error: null };
    case Actions.DELETE_DATA:
      return { ...state, loading: false, error: null };
    case Actions.ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteData = () => {
  const [response, dispatch] = useReducer(deleteReducer, {
    loading: null,
    error: null,
  });

  const deleteData = async (url: string, id: string | undefined) => {
    dispatch({ type: Actions.LOADING });
    try {
      const deletedData = await axios.delete(url + '/' + id);

      dispatch({
        type: Actions.DELETE_DATA,
        payload: deletedData,
      });
    } catch (error) {
      dispatch({ type: Actions.ERROR, payload: error });
    }
  };

  return { deleteData, response };
};
