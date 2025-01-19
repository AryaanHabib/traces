import requests

BASE_URL = " https://a19e-128-189-86-7.ngrok-free.app/api"  # Base URL for your Flask app

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

def test_getchallenge():
    url = f"{BASE_URL}/get_challenge/1"
    
    response = requests.get(url)
   
    print("Status Code:", response.status_code)
    print("Response:", response.json())

if __name__ == "__main__":
    # test_get()
    # test_post()
    test_getchallenge()
    