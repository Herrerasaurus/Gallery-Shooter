class Movement extends Phaser.Scene {
    graphics;
    curve;
    path;

    
    
    constructor(){
        super("movementScene");
        this.my = {sprite: {}, text:{}};

        this.posX = 500;
        this.posY = 750;
        this.enmyX = 100;
        this.enmyY = 100;
        this.heartOneX = 320;
        this.heartTwoX = 350;
        this.heartThreeX = 380;
        this.heartY = 30;
        this.keyD;
        this.keyA;
        this.keySpace;


    }
    init_game(){
        console.log("test");
        this.my.sprite.bullet = [];
        this.my.sprite.enemy = [];
        this.my.sprite.other =[];
        this.my.sprite.enemyBullet = [];   
        this.maxBullets = 15;
        this.maxEnemyBullets = 15; 
        this.myScore = 0;
        this.myHealth = 6;
        this.ahh = 0;
        this.ah = 0;
        this.start = 0;
        this.another = 0;
        this.tick = 0;
        this.shockCount = 0;
        this.level = 0;

    }
    

    preload(){
        this.load.setPath("./assets/");
        // Load sprite atlas
        this.load.atlasXML("jumperSheet", "spritesheet_jumper.png", "spritesheet_jumper.xml");

        this.load.image("fire", "flame.png");
        this.load.image("lightblue", "lighting_blue.png");
        this.load.image("lightyellow", "lighting_yellow.png");
        this.load.image("enemy", "cloud.png");
        this.load.image("enemyTwo", "other.png")
        this.load.image("half", "platformPack_item011.png");
        this.load.image("empty", "platformPack_item005.png");
        this.load.image("full", "platformPack_item017.png");
        this.load.image("back", "bg_layer1.png");
        
        this.load.bitmapFont('desyrel', 'https://labs.phaser.io/assets/fonts/bitmap/desyrel.png', 'https://labs.phaser.io/assets/fonts/bitmap/desyrel.xml');
        this.load.bitmapFont('gothic', 'https://labs.phaser.io/assets/fonts/bitmap/gothic.png', 'https://labs.phaser.io/assets/fonts/bitmap/gothic.xml');
        this.load.audio("hit", "twoTone1.ogg");
        this.load.audio("attack", "highUp.ogg");
        this.load.audio("shoot", "tone1.ogg");
        this.load.audio("beam", "laser9.ogg");
        this.load.audio("health", "powerUp7.ogg");
        this.load.audio("death", "zapThreeToneDown.ogg");
        this.load.audio("next", "powerUp3.ogg");
        this.load.audio("big", "zap2.ogg");



    }
    
    create(){
        let my = this.my;   // create an alias to this.my for readability
        // player character
        this.init_game();
        const background = this.add.image(500, 300, "back");

        my.sprite.temp = this.add.sprite(this.posX, this.posY, "jumperSheet", "sun2.png");
        my.sprite.main = this.add.sprite(this.posX, this.posY, "jumperSheet", "sun1.png");
        my.sprite.shock = this.add.sprite(this.posX, this.posY, "jumperSheet", "spikeBall1.png");
        my.sprite.main.setScale(0.5);
        my.sprite.temp.setScale(0.5); 
        my.sprite.shock.setScale(0.5);
        my.sprite.shock.visible = false;
        my.sprite.temp.visible = false;

        // emeny characters
        
        // enemy path
        this.points = [
            110, 110,
            310, 80,
            500, 130,
            690, 80,
            860, 120,
            770, 270,
            620, 230,
            410, 290,
            220, 230,
            100, 320,
            270, 430,
            500, 380,
            680, 430,
            870, 390,
            920, 510,
            800, 580,
            580, 540,
            400, 530,
            190, 580,
            120, 670,
            330, 670,
            500, 650,
            650, 670,
            890, 670
        ];
        this.check = [
            120, 670,
            330, 670,
            500, 650,
            650, 670,
            890, 670
        ];
        
        this.curve = new Phaser.Curves.Spline(this.points);
        this.graphics = this.add.graphics();
        this.xImages = [];
        //this.drawPoints();
        //this.drawLine();
        this.createEnemy();

        my.sprite.main.debug = true;
        

        // input
        my.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        my.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.runMode = false;
        

        // speed and counter
        this.playerSpeed = 5;
        this.bulletSpeed = 10;
        this.counter = 0;

        // health and score
        my.text.score = this.add.bitmapText(10, 10, "gothic", "Score: " + this.myScore, 30);
        my.text.health = this.add.bitmapText(200, 10, "gothic", "Health: ", 30);
        my.text.wave = this.add.bitmapText(350, 500, "gothic", "Wave 1", 100);

        my.text.counter = this.add.bitmapText(470, 400, "gothic", "5", 100);



        my.sprite.heartOne3 = this.add.sprite(this.heartOneX, this.heartY, "empty");
        my.sprite.heartTwo3 = this.add.sprite(this.heartTwoX, this.heartY, "empty");
        my.sprite.heartThree3 = this.add.sprite(this.heartThreeX, this.heartY, "empty");
        my.sprite.heartOne2 = this.add.sprite(this.heartOneX, this.heartY, "half");
        my.sprite.heartTwo2 = this.add.sprite(this.heartTwoX, this.heartY, "half");
        my.sprite.heartThree2 = this.add.sprite(this.heartThreeX, this.heartY, "half");
        my.sprite.heartOne = this.add.sprite(this.heartOneX, this.heartY, "full");
        my.sprite.heartTwo = this.add.sprite(this.heartTwoX, this.heartY, "full");
        my.sprite.heartThree = this.add.sprite(this.heartThreeX, this.heartY, "full");
        

        my.sprite.heartOne2.visible = false;
        my.sprite.heartTwo2.visible = false;
        my.sprite.heartThree2.visible = false;
        my.sprite.heartOne3.visible = false;
        my.sprite.heartTwo3.visible = false;
        my.sprite.heartThree3.visible = false;

        
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        my.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    }
    createEnemy(){
        let my = this.my;
        for(let x = 0; x < 5; x++){
            my.sprite.enemy.push(this.add.follower(this.curve, 0, 0, "enemy"));
        }
        let temp = 0;
        for (let enemy of my.sprite.enemy) {
            enemy.x = this.curve.points[temp].x;
            enemy.y = this.curve.points[temp].y;
            temp +=1;
            enemy.setScale(0.5);
            enemy.setTint(0xff0000);
            enemy.stopFollow();
            enemy.startFollow({
                duration: 25000,
                positionOnPath: true,
                delay: temp * 900,
                yoyo: true,
                repeat: -1
    
                });
            
            
            enemy.lastFired = 0;
            enemy.debug = true;
            enemy.scorePoints = 10;
        }
    }

    createEnemyTwo(){
        let my = this.my;
        for(let x = 0; x < 5; x++){
            my.sprite.enemy.push(this.add.follower(this.curve, 0, 0, "enemy"));
            my.sprite.other.push(this.add.follower(this.curve, 0, 0, "enemyTwo"));


        }
        let temp = 0;
        for (let enemy of my.sprite.enemy) {
            enemy.x = this.curve.points[temp].x;
            enemy.y = this.curve.points[temp].y;
            temp +=1;
            enemy.setScale(0.5);
            enemy.stopFollow();
            enemy.startFollow({
                duration: 25000,
                positionOnPath: true,
                delay: temp * 900,
                yoyo: true,
                repeat: -1
    
                });
            
            
            enemy.lastFired = 0;
            enemy.debug = true;
            enemy.scorePoints = 10;
        }
        temp = 0;
        for (let enemy of my.sprite.other) {
            enemy.x = this.curve.points[temp].x;
            enemy.y = this.curve.points[temp].y;
            temp +=1;
            enemy.setTint(0x0000ff);
            enemy.setScale(0.5);
            enemy.stopFollow();
            enemy.startFollow({
                duration: 10000,
                positionOnPath: true,
                ease: 'Sine.easeInQuint',
                delay: temp * 900,
                yoyo: true,
                repeat: -1
    
                });
            
            
            enemy.lastFired = 0;
            enemy.debug = true;
            enemy.scorePoints = 10;
        }
    }

    createEnemyThree(){
        let my = this.my;
        for(let x = 0; x < 5; x++){
            my.sprite.enemy.push(this.add.follower(this.curve, 0, 0, "enemy"));
            my.sprite.other.push(this.add.follower(this.curve, 0, 0, "enemyTwo"));
            my.sprite.other.push(this.add.follower(this.curve, 0, 0, "enemyTwo"));

        }
        let temp = 0;
        for (let enemy of my.sprite.enemy) {
            enemy.x = this.curve.points[temp].x;
            enemy.y = this.curve.points[temp].y;
            temp +=1;
            enemy.setScale(0.5);
            enemy.stopFollow();
            enemy.startFollow({
                duration: 25000,
                positionOnPath: true,
                delay: temp * 900,
                yoyo: true,
                repeat: -1
    
                });
            
            
            enemy.lastFired = 0;
            enemy.debug = true;
            enemy.scorePoints = 10;
        }
        temp = 0;
        for (let enemy of my.sprite.other) {
            enemy.x = this.curve.points[temp].x;
            enemy.y = this.curve.points[temp].y;
            temp +=1;
            enemy.setTint(0x0000ff);
            enemy.setScale(0.5);
            enemy.stopFollow();
            enemy.startFollow({
                duration: 10000,
                positionOnPath: true,
                ease: 'Sine.easeInQuint',
                delay: temp * 900,
                yoyo: true,
                repeat: -1
    
                });
            
            
            enemy.lastFired = 0;
            enemy.debug = true;
            enemy.scorePoints = 10;
        }
    }

    destroyEnemy(){
        let my = this.my;
        
        for(let enemy of my.sprite.enemy){
            enemy.stopFollow();
            enemy.destroy();
        }
        my.sprite.enemy = my.sprite.enemy.filter((enemy) => enemy.visible == true);
        for(let enemy of my.sprite.other){
            enemy.stopFollow();
            enemy.destroy();
        }
        my.sprite.other = my.sprite.other.filter((enemy) => enemy.visible == true);

    }

    drawPoints() {
        for (let point of this.curve.points) {
            this.xImages.push(this.add.image(point.x, point.y, "x-mark"));
        }
    }
    drawLine() {
        this.graphics.clear();                      // Clear the existing line
        this.graphics.lineStyle(2, 0xffffff, 1);    // A white line
        this.curve.draw(this.graphics, 32);         // Draw the spline
    }
    enemyFire(){
        let my = this.my;
        for(let enemy of my.sprite.enemy){
            if(enemy.active == false){
                return;
            }
            
            //let tempx = 0;
            //let tempy = 1;
            //for(let z = 1; z < 14; z++){
            //    if(enemy.x == this.check[z*tempx] && enemy.y == this.check[z*tempy]){
            my.sprite.enemyBullet.push(this.add.sprite(
                enemy.x, enemy.y+(enemy.displayHeight/2), "lightyellow")
            );                
            
            enemy.lastFired = 0;
            }

    }

    updateScore(){
        let my = this.my;
        my.text.score.setText("Score: " + this.myScore);

    }
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
    healthEdit(){
        let my = this.my;


        if(this.myHealth == 6){
            my.sprite.heartThree.visible = true;
            my.sprite.heartThree2.visible = false;
        } else if(this.myHealth == 5){
            my.sprite.heartThree.visible = false;
            my.sprite.heartThree2.visible = true;
        } else if(this.myHealth == 4){
            my.sprite.heartThree2.visible = false;
            my.sprite.heartThree3.visible = true;
            my.sprite.heartTwo.visible = true;
        } else if(this.myHealth == 3){
            my.sprite.heartTwo.visible = false;
            my.sprite.heartTwo2.visible = true;
        } else if(this.myHealth == 2){
            my.sprite.heartTwo2.visible = false;
            my.sprite.heartTwo3.visible = true;
            my.sprite.heartOne.visible = true;
        } else if(this.myHealth == 1){
            my.sprite.heartOne.visible = false;
            my.sprite.heartOne2.visible = true;
        } else if(this.myHealth == 0){
            my.sprite.heartOne2.visible = false;
            my.sprite.heartOne3.visible = true;
            my.sprite.main.y = -100;
            my.sprite.temp.y = -100;
            my.sprite.shock.y = -100;
            
            const button = this.add.text(500, 500, 'Game Over', {
                fontFamily: 'Gothic',
                fontSize: '30px',
                color: '#f7f3e4',
                align: 'center',
                backgroundColor: '#f5bf42'
            }).setPadding(32).setOrigin(0.5);
    
            button.setInteractive({ useHandCursor: true });
    
            button.on('pointerover', () => {
                button.setBackgroundColor('#8d8d8d');
            });
    
            button.on('pointerout', () => {
                button.setBackgroundColor('#f5bf42');
            });
    
            button.on('pointerdown', () => {
                this.scene.start("endScene", {score: this.myScore});
            });
            
        }        
    }


    update(){
        let my = this.my;
        let temp = 0;
        if(this.start < 160){
            this.start++;
        }
        if(this.start == 30){
            this.my.text.counter.setText("4");
            
        }
        if(this.start == 60){
            this.my.text.counter.setText("3");
        }
        if(this.start == 90){
            this.my.text.counter.setText("2");
            
        }
        if(this.start == 120){
            this.my.text.counter.setText("1");
        }
        if(this.start == 120){
            this.my.text.wave.setText("");
            this.my.text.counter.setText("");}
           
        if(my.keyA.isDown){
            if(my.sprite.main.x > 40){
                my.sprite.main.x -= this.playerSpeed;
                my.sprite.temp.x -= this.playerSpeed;
                my.sprite.shock.x -= this.playerSpeed;

                this.counter += 1;
                if(this.counter == 5){
                    this.counter = 0;
                    if(my.sprite.main.visible == true && my.sprite.shock.visible == false){
                        my.sprite.main.visible = false;
                        my.sprite.temp.visible = true;
                    }else if(my.sprite.shock.visible == false){
                        my.sprite.main.visible = true;
                        my.sprite.temp.visible = false;
                    }
                }
                
                
            }
        }else if(my.keyD.isDown){
            if(my.sprite.main.x < 960){
                my.sprite.main.x += this.playerSpeed;
                my.sprite.temp.x += this.playerSpeed;
                my.sprite.shock.x += this.playerSpeed;
                this.counter += 1;
                if(this.counter == 5){
                    this.counter = 0;
                    if(my.sprite.main.visible == true && my.sprite.shock.visible == false){
                        my.sprite.main.visible = false;
                        my.sprite.temp.visible = true;
                    }else if (my.sprite.shock.visible == false){
                        my.sprite.main.visible = true;
                        my.sprite.temp.visible = false;
                    }
                }
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.esc)){
            this.destroyEnemy();
            this.scene.restart();
            this.scene.start("titleScene");
        }
        

        // Check for bullet being fired
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            // Are we under our bullet quota?
            if (my.sprite.bullet.length < this.maxBullets && this.start > 120  && (this.tick < 60 || this.tick > 160) && this.myHealth > 0 && my.sprite.shock.visible == false) {
                this.sound.play("beam", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.main.x, my.sprite.main.y-(my.sprite.main.displayHeight/2), "fire")
                );
            }
        }  
        let counter = 0;
        for(let enemy of my.sprite.enemy){
            if(enemy.visible == true){
                counter += 1;
            }
            this.ahh += 1;
            if(this.ahh > 200 && this.start > 120 && counter > 0 && (this.tick < 60 || this.tick > 160) && this.myHealth > 0){
                
                my.sprite.enemyBullet.push(this.add.sprite(
                    enemy.x, enemy.y+(enemy.displayHeight/2), "lightyellow")
                );
                
                this.ahh = 0;
            }
        }
        for(let enemy of my.sprite.other){
            if(enemy.visible == true){
                counter += 1;
            }
            this.ah += 1;
            if(this.ah > 150 && this.start > 120 && counter > 0 && (this.tick < 60 || this.tick > 160) && this.myHealth > 0){
                
                my.sprite.enemyBullet.push(this.add.sprite(
                    enemy.x, enemy.y+(enemy.displayHeight/2), "lightyellow")
                );
                
                this.ah = 0;
            }
        }
        if(counter == 0 && this.tick <= 60){
            this.tick += 1;
            if(this.tick == 30 || this.tick == 60){
                if(this.myHealth != 6){
                    this.sound.play("health", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                });}
                if(this.myHealth < 6){
                    this.myHealth += 1;
                    this.healthEdit();
                }
            } if(this.tick == 60){
                this.destroyEnemy();
                if(this.level == 0){
                    this.createEnemyTwo();
                    this.sound.play("next", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    my.text.wave.setText("Wave 2");
                    this.level = 1;
                }else if(this.level == 1){
                    this.createEnemyThree();
                    this.sound.play("next", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    my.text.wave.setText("Wave 3");
                    this.level = 2;
                }
            }
            
        }
        else if(counter == 0 && this.tick > 60){
            this.sound.play("next", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            this.scene.start("endScene", {score: this.myScore});
        }
        if(this.tick >= 60){
            this.tick ++;
        }
        if(this.tick == 160){
            my.text.wave.setText("");
            this.tick = 0;
        }

        // Make all of the bullets move
        for (let bullet of my.sprite.bullet) {
            bullet.setScale(0.25);
            bullet.y -= this.bulletSpeed;
            for(let enemy of my.sprite.enemy){
                if(this.collides(enemy, bullet)){
                    this.sound.play("hit", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    if(enemy.y < 200){
                        enemy.scorePoints = 25;
                    } else if(enemy.y < 350){
                        enemy.scorePoints = 20;
                    } else if(enemy.y < 500){
                        enemy.scorePoints = 15;
                    } else if(enemy.y < 600){
                        enemy.scorePoints = 10;
                    } else{
                        enemy.scorePoints = 5;
                    }
                    bullet.y = -100;
                    enemy.visible = false;
                    enemy.x = -100;
                    enemy.stopFollow();
                    this.myScore += enemy.scorePoints;
                    this.updateScore();
                    this.another += 1;
                }
            }
            for(let enemy of my.sprite.other){
                if(this.collides(enemy, bullet)){
                    this.sound.play("hit", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    if(enemy.y < 200){
                        enemy.scorePoints = 25;
                    } else if(enemy.y < 350){
                        enemy.scorePoints = 20;
                    } else if(enemy.y < 500){
                        enemy.scorePoints = 15;
                    } else if(enemy.y < 600){
                        enemy.scorePoints = 10;
                    } else{
                        enemy.scorePoints = 5;
                    }
                    bullet.y = -100;
                    enemy.visible = false;
                    enemy.x = -100;
                    enemy.stopFollow();
                    this.myScore += enemy.scorePoints;
                    this.updateScore();
                    this.another += 1;
                }
            }
            
        }
        if(this.shockCount == 20){
            my.sprite.shock.visible = false;
            this.shockCount = 0;
            this.sound.play("death",{
                volume: 1
            });
        }
        if(my.sprite.shock.visible == true){
            this.shockCount += 1;
        }
        
        // Make all of the enemy bullets move
        for (let bullet of my.sprite.enemyBullet) {
            
            bullet.setScale(0.6);
            
            bullet.y += this.bulletSpeed;
            if(this.collides(my.sprite.main, bullet)){
                this.sound.play("attack", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                this.myHealth -= 1;
                my.sprite.shock.visible = true;;
                this.healthEdit();
                bullet.y = -100;
            }
            
        }
        // when collision
        //this.data.values.score += 10;
        
        
        // Remove all of the bullets which are offscreen
        // filter() goes through all of the elements of the array, and
        // only returns those which **pass** the provided test (conditional)
        // In this case, the condition is, is the y value of the bullet
        // greater than zero minus half the display height of the bullet? 
        // (i.e., is the bullet fully offscreen to the top?)
        // We store the array returned from filter() back into the bullet
        // array, overwriting it. 
        // This does have the impact of re-creating the bullet array on every 
        // update() call. 
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        my.sprite.enemyBullet = my.sprite.enemyBullet.filter((ebullet) => ebullet.y > -(ebullet.displayHeight/2));
        my.sprite.enemy = my.sprite.enemy.filter((enemy)=>enemy.visible==true);
        my.sprite.other = my.sprite.other.filter((enemy)=>enemy.visible==true);

        
    }
}