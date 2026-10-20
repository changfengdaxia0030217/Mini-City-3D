const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// In-memory game state (for demo; use MongoDB for production)
const players = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    players.set(socket.id, { roomId, x: 0, z: -8, y: 0, rotation: 0, health: 100, coins: 0 });
    socket.emit('state-sync', Array.from(players.values()));
    socket.to(roomId).emit('player-joined', socket.id);
  });

  socket.on('player-move', (data) => {
    const p = players.get(socket.id);
    if (p) {
      p.x = data.x; p.z = data.z; p.y = data.y || 0;
      p.rotation = data.rotation || p.rotation;
      socket.to(p.roomId).emit('player-moved', { id: socket.id, ...p });
    }
  });

  socket.on('combat-hit', (data) => {
    socket.to(data.roomId || 'default').emit('combat-hit', { attacker: socket.id, target: data.target, damage: data.damage });
  });

  socket.on('disconnect', () => {
    const p = players.get(socket.id);
    if (p) {
      socket.to(p.roomId).emit('player-left', socket.id);
      players.delete(socket.id);
    }
  });
});

app.get('/health', (req, res) => res.json({ status: 'ok', players: players.size }));

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Mini City 3D multiplayer server running on port ${PORT}`);
  console.log('WebSocket endpoint: ws://localhost:' + PORT);
});
