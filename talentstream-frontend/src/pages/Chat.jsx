import React, { useState, useEffect, useRef } from 'react';
import Echo from 'laravel-echo';
import axios from 'axios';
import { getToken, getUserInfo } from '../services/auth';

const Chat = ({ selectedContactId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [userId, setUserId] = useState(null);
    const scrollRef = useRef();

    // 1. Get Current User Info
    useEffect(() => {
        const initUser = async () => {
            const user = await getUserInfo();
            if (user) setUserId(user.id);
        };
        initUser();
    }, []);

    // 2. Fetch Messages when contact changes
    useEffect(() => {
        if (selectedContactId) {
            axios.get(`/api/chat/messages/${selectedContactId}`).then(res => {
                setMessages(res.data.messages);
                setConversationId(res.data.conversation_id);
                if (res.data.conversation_id) {
                    markSeenApi(res.data.conversation_id);
                }
            });
        }
    }, [selectedContactId]);

    // 3. Setup Real-time Echo Listener
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
            // Only add if it's not our own message (we add ours locally for speed)
            if (e.message.sender_id !== userId) {
                setMessages(prev => [...prev, e.message]);
                markSeenApi(conversationId);
            }
        })
        .listen('ChatSeen', () => {
            setMessages(prev => prev.map(m => ({ ...m, is_read: true })));
        });

        return () => echo.leave(`chat.${conversationId}`);
    }, [conversationId, userId]);

    // 4. Auto-scroll to bottom
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
            // res.data.message contains the full message object from your PHP controller
            setMessages(prev => [...prev, res.data.message]);
            setNewMessage("");
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    const markSeenApi = (id) => axios.post('/api/chat/seen', { conversation_id: id });

    return (
        <div className="chat-container bg-white" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Message List */}
            <div className="chat-body customscroll" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {messages.map((m, i) => (
                    <div key={i} className={`mb-3 d-flex flex-column ${m.sender_id === userId ? 'align-items-end' : 'align-items-start'}`}>
                        <div 
                            className={`p-2 px-3 rounded shadow-sm ${m.sender_id === userId ? 'bg-primary text-white' : 'bg-light text-dark'}`} 
                            style={{ maxWidth: '75%', borderRadius: '15px' }}
                        >
                            <p className="mb-0">{m.message}</p>
                        </div>
                        <small className="text-muted mt-1" style={{ fontSize: '10px' }}>
                            {m.sender_id === userId && (
                                <span>{m.is_read ? "✓✓ Seen" : "✓ Sent"}</span>
                            )}
                        </small>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="chat-footer d-flex p-3 border-top bg-light">
                <input 
                    className="form-control border-0 shadow-none" 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    placeholder="Type a message..."
                    style={{ background: 'transparent' }}
                />
                <button className="btn btn-primary ml-2 rounded-circle" style={{ width: '40px', height: '40px' }}>
                    <i className="fa fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default Chat;