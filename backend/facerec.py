from cv2 import cv2
import numpy as np
import face_recognition
import os
import time
import requests


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
print('Encodings done')

webcam = cv2.VideoCapture(0)
count = 0
timer = 0
while True:
    success, img = webcam.read()
    # camImg = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    camImg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    locationCamImage = face_recognition.face_locations(camImg)
    encodeCamImage = face_recognition.face_encodings(camImg, locationCamImage)

    # inititalizing an array to save the names of the detected users
    face_names = []

    # inititalizing an dict to save the data then needs to be sent to the server
    json_data = {}

    for encoding, location in zip(encodeCamImage, locationCamImage):
        matches = face_recognition.compare_faces(known_encodings, encoding)
        distance = face_recognition.face_distance(known_encodings, encoding)
        # print(distance)
        matchIndex = np.argmin(distance)

        if matches[matchIndex]:
            name = classNames[matchIndex].upper()
            json_data["name"] = name
            json_data['hour'] = f'{time.localtime().tm_hour}:{time.localtime().tm_min}'
            json_data['date'] = f'{time.localtime().tm_year}-{time.localtime().tm_mon}-{time.localtime().tm_mday}'
            # json_data['picture_array'] = camImg.tolist()
            r = requests.post(
                url="http://127.0.0.1:5000/api/user/recieve_data", json=json_data)
            print("Status: ", r.status_code)
        else:
            name = "unknown"
            if(timer > 50):
                timer = 0
            if(timer == 0):
                json_data["name"] = name + str(count)
                json_data['hour'] = f'{time.localtime().tm_hour}:{time.localtime().tm_min}'
                json_data['date'] = f'{time.localtime().tm_year}-{time.localtime().tm_mon}-{time.localtime().tm_mday}'
                cv2.imwrite("unknown_images/unknown_%d.jpg" % count,  img)
                r = requests.post(
                    url="http://127.0.0.1:5000/api/user/recieve_data", json=json_data)
                count += 1
                print("Status: ", r.status_code)
            timer += 1

        y1, x2, y2, x1 = location
      # y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 0, 255), 2)
        cv2.putText(img, name, (x1+6, y2-6),
                    cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 1)

    cv2.imshow('webcam', img)
    if cv2.waitKey(10) == ord('q'):  # wait until 'q' key is pressed
        webcam.release()
        cv2.destroyAllWindows()
