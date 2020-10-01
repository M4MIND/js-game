var canvas = (function () {
    return {
        el: null,
        ctx: null,
        property: {
            width: 0,
            height: 0
        },
        clear: function () {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.property.width, this.property.height);
            this.ctx.restore();
        },
        init: function () {
            this.property.width = window.document.body.clientWidth;
            this.property.height = window.document.body.clientHeight;

            this.el = document.createElement('canvas');
            this.el.width = this.property.width;
            this.el.height = this.property.height;

            this.ctx = this.el.getContext("2d");

            document.body.append(this.el);
        }
    }
})();