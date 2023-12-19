"""empty message

Revision ID: 9fb7d9aacc1e
Revises: 
Create Date: 2023-12-15 18:16:42.845217

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9fb7d9aacc1e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('conversations_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('occupation', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.Column('date_sent', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('conversation_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['conversation_id'], ['conversations_table.id'], name=op.f('fk_messages_table_conversation_id_conversations_table')),
    sa.ForeignKeyConstraint(['user_id'], ['users_table.id'], name=op.f('fk_messages_table_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userConversation_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('conversation_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['conversation_id'], ['conversations_table.id'], name=op.f('fk_userConversation_table_conversation_id_conversations_table')),
    sa.ForeignKeyConstraint(['user_id'], ['users_table.id'], name=op.f('fk_userConversation_table_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userConversation_table')
    op.drop_table('messages_table')
    op.drop_table('users_table')
    op.drop_table('conversations_table')
    # ### end Alembic commands ###
