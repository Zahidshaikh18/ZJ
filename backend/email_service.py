import os
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

COMPANY_EMAIL = os.getenv("COMPANY_EMAIL")


def send_company_email(contact):

    msg = MIMEMultipart("alternative")

    msg["Subject"] = f"🔔 New Website Enquiry - {contact.full_name}"
    msg["From"] = SMTP_USERNAME
    msg["To"] = COMPANY_EMAIL

    html = f"""
    <html>
    <body style="font-family:Arial,sans-serif">

    <h2 style="color:#0F62FE;">
    New Contact Form Submission
    </h2>

    <table cellpadding="8" cellspacing="0" border="1">

    <tr>
        <td><b>Name</b></td>
        <td>{contact.full_name}</td>
    </tr>

    <tr>
        <td><b>Company</b></td>
        <td>{contact.company}</td>
    </tr>

    <tr>
        <td><b>Email</b></td>
        <td>{contact.email}</td>
    </tr>

    <tr>
        <td><b>Phone</b></td>
        <td>{contact.phone}</td>
    </tr>

    <tr>
        <td><b>Service</b></td>
        <td>{contact.service}</td>
    </tr>

    <tr>
        <td><b>Message</b></td>
        <td>{contact.message}</td>
    </tr>

    </table>

    <br>

    Submitted via the ZJ Infosystem website.

    </body>
    </html>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:

        server.starttls()

        server.login(
            SMTP_USERNAME,
            SMTP_PASSWORD
        )

        server.send_message(msg)


def send_customer_email(contact):

    msg = MIMEMultipart("alternative")

    msg["Subject"] = "Thank you for contacting ZJ Infosystem"
    msg["From"] = SMTP_USERNAME
    msg["To"] = contact.email

    html = f"""
    <html>

    <body style="font-family:Arial,sans-serif;line-height:1.6;">

    <h2 style="color:#0F62FE;">
    Thank You, {contact.full_name}
    </h2>

    <p>

    Thank you for contacting
    <b>ZJ Infosystem.</b>

    </p>

    <p>

    We have successfully received your enquiry.

    </p>

    <p>

    One of our specialists will review your request and get back to you as soon as possible.

    </p>

    <hr>

    <h3>Your Submission</h3>

    <b>Service:</b> {contact.service}<br>

    <b>Message:</b><br>

    {contact.message}

    <br><br>

    Best Regards,

    <br>

    <b>ZJ Infosystem</b>

    <br>

    Transforming Technology.
    Empowering Businesses.

    </body>

    </html>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:

        server.starttls()

        server.login(
            SMTP_USERNAME,
            SMTP_PASSWORD
        )

        server.send_message(msg)