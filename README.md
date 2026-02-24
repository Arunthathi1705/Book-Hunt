📚 BookHunt – Online Book Discovery & Wishlist App

BookHunt is a full-stack book discovery application that allows users to search, explore, and save books to a personalized wishlist. The application provides a smooth, responsive, and modern UI with secure authentication and real-time data storage.

🔗 Live Demo: https://book-hunt-app.netlify.app


🚀 Features

🔍 Search books by title
📖 Browse book details
❤️ Add & remove books from wishlist
🔐 Secure user authentication (Login / Signup)
🔒 Protected routes for authenticated users
☁️ Real-time wishlist storage using Firestore
📱 Fully responsive design
🎨 Smooth animations using Framer Motion


🛠️ Tech Stack

Frontend:

React.js
Tailwind CSS
Framer Motion
React Router DOM

Backend & Database:

Firebase Authentication
Cloud Firestore
Deployment
Netlify


🔐 Authentication Flow

Users can sign up or log in using Firebase Authentication.
Protected routes restrict access to wishlist features.
Each user's wishlist is stored separately in Firestore.
Real-time updates ensure seamless user experience.


📂 Project Structure
src/
 ├── components/
 ├── pages/
 ├── context/
 ├── firebase/
 ├── hooks/
 └── App.js

⚙️ Installation & Setup

If you want to run this project locally:
Clone the repository

git clone [(https://github.com/Arunthathi1705/Book-Hunt.git)]


Install dependencies

npm install


Create a .env file and add your Firebase configuration keys
Start the development server

npm start


📌 Future Improvements

Pagination for search results
Book categories filtering
Dark mode toggle
Performance optimization


👩‍💻 Contributors

Arunthathi 
Akalya

📄 License
This project is built for learning and portfolio purposes.