import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

const ContactForm = ({ contact, addContact, saveContact, cancelEdit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                id: contact.id,
                firstName: contact.first_name,
                lastName: contact.last_name,
                email: contact.email,
                phone: contact.phone_number,
                company: contact.company,
                jobTitle: contact.job_title,
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contact) {
            saveContact(formData);
        } else {
            addContact(formData);
        }
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            jobTitle: '',
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                backgroundColor: '#f9f9f9',
                padding: 3,
                borderRadius: 5,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                width: 500, // Fixed width
                height: 500, // Fixed height
                margin: '0 auto', // Horizontal centering
            }}
        >
            {/* Text Fields Container */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flex: 1, // Ensures consistent size
                    width: '100%',
                }}
            >
                <TextField
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="standard"
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="standard"
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="standard"
                />
                <TextField
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="standard"
                />
                <TextField
                    name="company"
                    label="Company"
                    value={formData.company}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="jobTitle"
                    label="Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                />
            </Box>

            {/* Buttons Container */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
                    {contact ? 'Save Changes' : 'Add Contact'}
                </Button>
                {contact && (
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={cancelEdit}
                        sx={{
                            padding: '10px 20px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        }}
                    >
                        Cancel
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ContactForm;
