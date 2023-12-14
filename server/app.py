#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
from flask_socketio import SocketIO, emit
import time

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Conversation, Message, UserConversation
socketio = SocketIO(app)

# Views go here!

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

        new_user = User(
            full_name=data['full_name']
        )
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)
    
class ConversationById(Resource):
    def get(self, id):
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


        
api.add_resource(Users, '/users')
api.add_resource(Conversations, '/conversations')
api.add_resource(UserConversations, '/userConversations')
api.add_resource(ConversationById, '/conversations/<int:id>')
api.add_resource(Messages, '/messages')
api.add_resource(MessagesById, '/messages/<int:id>')

if __name__ == '__main__':
    socketio.run(app, port=5555, debug=True)

