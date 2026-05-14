import requests

url = "https://llm.alem.ai/v1/chat/completions"
model = "alemllm"

# Potential variations of the token based on the screenshot
tokens = [
    "sk-l8agzhli09Od5WbFynXkyA", # lowercase l
    "sk-I8agzhli09Od5WbFynXkyA", # uppercase I
    "sk-18agzhli09Od5WbFynXkyA", # number 1
    "sk-i8agzhli09Od5WbFynXkyA", # lowercase i
]

for token in tokens:
    print(f"Testing token: {token}")
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    data = {
        "model": model,
        "messages": [{"role": "user", "content": "ping"}],
        "max_tokens": 5
    }
    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}")
        if response.status_code == 200:
            print(f"!!! SUCCESS with token: {token} !!!")
            break
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 20)
