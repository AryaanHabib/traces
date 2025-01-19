import os
import sys
from typing import List

# current_directory = os.path.dirname(os.path.abspath(__file__))
# sys.path.append(current_directory)


from models.User import User

# users = []
# challenges = []
# daily_challenge_schedule = []

# today = "2025-01-17"  # Replace with dynamic date logic in production

class BackendManager:
    """
    Main class that manages the entire backend, including students, questions, rubrics, and reference answers.
    """
    def __init__(self) -> None:
        self.users: List[User] = []
        self.challenges: List[Challenge] = []
        self.daily_challenge_schedule = [] #!!!
        self.date = ""
    
    def user_signup(self, user: str, password: str, name: str):
         
        return 2
    
    def user_login(self, user: str, password: str):
         
        return 2
    
    def find_user_by_id():
        pass


# Single instance of BackendManager
bm = BackendManager()