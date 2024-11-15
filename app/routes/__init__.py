from .user import user_bp
from .contact import contact_bp
from .dino import dino_bp
from .chat_window import chat_window_bp

def init_app(app):
    app.register_blueprint(contact_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(dino_bp)
    app.register_blueprint(chat_window_bp)