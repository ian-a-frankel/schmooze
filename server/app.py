#!/usr/bin/env python3

# Standard library import#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Conversation, Message, UserConversation

# Views go here!

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

        
api.add_resource(Users, '/users')
api.add_resource(Conversations, '/conversations')
api.add_resource(UserConversations, '/userConversations')

api.add_resource(ConversationById, '/conversations/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


