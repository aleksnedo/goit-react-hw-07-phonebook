import { List, Item, Name, Number, Button } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { onDeleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

export default function ContactList() {
  const dispatch = useDispatch();
  const { contactsList } = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contactsList.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDelete = contactId => {
    dispatch(onDeleteContact(contactId));
  };

  const filterContacts = getFilterContacts();

  return (
    <List>
      {filterContacts.length === 0 && <p>There is not any contacts</p>}
      {filterContacts.map(({ id, name, number }) => {
        return (
          <Item key={id}>
            <Name>
              {name}: <Number>{number}</Number>
            </Name>
            <Button type="button" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </Item>
        );
      })}
    </List>
  );
}
