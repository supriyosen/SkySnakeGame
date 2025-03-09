# Sky Snake Game

A 3D snake game built with Three.js where you navigate a colorful snake through a sky environment, collecting food and competing against an AI opponent.

![Sky Snake Game Screenshot](https://i.imgur.com/placeholder.jpg)

## Play the Game

You can play the game online at: [https://supriyosen.github.io/SkySnake/](https://supriyosen.github.io/SkySnake/)

## Features

- **3D Gameplay**: Beautiful sky environment with dynamic lighting
- **Ambient Music & Sound Effects**: Immersive audio experience
- **AI Opponent**: Computer-controlled snake that competes for food
- **Floating Food System**: Food items scattered at different elevations in the sky
- **Score Tracking**: Real-time score display for both player and AI
- **Speed Powerups**: Collect special items for temporary speed boosts
- **Visual Effects**: Bubble burst animations when eating food
- **Notifications**: Visual feedback for important game events
- **Responsive Controls**: Intuitive keyboard controls for smooth gameplay

## Controls

- **W/S**: Pitch Up/Down
- **A/D**: Turn Left/Right
- **Space**: Temporary Speed Boost
- **P**: Use Speed Powerup
- **M**: Toggle Music On/Off

## How to Play

1. Enter your name and click "Start Game"
2. Navigate your snake to eat the yellow food cubes floating in the sky
3. Collect cyan speed powerups for a temporary speed boost
4. Avoid colliding with the AI snake, your own body, or the world boundaries
5. Try to get a higher score than the AI opponent
6. The game ends when you crash - see how high a score you can achieve!

## Technical Details

This game was developed using:
- **Three.js**: For 3D rendering and physics
- **HTML5 Canvas**: For UI elements
- **Web Audio API**: For sound effects and music
- **JavaScript**: For game logic and AI behavior

## Local Development

To run the game locally:

1. Clone this repository
   ```
   git clone https://github.com/supriyosen/SkySnake.git
   ```
2. Navigate to the project directory
   ```
   cd SkySnake
   ```
3. Start a local server (e.g., using Python)
   ```
   python -m http.server 8000
   ```
   or
   ```
   python3 -m http.server 8000
   ```
4. Open your browser and go to `http://localhost:8000`

## Credits

- **Background Music**: "Elysium.mp3"
- **Sound Effects**: "eating-sound.wav"
- **Development**: Supriyosen

## License

This project is open source and available under the MIT License. 