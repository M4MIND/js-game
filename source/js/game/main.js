var main = (function () {
    var _ = {
        date: Date.now(),
        dt: 0,
        objects: {},
        pushObject: function (obj) {
            obj.id = Math.random().toString(36);
            this.objects[obj.id] = obj;
            
        },
        init: function () {
            canvas.init();
            controll.init();
            mouse.init();

            for (var i = 0; i < 1001; i++) {
                this.pushObject(player(
                    { x: Math.random() * canvas.property.width, y: Math.random() * canvas.property.height },
                    { x: 20, y: 20 },
                    0.2
                ))
            }

            this.loop();
        },
        loop: function () {
            canvas.clear();
            _.update();
            _.date = Date.now();
            requestAnimationFrame(_.loop);
        },
        update: function () {
            _.dt = Date.now() - _.date;
            var objects = Object.values(_.objects)

            for (var i = 0; i < objects.length; i++) {
                objects[i].update();
                _.collision(objects[i]);
            }
        },

        collision: function (obj) {
            if (obj.type === 'bullet') {
                if (obj.pos.x <= 0 || obj.pos.x >= canvas.property.width || obj.pos.y <= 0 || obj.pos.y >= canvas.property.height) {
                    delete _.objects[obj.id];
                }
            }
        }
    }

    return _;
})();