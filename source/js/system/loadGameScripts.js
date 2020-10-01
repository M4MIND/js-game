var loadGameScripts = (function () {
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

    var script = function () {
        return {
            url: undefined,
            setUrl: function (url) {
                this.url = url;

                return this;
            },
            load: function (element, callback) {
                var _this = this;
                var script = document.createElement('script');
                script.src = _this.url;
                element.append(script);
                script.onload = function () {
                    if (callback) {
                        callback(_this);
                    }
                }
            }
        }
    }


    var _interface = {
        scriptsList: [],
        events: {},
        count: 0,
        addListSctipts: function (list) {
            for (var i = 0; i < list.length; i++) {
                this.addScript(list[i]);
            }

            return this;
        },
        addScript: function (url) {
            this.scriptsList.push(url);

            return this;
        },
        successLoad: function (script) {
            eventDispatcher.dispatch('load', script);
            this.count += 1;

            if (this.count === this.scriptsList.length) {
                eventDispatcher.dispatch('fullLoad', this);
            }
        },
        load: function () {
            for (var i = 0; i < this.scriptsList.length; i++) {
                script().setUrl(this.scriptsList[i])
                    .load(document.head, function (script) {
                        _interface.successLoad(script);
                    });
            }
        },
        on: function (event, callback) {
            eventDispatcher.subscribe(event, callback);

            return this;
        }
    }

    return _interface;
})();