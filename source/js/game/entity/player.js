var player = function (pos, size, speed) {
    var _ = {
        pos: pos || { x: canvas.property.width / 2, y: canvas.property.height / 2 },
        size: size || { x: 20, y: 20 },
        angle: 0,
        speed: speed || 4,
        arm: pistol(),
        create: function () {
        },
        update: function () {
            _.angle = Math.atan2(
                mouse.position.x - _.pos.x - _.size.x / 2,
                mouse.position.y - _.pos.y - _.size.y / 2
            );

            if (mouse.lbtn) {
                if (Math.sqrt(Math.pow(mouse.position.x - _.pos.x, 2) + Math.pow(mouse.position.y - _.pos.y, 2), 2) > Math.sqrt(2, 2) * _.size.x) {
                    _.pos.x += (Math.sin(_.angle) * _.speed * main.dt);
                    _.pos.y += (Math.cos(_.angle) * _.speed * main.dt);
                    
                }
            }

            if (mouse.rbtn) {
                _.arm.fire({ x: _.pos.x + _.size.x / 2, y: _.pos.y + _.size.y / 2 }, _.angle);
            }

            _.draw();
        },
        draw: function () {
            canvas.ctx.setTransform(1, 0, 0, 1, _.pos.x + _.size.x / 2, _.pos.y + _.size.y / 2)
            canvas.ctx.rotate(-_.angle);
            canvas.ctx.fillStyle = "black";
            canvas.ctx.fillRect(- _.size.x / 2, - _.size.y / 2, _.size.x, _.size.y)

            canvas.ctx.setTransform(1, 0, 0, 1, _.pos.x + _.size.x / 2, _.pos.y + _.size.y / 2)
            canvas.ctx.rotate(-_.angle);

            canvas.ctx.beginPath();
            canvas.ctx.strokeStyle = 'red';
            canvas.ctx.lineWidth = 2;
            canvas.ctx.moveTo(0, 10);
            canvas.ctx.lineTo(0, 30);
            canvas.ctx.stroke();
        }
    }

    _._proto_ = entyty;
    _.create();

    return _;
};