import cv2
import numpy as np
import time
import os

class ObjectDetector:
    def _init_(self, videoPath, configPath, modelPath, classesPath):
        self.videoPath = videoPath
        self.configPath = configPath
        self.modelPath = modelPath
        self.classesPath = classesPath

        self.net = cv2.dnn_DetectionModel(self.modelPath, self.configPath)
        self.net.setInputSize(320, 320)
        self.net.setInputScale(1.0/127.5)
        self.net.setInputMean((127.5, 127.5, 127.5))
        self.net.setInputSwapRB(True)
        self.readClasses()

    def readClasses(self):
        with open(self.classesPath, 'r') as f:
            self.classesList = f.read().splitlines()

        self.classesList.insert(0, '_Background_')

        self.colorList = np.random.uniform(low=0, high=255, size=(len(self.classesList), 3))

    def performObjectDetection(self, video_path):
        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            print("Error opening video file")
            return

        (success, image) = cap.read()

        startTime = 0

        while success:
            currentTime = time.time()
            fps = 1/(currentTime - startTime)
            startTime = currentTime
            classLabelIDs, confidences, bboxs = self.net.detect(image, confThreshold=0.5)

            bboxs = list(bboxs)
            confidences = list(np.array(confidences).reshape(1,-1)[0])
            confidences = list(map(float, confidences))
            bboxIdx = cv2.dnn.NMSBoxes(bboxs, confidences, score_threshold=0.5, nms_threshold=0.2)

            if len(bboxIdx) != 0:
                for i in range(0, len(bboxIdx)):
                    bbox = bboxs[np.squeeze(bboxIdx[i])]
                    classConfidence = confidences[np.squeeze(bboxIdx[i])]
                    classLabelID = np.squeeze(classLabelIDs[np.squeeze(bboxIdx[i])])
                    classLabel = self.classesList[classLabelID]
                    classColor = [int(c) for c in self.colorList[classLabelID]]

                    displayText = "{}:{:.2f}".format(classLabel, classConfidence)

                    x, y, w, h = bbox

                    cv2.rectangle(image, (x, y), (x+w, y+h), color=classColor, thickness=1)
                    cv2.putText(image, displayText, (x, y-10), cv2.FONT_HERSHEY_PLAIN, 1.2, classColor, 2)

            cv2.putText(image, "FPS: " + str(int(fps)), (20,70), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
            cv2.imshow("Result", image)

            key = cv2.waitKey(1) & 0xFF
            if key == ord("q"):
                break
            (success, image) = cap.read()

        cv2.destroyAllWindows()

def main():
    videoPath = 0

    configPath = os.path.join("model_data", "ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt")
    modelPath = os.path.join("model_data", "frozen_inference_graph.pb")
    classesPath = os.path.join("model_data", "coco.names")

    detector = ObjectDetector(videoPath, configPath, modelPath, classesPath)
    detector.performObjectDetection(videoPath)

if __name__ == '__main__':
    main()