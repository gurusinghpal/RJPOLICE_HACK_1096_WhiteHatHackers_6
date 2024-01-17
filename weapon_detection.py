# #Code for Phone Webcam (working as cctv camera)

# from ultralytics import YOLO
# import cv2
# import subprocess
# import pygame
# import requests
# from io import BytesIO
# import numpy as np

# # Initialize Pygame mixer for playing sound
# pygame.mixer.init()
# pygame.mixer.music.load("sound.wav")

# # Function to save snapshot
# def save_snapshot(frame, snapshot_path):
#     cv2.imwrite(snapshot_path, frame)

# def is_camera_blocked(frame, brightness_threshold=50):
#     gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     mean_brightness = gray_frame.mean()
#     return mean_brightness < brightness_threshold

# # Function to send mail using Node.js script
# def call_send_mail():
#     try:
#         # Run the Node.js script that contains the sendMail function
#         result = subprocess.run(['node', 'sendAlertMail.js'], capture_output=True, text=True)
        
#         # Print the output of the Node.js script (if needed)
#         print(result.stdout)

#         # Check if there was an error
#         if result.returncode != 0:
#             print(f"Error: {result.stderr}")
#         else:
#             print("Email sent successfully!")

#     except Exception as e:
#         print(f"Error: {e}")

# url = "http://192.168.137.55:8080/shot.jpg"  # Replace with your phone's IP and port
# model = YOLO('gun_detection_yolo.pt')

# color = (0, 255, 0)

# # Open a window to display the detections
# cv2.namedWindow('Weapon Detections', cv2.WINDOW_NORMAL)

# while True:
#     try:
#         response = requests.get(url, timeout=5)

#         if response.status_code == 200:
#             img_array = np.array(bytearray(response.content), dtype=np.uint8)
#             frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

#             # Check if the image dimensions are valid
#             if frame is not None and frame.shape[0] > 0 and frame.shape[1] > 0:
#                 # Check if the camera view is blocked
#                 if is_camera_blocked(frame):
#                     print("Camera view is blocked.")
#                     cv2.putText(frame, "Camera view is blocked", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

#                 # Perform weapon detection
#                 results = model(frame)[0]

#                 for result in results.boxes.data.tolist():
#                     x1, y1, x2, y2, score, class_id = result
#                     flag = 1

#                     if score > 0.5:
#                         cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 3)
#                         cv2.putText(frame, '{}:{:.2f}'.format("Weapon", score), (int(x1), int(y1 - 10)),
#                                     cv2.FONT_HERSHEY_SIMPLEX, 3, color, 3, cv2.LINE_AA)
#                         print("Weapon detected!")
#                         pygame.mixer.music.play()
#                         snapshot_path = "snapshot.jpeg"
#                         save_snapshot(frame, snapshot_path)
#                         if flag == 1:
#                             call_send_mail()
#                             flag = 0

#                 # Display the live feed with detections
#                 cv2.imshow('Weapon Detections', frame)

#             else:
#                 print("Error: Invalid image dimensions")

#         elif response.status_code == 404:
#             print("Error: Camera feed not found. Ensure the IP and port are correct.")

#         else:
#             print(f"Error: Unexpected status code {response.status_code}")

#         # Check for the 'q' key to exit
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     except requests.RequestException as e:
#         print(f"Error: {e}")

# # Release the camera and close the OpenCV window
# cv2.destroyAllWindows()



# #Code for Laptop Webcam

# # from ultralytics import YOLO
# # import cv2
# # import subprocess
# # import pygame

# # # Initialize Pygame mixer for playing sound
# # pygame.mixer.init()
# # pygame.mixer.music.load("sound.wav")

# # # Function to save snapshot
# # def save_snapshot(frame, snapshot_path):
# #     cv2.imwrite(snapshot_path, frame)

# # def is_camera_blocked(frame, brightness_threshold=50):
# #     gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
# #     mean_brightness = gray_frame.mean()
# #     return mean_brightness < brightness_threshold

# # # Function to send mail using Node.js script
# # def call_send_mail():
# #     try:
# #         # Run the Node.js script that contains the sendMail function
# #         result = subprocess.run(['node', 'sendAlertMail.js'], capture_output=True, text=True)
        
# #         # Print the output of the Node.js script (if needed)
# #         print(result.stdout)

# #         # Check if there was an error
# #         if result.returncode != 0:
# #             print(f"Error: {result.stderr}")
# #         else:
# #             print("Email sent successfully!")

# #     except Exception as e:
# #         print(f"Error: {e}")

# # cap = cv2.VideoCapture(0)

# # model = YOLO('gun_detection_yolo.pt')

# # color = (0, 0, 255)

# # while True:
# #     ret, frame = cap.read()

# #     results = model(frame)[0]

# #     if frame is not None and frame.shape[0] > 0 and frame.shape[1] > 0:
# #                 # Check if the camera view is blocked
# #                 if is_camera_blocked(frame):
# #                     print("Camera view is blocked.")
# #                     cv2.putText(frame, "Camera view is blocked", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

# #     for result in results.boxes.data.tolist():
# #         x1, y1, x2, y2, score, class_id = result
# #         flag=1

# #         if score > 0.5:
# #             cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 2)
# #             cv2.putText(frame, '{}:{:.2f}'.format("Weapon", score), (int(x1), int(y1 - 10)),
# #                         cv2.FONT_HERSHEY_SIMPLEX, 1, color, 1, cv2.LINE_AA)
# #             print("Weapon detected!")
# #             pygame.mixer.music.play()
# #             snapshot_path = "snapshot.jpeg"
# #             save_snapshot(frame, snapshot_path)
# #             if(flag==1):
# #                 call_send_mail()
# #                 flag=0

# #     cv2.imshow('Detections', frame)
# #     if cv2.waitKey(1) & 0xFF == ord('q'):
# #         break
# # cap.release()
# # cv2.destroyAllWindows()





from ultralytics import YOLO
import cv2
import subprocess
import pygame
import requests
from io import BytesIO
import numpy as np

# Initialize Pygame mixer for playing sound
pygame.mixer.init()
pygame.mixer.music.load("sound.wav")
alarm_sound = pygame.mixer.Sound("alarm.wav")

# Function to save snapshot
def save_snapshot(frame, snapshot_path):
    cv2.imwrite(snapshot_path, frame)

def is_camera_blocked(frame, brightness_threshold=50):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    mean_brightness = gray_frame.mean()
    return mean_brightness < brightness_threshold

# Function to send mail using Node.js script
def call_send_mail():
    try:
        # Run the Node.js script that contains the sendMail function
        result = subprocess.run(['node', 'sendMail.js'], capture_output=True, text=True)
        
        # Print the output of the Node.js script (if needed)
        print(result.stdout)

        # Check if there was an error
        if result.returncode != 0:
            print(f"Error: {result.stderr}")
        else:
            print("Email sent successfully!")

    except Exception as e:
        print(f"Error: {e}")

url = "http://192.168.137.55:8080/shot.jpg"  # Replace with your phone's IP and port

model = YOLO('gun_detection_yolo.pt')

color = (0, 255, 0)
alarm_playing = False 

# Open a window to display the detections
cv2.namedWindow('Weapon Detections', cv2.WINDOW_NORMAL)

while True:
    try:
        response = requests.get(url, timeout=5)

        if response.status_code == 200:
            img_array = np.array(bytearray(response.content), dtype=np.uint8)
            frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

            # Check if the image dimensions are valid
            if frame is not None and frame.shape[0] > 0 and frame.shape[1] > 0:
                # Check if the camera view is blocked
                if is_camera_blocked(frame):
                    print("Camera view is blocked.")
                    cv2.putText(frame, "Camera view is blocked", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    if not alarm_playing:
                        alarm_sound.play()  # Play the alarm sound if it's not already playing
                        alarm_playing = True
                else:
                    if alarm_playing:
                        alarm_sound.stop()  # Stop the alarm sound if it's currently playing
                        alarm_playing = False

                # Perform weapon detection
                results = model(frame)[0]

                for result in results.boxes.data.tolist():
                    x1, y1, x2, y2, score, class_id = result
                    flag = 1

                    if score > 0.5:
                        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 3)
                        cv2.putText(frame, '{}:{:.2f}'.format("Weapon", score), (int(x1), int(y1 - 10)),
                                    cv2.FONT_HERSHEY_SIMPLEX, 3, color, 3, cv2.LINE_AA)
                        print("Weapon detected!")
                        pygame.mixer.music.play()
                        snapshot_path = "snapshot.jpeg"
                        save_snapshot(frame, snapshot_path)
                        if flag == 1:
                            call_send_mail()
                            flag = 0

                # Display the live feed with detections
                cv2.imshow('Weapon Detections', frame)

            else:
                print("Error: Invalid image dimensions")

        elif response.status_code == 404:
            print("Error: Camera feed not found. Ensure the IP and port are correct.")

        else:
            print(f"Error: Unexpected status code {response.status_code}")

        # Check for the 'q' key to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    except requests.RequestException as e:
        print(f"Error: {e}")

# Release the camera and close the OpenCV window
cv2.destroyAllWindows()