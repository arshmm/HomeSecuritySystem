from cv2 import cv2
import face_recognition

# reading the first image
imageTest = face_recognition.load_image_file('Images/original.jpg')
imageTest = cv2.cvtColor(imageTest, cv2.COLOR_BGR2RGB)

# reading the second image
imageTest1 = face_recognition.load_image_file('Images/arsh.jpg')
imageTest1 = cv2.cvtColor(imageTest1, cv2.COLOR_BGR2RGB)

faceLoc = face_recognition.face_locations(imageTest)[0]
encod = face_recognition.face_encodings(imageTest)[0]

faceLoc1 = face_recognition.face_locations(imageTest1)[0]
encod1 = face_recognition.face_encodings(imageTest1)[0]
cv2.rectangle(imageTest, (faceLoc[1], faceLoc[2]),
              (faceLoc[3], faceLoc[0]), (255, 0, 255), 2)
cv2.rectangle(imageTest1, (faceLoc1[1], faceLoc1[2]),
              (faceLoc1[3], faceLoc1[0]), (255, 0, 255), 2)
result = face_recognition.compare_faces([encod], encod1)
dist = face_recognition.face_distance([encod], encod1)
print(dist, result)


cv2.imshow("image1", imageTest1)
cv2.imshow("image", imageTest)
cv2.waitKey(0)
