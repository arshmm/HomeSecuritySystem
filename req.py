import requests
import json

url = 'http://localhost:5000/'

correct_payload = {'username': 'hello', 'password': 'p4$$w0rd!'}

# Output => OK
r = requests.post(url, data=correct_payload)
print(r.text)
