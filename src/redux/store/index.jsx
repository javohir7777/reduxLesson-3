import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import skillReducer from "../slices/skillSlice";
import authReducer from "../slices/authSlice";
import portfolioReducer, {
  portfolioService,
} from "../services/portfolioService";
import userReducer, { user } from "../users/user";

const reducer = {
  skill: skillReducer,
  auth: authReducer,
  portfolio: portfolioReducer,
  user: userReducer,
};

export const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(portfolioService.middleware, user.middleware)
});

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
