import os
import sys
from typing import Dict, List, Tuple
from datetime import date

# current_directory = os.path.dirname(os.path.abspath(__file__))
# sys.path.append(current_directory)

from models.user import User
from models.challenge import Challenge
from models.attempt import Attempt

challenge_schedule = Dict[date, Tuple[Challenge, Challenge, Challenge]]
Route = List[Dict[str, float]]

class BackendManager:
    """
    Main class that manages the entire backend, including users, challenges, attempts, etc.
    """
    def __init__(self) -> None:
        self.users: List[User] = []
        self.challenges: List[Challenge] = []
        self.challenges: List[Challenge] = [Challenge(1, "Square","Have exactly 4 sides and make sure all sides are same in length", 1, 30)]
        self.daily_challenge_schedule: challenge_schedule = {}  # key: date, value: tuple of 3 Challenges

    def user_signup(self, user_id: str, password: str, name: str):
        """
        Return codes:
            0 => User created successfully
            1 => User already exists
            2 => Unknown Error
        """
        try:
            # Check if user already exists
            for u in self.users:
                if u.user_id == user_id:
                    return 1  # user already exists

            # Create new user
            new_user = User(
                user_id=user_id,
                name=name,
                password=password,
                steps=0,
                score=0,
                attempts=[],
                friends=[]
            )
            self.users.append(new_user)
            return 0
        except Exception as e:
            print("Error in user_signup:", e)
            return 2  # Unknown error

    def user_login(self, user_id: str, password: str):
        """
        Return codes:
            0 => Login successful
            1 => Incorrect credentials or user doesn't exist
            2 => Unknown Error
        """
        try:
            for u in self.users:
                if u.user_id == user_id and u.password == password:
                    return 0  # success
            return 1  # not found or wrong password
        except Exception as e:
            print("Error in user_login:", e)
            return 2  # unknown error

    def get_user(self, user_id: str):
        """
        Return the User dataclass instance if found; otherwise None.
        """
        for u in self.users:
            if u.user_id == user_id:
                return u
        return None

    def get_challenge(self, challenge_id: str):
        """
        Return the Challenge dataclass if found; otherwise None.
        """
        for c in self.challenges:
            if c.challenge_id == int(challenge_id):
                return c
        return None

    def get_attempt(self, user_id: str, attempt_id: int):
        """
        Return the Attempt dataclass if found; otherwise None.
        If attempt_id == -1, return the latest attempt for the user (if any).
        """
        # Find the user
        user = None
        for u in self.users:
            if u.user_id == user_id:
                user = u
                break
        
        # If attempt_id == -1, return the latest attempt
        if attempt_id == -1:
            if not user.attempts:
                return None
            return user.attempts[-1]  # Return the latest attempt

        # Otherwise, find attempt with that ID
        for a in user.attempts:
            if a.attempt_id == attempt_id:
                return a
        return None

    def add_friend(self, user_id: str, friend_id: str):
        """
        Return codes:
            0 => Friend added successfully
            1 => User or friend not found
            2 => Friend already exists
        """
        user = None
        friend_user = None

        for u in self.users:
            if u.user_id == user_id:
                user = u
            if u.user_id == friend_id:
                friend_user = u

        if not user or not friend_user:
            return 1  # user or friend not found

        # Check if friend_user is already in user's friend list
        if friend_user in user.friends:
            return 2  # friend already exists

        user.friends.append(friend_user)
        return 0

    def get_todays_challenges(self):
        """
        Return a tuple of Challenge objects for today's date, or None if not scheduled.
        """
        today = date.today()
        return self.daily_challenge_schedule.get(today, None)

    def create_attempt(self, attempt_id: int, user_id: str, steps: int, time_taken: int, route):
        """
        Stub: intentionally unimplemented as requested.
        Return codes:
            0 => Attempt created successfully
            1 => User not found
            2 => Unknown Error
        """
        pass


# Single instance of BackendManager
bm = BackendManager()