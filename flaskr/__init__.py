import os

from flask import Flask, render_template


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI='postgresql://postgres:WeYVUzqm1ogNtGBbR3H4@cbseai.cj0ccqsqmh6o.ap-south-1.rds.amazonaws.com:5432',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


    # Define the root route
    @app.route('/')
    def index():
        return render_template('chat.html')
    

    from . import chat
    app.register_blueprint(chat.bp)

    return app