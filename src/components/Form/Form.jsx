import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { onContactAdd } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { FormStyle, Label, Input, Button } from './Form.styled';

const initialValues = {
  name: '',
  number: '',
};

export default function Form() {
  const { contactsList } = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const contact = {
      name,
      number,
    };
    const dublicateContact = findDublicate(contact, contactsList);
    dublicateContact
      ? alert(`${contact.name} or ${contact.number} is already in contacts`)
      : dispatch(onContactAdd({ ...values, id: nanoid() }));

    resetForm();
  };

  const findDublicate = (contact, contactsList) => {
    return contactsList.find(
      item =>
        item.name.toLowerCase() === contact.name.toLowerCase() ||
        item.number === contact.number
    );
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <FormStyle autoComplete="on">
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
        </Label>
        <Label htmlFor="number">
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
        </Label>

        <Button type="submit">Add Contact</Button>
      </FormStyle>
    </Formik>
  );
}
