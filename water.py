# python draft of water tracking mechanism
# uses keyboard input (enter) rather than on-click due to limitations of python

import keyboard  # capture space bar input
import time  # create a delay in the loop

def water_tracker():
    try:
        bottle_size = float(input("Enter the size of your water bottle in liters: "))
    except ValueError:
        print("Invalid input. Please enter a number.")
        return
    
    daily_goal = 2.0
    total_intake = 0.0
    
    print("\nPress enter each time you finish a bottle.")
    print("Let's start tracking your water intake!\n")
    
    while total_intake < daily_goal:
        if keyboard.is_pressed("enter"):
            total_intake += bottle_size
            print(f"Current water intake: {total_intake:.2f} L")
            time.sleep(0.5) # prevent multiple counts from one click
        
        if total_intake >= daily_goal:
            print("\nCongratulations! You've reached your daily water goal of 2 liters!")
            break

water_tracker()
