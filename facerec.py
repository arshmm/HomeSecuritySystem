from cv2 import cv2
import numpy as np
import face_recognition
import os


def findEncoding(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList


path = 'Images'
images = []
classNames = []
mylist = os.listdir(path)

for a in mylist:
    img = cv2.imread(os.path.join(path, a))
    images.append(img)
    classNames.append(os.path.splitext(a)[0])

known_encodings = findEncoding(images)
print('Encoding ho gaya ab aage badho')

webcam = cv2.VideoCapture(0)

while True:
    success, img = webcam.read()
    camImg = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    camImg = cv2.cvtColor(camImg, cv2.COLOR_BGR2RGB)

    locationCamImage = face_recognition.face_locations(camImg)
    encodeCamImage = face_recognition.face_encodings(camImg, locationCamImage)

    for encoding, location in zip(encodeCamImage, locationCamImage):
        count = 0
        matches = face_recognition.compare_faces(known_encodings, encoding)
        distance = face_recognition.face_distance(known_encodings, encoding)
        print(distance)
        matchIndex = np.argmin(distance)

        if matches[matchIndex]:
            name = classNames[matchIndex].upper()
        elif count == 0:
            name = "unknown"
            cv2.imwrite("unknown_images/unknown.jpg", img)
            count += 1
        else:
            name = "unknown"

        y1, x2, y2, x1 = location
        y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
        cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
        cv2.rectangle(img, (x1, y2-35), (x2, y2), (255, 0, 0), cv2.FILLED)
        cv2.putText(img, name, (x1+6, y2-6),
                    cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow('webcam', img)
    cv2.waitKey(1)
