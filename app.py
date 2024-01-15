from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/start_weapon_detection', methods=['GET'])
def start_weapon_detection():
    try:
        # Call your Python script for weapon detection
        subprocess.run(['python', 'weapon_detection.py'], check=True)
        return jsonify({'message': 'Weapon detection started successfully!'})
    except Exception as e:q
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)