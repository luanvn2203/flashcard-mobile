import { createStore, combineReducers, applyMiddleware } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import booksReducer from "../reducers/bookReducer";
import authReducer from "../reducers/authReducer";
import subjectReducer from "../reducers/subject";
import lessionReducer from "../reducers/lession";
import flashcardReducer from "../reducers/flashcardReducer";
import quizReducer from "../reducers/quiz";
import submitQuizReducer from "../reducers/submitQuiz";




const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["accessToken", "currentUser"], //user sau nay
};

const rootReducer = combineReducers({
  booksReducer: persistReducer(persistConfig, booksReducer),
  authReducer: persistReducer(persistConfig, authReducer),
  subjectReducer: persistReducer(persistConfig, subjectReducer),
  lessionReducer: persistReducer(persistConfig, lessionReducer),
  flashcardReducer: persistReducer(persistConfig, flashcardReducer),
  quizReducer: persistReducer(persistConfig, quizReducer),
  submitQuizReducer: persistReducer(persistConfig, submitQuizReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
