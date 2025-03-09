// Generate a random ID for the player
function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Initialize multiplayer functionality
function initMultiplayer() {
    // This is a simplified version that doesn't actually connect to other players
    // but allows the game to run without errors
    console.log("Multiplayer initialized (simplified version)");
    connections = [];
}

// Function to broadcast player updates to other players (simplified)
function broadcastUpdate() {
    // Simplified version that doesn't actually send data
    // but allows the game to run without errors
}

// Function to broadcast powerup eaten (simplified)
function broadcastPowerupEaten(index) {
    // Simplified version that doesn't actually send data
    // but allows the game to run without errors
}

// Create the AI snake
function createAISnake() {
    // Choose a random color for the AI snake
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    const aiColor = COLORS[colorIndex];
    
    // Create the AI snake at a random position
    const x = (Math.random() - 0.5) * WORLD_SIZE * 0.5;
    const y = 20 + Math.random() * 30;
    const z = (Math.random() - 0.5) * WORLD_SIZE * 0.5;
    const startPosition = new THREE.Vector3(x, y, z);
    
    // Create the AI snake object
    aiSnake = {
        id: 'ai',
        name: 'Computer',
        segments: [],
        direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(),
        rotationY: Math.random() * Math.PI * 2,
        color: aiColor,
        length: 5,
        speed: MOVE_SPEED * 1.1, // Slightly faster than player to make it more competitive
        score: 0,
        targetFood: null
    };
    
    // Create the snake's head
    const headGeometry = new THREE.BoxGeometry(SEGMENT_SIZE * 2.4, SEGMENT_SIZE * 2, SEGMENT_SIZE * 2);
    const headMaterial = new THREE.MeshStandardMaterial({ 
        color: aiColor,
        roughness: 0.5,
        metalness: 0.5
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    
    // Add eyes to the head
    const eyeGeometry = new THREE.BoxGeometry(SEGMENT_SIZE * 0.4, SEGMENT_SIZE * 0.4, SEGMENT_SIZE * 0.4);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(SEGMENT_SIZE * 1.1, SEGMENT_SIZE * 0.5, -SEGMENT_SIZE * 0.5);
    head.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(SEGMENT_SIZE * 1.1, SEGMENT_SIZE * 0.5, SEGMENT_SIZE * 0.5);
    head.add(rightEye);
    
    const leftPupil = new THREE.Mesh(
        new THREE.BoxGeometry(SEGMENT_SIZE * 0.2, SEGMENT_SIZE * 0.2, SEGMENT_SIZE * 0.2),
        pupilMaterial
    );
    leftPupil.position.set(SEGMENT_SIZE * 0.2, 0, 0);
    leftEye.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(
        new THREE.BoxGeometry(SEGMENT_SIZE * 0.2, SEGMENT_SIZE * 0.2, SEGMENT_SIZE * 0.2),
        pupilMaterial
    );
    rightPupil.position.set(SEGMENT_SIZE * 0.2, 0, 0);
    rightEye.add(rightPupil);
    
    // Position the head
    head.position.copy(startPosition);
    scene.add(head);
    
    // Add the head to the snake's segments
    aiSnake.segments.push({
        mesh: head,
        position: startPosition.clone()
    });
    
    // Create the initial body segments
    for (let i = 1; i < aiSnake.length; i++) {
        addSegment(aiSnake);
    }
    
    // Name labels have been disabled
    // addNameLabel(aiSnake);
    
    // Update the score display
    updateScoreDisplay();
    
    return aiSnake;
}

// Update the AI snake's behavior
function updateAISnake() {
    if (!aiSnake || aiSnake.segments.length === 0) return;
    
    // Only update AI decisions periodically to save performance
    const currentTime = Date.now();
    if (!aiSnake.lastUpdateTime) {
        aiSnake.lastUpdateTime = currentTime;
    }
    
    if (currentTime - aiSnake.lastUpdateTime < 500) return;
    aiSnake.lastUpdateTime = currentTime;
    
    const head = aiSnake.segments[0];
    const headPosition = head.position.clone();
    
    // Find the closest food
    let closestFood = null;
    let closestDistance = Infinity;
    
    for (let i = 0; i < food.length; i++) {
        const foodItem = food[i];
        const distance = headPosition.distanceTo(foodItem.group.position);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestFood = foodItem;
        }
    }
    
    // If there's no food, just keep moving
    if (!closestFood) return;
    
    // Set the target food
    aiSnake.targetFood = closestFood;
    
    // Calculate direction to the food
    const toFood = new THREE.Vector3().subVectors(
        closestFood.group.position,
        headPosition
    ).normalize();
    
    // Add some randomness to make movement more natural
    const randomFactor = 0.2;
    toFood.x += (Math.random() - 0.5) * randomFactor;
    toFood.z += (Math.random() - 0.5) * randomFactor;
    toFood.normalize();
    
    // Gradually adjust the direction to target food
    const turnSpeed = 0.2;
    aiSnake.direction.lerp(toFood, turnSpeed);
    aiSnake.direction.normalize();
    
    // Update the rotation to match the direction
    const targetRotationY = Math.atan2(aiSnake.direction.x, aiSnake.direction.z);
    
    // Smoothly rotate towards the target rotation
    const rotationDiff = targetRotationY - aiSnake.rotationY;
    
    // Handle the case where the rotation crosses the -PI/PI boundary
    if (rotationDiff > Math.PI) {
        aiSnake.rotationY += (rotationDiff - 2 * Math.PI) * turnSpeed;
    } else if (rotationDiff < -Math.PI) {
        aiSnake.rotationY += (rotationDiff + 2 * Math.PI) * turnSpeed;
    } else {
        aiSnake.rotationY += rotationDiff * turnSpeed;
    }
    
    // Adjust height to match food height
    const heightDiff = closestFood.group.position.y - headPosition.y;
    aiSnake.direction.y = Math.max(-0.5, Math.min(0.5, heightDiff * 0.1));
}

// Add a name label above a snake
function addNameLabel(snake) {
    // Function disabled - no name labels will be created
    return; // Early return to prevent label creation
    
    // The code below will not execute due to the return statement above
    // Create a canvas for the name label - reduce size by half
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 128; // Reduced from 256
    canvas.height = 32; // Reduced from 64
    
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw rounded rectangle background
    const cornerRadius = 6; // Reduced from 10 to match smaller size
    context.fillStyle = 'rgba(70, 70, 70, 0.7)';
    
    // Draw rounded rectangle
    context.beginPath();
    context.moveTo(cornerRadius, 0);
    context.lineTo(canvas.width - cornerRadius, 0);
    context.quadraticCurveTo(canvas.width, 0, canvas.width, cornerRadius);
    context.lineTo(canvas.width, canvas.height - cornerRadius);
    context.quadraticCurveTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height);
    context.lineTo(cornerRadius, canvas.height);
    context.quadraticCurveTo(0, canvas.height, 0, canvas.height - cornerRadius);
    context.lineTo(0, cornerRadius);
    context.quadraticCurveTo(0, 0, cornerRadius, 0);
    context.closePath();
    context.fill();
    
    // Draw the name - smaller font
    context.font = '14px Arial'; // Reduced from 20px
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(snake.name, canvas.width / 2, canvas.height / 2);
    
    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    
    // Create a sprite material
    const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true
    });
    
    // Create a sprite - reduce size by half again
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(3, 0.75, 1); // Reduced from 6, 1.5, 1
    
    // Position the sprite above the snake's head
    const head = snake.segments[0];
    sprite.position.copy(head.position);
    sprite.position.y += 2.5; // Reduced from 3 to position closer to the snake
    
    // Add the sprite to the scene
    scene.add(sprite);
    
    // Store the sprite in the snake object
    snake.nameLabel = sprite;
}

// Update the score display
function updateScoreDisplay() {
    // Update player score
    if (playerSnake) {
        document.getElementById('score').textContent = playerSnake.score;
    }
    
    // Update AI score
    if (aiSnake) {
        document.getElementById('aiScore').textContent = aiSnake.score;
    }
}

// Game over function
function gameOver(reason = "You crashed!") {
    // Show game over message
    showNotification(`Game Over: ${reason}`, "#ff0000");
    
    // Stop the game
    gameRunning = false;
    
    // Show the start menu after a delay
    setTimeout(() => {
        document.getElementById('startMenu').style.display = 'block';
    }, 3000);
    
    // Remove the player's snake
    if (playerSnake) {
        playerSnake.segments.forEach(segment => {
            scene.remove(segment.mesh);
        });
        if (playerSnake.nameLabel) {
            scene.remove(playerSnake.nameLabel);
        }
        playerSnake = null;
    }
}

