import { useParams } from 'react-router-dom'; // Add this import
import React, { useState, useEffect, useRef } from 'react';
import Echo from 'laravel-echo';
import axios from 'axios';
import { getToken, getUserInfo } from '../services/auth'; // Ensure getUserInfo is available

const Chat = ({ selectedContactId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [userId, setUserId] = useState(null); // Track current user ID
    const scrollRef = useRef();

    // 0. Get Current User Info
    useEffect(() => {
        const initUser = async () => {
            const user = await getUserInfo();
            if (user) setUserId(user.id);
        };
        initUser();
    }, []);

    // 1. Setup Echo Listener
    useEffect(() => {
        if (!conversationId) return;

        const echo = new Echo({
            broadcaster: 'reverb', 
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            forceTLS: false,
            enabledTransports: ['ws', 'wss'],
            authorizer: (channel) => ({
                authorize: (socketId, callback) => {
                    axios.post('/api/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    }, { headers: { Authorization: `Bearer ${getToken()}` } })
                    .then(res => callback(false, res.data))
                    .catch(err => callback(true, err));
                }
            }),
        });

        const channel = echo.private(`chat.${conversationId}`);
        
        channel.listen('MessageSent', (e) => {
            setMessages(prev => [...prev, e.message]);
            // Send "Seen" status back if we are the receiver
            if (e.message.sender_id !== userId) {
                markSeenApi(conversationId);
            }
        })
        .listen('ChatSeen', (e) => {
            // Update all outgoing messages to "Seen"
            setMessages(prev => prev.map(m => ({ ...m, is_read: true })));
        });

        return () => echo.leave(`chat.${conversationId}`);
    }, [conversationId, userId]);

    // 2. Fetch Messages and Set Conversation ID
    useEffect(() => {
        if (selectedContactId) {
            axios.get(`/api/chat/messages/${selectedContactId}`).then(res => {
                setMessages(res.data.messages);
                setConversationId(res.data.conversation_id);
                // Mark conversation as seen upon opening
                if (res.data.conversation_id) {
                    markSeenApi(res.data.conversation_id);
                }
            });
        }
    }, [selectedContactId]);

    // 3. Auto-scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post('/api/chat/send', {
                receiver_id: selectedContactId,
                text: newMessage
            });
            // Res.data should be the message object from MessageController@sendMessage
            setMessages(prev => [...prev, res.data]);
            setNewMessage("");
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    const markSeenApi = (id) => axios.post('/api/chat/seen', { conversation_id: id });

    return (
        <div className="chat-container card-box" style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
            <div className="chat-body customscroll" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {messages.map((m, i) => (
                    <div key={i} className={`mb-3 d-flex flex-column ${m.sender_id === userId ? 'align-items-end' : 'align-items-start'}`}>
                        <div className={`p-2 rounded ${m.sender_id === userId ? 'bg-primary text-white' : 'bg-light text-dark'}`} style={{ maxWidth: '75%' }}>
                            <p className="mb-0">{m.message}</p>
                        </div>
                        <small className="text-muted" style={{ fontSize: '10px' }}>
                            {m.sender_id === userId && (
                                <span>{m.is_read ? "✓✓ Seen" : "✓ Delivered"}</span>
                            )}
                        </small>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>
            <form onSubmit={handleSend} className="chat-footer d-flex p-3 border-top">
                <input 
                    className="form-control" 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    placeholder="Type a message..."
                />
                <button className="btn btn-primary ml-2">Send</button>
            </form>
        </div>
    );
};

export default Chat;