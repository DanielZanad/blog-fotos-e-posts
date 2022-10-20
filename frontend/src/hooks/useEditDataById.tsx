import { useReducer } from 'react';
import { IEditPost, IStorePost } from '../interfaces/Post';
import axios from '../services/axios';

enum Actions {
  LOADING,
  EDIT_DATA,
  ERROR,
}

interface IActions {
  type: Actions;
  payload?: any;
}

const editReducer = (state: any, action: IActions) => {
  switch (action.type) {
    case Actions.LOADING:
      return { ...state, loading: true, error: null };
    case Actions.EDIT_DATA:
      return { ...state, loading: false, error: null };
    case Actions.ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useEditDataById = () => {
  const [response, dispatch] = useReducer(editReducer, {
    loading: null,
    error: null,
  });

  const editData = async (url: string, id: string | undefined, data: IEditPost) => {
    dispatch({ type: Actions.LOADING });

    try {
      const editedData = await axios.put(`${url}/${id}`, data);

      dispatch({
        type: Actions.EDIT_DATA,
        payload: editedData,
      });
    } catch (error) {
      dispatch({ type: Actions.ERROR, payload: error });
    }
  };
  return { editData, response };
};
