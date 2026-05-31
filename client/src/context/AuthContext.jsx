import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const token = action.payload.token;
      localStorage.setItem('token', token)
      return {...state, user: action.payload.user, token: token, isAuthenticated: true, isLoading: false};
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {...state, user: null, token: null, isAuthenticated: false, isLoading: false};
    case 'STOP_LOADING':
      return {...state, isLoading: false};
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({type: 'LOGIN_SUCCESS', payload: {token}});
    }
    else {
      dispatch({type: 'LOGOUT'});
    }
    dispatch({type: 'STOP_LOADING'});
  }, []);

  const login = (token, user) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
};
