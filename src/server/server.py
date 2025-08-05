from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import json

app = Flask(__name__)
DB_NAME = os.path.join(os.path.dirname(__file__), 'database.db')
TABLE_NAME = 'user_data'

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute(f'''
        CREATE TABLE IF NOT EXISTS {TABLE_NAME} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/submit', methods=['POST'])
def submit_data():
    try:
        json.loads(request.get_json()["data"])
    except Exception:
        return jsonify({'error': 'Request body is not valid JSON'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Request body is not valid JSON'}), 400
    if not request.is_json:
        return jsonify({'error': 'Invalid JSON'}), 400
    data = request.get_json()
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute(f'INSERT INTO {TABLE_NAME} (data) VALUES (?)', (str(data),))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Data stored successfully'}), 201

@app.route('/', methods=['GET'])
def get_data():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute(f'SELECT id, data FROM {TABLE_NAME}')
    rows = c.fetchall()
    conn.close()
    result = []
    for row in rows:
        try:
            # Parse the stored string into a JSON object
            parsed_data = eval(row[1])  # Convert string to dictionary
            result.append({'id': row[0], **parsed_data})
        except:
            result.append({'id': row[0], 'data': row[1]})
    return jsonify(result), 200

@app.route('/entry/<int:item_id>', methods=['DELETE'])
def delete_data(item_id):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute(f'SELECT id FROM {TABLE_NAME} WHERE id = ?', (item_id,))
    row = c.fetchone()
    if row is None:
        conn.close()
        return jsonify({'error': f'Item with id {item_id} does not exist'}), 404
    c.execute(f'DELETE FROM {TABLE_NAME} WHERE id = ?', (item_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': f'Item with id {item_id} deleted successfully'}), 200

@app.route('/reset', methods=['POST'])
def reset_data():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute(f'DROP TABLE IF EXISTS {TABLE_NAME}')
    init_db()
    conn.commit()
    conn.close()
    return jsonify({'message': 'All data has been reset'}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host="0.0.0.0", port=8080)