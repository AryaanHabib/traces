import requests

BASE_URL = "http://127.0.0.1:5000/api"  # Base URL for your Flask app

def test_post():
    url = f"{BASE_URL}/test_post"
    payload = {
        "num1": 12,
        "num2": 7
    }
    response = requests.post(url, json=payload)

    print("Status Code:", response.status_code)
    print("Response:", response.json())

def test_get():
    url = f"{BASE_URL}/test_get/793"
    response = requests.get(url)
    print("Status Code:", response.status_code)
    print("Response:", response.json())

if __name__ == "__main__":
    test_get()
    test_post()