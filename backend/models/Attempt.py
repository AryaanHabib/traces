from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass
class Attempt:
    attempt_id: int
    challenge_id: int
    completion_status: int  # 0: Success, 1: Failure due to exceeding time, 2: Failure due to shape mismatch
    steps_earned: int
    score_earned: int
    # !!!
    # simplified_route_image: Optional[str]  # Path or URL to the image, can be Non
    attempt_date: date
    time_taken: float  # Time taken in seconds

    def __post_init__(self):
        # Validate completion_status
        if self.completion_status not in {0, 1, 2}:
            raise ValueError("completion_status must be 0 (Success), 1 (Failure due to exceeding time), or 2 (Failure due to shape mismatch)")

        # Ensure steps_earned is non-negative
        if self.steps_earned < 0:
            raise ValueError("steps_earned cannot be negative")

        # Ensure score_earned is non-negative
        if self.score_earned < 0:
            raise ValueError("score_earned cannot be negative")

        # Ensure time_taken is non-negative
        if self.time_taken < 0:
            raise ValueError("time_taken cannot be negative")