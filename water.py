# python draft of water tracking mechanism
# uses keyboard input (enter) rather than on-click due to limitations of python

import keyboard  # to capture enter key input
import time  # for delay in the loop

def water_tracker():
    # Prompt for bottle size with error handling
    while True:
        try:
            bottle_size = float(input("Enter the size of your water bottle in milliliters: "))
            if bottle_size <= 0:
                print("Bottle size must be a positive number. Please try again.")
            else:
                break
        except ValueError:
            print("Invalid input. Please enter a valid number.")
    
    daily_goal = 2000.0  # 2 liters in milliliters
    total_intake = 0.0
    
    print("\nPress 'Enter' each time you finish a bottle.")
    print("Tracking your water intake...\n")
    
    # Main loop to track water intake
    while total_intake < daily_goal:
        if keyboard.is_pressed("enter"):
            total_intake += bottle_size
            print(f"Current water intake: {total_intake:.2f} mL")
            
            # Wait for enter to be released to avoid repeated inputs
            time.sleep(0.5)  # Small delay to prevent multiple counts from a single press

        # Check if goal is met
        if total_intake >= daily_goal:
            print("\nCongratulations! You've reached your daily water goal of 2000 milliliters (2 liters)!")
            break

# Run the program
water_tracker()
