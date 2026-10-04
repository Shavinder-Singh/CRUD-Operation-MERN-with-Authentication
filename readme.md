Create folders client and server.

In Server Folder =
npm init -y
    npm i and npm install 
    npm install express mongoose dotenv cors bcryptjs jsonwebtoken middleware
    npm i -D nodemon

In package.json =
    "start": "node index.js",
    "dev": "nodemon index.js",

Create .gitignore file in server folder and add .env



connect to mongodb atlas


Login Signup and  (Authentication (check Identity) or Basic Authorization (permission if it is user or admin))

Make login signup   (auth.js giving routes, authController doing actual function or work , Schema, User Schema).


Middleware means: a checking/processing function that runs before the main function.
Make Middleware which checks if user is login or role has admin in middleware file



Frontend 

npm create vite@latest =>Create React Vite
-----------------------
npm install tailwindcss @tailwindcss/vite
-----------------------
write in vite config.js
    import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
--------------------------
@import "tailwindcss"; in index.css
npm run dev


npm i axios react-router-dom 


Utils file create for Common Route URL
Create AuthContext File which crud opertaion function use and data is getting from other files like register pages comes (name,email,password) 