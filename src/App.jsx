import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import { Container, Typography, Button } from '@mui/material';
import './styles.css';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [showContacts, setShowContacts] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    // useEffect(() => {
    //     fetchContacts();
    // }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const addContact = async (contact) => {
        try {
            const payload = {
                first_name: contact.firstName,
                last_name: contact.lastName,
                email: contact.email,
                phone_number: contact.phone,
                company: contact.company,
                job_title: contact.jobTitle,
            };
            const response = await axios.post('http://localhost:5000/contacts', payload);
            setContacts([...contacts, response.data]);
        } catch (error) {
            console.error('Error adding contact:', error.response?.data || error.message);
        }
    };

    const editContact = async (updatedContact) => {
        try {
            const payload = {
                first_name: updatedContact.firstName,
                last_name: updatedContact.lastName,
                email: updatedContact.email,
                phone_number: updatedContact.phone,
                company: updatedContact.company,
                job_title: updatedContact.jobTitle,
            };
            const response = await axios.put(`http://localhost:5000/contacts/${updatedContact.id}`, payload);
            setContacts(
                contacts.map((contact) =>
                    contact.id === updatedContact.id ? response.data : contact
                )
            );
            setEditingContact(null); // Exiting editing mode
        } catch (error) {
            console.error('Error editing contact:', error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/contacts/${id}`);
            setContacts(contacts.filter((contact) => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div className="app-container">
            <Container>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        marginTop:'200px',
                        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: '#FBD288',
                        },
                    }}
                >
                    Contacts
                </Typography>

                {!editingContact && <ContactForm addContact={addContact} />}
                {editingContact && (
                    <ContactForm
                        contact={editingContact}
                        saveContact={(updatedContact) => editContact(updatedContact)}
                        cancelEdit={() => setEditingContact(null)}
                    />
                )}

                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                                transform: 'scale(1.05)',
                            },
                        }}
                        onClick={() => {setShowContacts(!showContacts);
                            if(!showContacts){
                                fetchContacts();
                            }
                        }}
                    >
                        {showContacts ? 'Hide Contacts' : 'View Contacts'}
                    </Button>
                </div>

                <div style={{ minHeight: '300px', marginTop: '20px' }}>
                    {showContacts && (
                        <ContactsTable
                            contacts={contacts}
                            deleteContact={deleteContact}
                            editContact={(contact) => setEditingContact(contact)}
                        />
                    )}
                </div>
            </Container>
        </div>
    );
};

export default App;
