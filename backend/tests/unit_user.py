import unittest
from models import User


class UnitTestUser(unittest.TestCase):
    def test_user_creation(self):
        user = User(
            full_name='John Doe',
            email='john@example.com',
            cellphone='1234567890',
            password='password123'
        )
        
        self.assertEqual(user.full_name, 'John Doe')
        self.assertEqual(user.email, 'john@example.com')
        self.assertEqual(user.cellphone, '1234567890')
        self.assertEqual(user.password, 'password123')

    def test_user_name_too_short(self):
        with self.assertRaisesRegex(ValueError, "Full name must be at least 8 characters long."):
            User(
                full_name='Jo',
                email='john@example.com',
                cellphone='12345678901',
                password='password123'
            )

    def test_user_name_too_long(self):
        with self.assertRaisesRegex(ValueError, "Full name must be at most 128 characters long."):
            User(
                full_name='Joe Lorem Joe Ipsum Joe Navitas Joe Strongstorm Joe Lorem Joe Ipsum Joe Navitas Joe Strongstorm Joe Lorem Joe Ipsum Joe Navitas Joe Strongstorm',
                email='john@example.com',
                cellphone='12345678901',
                password='password123'
            )

    def test_email_too_short(self):
        with self.assertRaisesRegex(ValueError, "Email must be at least 8 characters long."):
            User(
                full_name='John Doe',
                email='jo@e.co',
                cellphone='12345678901',
                password='password123'
            )

    def test_email_too_long(self):
        with self.assertRaisesRegex(ValueError, "Email must be at most 128 characters long."):
            User(
                full_name='John Doe',
                email='johndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoe@example.edu.co.lipsum',
                cellphone='12345678901',
                password='password123'
            )

    def test_cellphone_too_short(self):
        with self.assertRaisesRegex(ValueError, "Cellphone must be at least 8 characters long."):
            User(
                full_name='John Doe',
                email='john@example.com',
                cellphone='12345',
                password='password123'
            )

    def test_cellphone_too_long(self):
        with self.assertRaisesRegex(ValueError, "Cellphone must be at most 16 characters long."):
            User(
                full_name='John Doe',
                email='john@example.com',
                cellphone='123456789123456789',
                password='password123'
            )

if __name__ == '__main__':
    unittest.main()