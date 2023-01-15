import { Item, Name, Number, Button } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { onDeleteContact } from 'redux/contactsSlice';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(onDeleteContact(id));

  return (
    <Item>
      <Name>
        {name}: <Number>{number}</Number>
      </Name>
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
    </Item>
  );
}
