from flask import Blueprint, render_template

dino_bp = Blueprint("dino", __name__)

@dino_bp.route("/dino", methods=["GET"])
def contact():
    return render_template("dino.html")
