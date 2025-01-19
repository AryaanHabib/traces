from flask import Flask, request, jsonify
from BackendManager import bm
app = Flask(__name__)

# Mock data for demonstration purposes

# API Endpoints

@app.route("/api/test", methods=["GET"])
def connection():
    print(792)
    return jsonify(361)

@app.route("/api/user_signup", methods=["POST"])
def user_signup():
    data = request.json
    user_id = data.get("user_id")
    password = data.get("password")
    name = data.get("name")
    result = bm.user_signup(user_id, password, name)
    
    if result == 0:
        return jsonify({"message": "User created successfully."}), 201
    elif result == 1:
        return jsonify({"error": "User already exists."}), 400
    elif result == 2:
        return jsonify({"error": "Unknown Error. Please try again"}), 400

@app.route("/api/user_login", methods=["POST"])
def user_signup():
    data = request.json
    user_id = data.get("user_id")
    password = data.get("password")
    result = bm.user_login(user_id, password)
    
    if result == 0:
        return jsonify({"message": "Login successful"}), 201
    elif result == 1:
        return jsonify({"error": "Login failed. Incorrect credentials or user doesn't exist."}), 400
    elif result == 2:
        return jsonify({"error": "Unknown Error. Please try again"}), 400


@app.route("/api/get_user/<user_id>", methods=["GET"])
def get_user(user_id):
    user = bm.find_user_by_id(user_id)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found."}), 404

@app.route("/api/get_challenge/<challenge_id>", methods=["GET"])
def get_challenge(challenge_id):
    challenge = bm.find_challenge_by_id(challenge_id)
    if challenge:
        return jsonify(challenge)
    return jsonify({"error": "Challenge not found."}), 404

@app.route("/api/get_todays_challenges", methods=["GET"])
def get_todays_challenges():
    pass
    # today_challenges = [challenge for challenge in daily_challenge_schedule if challenge["date"] == today]
    # return jsonify(today_challenges)

@app.route("/api/get_next_attempt_id/<user_id>", methods=["GET"])
def get_next_attempt_id(user_id):
    next_attempt_id = bm.get_next_attempt_id(user_id)
    if next_attempt_id:
        return jsonify(next_attempt_id)
    return jsonify({"error": "Unknown Error"}), 400

@app.route("/api/create_attempt", methods=["POST"])

def create_attempt():
    data = request.json
    attempt_id = data.get("challenge_id")
    user_id = data.get("user_id")
    steps = data.get("steps")
    time_taken = data.get("time_taken")
    route = data.get("route")

    result = bm.create_attempt(attempt_id = attempt_id, user_id = user_id, steps=steps, time_taken=time_taken, route=route)

    if result == 0:
        return jsonify({"message": "Attempt created successfully."}), 200
    elif result == 1:
        return jsonify({"error": "User not found."}), 404
    elif result == 2:
        return jsonify({"error": "Unknown Error."}), 400

@app.route("/api/get_attempt_result", methods=["GET"])
def get_attempt_result():
    user_id = request.args.get("userId")
    attempt_id = int(request.args.get("attemptId"))
    attempt = bm.get_attempt_result(user_id=user_id, attempt_id=attempt_id)
    if attempt:
        return jsonify(attempt), 200
    else :
        return jsonify({"error": "Unknown error: Likely either user or attempt not found."}), 404

@app.route("/api/add_friend", methods=["POST"])
def add_friend():
    data = request.json
    user_id = data.get("user_id")
    friend_id = data.get("friend_id")
    result = bm.add_friend(user_id=user_id, friend_id=friend_id)

    if result == 0:
        return jsonify({"message": "Friend added successfully."}), 200
    elif result == 1:
        return jsonify({"error": "User or friend not found."}), 404
    elif result == 2:
        return jsonify({"error": "Friend already exists."}), 400


# Main Execution
if __name__ == "__main__":
    app.run(debug=True)
