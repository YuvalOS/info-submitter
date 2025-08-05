import unittest
import json
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))
from src.server.server import app, DB_NAME, TABLE_NAME
import sqlite3

class ServerTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        # Database for testing
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute(f'DROP TABLE IF EXISTS {TABLE_NAME}')
        c.execute(f'''
            CREATE TABLE {TABLE_NAME} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT NOT NULL
            )
        ''')
        conn.commit()
        conn.close()

    def test_submit_data(self):
        response = self.app.post('/submit', json={"data": json.dumps({"key": "value"})}, headers={"Content-Type": "application/json"})
        self.assertEqual(response.status_code, 201)
        self.assertIn('Data stored successfully', response.get_data(as_text=True))

    def test_get_data(self):
        self.app.post('/submit', json={"data": json.dumps({"key": "value"})}, headers={"Content-Type": "application/json"})
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(len(data), 1)
        nested_data = json.loads(data[0]['data'])  # Parse the nested JSON string
        self.assertEqual(nested_data['key'], "value")

    def test_delete_data(self):
        self.app.post('/submit', json={"data": json.dumps({"key": "value"})}, headers={"Content-Type": "application/json"})
        response = self.app.delete('/entry/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Item with id 1 deleted successfully', response.get_data(as_text=True))

    def test_delete_nonexistent_data(self):
        response = self.app.delete('/entry/999')
        self.assertEqual(response.status_code, 404)
        self.assertIn('Item with id 999 does not exist', response.get_data(as_text=True))

if __name__ == '__main__':
    unittest.main()
