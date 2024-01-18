# from flask import Flask, render_template, request, jsonify
# from threading import Thread
# from object_detection_script import ObjectDetector

# app = Flask(__name__)

# # Initialize ObjectDetector without passing any arguments
# detector = ObjectDetector()

# @app.route("/")
# def index():
#     return render_template("object.html")

# @app.route("/detection", methods=["POST"])
# def start_weapon_detection():
#     try:
#         video_file = request.files["video"]

#         # Save the uploaded video file to a temporary location
#         video_path = "uploaded_video.mp4"
#         video_file.save(video_path)

#         # Run object detection in a separate thread
#         detection_thread = Thread(
#             target=detector.performObjectDetection, args=(video_path,)
#         )
#         detection_thread.start()

#         return jsonify({"message": "Weapon detection started successfully!"})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)



from flask import Flask, render_template, request, jsonify
from threading import Thread
from object_detection_script import ObjectDetector
import subprocess

app = Flask(__name__)

# Initialize ObjectDetector without passing any arguments
detector = ObjectDetector()

@app.route("/")
def index():
    return render_template("object.html")

@app.route("/detection", methods=["POST"])
def start_weapon_detection():
    try:
        video_file = request.files["video"]

        # Save the uploaded video file to a temporary location
        video_path = "uploaded_video.mp4"
        video_file.save(video_path)

        # Run object detection in a separate thread
        detection_thread = Thread(
            target=detector.performObjectDetection, args=(video_path,)
        )
        detection_thread.start()

        return jsonify({"message": "Weapon detection started successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/start_weapon_detection', methods=['GET'])
def start_weapon_detection_external():
    try:
        # Call your Python script for weapon detection
        subprocess.run(['python', 'weapon_detection.py'], check=True)
        return jsonify({'message': 'Weapon detection started successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
