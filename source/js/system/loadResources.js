var loadResources = (function () {
    var eventDispatcher = (function () {
        return {
            subscribes: {},
            subscribe: function (event, callback) {
                if (!this.subscribes[event]) {
                    this.subscribes[event] = [];
                }

                this.subscribes[event].push(callback);

                return this;
            },
            dispatch: function (event, data) {
                if (!this.subscribes[event]) {
                    return;
                }

                for (var i = 0; i < this.subscribes[event].length; i++) {
                    this.subscribes[event][i](data);
                }
            }
        }
    })();

    var sprite = function (url) {
        var image = new Image();
        image.src = url;
        return {
            url: url,
            image: image,
            load: function (callaback) {
                var _ = this;

                _.image.onload = function () {
                    callaback(_)
                };
            }
        }
    }

    _ = {
        loaded: {},
        resources: {},
        addList: function (urls) {
            for (var i = 0; i < urls.length; i++) {
                this.add(urls[i])
            }

            return _;
        },
        get: function (key) {
            return _.loaded[key];
        },
        successLoad: function (sprite) {
            eventDispatcher.dispatch('load', sprite);
            _.loaded[sprite.url] = sprite;
            delete _.resources[sprite.url];

            if (Object.keys(_.resources).length === 0) {
                eventDispatcher.dispatch('fullLoad', _);
            }
        },
        add: function (url) {
            _.resources[url] = sprite(url);
        },
        load: function () {
            var keys = Object.keys(_.resources);

            for (var i = 0; i < keys.length; i++) {
                _.resources[keys[i]].load(function (sprite) {
                    _.successLoad(sprite);
                })
            }
        },
        on: function (event, callback) {
            eventDispatcher.subscribe(event, callback);

            return this;
        }
    }

    return _;
})();