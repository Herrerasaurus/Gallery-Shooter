class Title extends Phaser.Scene {
    constructor(){
        super("titleScene");
        this.my = {sprite: {}};


    }

    init(){
        this.count = 0;
        this.my.sprite.clouds = [];
    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("background", "backgroundEmpty.png");
        this.load.image("cloud1", "cloudLayer1.png");
        this.load.image("cloud2", "cloudLayer2.png");
        this.load.image("cloud3", "cloudLayerB1.png");
        this.load.image("cloud4", "cloudLayerB2.png");
        this.load.bitmapFont('gothic', 'https://labs.phaser.io/assets/fonts/bitmap/gothic.png', 'https://labs.phaser.io/assets/fonts/bitmap/gothic.xml');
        this.load.atlasXML("jumperSheet", "spritesheet_jumper.png", "spritesheet_jumper.xml");


    }

    create(){
        let my = this.my;
        const background = this.add.image(500, 300, 'background');
        my.sprite.clouds.push(this.add.sprite(500, 400, 'cloud4'));
        my.sprite.clouds.push(this.add.sprite(500, 550, 'cloud3'));
        my.sprite.clouds.push(this.add.sprite(500, 700, 'cloud2'));
        my.sprite.clouds.push(this.add.sprite(500, 850, 'cloud1'));

        my.sprite.temp = this.add.sprite(500, 150, "jumperSheet", "sun2.png");
        my.sprite.main = this.add.sprite(500, 150, "jumperSheet", "sun1.png");
        my.sprite.temp.visible = false;


        for(let cloud of my.sprite.clouds){
            cloud.setScale(1.5);
            cloud.end = 0;
        }

        const text = this.add.text(500, 300, 'Sunshine Shooter', { align: 'center'});
        text.setOrigin(0.5, 0.5);
        //text.setResolution(window.devicePixelRatio);
        text.setFontFamily('Gothic');
        text.setFontStyle('bold');
        text.setFontSize(100);
        text.setColor('#ffcc00');

        text.preFX.setPadding(32);

        const button = this.add.text(500, 500, 'Play Game', {
            fontFamily: 'Gothic',
            fontSize: '50px',
            color: '#f7f3e4',
            align: 'center',
            backgroundColor: '#fbac04'
        }).setPadding(32).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setBackgroundColor('#8d8d8d');
        });

        button.on('pointerout', () => {
            button.setBackgroundColor('#fbac04');
        });

        button.on('pointerdown', () => {
            var theOtherScene = this.scene.get('movementScene');

            theOtherScene.scene.restart();
            
            this.scene.start("movementScene");
        });

        const button2 = this.add.text(500, 650, 'How to Play', {
            fontFamily: 'Gothic',
            fontSize: '50px',
            color: '#f7f3e4',
            align: 'center',
            backgroundColor: '#fbac04'
        }).setPadding(32).setOrigin(0.5);

        button2.setInteractive({ useHandCursor: true });

        button2.on('pointerover', () => {
            button2.setBackgroundColor('#8d8d8d');
        });

        button2.on('pointerout', () => {
            button2.setBackgroundColor('#fbac04');
        });

        button2.on('pointerdown', () => {
            this.scene.start("creditsScene");
        });

    }

    update(){
        let my = this.my;
        
        //movement for screen background
        let temp = 4;
        for(let cloud of my.sprite.clouds){
            if(cloud.x < 250){
                cloud.end = 1;
            } else if(cloud.x > 750){
                cloud.end = 0;
            }
            if(cloud.end == 0){
                cloud.x -= temp;
            } else{
                cloud.x += temp;
            }
            temp --;
        }
        this.count ++;
        if(this.count == 8){
        if(my.sprite.main.visible == true){
            my.sprite.main.visible = false;
            my.sprite.temp.visible = true;
        } else {
            my.sprite.temp.visible = false;
            my.sprite.main.visible = true;
        }
        this.count = 0;
        }

    }
}