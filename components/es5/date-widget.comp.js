"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

(function () {

    var template = "\n    <style>\n        @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);\n    .container {\n        background-color: #FFF;\n        border-radius: 5px;\n        box-shadow: 0 0 5px #dadada;\n        position: relative;\n        min-height: 100px;\n        font-family: 'Roboto Condensed', sans-serif;\n        margin: 10px 0;\n    }\n    .container .left {\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        width: 30%;\n        color: #FFF;\n        border-radius: 5px 0 0 5px;\n        text-align: center;\n        padding: 18px 0 0 0;\n    }\n    .container .left .month {\n        line-height: 20px;\n        font-weight: 300;\n    }\n    .container .left .day {\n        font-size: 40px\n    }\n    .container .right {\n        margin-left: 30%;\n        padding: 10px 10px 10px 15px;\n        color: #333;\n    }\n    .container .right .day-long {\n        font-weight: 300;\n        font-size: 18px;\n        line-height: 35px;\n    }\n    .container .right .time {\n        font-weight: bold;\n        font-size: 35px;\n        line-height: 40px;\n    }\n    /* THEME CODE */\n    .container.green .left {\n        background-color: #37bc9b;\n    }\n    .container.green .day-long {\n        color: #278b70;\n    }\n    .container.red .left {\n        background-color: #bc2751;\n    }\n    .container.red .day-long {\n        color: #922146;\n    }\n    .container.blue .left {\n        background-color: #356dbc;\n    }\n    .container.blue .day-long {\n        color: #2d5ea3;\n    }\n    .container.gold .left {\n        background-color: #bc9600;\n    }\n    .container.gold .day-long {\n        color: #9a7b00;\n    }\n    </style>\n    <div class=\"container\">\n        <div class=\"left\">\n        <div class=\"month\"></div>\n        <div class=\"day\"></div>\n        </div>\n        <div class=\"right\">\n        <div class=\"day-long\"></div>\n        <div class=\"time\"></div>\n        </div>\n        </div>\n    ";

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var DateWidget = (function (_HTMLElement) {
        _inherits(DateWidget, _HTMLElement);

        function DateWidget() {
            _classCallCheck(this, DateWidget);

            _get(Object.getPrototypeOf(DateWidget.prototype), "constructor", this).apply(this, arguments);
        }

        _createClass(DateWidget, [{
            key: "createdCallback",

            // Fires when an instance of the element is created.
            value: function createdCallback() {
                this.createShadowRoot().innerHTML = template;

                //Grab the elements from the shadow root
                this.$container = this.shadowRoot.querySelector('.container');
                this.$month = this.shadowRoot.querySelector('.month');
                this.$day = this.shadowRoot.querySelector('.day');
                this.$dayLong = this.shadowRoot.querySelector('.day-long');
                this.$time = this.shadowRoot.querySelector('.time');

                this.updateTheme(this.getAttribute('theme'));

                //Call the draw function initially
                this.draw();
                //Call the draw function every section to update the time
                var that = this;
                setInterval(function () {
                    that.draw();
                }, 1000);
            }
        }, {
            key: "attachedCallback",

            // Fires when an instance was inserted into the document.
            value: function attachedCallback() {}
        }, {
            key: "attributeChangedCallback",

            // Fires when an attribute was added, removed, or updated.
            value: function attributeChangedCallback(attrName, oldVal, newVal) {
                switch (attrName) {
                    case "theme":
                        this.updateTheme(newVal);
                        break;
                }
            }
        }, {
            key: "draw",
            value: function draw() {
                this.date = new Date();
                this.$month.innerHTML = months[this.date.getMonth()];
                this.$day.innerHTML = this.date.getDate();
                this.$dayLong.innerHTML = days[this.date.getDay()].toUpperCase();
                this.$time.innerHTML = this.date.toLocaleTimeString();
            }
        }, {
            key: "updateTheme",
            value: function updateTheme(theme) {
                var val = "green";
                if (["green", "red", "blue", "gold"].indexOf(theme) > -1) {
                    val = theme;
                }
                this.$container.className = "container " + val;
            }
        }]);

        return DateWidget;
    })(HTMLElement);

    document.registerElement('date-widget', DateWidget);
})();
