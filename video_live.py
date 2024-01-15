from ultralytics import YOLO
import cv2

video_path = r'weapontest.mp4'

cap = cv2.VideoCapture(video_path)

model = YOLO('gun_detection_yolo.pt')

color = (0, 0, 255)

while True:
    ret, frame = cap.read()

    results = model(frame)[0]

    for result in results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result

        if score > 0.5:
            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), color, 2)
            cv2.putText(frame, '{}:{:.2f}'.format("Weapon", score), (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, color, 1, cv2.LINE_AA)

    cv2.imshow('Detections', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
            break
cap.release()
cv2.destroyAllWindows()
