![Alt text](<Screen Shot 2023-12-21 at 9.59.11 AM-1.png>)

# Schmooze - Your Gateway to Professional Connection and Knowledge Exchange

**Installation Instructions:**

Welcome to Schmooze, where meaningful conversations and professional connections thrive. To get started and unlock the full potential of Schmooze, follow these simple installation instructions:


1. **Server Setup:**
   ```bash
   cd server/
   pipenv install
   pipenv shell
   flask db init
   flask db migrate
   flask db upgrade
   python app.py
   ```
if you would like to explore the app with some fake user data run python seed.py before running app.py

2. **Client Setup:**
   ```bash
   cd client/
   npm install
   npm start
   ```

Make sure to also install the following essential packages:

- Flask-SocketIO: `pipenv install flask-socketio`
- Socket.IO client: `npm install socket.io-client`
- Flask-Bcrypt: `pipenv install flask-bcrypt`

Now, let's delve into the exciting features that await you on Schmooze!

## Key Features

### 1. **Chat with Professionals**

Connect with a diverse community, engaging in discussions from industry-specific queries to general topics.

### 2. **Knowledge Exchange**

Tap into collective expertise. Share your insights, ask questions, and contribute to a dynamic exchange of knowledge.

### 3. **Professional Assistance**

Access a dedicated board of experienced professionals ready to provide guidance on specific issues or professional development.

## Getting Started

### **Sign Up Today**

Create your account easily, opening the door to a network of professionals eager to connect and share experiences.

### **Explore Topics**

Dive into discussion boards covering industry matters, career advice, and casual conversations.

### **Engage Respectfully**

Foster a positive environment through courteous and open-minded conversations.

### **Seek and Share Knowledge**

Pose questions, share your expertise, and actively participate in a vibrant knowledge exchange.

### **Connect with Professionals**

Build connections within your field or across industries, offering opportunities for learning, growth, and potential collaboration.

Thank you for choosing Schmooze – your gateway to meaningful professional conversations and connections!