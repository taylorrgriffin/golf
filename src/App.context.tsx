import React, { Dispatch } from 'react';
import produce from 'immer';
import { IPlayer } from './intefaces/IPlayer';

type AppContextState = {
  user: IPlayer | null;
};

type AppContextType = {
  dispatch: Dispatch<AppContextAction>;
  state: AppContextState;
};

const AppContext = React.createContext({} as AppContextType);

type AppContextAction = SetUserAction;

type SetUserAction = {
  type: 'setUser';
  payload: {
    user: AppContextState['user'];
  };
};

function appReducer(state: AppContextState, action: AppContextAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'setUser':
        draft.user = action.payload.user;
        return;
      default:
        return state;
    }
  });
}

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(appReducer, {
    user: null
  });
  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return React.useContext(AppContext);
};
