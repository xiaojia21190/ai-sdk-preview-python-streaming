import random


def get_current_weather(location):
    # Generate a random temperature between -30 and 110 Fahrenheit
    temperature = random.randint(-30, 110)

    return {
        "temperature": temperature,
        "unit": "fahrenheit",
        "location": location,
    }
