var mouse = (function () {
    var _ = {
        position: {
            x: 0,
            y: 0,
        },
        lbtn: false,
        rbtn: false,
        init: function () {
            document.addEventListener('mousemove', function (e) {
                _.position.x = e.clientX;
                _.position.y = e.clientY;
            })

            document.addEventListener('mouseup', function (e) {
                _.lbtn = !e.button === 0;
                _.rbtn = !e.button === 2;
            })

            document.addEventListener('mousedown', function (e) {
                _.lbtn = e.button === 0;
                _.rbtn = e.button === 2;
            })

            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            })
        }
    }

    return _;
})();