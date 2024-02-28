import unittest
from models import Email


class UnitTestEmail(unittest.TestCase):
    def test_email_creation(self):
        email = Email(
            subject='Welcome to the Fake Email App',
            body='Your account has been created succesfully',
            recipient_folder=0
        )
        
        self.assertEqual(email.subject, 'Welcome to the Fake Email App')
        self.assertEqual(email.body, 'Your account has been created succesfully')
        self.assertEqual(email.recipient_folder, 0)

    def test_subject_too_long(self):
        with self.assertRaisesRegex(ValueError, "Subject must be at most 128 characters long."):
            Email(
                subject='Welcome to the Fake Email App' * 12,
                body='Your account has been created succesfully',
                recipient_folder=0
            )

    def test_body_too_long(self):
        with self.assertRaisesRegex(ValueError, "Body must be at most 1028 characters long."):
            Email(
                subject='Welcome to the Fake Email App',
                body='Your account has been created succesfully Lorem Ipsum' * 128,
                recipient_folder=0
            )

    def test_incorrect_recipient_folder(self):
        with self.assertRaisesRegex(ValueError, "Recipient folder must be at most 4."):
            Email(
                subject='Welcome to the Fake Email App',
                body='Your account has been created succesfully Lorem Ipsum',
                recipient_folder=6
            )

if __name__ == '__main__':
    unittest.main()