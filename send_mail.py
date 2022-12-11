from mailjet_rest import Client
import os


class SendMail:
    def __init__(self, name, email, msg):
        self.api_key = os.environ.get("API_KEY")
        self.api_secret = os.environ.get("API_SECRET")
        self.mailjet = Client(auth=(self.api_key, self.api_secret), version='v3.1')
        self.data = {
            "Messages": [
                {
                    "From": {
                        "Email": os.environ.get("FROM_MAIL"),
                        "Name": "code"
                    },

                    "To": [
                        {
                            "Email": os.environ.get("TO_MAIL"),
                            "Name": "code"
                        }
                    ],

                    "Subject": "Web Portfolio.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": f"<h3>{msg}</h3><br>Name: {name}<br>Email: {email}",
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        }

    def send_msg(self):
        result = self.mailjet.send.create(data=self.data)
        return result
