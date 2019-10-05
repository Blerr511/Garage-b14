import io from 'socket.io-client';
import CONFIG from '../config.json';

export const socket = io(CONFIG.server.hostname);
