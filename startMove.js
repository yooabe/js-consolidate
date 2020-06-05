function startMove(node, cssObj, complete) {
            clearInterval(node.timer);
            node.timer = setInterval(function () {
                var isEnd = true;
                for (var attr in cssObj) {
                    var iTarget = cssObj[attr];
                    // var iCur = parseInt(getStyle(node, attr));
                    var iCur = null;
                    if (attr == "opacity") {
                        iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
                    } else {
                        iCur = parseInt(getStyle(node, attr));
                    }
                    var speed = (iTarget - iCur) / 8;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


                    // node.style[attr] = iCur + speed + 'px';
                    if (attr == "opacity") {
                        iCur += speed;
                        node.style.opacity = iCur / 100;
                        node.style.filter = "alpha(opacity=" + iCur + ")";
                    } else {
                        node.style[attr] = iCur + speed + 'px'
                    };
                    if (iCur != iTarget) {
                        isEnd = false;
                    }

                }
                if (isEnd) {
                    if (complete) {
                        complete.call(node);
                    }
                }
            }, 30)
        }


        //获取当前有效样式的兼容写法
        function getStyle(node, cssStr) {
            return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr];
        }