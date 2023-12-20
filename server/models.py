from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Conversation(db.Model, SerializerMixin):
    __tablename__='conversations_table'
    serialize_rules=('-messages.user.userConversations',
                     '-messages.user.messages',
                     '-messages.conversation',
                     '-userConversations.conversation',
                     '-userConversations.user.messages',
                     '-userConversations.user.userConversations'
                     )
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=True)
    messages=db.relationship('Message', back_populates='conversation', cascade='all, delete-orphan')
    userConversations=db.relationship('UserConversation', back_populates='conversation')
    users = association_proxy('userConversations', 'user')

class User(db.Model, SerializerMixin):
    __tablename__='users_table'
    serialize_rules =('-messages','-userConversations.user',)
    id = db.Column(db.Integer, primary_key=True)
    full_name=db.Column(db.String, nullable=False)
    image=db.Column(db.String, default='https://i.imgur.com/i8vHB4s.jpg')
    occupation=db.Column(db.String, nullable=True)
    password_hash = db.Column(db.String, nullable=True)
    messages=db.relationship('Message', back_populates='user')
    userConversations=db.relationship('UserConversation', back_populates='user')
    conversations = association_proxy('userConversations', 'conversation')

class Message(db.Model, SerializerMixin):
    __tablename__='messages_table'
    serialize_rules =('-user.messages', '-conversation.messages')
    id = db.Column(db.Integer, primary_key=True)
    text=db.Column(db.String, nullable=False)
    date_sent=db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations_table.id'), nullable=False)
    user=db.relationship('User', back_populates='messages')
    conversation=db.relationship('Conversation', back_populates='messages')


class UserConversation (db.Model, SerializerMixin):
    __tablename__='userConversation_table'
    serialize_rules =('-user.userConversations', '-conversation.userConversations')
    id = db.Column(db.Integer, primary_key=True)
    
    unread = db.Column(db.Integer, default=0)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations_table.id'), nullable=False)
    user=db.relationship('User', back_populates='userConversations')
    conversation=db.relationship('Conversation', back_populates='userConversations')