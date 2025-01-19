import os
import sys
from PIL import Image
import torch
from transformers import CLIPProcessor, CLIPModel

# Add the parent directory to sys.path to access BackendManager.py
current_directory = os.path.dirname(os.path.abspath(__file__))
parent_directory = os.path.dirname(current_directory)
sys.path.append(parent_directory)

# Now, import bm from BackendManager.py
from BackendManager import bm  # Import the BackendManager to use bm instance

def validate_image_with_clip(user_id: str, attempt_id: int, challenge_id: int, output_dir="images"):
    # Step 1: Fetch challenge details using challenge_id
    challenge = bm.get_challenge(challenge_id)  # Ensure bm is correctly imported from BackendManager
    if not challenge:
        return "Challenge not found"
    
    # Step 2: Construct the file path for the plot based on user_id and attempt_id
    file_name = f"{user_id}.{attempt_id}.png"
    file_path = os.path.join(output_dir, file_name)

    # Check if the plot file exists
    if not os.path.exists(file_path):
        return f"Plot for attempt {attempt_id} not found."

    # Step 3: Open the image file
    try:
        image = Image.open(file_path)
    except Exception as e:
        return f"Error opening image file: {e}"

    # Step 4: Initialize CLIP model and processor from Hugging Face
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch16")
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch16")

    # Step 5: Prepare the input text and image for CLIP
    prompt = f"Is there a {challenge.shape} in this image, criterion for evaluation {challenge.acceptance_criteria}?"
    
    inputs = processor(text=prompt, images=image, return_tensors="pt", padding=True)

    # Step 6: Run the model to get the similarity between the image and text
    with torch.no_grad():
        outputs = model(**inputs)

    # Step 7: Get the similarity score
    image_features = outputs.image_embeds
    text_features = outputs.text_embeds

    # Compute cosine similarity between image and text features
    similarity = torch.cosine_similarity(image_features, text_features)

    # Step 8: Return the result based on similarity score
    if similarity.item() > 0.228:  # Lower threshold for leniency
        return 0
    else:
        return 1

# Example usage: this would be triggered when an attempt is made
print(validate_image_with_clip(user_id="U001", attempt_id=1, challenge_id=1))