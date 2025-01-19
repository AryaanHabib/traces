from dataclasses import dataclass
from typing import List
from attempt import Attempt
from __future__ import annotations

@dataclass
class User:
    user_id: str
    name: str
    password: str
    steps: int
    score: int
    attempts: List[Attempt]
    friends: List[User]

    def __post_init__(self):
        # Ensure steps is non-negative
        if self.steps < 0:
            raise ValueError("steps cannot be negative")

        # Ensure score is non-negative
        if self.score < 0:
            raise ValueError("score cannot be negative")

        # Ensure password is not empty
        if not self.password:
            raise ValueError("password cannot be empty")

        # Ensure attempts is a list of Attempt objects
        if not all(isinstance(attempt, Attempt) for attempt in self.attempts):
            raise TypeError("attempts must be a list of Attempt objects")

        # Ensure friends is a list of User objects
        if not all(isinstance(friend, User) for friend in self.friends):
            raise TypeError("friends must be a list of User objects")
