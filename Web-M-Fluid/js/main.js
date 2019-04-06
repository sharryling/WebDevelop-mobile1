window.onload = function () {
    PicInturn = document.querySelector('.PicInturn')
    headerFunc();/* 登录栏事件 */
    PicInturnFunc();/* 轮播图事件 */
    TimerFunc();/* 定时器事件 */
}

var headerFunc = function () {
    /* opacity事件：高度小于轮播图高度，则按比例
   opacity修改，大于则一直不变 */
    var inputHeader = document.querySelector('.inputBox');
    var height = PicInturn.offsetHeight;
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
        var opacity = 0;
        if (scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85
        }
        inputHeader.style.background = `rgba(201,21,35,${opacity})`
    }
}
var PicInturnFunc = function () {
    /* 轮播图：1.定时滚动 2.手动滚动 */
    /* 1.1 index 定时器 transform过渡 */
    var PicInturnUl = PicInturn.querySelector('ul:first-child')
    var PicInturnLi = PicInturnUl.querySelectorAll('li')
    var PicCycle = PicInturn.querySelectorAll('ul:last-child > li')
    var screenWidth = PicInturn.offsetWidth;

    var setTransition = () => {
        /* 过渡 */
        PicInturnUl.style.transition = 'all 0.2s ease';
        PicInturnUl.style.webkitTransition = 'all 0.2s ease';
    }
    var clearTransition = () => {
        /* 清除过渡 为了顺畅 */
        PicInturnUl.style.transition = 'none';
        PicInturnUl.style.webkitTransition = 'none';
    }
    var setTranform = (x) => {
        /* 移位 */
        PicInturnUl.style.transform = `translateX(${x + 'px'})`;
        PicInturnUl.style.webkitTransform = `translateX${x + 'px'})`;
    }
    var setCycle = () => {
        /* 轮播图点设置样式 */
        PicCycle.forEach((arr) => {
            arr.classList.remove("selected")
        })
        PicCycle[index - 1].classList.add('selected');
    }

    var index = 1
    var timer = setInterval(() => {
        index++;
        setTransition();
        setTranform(-index * screenWidth);
    }, 1000);

    PicInturnUl.addEventListener("transitionend", () => {
        if (index >= 9) {
            index = 1;
            clearTransition();
            setTranform(-index * screenWidth);
        } else {
            if (index <= 0) {
                index = 8;
                clearTransition();
                setTranform(-index * screenWidth);
            }
        }
        setCycle();
    })

    /* 手动滚动 touch事件 */
    var firstPoint = 0;
    var lastPoint = 0;
    var distPoint = 0;
    var isMove = false;
    PicInturn.addEventListener("touchstart", (e) => {
        firstPoint = e.changedTouches[0].clientX;
        clearInterval(timer)
    })
    PicInturn.addEventListener("touchmove", (e) => {
        lastPoint = e.changedTouches[0].clientX;
        /* clearTransition(); */
        distPoint = lastPoint - firstPoint;;
        setTranform(-index * screenWidth + distPoint);
        isMove = true;
    })
    PicInturn.addEventListener("touchend", (e) => {
        /* 吸附和松手 */
        if (isMove) {
            if (Math.abs(distPoint) <= screenWidth / 3) {
                console.log("aa");
                setTranform(-index * screenWidth);
            }
            else {
                if (distPoint < 0) {
                    index++;
                } else {
                    index--;
                }
                setTransition();
                setTranform(-index * screenWidth);
            } 
        }
        clearInterval(timer);
        timer = setInterval(() => {
            index++;
            setTransition();
            setTranform(-index * screenWidth);
        }, 1000); 
        isMove = false;
        firstPoint = 0;
        lastPoint = 0;
    })
}


var TimerFunc = function () { }