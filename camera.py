import cv2
import requests
import numpy as np
from io import BytesIO

url = "http://172.20.20.131:8080/shot.jpg"  # Replace with your phone's IP and port

# Open a window to display the video feed
cv2.namedWindow('Mobile Camera', cv2.WINDOW_NORMAL)

while True:
    try:
        response = requests.get(url, timeout=5)

        if response.status_code == 200:
            img_array = np.array(bytearray(response.content), dtype=np.uint8)
            img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

            # Check if the image dimensions are valid
            if img is not None and img.shape[0] > 0 and img.shape[1] > 0:
                # Your image processing and weapon detection code here
                # ...

                # Display the live feed
                cv2.imshow('Mobile Camera', img)
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