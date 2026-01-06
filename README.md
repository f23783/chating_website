# 💬 Chating Website

A real-time web-based messaging application inspired by WhatsApp, built with modern web technologies.

> ⚠️ **Note:** This project is currently under active development.

## 📋 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Roadmap](#roadmap)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About

Chating Website is a web-based instant messaging platform designed to provide seamless real-time communication. The application focuses on delivering a clean, intuitive user experience similar to popular messaging apps while maintaining robust security through session-based authentication.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3 |
| **Backend** | Node.js, JavaScript |
| **Database** | PostgreSQL |
| **Session Management** | Redis |
| **Containerization** | Docker |

## Features

### Current
- ✅ User authentication with secure session management
- ✅ RESTful API architecture
- ✅ Redis-powered session handling for enhanced security
- ✅ PostgreSQL database integration
- ✅ Docker support for development and testing

### In Progress
- 🔄 Real-time messaging API
- 🔄 One-on-one chat functionality

## Roadmap

- [ ] Complete messaging API implementation
- [ ] Real-time message delivery
- [ ] Group chat support
- [ ] Message read receipts
- [ ] User online/offline status
- [ ] Media sharing capabilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL
- Redis
- Docker (optional, for containerized development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/f23783/chating_website.git
   cd chating_website
   ```

2. **Install backend dependencies**
   ```bash
   # Install dependencies for each API module
   cd Backend/Api/db && npm install
   cd ../login && npm install
   cd ../redis && npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the Backend directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=chating_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   
   REDIS_HOST=localhost
   REDIS_PORT=6379
   
   SESSION_SECRET=your_session_secret
   PORT=3000
   ```

4. **Start the services**
   ```bash
   # Start PostgreSQL and Redis (if using Docker)
   docker-compose up -d
   
   # Start the application
   node Backend/JavaScript/main.js
   ```

5. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
chating_website/
├── Backend/
│   ├── Api/
│   │   ├── db/                 # Database connection & queries
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── login/              # Authentication API
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   └── redis/              # Session management with Redis
│   │       ├── index.js
│   │       └── package.json
│   └── JavaScript/
│       └── main.js             # Main backend logic
├── Frontend/
│   ├── Login/
│   │   ├── index.html          # Login page
│   │   ├── login.js            # Login functionality
│   │   └── login_styles.css    # Login page styles
│   └── Register/
│       └── ...                 # Registration page files
└── README.md
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with by <a href="https://github.com/f23783">Arda Fidancı</a>, <a href="https://github.com/EmireGungor">Emire Güngör</a>, <a href="https://github.com/reqshift">Hatice Nisa Güngör </a>
</p>
