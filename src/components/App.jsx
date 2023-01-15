import {
  Container,
  Section,
  MainTitle,
  SecondaryTitle,
  Wrapper,
} from './App.styled';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Form from './Form/Form';

export const App = () => {
  return (
    <Container>
      <Section>
        <MainTitle>Phonebook</MainTitle>
        <Form />
      </Section>

      <Section>
        <SecondaryTitle>Contacts</SecondaryTitle>
        <Wrapper>
          <Filter />
          <ContactList />
        </Wrapper>
      </Section>
    </Container>
  );
};
