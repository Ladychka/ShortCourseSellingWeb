import urllib.request
import json

url = "http://127.0.0.1:8000/api/v1/course/search/?q=&category="
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        print(f"Status: {response.status}")
        print(f"Count: {len(data)}")
        if len(data) > 0:
            print(f"First course: {data[0]['title']}")
        else:
            print("No courses found in response.")
except Exception as e:
    print(f"Error: {e}")
