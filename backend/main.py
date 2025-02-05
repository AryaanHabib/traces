from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
from dataclasses import asdict
from BackendManager import bm

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# ---------------------------------------------------------------------
# Test Routes
# ---------------------------------------------------------------------
@app.route("/api/test_get/<num>", methods=["GET"])
def test_get(num):
    print(num)
    return jsonify(int(num) * 2)


@app.route("/api/test_post", methods=["POST"])
def test_post():
    data = request.json
    num1 = int(data.get("num1"))
    num2 = int(data.get("num2"))
    print(num1, num2)
    return jsonify({"message": num1 * num2}), 200


# ---------------------------------------------------------------------
# User Signup and Login
# ---------------------------------------------------------------------
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
def user_login():
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


# ---------------------------------------------------------------------
# User Retrieval
# ---------------------------------------------------------------------
@app.route("/api/get_user/<user_id>", methods=["GET"])
def get_user(user_id):
    user = bm.get_user(user_id)
    if user is None:
        return jsonify({"error": "User not found."}), 404

    user_dict = asdict(user)

    # Mask password
    user_dict["password"] = "******"

    # Flatten friends to a list of friend IDs
    if "friends" in user_dict:
        user_dict["friends"] = [friend.user_id for friend in user.friends]

    return jsonify(user_dict), 200


# ---------------------------------------------------------------------
# Challenge Retrieval
# ---------------------------------------------------------------------
@app.route("/api/get_challenge/<challenge_id>", methods=["GET"])
def get_challenge(challenge_id):
    challenge_id = int(challenge_id)
    challenge = bm.get_challenge(challenge_id)

    if challenge is None:
        return jsonify({"error": "Challenge not found."}), 404
    return jsonify(asdict(challenge)), 200


# ---------------------------------------------------------------------
# Today's Challenges
# ---------------------------------------------------------------------
@app.route("/api/get_todays_challenges", methods=["GET"])
def get_todays_challenges():
    challenges_tuple = bm.get_todays_challenges()
    if not challenges_tuple:
        return jsonify({"error": "No Challenges present."}), 400

    # Convert each Challenge dataclass to a dict
    challenges_list = [asdict(ch) for ch in challenges_tuple]
    return jsonify(challenges_list), 200


# ---------------------------------------------------------------------
# Attempts
# ---------------------------------------------------------------------



@app.route("/api/get_attempt", methods=["GET"])
def get_attempt():
    user_id = request.args.get("userId")
    attempt_id = int(request.args.get("attemptId"))
    attempt = bm.get_attempt(user_id=user_id, attempt_id=attempt_id)
    if attempt is None:
        return jsonify({"error": "Unknown error: Likely either user or attempt not found."}), 404

    return jsonify(asdict(attempt)), 200


# ---------------------------------------------------------------------
# Friends
# ---------------------------------------------------------------------
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

@app.route('/api/challenges/start', methods=['POST'])
def start_challenge():
    try:
        data = request.json
        print("Challenge started:", data)

        # Simulate storing or processing the data
        # You can add database logic here

        return jsonify({"message": "Challenge started successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route('/attempts', methods=['POST'])
# def save_attempt():
#     """
#     Endpoint to save attempt data.
#     Request body should include 'coordinates', 'steps', and 'time_taken'.
#     """
#     try:
#         data = request.json
#         print("STATE :", data)
#         user_id = "user123"  # Replace with the actual user ID, e.g., from a session
#         attempt_id = len(bm.get_user(user_id).attempts) + 1  # Generate attempt ID
#         coordinates = data.get("coordinates")
#         steps = data.get("steps")
#         time_taken = data.get("time_taken")

#         # Simulate saving the attempt
#         bm.create_attempt(attempt_id, user_id, steps, time_taken, coordinates)
#         return jsonify({"message": "Attempt saved successfully!"}), 200
#     except Exception as e:
#         print(f"Error saving attempt: {e}")
#         return jsonify({"error": "Failed to save attempt"}), 500
    
# ---------------------------------------------------------------------
# Run the App
# ---------------------------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


@app.route("/api/create_attempt", methods=["POST"])
def create_attempt():
    data = request.json
    challenge_id = data.get("challenge_id")
    user_id = data.get("user_id")
    steps = data.get("steps")
    time_taken = data.get("time_taken")
    route = data.get("route")

    result = bm.create_attempt(
        attempt_id=challenge_id,
        user_id=user_id,
        steps=steps,
        time_taken=time_taken,
        route=route
    )

    if result == 0:
        return jsonify({"message": "Attempt created successfully."}), 200
    elif result == 1:
        return jsonify({"error": "User not found."}), 404
    elif result == 2:
        return jsonify({"error": "Unknown Error."}), 400
