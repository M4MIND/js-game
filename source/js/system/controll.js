var controll = (function () {
    var _interface = {
        subscribers: {},
        init: function () {
            document.addEventListener('keydown', function (e) {
                _interface.dispatch('keydown', e);
            })
        },
        dispatch: function (event, data) {
            if (!this.subscribers[event]) {
                return;
            }

            for (var i = 0; i < this.subscribers[event].length; i++) {
                this.subscribers[event][i](data);
            }
        },
        subscribe: function (event, callback) {
            if (!this.subscribers[event]) {
                this.subscribers[event] = [];
            }

            this.subscribers[event].push(callback);
        }
    }

    return _interface;
})();