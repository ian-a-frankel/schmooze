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

users_pictures =['https://i.insider.com/5fcfbcd6240ebd00126bdb5c?width=1000&format=jpeg&auto=webp', 'https://www.whitehouse.gov/wp-content/uploads/2021/04/P20210303AS-1901-cropped.jpg?w=1536', 'https://www.aljazeera.com/wp-content/uploads/2022/10/2022-10-02T020355Z_1812565436_RC2NSW98C9TN_RTRMADP_3_USA-TRUMP.jpg?resize=1637%2C1080',  'https://cdn.britannica.com/19/101219-050-A07A26EF/Barack-Obama.jpg', 'https://cdn.britannica.com/87/186687-050-3AA9E551/Justin-Trudeau-2015.jpg', 'https://www.thenation.com/wp-content/uploads/2022/03/zelensky-speaking-getty.jpg','https://media.vanityfair.com/photos/6553b28ddf0394b37e2e8644/master/pass/vf1123-king-charles-birthday.png', 'https://images.wsj.net/im-497333?width=1280&size=1', 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/UU452SHSCFISRDZX7NA2ZDMXHI.jpg', 'https://m.media-amazon.com/images/M/MV5BNThiOTM4NTAtMDczNy00YzlkLWJhNTEtZTZhNDVmYzlkZWI0XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg' ]

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        User.query.delete()
        print("Starting seed...")
        users=[]
        for i in range(10):
            users.append(User(full_name=fake.name(), image = users_pictures[i], password_hash= bcrypt.generate_password_hash('123').decode('utf-8')))
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
            




