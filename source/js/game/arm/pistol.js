var pistol = function () {
    
    return {
        maxBullet: 7,
        bullet: 7,
        allBullet: 99,
        lastFire: Date.now(),
        timeOut: 256,
        fire: function (pos, angle) {
            if (Date.now() - this.lastFire > this.timeOut) {
                this.lastFire = Date.now();
                this.bullet -= 1;
                main.pushObject(bullet(pos, angle))
            }
        },
        reload: function () {
            if (this.bullet !== this.maxBullet) {
                this.bullet = this.allBullet >= this.maxBullet ? this.maxBullet : this.allBullet;
                this.allBullet -= this.bullet;
            }
        }
    }
}