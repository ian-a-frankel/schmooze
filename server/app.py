#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
from flask_socketio import SocketIO, emit
import time

# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import User, Conversation, Message, UserConversation
socketio = SocketIO(app)
URL_PREFIX = '/api'

# HELPER METHOD #

def current_user():
    if session["user_id"]:
        return User.query.filter(User.id == session["user_id"]).first()

@socketio.on('message')
def handle_message(data):
    # Broadcast the received message to all connected clients
    emit('message', data, broadcast=True)

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
    def post(self):
        data = request.get_json()
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            full_name=data['full_name'], password_hash=password_hash
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

        return make_response(new_user.to_dict(), 201)
    
class ConversationById(Resource):
    def get(self, id):
        if session['user_id']==id:
            conversation = Conversation.query.filter_by(id=id).first().to_dict()
            return make_response(jsonify(conversation), 200)
    
class Conversations(Resource):
    def post(self):
        data = request.get_json()

        new_conv = Conversation(
            name=data['name']
        )
        db.session.add(new_conv)
        db.session.commit()

        return make_response(new_conv.to_dict(), 201)

class UserConversations(Resource):
    def post(self):
        data = request.get_json()

        new_userConv = UserConversation(
            user_id=data['user_id'],
            conversation_id=data['conversation_id']
        )
        db.session.add(new_userConv)
        db.session.commit()

        return make_response(new_userConv.to_dict(), 201)
    
class Messages(Resource):
    def post(self):
        data = request.get_json()
        current_time_str = time.strftime("%Y-%m-%d %H:%M:%S")
        new_message=Message(text=data['text'], 
                             date_sent=current_time_str, 
                             user_id=data['user_id'], 
                             conversation_id=data['conversation_id'])
        
        author=db.session.get(User, data['user_id'])

        db.session.add(new_message)
        db.session.commit()
        result ={
            "id":new_message.id,
            "text":new_message.text,
            "date_sent": new_message.date_sent,
            "conversation_id": new_message.conversation_id,
            "user_full_name": author.full_name
        }
        socketio.emit('message', result, broadcast=True)
        return make_response(result, 201)
    
class MessagesById(Resource):
    def delete(self, id):
        message = db.session.get(Message, id)
        db.session.delete(message)
        db.session.commit()

    def patch(self, id):
        message = db.session.get(Message, id)
        data = request.get_json()
        setattr(message, 'text', data['text'])
        db.session.add(message)
        db.session.commit()

class UsersConversations(Resource):
    def get(self, id):
        user = db.session.get(User, id).to_dict()
        return make_response(jsonify(user['userConversations']), 200)

# @app.get(URL_PREFIX + '/users/<int:user_id>/conversations/<int:conv_id')
# def get_info(user_id, conv_id):
#     user = db.session.get(User, id).to_dict()


# SESSION LOGIN/LOGOUT#

@app.post(URL_PREFIX + '/login')
def login():
    data = request.json
    full_name=data.get('full_name')
    user = User.query.filter(User.full_name == full_name).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session["user_id"] = user.id
        return user.to_dict(), 201
    else:
        return { "message": "Invalid username or password" }, 401
    

@app.get(URL_PREFIX + '/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter(User.id == user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return { "message": "No logged in user" }, 401
    

@app.delete(URL_PREFIX + '/logout')
def logout():
    session.pop('user_id')
    return {}, 204

        
api.add_resource(Users, URL_PREFIX + '/users')
api.add_resource(Conversations, URL_PREFIX + '/conversations')
api.add_resource(UserConversations, URL_PREFIX + '/userConversations')
api.add_resource(ConversationById, URL_PREFIX + '/conversations/<int:id>')
api.add_resource(Messages, URL_PREFIX + '/messages')
api.add_resource(MessagesById, URL_PREFIX + '/messages/<int:id>')
api.add_resource(UsersConversations, URL_PREFIX + '/users/<int:id>/conversations')

if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)

