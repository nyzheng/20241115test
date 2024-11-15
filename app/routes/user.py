from flask import Blueprint, render_template, request

user_bp = Blueprint("user", __name__)

@user_bp.route("/", methods=["GET", "POST"])
def home():
    name = "XXX"
    age = "未知"
    gender = "未知"
    height = "未知"
    
    if request.method == "POST":
        name = request.form.get("name")
        age = request.form.get("age")
        gender = request.form.get("gender")
        height = request.form.get("height")
        
    return render_template("index.html", name=name, age=age, gender=gender, height=height)



