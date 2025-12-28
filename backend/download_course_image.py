import requests
import os

url = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
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
