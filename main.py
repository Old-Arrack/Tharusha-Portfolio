from flask import Flask, render_template, request, redirect, url_for
from send_mail import SendMail

PROJECT_DATA = {
    "name": ["Edomain", "Minecraft Treasure Hunt", "Interact.web"],

    "id": ["Edomain", "MCT", "Interact"],

    "tags": [["HTML", "CSS", "JavaScript", "Bootstrap", "Flask"],
             ["HTML", "CSS", "JavaScript", "Bootstrap", "Flask"],
             ["HTML", "CSS", "JavaScript", "Flask"]],

    "img_path": ["images/edomain.png", "images/MCT.png", "images/Interact.png"],

    "description": ["Edomain is a website built for a gaming event. It provides basic information about the event and "
                    "allows the user to register for the event by creating an account that will provide them with a "
                    "dashboard to interact with other users/get further information about the event.",

                    "Minecraft Treasure hunt is a gaming event website that provides information on the event and "
                    "allows users to create accounts after identity verfication to get further updates on the event.",

                    "Interact.web is a website that offers pre-coded HTML, CSS and Javascript of commonly used web "
                    "components such as Navigation bars, calculators, etc."],

    "size": 3
}

app = Flask(__name__)
app.config["SECRET_KEY"] = "EIUkjsdnkjSDK"


@app.route("/")
def home():
    mail_state = request.args.get('msg_status')
    if not mail_state:
        mail_state = ""
    return render_template("index.html", data=PROJECT_DATA, msg_status=mail_state)


@app.route("/send-msg", methods=["POST"])
def send_msg():
    name = request.form["name"].strip()
    email = request.form["email"]
    msg = request.form["msg"].strip()

    send_mail = SendMail(name, email, msg)
    msg_status = send_mail.send_msg()

    return redirect(url_for("home", msg_status=msg_status.status_code))


if __name__ == "__main__":
    app.run(debug=True)
