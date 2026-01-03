import React, { useState, useEffect, useRef } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { api, getCurrentUser } from '../services/auth';

window.Pusher = Pusher;

const Chat = ({ selectedContactId }) => {
    const [userId] = useState(() => getCurrentUser()?.id || null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const scrollRef = useRef();

    // 1. Fetch Messages when contact changes
    useEffect(() => {
        if (selectedContactId) {
            api.get(`/chat/messages/${selectedContactId}`)
                .then(res => {
                    setMessages(res.data.messages || []);
                    setConversationId(res.data.conversation_id);
                    if (res.data.conversation_id) {
                        api.post('/chat/seen', { conversation_id: res.data.conversation_id });
                    }
                })
                .catch(err => console.error("Could not load messages", err));
        }
    }, [selectedContactId]);

    // 2. Real-time Setup
    useEffect(() => {
        if (!conversationId) return;

        const echo = new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
            wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
            authorizer: (channel) => ({
                authorize: (socketId, callback) => {
                    api.post('/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                    .then(res => callback(false, res.data))
                    .catch(err => callback(true, err));
                }
            }),
        });

        const channel = echo.private(`chat.${conversationId}`);
        
        channel.listen('MessageSent', (e) => {
            if (e.message.sender_id !== userId) {
                setMessages(prev => [...prev, e.message]);
                api.post('/chat/seen', { conversation_id: conversationId });
            }
        }).listen('ChatSeen', () => {
            setMessages(prev => prev.map(m => ({ ...m, is_read: true })));
        });

        return () => echo.leave(`chat.${conversationId}`);
    }, [conversationId, userId]);

    // 3. Auto-scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedContactId) return;

        try {
            const res = await api.post('/chat/send', {
                receiver_id: selectedContactId,
                text: newMessage
            });
            setMessages(prev => [...prev, res.data.message]);
            setNewMessage("");
        } catch (err) {
            console.error("Send error", err);
        }
    };

    return (
        <div className="chat-window d-flex flex-column h-100 bg-white">
            <div className="chat-body p-3 flex-grow-1 overflow-auto">
                {messages.map((m, i) => (
                    <div key={i} className={`mb-3 d-flex flex-column ${m.sender_id === userId ? 'align-items-end' : 'align-items-start'}`}>
                        <div className={`p-2 px-3 rounded shadow-sm ${m.sender_id === userId ? 'bg-primary text-white' : 'bg-light'}`} style={{ maxWidth: '80%', borderRadius: '18px' }}>
                            <p className="mb-0">{m.message}</p>
                        </div>
                        <small className="text-muted mt-1" style={{ fontSize: '10px' }}>
                            {m.sender_id === userId && (m.is_read ? "✓✓ Seen" : "✓ Sent")}
                        </small>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-top bg-light d-flex">
                <input 
                    className="form-control" 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    placeholder="Write a message..."
                />
                <button type="submit" className="btn btn-primary ml-2">
                    <i className="fa fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

// CRITICAL FIX: Add this line to solve the SyntaxError in ChatPage.jsx
export default Chat;