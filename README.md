# CloudVault

CloudVault is a MERN-based cloud file storage platform built for a resume-ready full-stack project. It includes authentication, protected dashboard routes, file upload/list/view/download/delete flows, and a polished React dashboard UI.

## Tech Stack

- React + TypeScript + Vite
- Material UI Icons
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Multer local file uploads

## Project Structure

```text
Cloud-Vault/
  client/   React frontend
  server/   Express API
```

## Run Locally

### Client

```powershell
cd client
npm install
npm run dev
```

### Server

```powershell
cd server
npm install
npm run dev
```

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## Resume Description

Built CloudVault, a full-stack cloud file storage platform using MongoDB, Express.js, React, and Node.js with JWT authentication, protected routes, file uploads, file management, and a responsive dashboard interface.
