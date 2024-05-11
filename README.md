*** Game 2(b): Gallery Shooter Implementation ***
assignment goals:

- The goal of this assignment is to implement your gallery shooter game design from assignment Game 2(a) Gallery shooter design
- Via this implementation, you will combine together many different Phaser and JavaScript capabilities which you have so far learned in isolation, including input, movement along a path, global/class/local scoped variables, grouping similar game objects (arrays/groups), collision detection, creating visual game assets, putting text on screen, and more.

*** Implementation ***

- Your game code needs to, at minimum, implement the required elements from your game design. This includes player avatar movement, enemy waves, enemy paths, player emitted objects, enemy emitted objects, multiple enemy types, score reward system, player health system, and level reset.
- Your game code must meet the following criteria:
    - Written in JavaScript using the Phaser game development library
    - Uses at least one Scene class
    - Uses keyboard or mouse input (please contact a TA or instructor if you wish to use a gamepad)
    - Uses off-the-shelf art and audio assets (the learning objective is to focus on the game programming, not art or audio elements)
    - Uses some mechanism to keep all game sprites/objects grouped together. This could be an array, an object, or a Phaser game group.
    - Use of loops to check for object collisions. (For example, if your game has 10 enemies and 10 player bullets, your code should not have 100 lines that check each potential collision. )
    - There must be an end game state that includes a visual component.
    - After the game ends, it must be possible to reset the game and begin playing again (perhaps after returning to a title/demo screen), without restarting the game from Visual Studio. This requires the use of an initialization function which will reset all game variables back to their initial conditions. A recommended approach is to have your create() function call a separate init_game() function which resets all of the game variables.

*** Bonus Elements ***
- Multiple distinct levels (up to 3 points, depending on complexity, 1 point per level unless it is especially complex)
- High score (0.5 point for a simple high score, 1 point for high score saved/restored from disk, 2 points for a high score screen)
- Title/demo attract screen (up to 3 points depending on complexity and depth of elements. A static title screen is 1 point. Animations and demo/attract required for access to the remaining 2 points).
- Scrolling starfield. (0.5 point)
- Boss battle. (up to 3 points depending on complexity. The boss must have at least two behavior phases to go beyond 1 point). 
- Controls/credits screens. (up to 2 points, 0.5 point per screen, plus an additional point for animations on screen)