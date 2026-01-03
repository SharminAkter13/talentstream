import React, { useState, useEffect } from 'react';
import Master from './Master';
import Chat from './Chat'; // This is your existing Chat component
import { api } from '../services/auth'; // Ensure you use 'api'

const ChatPage = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);


const fetchContacts = async () => {
    try {
        // Change 'axios.get' to 'api.get'
        // Also ensure the path starts with /api/
        const res = await api.get('/chat/contacts'); 
        
        // Handle different possible data structures from Laravel
        const contactData = Array.isArray(res.data) ? res.data : (res.data.contacts || res.data.data || []);
        
        setContacts(contactData);
        setLoading(false);
    } catch (err) {
        console.error("Error fetching contacts", err);
        setContacts([]); 
        setLoading(false);
    }
};
return (
        <Master>
            <div className="container-fluid p-0">
                <div className="row no-gutters" style={{ height: 'calc(100vh - 150px)' }}>
                    {/* LEFT SIDE: CONTACT LIST */}
                    <div className="col-md-4 border-right bg-white overflow-auto">
                        <div className="p-3 border-bottom">
                            <h5 className="mb-0">Messages</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {loading ? <li className="p-3 text-center">Loading...</li> : 
                             contacts.length === 0 ? <li className="p-3 text-center">No contacts found</li> :
                             contacts.map(contact => (
                                <li 
                                    key={contact.id} 
                                    onClick={() => setSelectedContact(contact)}
                                    className={`list-group-item list-group-item-action border-bottom ${selectedContact?.id === contact.id ? 'bg-light' : ''}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="mb-0">{contact.name}</h6>
                                            <small className="text-muted text-truncate d-block" style={{maxWidth: '200px'}}>
                                                {contact.last_message ? contact.last_message.message : "Start a conversation"}
                                            </small>
                                        </div>
                                        {contact.unread_count > 0 && (
                                            <span className="badge badge-primary badge-pill">{contact.unread_count}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT SIDE: CHAT WINDOW */}
                    <div className="col-md-8 bg-light d-flex flex-column">
                        {selectedContact ? (
                            <>
                                <div className="p-3 bg-white border-bottom shadow-sm">
                                    <h6 className="mb-0">Chatting with: {selectedContact.name}</h6>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                    {/* Pass the ID to your existing Chat component */}
                                    <Chat selectedContactId={selectedContact.id} />
                                </div>
                            </>
                        ) : (
                            <div className="m-auto text-center">
                                <i className="dw dw-chat-3" style={{ fontSize: '50px', color: '#ccc' }}></i>
                                <p className="text-muted mt-2">Select a contact to start messaging</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default ChatPage;