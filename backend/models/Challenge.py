from dataclasses import dataclass
from typing import Optional

@dataclass
class Challenge:
    challenge_id: int
    shape: str
    acceptance_criteria: str
    difficulty_level: int
    time: int  # Time in minutes, determined by difficulty level
    challenge_type: str  # "Daily" or "Bonus"

    def __post_init__(self):
        # Validate difficulty_level
        if self.difficulty_level < 1 or self.difficulty_level > 5:
            raise ValueError("difficulty_level must be between 1 and 5")

        # Validate time
        if self.time <= 0:
            raise ValueError("time must be a positive integer")

        # Validate challenge_type
        if self.challenge_type not in {"Daily", "Bonus"}:
            raise ValueError("challenge_type must be either 'Daily' or 'Bonus'")
