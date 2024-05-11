class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
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

        my.sprite.temp = this.add.sprite(500, 100, "jumperSheet", "sun2.png");
        my.sprite.main = this.add.sprite(500, 100, "jumperSheet", "sun1.png");
        my.sprite.temp.visible = false;


        for(let cloud of my.sprite.clouds){
            cloud.setScale(1.5);
            cloud.end = 0;
        }

        const text = this.add.text(500, 250, 'Sunshine Shooter', { align: 'center'});
        text.setOrigin(0.5, 0.5);
        text.setFontFamily('Gothic');
        text.setFontStyle('bold');
        text.setFontSize(100);
        text.setColor('#ffcc00');

        const credits = this.add.text(500, 450, 'The goal of the game is to clear the sky of all the clouds.\n There are three wave levels and you have three lives\n which get partially regenerated after each wave.\n Move the character with the A key and D key.\n Shoot with the Spacebar.\n Press the ESC button to go back to the Home Screen.', { align: 'center'});
        credits.setOrigin(0.5, 0.5);
        credits.setFontFamily('Gothic');
        credits.setFontStyle('bold');
        credits.setFontSize(30);
        credits.setColor('#f5bf42');

        text.preFX.setPadding(32);

        const button = this.add.text(500, 700, 'Home Screen', {
            fontFamily: 'Gothic',
            fontSize: '40px',
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
            this.scene.start("titleScene");
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
