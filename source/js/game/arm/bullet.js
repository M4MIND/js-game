var bullet = function (pos, angle) {
    
    return {
        type: 'bullet',
        pos: pos,
        size: { x: 4, y: 4 },
        angle: angle,
        update: function () {
            this.pos.x += Math.sin(this.angle) * 1 * main.dt;
            this.pos.y += Math.cos(this.angle) * 1 * main.dt;
            this.render()
        },
        render: function () {
            canvas.ctx.setTransform(1, 0, 0, 1, this.pos.x, this.pos.y);
            canvas.ctx.rotate(- this.angle);
            canvas.ctx.fillStyle = "blue";
            canvas.ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        }
    }
}