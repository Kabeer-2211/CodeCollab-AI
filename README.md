# Code Collab 🤖💻🚀

&#x20; &#x20;

🚀 **Code Collab** is an AI-powered collaboration platform where developers can work together in real time. Users can add collaborators to their projects, chat via Socket.io, generate AI-powered code using `@ai`, and even run a Node.js server inside the browser using WebContainer.

## ✨ Features

- 🔥 **Real-time Collaboration** – Add collaborators and chat with them in real time.
- 🤖 **AI Code Assistance** – Type `@ai` at the start of a message to generate code using AI.
- 🌐 **WebContainer Integration** – Run a Node.js server within the browser.
- 💾 **Database Persistence** – Chats and file trees are stored in the database.
- 🔄 **Logout State Management** – Uses Redis to prevent token reuse after logout.
- ⚡ **Built with MERN & Socket.io** – Ensures fast and seamless user experience.



## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB, Redis
- **Real-time Chat:** Socket.io
- **AI Integration:** Gemini API / Custom AI Model
- **WebContainer:** WebContainer API

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/Kabeer-2211/CodeCollab-AI.git
 cd CodeCollab-AI
```

### 2️⃣ Install Dependencies

```sh
npm install
cd client && npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```ini
PORT=
DB_URL=
JWT_SECRET=
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
GOOGLE_AI_KEY=
```

### 4️⃣ Run the Application

```sh
# Start the backend
npm start

# Start the frontend
cd client && npm start
```

### 5️⃣ Open in Browser

Go to `http://localhost:3000` and start collaborating!

## 🛠️ API Endpoints

| Method | Endpoint                              | Description                     |
| ------ | ------------------------------------- | ------------------------------- |
| POST   | `/users/register`                     | Register a new user             |
| POST   | `/users/login`                        | Login user                      |
| get    | `/users/profile`                      | Get user Profile                |
| get    | `/users/logout`                       | Logout user                     |
| get    | `/users/all`                          | Get all users                   |
| POST   | `/projects/create`                    | Create a new project            |
| GET    | `/projects/get-project/:projectId`    | Get project info                |
| GET    | `/projects/all`                       | Get all projects                |
| PUT    | `/projects/add-user`                  | Add user in project             |
| PUT    | `/projects/update-filetree`           | Update File Tree                |
| GET    | `/projects/get-chats/:projectId`      | Get chat messages for a project |

## 🎉 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## 💬 Connect with Me

Email: kabirdev.777@gmail.com

