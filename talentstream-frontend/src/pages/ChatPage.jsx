import React, { useState, useEffect } from 'react';
import Master from './Master';
import Chat from './Chat';
import { api } from '../services/auth';

const ChatPage = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [loading, setLoading] = useState(true);

    // MUST be declared before useEffect
    const fetchContacts = async () => {
        try {
            const res = await api.get('/chat/contacts');
            console.log('Contacts API Response:', res.data);
            setContacts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error('Error fetching contacts', err);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <Master>
            <div className="container-fluid p-0">
                <div className="row no-gutters" style={{ height: 'calc(100vh - 150px)' }}>
                    
                    {/* CONTACT LIST */}
                    <div className="col-md-4 border-right bg-white overflow-auto">
                        <div className="p-3 border-bottom">
                            <h5 className="mb-0">Messages</h5>
                        </div>

                        <ul className="list-group list-group-flush">
                            {loading && (
                                <li className="p-3 text-center">Loading...</li>
                            )}

                            {!loading && contacts.length === 0 && (
                                <li className="p-3 text-center">No contacts found</li>
                            )}

                            {!loading && contacts.map(contact => (
                                <li
                                    key={contact.id}
                                    onClick={() => setSelectedContact(contact)}
                                    className={`list-group-item list-group-item-action border-bottom ${
                                        selectedContact?.id === contact.id ? 'bg-light' : ''
                                    }`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="mb-0">{contact.name}</h6>
                                            <small
                                                className="text-muted text-truncate d-block"
                                                style={{ maxWidth: '200px' }}
                                            >
                                                {contact.last_message || 'Start a conversation'}
                                            </small>
                                        </div>

                                        {contact.unread_count > 0 && (
                                            <span className="badge badge-primary badge-pill">
                                                {contact.unread_count}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CHAT WINDOW */}
                    <div className="col-md-8 bg-light d-flex flex-column">
                        {selectedContact ? (
                            <>
                                <div className="p-3 bg-white border-bottom shadow-sm">
                                    <h6 className="mb-0">
                                        Chatting with: {selectedContact.name}
                                    </h6>
                                </div>

                                <div className="flex-grow-1 overflow-hidden">
                                    <Chat selectedContactId={selectedContact.id} />
                                </div>
                            </>
                        ) : (
                            <div className="m-auto text-center">
                                <p className="text-muted">
                                    Select a contact to start messaging
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default ChatPage;
