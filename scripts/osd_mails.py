import smtplib
from email.mime.text import MIMEText
from email.utils import formatdate

"""
Manages sending mails to participants of the speeddating event.
Fill in the password (user if changed) for the mail account.
"""

host = "mail.d120.de"
sender_mail = "ophase.speeddating@fachschaft.informatik.tu-darmstadt.de"
user = "ospeeddating"
pswd = ""  # todo: add password here
port = 587
smtpObj = smtplib.SMTP(host, port)


def login(user, password):
    global smtpObj
    smtpObj.starttls()
    smtpObj.login(user, password)


def send_mail(sender, recv, content):
    global smtpObj
    msg = MIMEText(content)
    msg['Subject'] = 'OPhase Lerngruppen-Speeddating'
    msg['From'] = sender
    msg['To'] = recv
    msg['Date'] = formatdate(localtime=True)
    smtpObj.sendmail(sender, recv, msg.as_string())
