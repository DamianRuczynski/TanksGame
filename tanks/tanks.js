function Game() {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');


    class Player {
        constructor() {

            this.velocity = {
                x: 0,
                y: 0
            };

            const image = new Image();
            image.src = "./assets/tank.png";
            image.onload = () => {

                this.image = image;
                this.width = 45;
                this.height = 45;
                // this.position = {
                //     x: canvas.width / 2 - this.width / 2,
                //     y: canvas.height - this.height - 20
                // };
                this.x = canvas.width / 2 - this.width / 2;
                this.y = canvas.height - this.height - 20

            }

        }

        draw() {

            if (this.image) {
                ctx.drawImage(
                    this.image,
                    // this.position.x,
                    // this.position.y,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
        }

        update() {
            if (this.image) {
                this.draw();
                // this.position.x += this.velocity.x;
                // this.position.y += this.velocity.y;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }
        }
    }

    class Block {
        constructor(sx, sy, x, y, width, height) {

            const imageBlock = new Image();
            imageBlock.src = "./assets/sprite.png";
            imageBlock.onload = () => {

                this.imageBlock = imageBlock;
                this.sx = sx;
                this.sy = sy
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;

            }
        }

        drawBlock() {

            if (this.imageBlock) {
                ctx.drawImage(this.imageBlock, this.sx, this.sy, 80, 80, this.x, this.y, this.width, this.height);
            }

        }

        updateBlock() {
            if (this.imageBlock) {
                this.drawBlock();
            }
        }
    }

    const player = new Player();
    const block = new Block(80, 70, 425, 0, 60, 60);
    const block2 = new Block(80, 70, 425, 50, 60, 60);
    const block3 = new Block(80, 70, 425, 100, 60, 60);
    const block4 = new Block(80, 70, 425, 150, 60, 60);
    const block5 = new Block(80, 70, 425, 200, 60, 60);
    const block6 = new Block(80, 70, 425, 250, 60, 60);
    const block7 = new Block(80, 70, 425, 300, 60, 60);

    const orangeBlock = new Block(80, -5, 5, 55, 45, 45);
    const orangeBlock2 = new Block(80, -5, 40, 55, 45, 45);
    const orangeBlock3 = new Block(80, -5, 75, 55, 45, 45);
    const orangeBlock4 = new Block(80, -5, 110, 55, 45, 45);
    const orangeBlock5 = new Block(80, -5, 145, 55, 45, 45);
    const orangeBlock6 = new Block(80, -5, 180, 55, 45, 45);
    const orangeBlock7 = new Block(80, -5, 215, 55, 45, 45);
    const orangeBlock8 = new Block(80, -5, 250, 55, 45, 45);
    const orangeBlock9 = new Block(80, -5, 285, 55, 45, 45);
    const bigOrange = new Block(80, 230, 0, 511, 100, 100);
    const bigGold = new Block(-5, 155, 715, 516, 100, 100);
    const star = new Block(-5, -5, 10, 10, 35, 35);
    const keys = {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        w: {
            pressed: false
        },
        s: {
            pressed: false
        },
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        player.update();
        block.updateBlock();
        block2.updateBlock();
        block3.updateBlock();
        block4.updateBlock();
        block5.updateBlock();
        block6.updateBlock();
        block7.updateBlock();
        orangeBlock.updateBlock();
        orangeBlock2.updateBlock();
        orangeBlock3.updateBlock();
        orangeBlock4.updateBlock();
        orangeBlock5.updateBlock();
        orangeBlock6.updateBlock();
        orangeBlock7.updateBlock();
        orangeBlock8.updateBlock();
        orangeBlock9.updateBlock();
        bigOrange.updateBlock();
        bigGold.updateBlock();
        star.updateBlock();

        if (keys.a.pressed) {
            player.velocity.x = -5;
        }
        else if (keys.d.pressed) {
            player.velocity.x = 5;
        }

        else if (keys.w.pressed) {
            player.velocity.y = -5;
        }
        else if (keys.s.pressed) {
            player.velocity.y = 5;
        } else {
            player.velocity.x = 0;
            player.velocity.y = 0;
        };

        //BORDERS
        if (player.y + player.height >= canvas.height && player.y + player.height + player.velocity.y >= canvas.height || player.y <= 0 && player.y + player.velocity.y <= 0) {
            player.velocity.y = 0;
        };

        if (player.x + player.width >= canvas.width && player.x + player.width + player.velocity.x >= canvas.width
            || player.x <= 0 && player.x + player.velocity.x <= 0) {
            player.velocity.x = 0;
        };
        //ORANGE BLOCK AND GOLD BLOC COLISIONS
        if (player.x <= 80 && player.y + player.height >= 520 && player.x + player.velocity.x <= 80
            || player.x >= 680 && player.y + player.height >= 520 && player.x + player.velocity.x >= 680) {
            player.velocity.x = 0;
        };

        if (player.y + player.height >= 520 && player.x <= 80 && player.y + player.height + player.velocity.y >= 520
            || player.y + player.height >= 520 && player.x >= 680 && player.y + player.height + player.velocity.y >= 520) {
            player.velocity.y = 0;
        };
        // GREY BLOCK COLISIONS
        if (player.x <= block.x + block.width - 15 && player.y <= block7.y + block7.height && player.x + player.velocity.x <= block.x + block.width - 15
            && player.x + player.width >= block.x && player.y <= block7.y + block7.height && player.x + player.width + player.velocity.x >= block.x) {
            player.velocity.x = 0;
        }

        if (player.y + player.velocity.y <= block7.y + block7.height - 10 && player.x <= block.x + block.width - 15 && player.x + player.width >= block.x) {
            player.velocity.y = 0;
        }
        // ORANGE BLOCKS COLISIONS
        if (player.x + player.velocity.x <= orangeBlock9.x + orangeBlock9.width - 15 && player.y + player.height >= orangeBlock.y && player.y <= orangeBlock.y + orangeBlock.height) {
            player.velocity.x = 0;
        }

        if (player.y + player.velocity.y <= orangeBlock.y + orangeBlock.height - 10 && player.x <= orangeBlock9.x + orangeBlock9.width - 15) {
            player.velocity.y = 0;
        }

        //FINISH

        if (player.x <= 15 && player.y <= orangeBlock.y) {
            alert("WYGRAŁEŚ");
            player.x = canvas.width / 2 - player.width / 2;
            player.y = canvas.height - player.height;

            new Game();
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    }

    animate();

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            keys.w.pressed = true;
        }
        else if (e.keyCode == '40') {
            keys.s.pressed = true;
        }
        else if (e.keyCode == '37') {
            keys.a.pressed = true;
        }
        else if (e.keyCode == '39') {
            keys.d.pressed = true;
        }

    }

    document.onkeyup = uncheckKey;

    function uncheckKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
            keys.w.pressed = false;
        }
        else if (e.keyCode == '40') {
            keys.s.pressed = false;
        }
        else if (e.keyCode == '37') {
            keys.a.pressed = false;
        }
        else if (e.keyCode == '39') {
            keys.d.pressed = false;
        }

    }

}

new Game();
