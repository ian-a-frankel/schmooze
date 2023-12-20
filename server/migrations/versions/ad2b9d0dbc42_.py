"""empty message

Revision ID: ad2b9d0dbc42
Revises: 3a9809b7b3ce
Create Date: 2023-12-20 10:28:50.950447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ad2b9d0dbc42'
down_revision = '3a9809b7b3ce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('userConversation_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('unread', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('userConversation_table', schema=None) as batch_op:
        batch_op.drop_column('unread')

    # ### end Alembic commands ###
