# 🟢 PingMe - Real-Time Chat Application

PingMe is a full-stack real-time chat application that allows users to sign up, log in, and exchange messages instantly with others. It’s built with the MERN stack (MongoDB, Express, React, Node.js) and supports secure authentication and WebSocket-powered messaging.

## 🚀 Features

- 🔒 Secure user authentication with JWT & cookies
- 💬 Real-time one-on-one messaging using Socket.io
- 👥 Online/offline user status
- 🧭 Sidebar with live search filter
- 🖼️ Profile avatars and message timestamps
- 📱 Responsive UI for mobile, tablet, and desktop

## 🛠️ Tech Stack

| Frontend | Backend | Real-Time | Database |
|---------|---------|------------|----------|
| React + Vite | Express.js | Socket.IO | MongoDB |

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/dedJack/pingMe.git
cd pingMe
```

### 2. Set Up Server

```bash
cd server
npm install
```

Start the server:

```bash
npm run start
```

### 3. Set Up Client

```bash
cd ../client
npm install
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## 🌐 Deployment
 
- PingMe: [Render](https://pingme-l5z5.onrender.com)
- might be take a minute to load as it uses a free instance of Render.com, Once loaded then it will work fine.

Ensure your production server serves the `client/dist` folder in Express when `NODE_ENV=production`.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

MIT License. See `LICENSE` for more information.

---

> Built with ❤️ by [dedJack]
