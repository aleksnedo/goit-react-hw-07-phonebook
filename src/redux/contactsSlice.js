import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsInitialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsList: contactsInitialState,
  },
  reducers: {
    onContactAdd(state, action) {
      state.contactsList.push(action.payload);
    },
    onDeleteContact(state, action) {
      state.contactsList = state.contactsList.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { onContactAdd, onDeleteContact } = contactsSlice.actions;
