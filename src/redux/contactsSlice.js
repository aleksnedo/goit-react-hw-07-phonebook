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

// const contactsInitialState = { items: [] };

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: contactsInitialState,
//   reducers: {
//     onContactAdd: {
//       reducer(state, action) {
//         state.items.push(action.payload);
//       },
//       prepare(contact) {
//         return {
//           payload: {
//             name: contact.name,
//             number: contact.number,
//             id: nanoid(),
//           },
//         };
//       },
//     },
//     onDeleteContact(state, action) {
//       const index = state.items.findIndex(
//         contact => contact.id === action.payload
//       );
//       state.items.splice(index, 1);
//     },
//   },
// });
// const persistConfig = {
//   key: 'contacts',
//   storage,
// };

// export const { onContactAdd, onDeleteContact } = contactSlice.actions;

// export const contactsReducer = persistReducer(
//   persistConfig,
//   contactSlice.reducer
// );
