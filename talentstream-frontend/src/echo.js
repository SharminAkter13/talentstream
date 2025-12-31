import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';
import { getToken } from './services/auth';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    // Authorization for Private Channels
    authorizer: (channel) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                }, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                })
                .then(res => callback(false, res.data))
                .catch(err => callback(true, err));
            }
        };
    },
});

export default echo;