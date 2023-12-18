#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc, sample
from models import User, Conversation, Message, UserConversation
import time

# Remote library imports
from faker import Faker
from config import bcrypt
# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        User.query.delete()
        print("Starting seed...")
        users=[]
        for _ in range(10):
            users.append(User(full_name=fake.name(), password_hash= bcrypt.generate_password_hash('123').decode('utf-8')))
        db.session.add_all(users)
        db.session.commit()

        Conversation.query.delete()
        print("Starting seed...")
        conversations=[]
        for _ in range(15):
            conversations.append(Conversation(name=fake.country()))
        db.session.add_all(conversations)
        db.session.commit()

        UserConversation.query.delete()
        userConversations=[]
        for conv in Conversation.query.all():
            few_users= sample(User.query.all(), randint(2,5))
            user_ids=[u.id for u in few_users]
            for u_id in user_ids:
                userConversations.append(UserConversation(user_id= u_id, conversation_id = conv.id))
        db.session.add_all(userConversations)
        db.session.commit()

        Message.query.delete()
        messages=[]
        for uc in UserConversation.query.all():
            current_time_str = time.strftime("%Y-%m-%d %H:%M:%S")
            message = Message(text=fake.sentence(), date_sent=current_time_str, user_id=uc.user_id, conversation_id=uc.conversation_id)
            messages.append(message)
        db.session.add_all(messages)
        db.session.commit()
            




