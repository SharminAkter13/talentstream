import React, { useState, useEffect, useRef } from 'react';
import { api, getCurrentUser } from '../services/auth';

const Chat = ({ selectedContactId }) => {
    const userId = getCurrentUser()?.id ?? null;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef(null);
    const pollRef = useRef(null);

    /* ===============================
       1. LOAD MESSAGES WHEN CONTACT CHANGES
    =============================== */
    useEffect(() => {
        if (!selectedContactId) return;

        setMessages(() => []);
        setConversationId(() => null);
        setLoading(() => true);

        api.get(`/chat/messages/${selectedContactId}`)
            .then(res => {
                setMessages(() => Array.isArray(res.data?.messages) ? res.data.messages : []);
                setConversationId(() => res.data?.conversation_id ?? null);

                if (res.data?.conversation_id) {
                    api.post('/chat/seen', { conversation_id: res.data.conversation_id });
                }
            })
            .catch(err => {
                console.error('Load messages error', err);
                setMessages(() => []);
                setConversationId(() => null);
            })
            .finally(() => setLoading(() => false));
    }, [selectedContactId]);

    /* ===============================
       2. POLLING (FETCH NEW MESSAGES)
    =============================== */
    useEffect(() => {
        if (!conversationId) return;

        pollRef.current = setInterval(() => {
            api.get(`/chat/messages/${selectedContactId}`)
                .then(res => {
                    if (!Array.isArray(res.data?.messages)) return;

                    setMessages(prev => {
                        const existingIds = new Set(prev.map(m => m.id));
                        const incoming = res.data.messages.filter(m => !existingIds.has(m.id));
                        return [...prev, ...incoming];
                    });
                })
                .catch(() => {});
        }, 5000);

        return () => clearInterval(pollRef.current);
    }, [conversationId, selectedContactId]);

    /* ===============================
       3. AUTO SCROLL
    =============================== */
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /* ===============================
       4. SEND MESSAGE
    =============================== */
    const handleSend = async e => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedContactId) return;

        try {
            const res = await api.post('/chat/send', {
                receiver_id: selectedContactId,
                text: newMessage
            });

            if (res.data?.message) {
                setMessages(prev => [...prev, res.data.message]);

                if (!conversationId && res.data.message.conversation_id) {
                    setConversationId(res.data.message.conversation_id);
                }

                setNewMessage('');
            }
        } catch (err) {
            console.error('Send error', err.response?.data || err.message);
        }
    };

    /* ===============================
       5. DELETE MESSAGE
    =============================== */
    const handleDelete = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            await api.delete(`/chat/messages/${messageId}`);
            setMessages(prev => prev.filter(m => m.id !== messageId));
        } catch (err) {
            console.error('Delete error', err.response?.data || err.message);
            alert('Failed to delete message');
        }
    };

    /* ===============================
       6. RENDER
    =============================== */
    return (
        <div className="chat-window d-flex flex-column h-100 bg-white">
            <div className="chat-body p-3 flex-grow-1 overflow-auto">
                {loading && <p className="text-center text-muted">Loading...</p>}

                {!loading && messages.length === 0 && (
                    <p className="text-center text-muted">No messages yet</p>
                )}

                {messages.map((m, i) => {
                    const isMine = m.sender_id === userId;

                    return (
                        <div
                            key={m.id ?? i}
                            className={`mb-3 d-flex flex-column ${isMine ? 'align-items-end' : 'align-items-start'}`}
                        >
                            <div
                                className={`p-2 px-3 rounded shadow-sm ${isMine ? 'bg-primary text-white' : 'bg-light'}`}
                                style={{ maxWidth: '80%', position: 'relative' }}
                            >
                                <p className="mb-0">{m.message}</p>

                                {/* Show delete button only on my messages */}
                                {isMine && (
                                    <button
                                        onClick={() => handleDelete(m.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '2px',
                                            right: '2px',
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                        title="Delete message"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {isMine && (
                                <small className="text-muted mt-1" style={{ fontSize: '10px' }}>
                                    {m.is_read ? '✓✓ Seen' : '✓ Sent'}
                                </small>
                            )}
                        </div>
                    );
                })}

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
                    <i className="fa fa-paper-plane" />
                </button>
            </form>
        </div>
    );
};

export default Chat;
