import { nanoid } from 'nanoid';

// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onContactAdd } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { FormStyle, Label, Input, Button } from './Form.styled';

const initialValues = {
  name: '',
  number: '',
};

export default function Form() {
  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');
  const { contacts } = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const dublicateContact = findDublicate(contact, contacts);
    dublicateContact
      ? alert(`${contact.name} or ${contact.number} is already in contacts`)
      : dispatch(onContactAdd({ ...values, id: nanoid() }));

    resetForm();
  };

  const findDublicate = (contact, contacts) => {
    return contacts.find(
      item =>
        item.name.toLowerCase() === contact.name.toLowerCase() ||
        item.number === contact.number
    );
  };

  return (
    <FormStyle onSubmit={handleSubmit} initialValues={initialValues}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          // value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          // onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          // value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          // onChange={handleChange}
        />
      </Label>

      <Button type="submit">Add Contact</Button>
    </FormStyle>
  );
}
