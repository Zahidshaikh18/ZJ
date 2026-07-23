import os
import resend  # type: ignore

try:
    from dotenv import load_dotenv  # type: ignore
except ImportError:  # pragma: no cover
    def load_dotenv():
        return None

load_dotenv()

# Configure Resend
resend.api_key = os.getenv("RESEND_API_KEY")

FROM_EMAIL = os.getenv("FROM_EMAIL")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")


def send_company_email(data):
    """
    Sends the contact form details to the company.
    """

    html = f"""
    <h2>New Contact Form Submission</h2>

    <table border="1" cellpadding="8" cellspacing="0">
        <tr><td><b>Name</b></td><td>{data['full_name']}</td></tr>
        <tr><td><b>Email</b></td><td>{data['email']}</td></tr>
        <tr><td><b>Phone</b></td><td>{data['phone']}</td></tr>
        <tr><td><b>Company</b></td><td>{data['company']}</td></tr>
        <tr><td><b>Service</b></td><td>{data['service']}</td></tr>
        <tr><td><b>Message</b></td><td>{data['message']}</td></tr>
    </table>
    """

    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": ADMIN_EMAIL,
        "subject": "New Contact Form Submission | ZJ Infosystems",
        "html": html,
    })


def send_customer_email(data):
    """
    Sends a thank-you email to the customer.
    """

    html = f"""
    <h2>Thank you for contacting ZJ Infosystems!</h2>

    <p>Dear <b>{data['full_name']}</b>,</p>

    <p>
        We have successfully received your enquiry.
        Our team will contact you within 1 or 2 business days.
    </p>

    <hr>

    <h3>Your Submission</h3>

    <table border="1" cellpadding="8" cellspacing="0">
        <tr><td><b>Name</b></td><td>{data['full_name']}</td></tr>
        <tr><td><b>Email</b></td><td>{data['email']}</td></tr>
        <tr><td><b>Company</b></td><td>{data['company']}</td></tr>
        <tr><td><b>Service</b></td><td>{data['service']}</td></tr>
        <tr><td><b>Message</b></td><td>{data['message']}</td></tr>
    </table>

    <br>

    <p>
        Regards,<br>
        <b>ZJ Infosystems</b><br>
        Transforming Technology. Empowering Businesses.
    </p>
    """

    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": data["email"],
        "subject": "Thank you for contacting ZJ Infosystems",
        "html": html,
    })