import requests
import os

# Unsplash image: Abstract digital network / web connections
url = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
output_path = "d:/BigMac/backend/media/course-image/porsche4.jpg"

try:
    print(f"Downloading image from {url}...")
    response = requests.get(url, allow_redirects=True, timeout=10)
    response.raise_for_status()
    
    with open(output_path, "wb") as f:
        f.write(response.content)
    
    print(f"Successfully downloaded image to {output_path}")
except Exception as e:
    print(f"Error downloading image: {e}")
