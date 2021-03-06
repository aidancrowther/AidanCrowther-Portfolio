var hasScrolled = false;

// HTML Elements
var body, nav, pages, contentBody;
var navEle, header, contact;

// DOM Properties
var bodyEle = getBodyTopEle();

var clientWidth, clientHeight, windowY, windowX;

// Portfolio view variables
var savedScroll = 0;
var contentScroll = 0;
var indexReady = true;

// Page variables
var loadStatus = false;
var scrollProgress, prevScroll;


// ANIMATION ELEMENTS
var scrollInterval;

// REQUEST HANDLER
var xhr;

function startMain() {
    initSupports(); //Check what this browser supports
    initElements();

    function onBlur() {
        // document.body.className = 'blurred';
        document.body.classList.toggle('focused', false);
        document.body.classList.toggle('blurred', true);
    };

    function onFocus() {
        // document.body.className = 'focused';
        document.body.classList.toggle('blurred', false);
        document.body.classList.toggle('focused', true);
    };

    if ( /*@cc_on!@*/ false) { // check for Internet Explorer
        document.onfocusin = onFocus;
        document.onfocusout = onBlur;
    } else {
        window.onfocus = onFocus;
        window.onblur = onBlur;
    }

    // Handle resize
    var handleResize = debounce(function() {
        resize();
    }, 2);
    window.onresize = handleResize;
    resize();


    // Handle scroll
    var handleScroll = debounce(function() {
        handleWindowScroll();
    }, 10);
    window.onscroll = handleScroll;
    handleWindowScroll();


    introSequence();
}












/* 

    PAGE ANIMATION FUNCTIONS

*/
// Handles the page initialization
function introSequence() {
    initVariables();
    initListeners();
    initIntervals();

    loadStatus = true;

    finishLoad();

    resize();
}

function finishLoad() {
    body.classList.toggle('LOADED', true);
    setTimeout(function() {
        body.classList.toggle('READY', true);
    }, 1500);
}


/* 

    PAGE ACTION FUNCTIONS

*/
function handleImmediateScroll() {
    windowY = bodyEle.scrollTop;
    if (prevScroll != windowY) {
        prevScroll = windowY;


    }


    // setTimeout(handleImmediateScroll, 20);
}



var sidebarFixed = false;
var lastPage = -1;
var lastScroll = -1;

function handleWindowScroll() {
    var parent;
    var len;

    lastScroll = scrollProgress;
}

function resize() {
    // Set the content panel to the remaining window width
    clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var docBody = document.body,
        html = document.documentElement;
}

// Set the height for any heightSet elements nested within a heightRef parent class
function setEleHeights() {
    var parents = document.getElementsByClassName('heightRef');
    for (var a = 0; a < parents.length; a++) {
        var targets = iterateElements(parents[a], 'heightSet', 'heightRef');

        for (var b = 0; b < targets.length; b++) {
            targets[b].style.height = parents[a].clientHeight + "px";
        }
    }
}

// Recursive function to parse children until empty or avoidClass is contained in classList
function iterateElements(parent, findClass, avoidClass) {
    var child = parent.childNodes;
    var output = [];
    for (var i = 0; i < child.length; i++) {
        if (child[i] != undefined && child[i].nodeType === 1) {

            if (child[i].classList.contains(findClass)) {
                output.push(child[i]);
            }

            if (!child[i].classList.contains(avoidClass))
                output = output.concat(iterateElements(child[i], findClass, avoidClass));
        }
    }

    return output;
}









/* 

    PAGE INITIALIZATION

*/
function initSupports() {
    if ('CSS' in window && 'supports' in window.CSS) {
        var support = window.CSS.supports('mix-blend-mode', 'multiply');



        if (/mobile/i.test(navigator.userAgent)) {
            document.getElementsByTagName('body')[0].classList.toggle('MOBILE');
        }

        /* Add class like Modernizr */
        /* -- Pure JS -- */
        // document.getElementsByTagName('html')[0].className += support ? ' mix-blend-mode' : ' no-mix-blend-mode';
    }

    document.getElementsByTagName('html')[0].classList.toggle('LOADING', false);
}

function initVariables() {

}


function initIntervals() {
    // scrollInterval = setInterval(handleImmediateScroll, 20);

    handleImmediateScroll();
}

// Initializes all of the html element variables
function initElements() {
    body = document.getElementsByTagName('body')[0];
    nav = document.getElementsByTagName('nav')[0];


    contentBody = document.getElementById('body');
}


var activePieces = [];

function initListeners() {
    window.addEventListener('click', function() {
        deactivateFocus();
    });

    var parent;
    var len;

    parent = document.getElementsByClassName('detailNavItem');
    len = parent.length;
    for (var i = 0; i < parent.length; i++) {
        parent[i].addEventListener('click', function() {
            var pathName = window.location.pathname;
            pathName = pathName.substring(0, pathName.lastIndexOf("/"));
            pathName = pathName.substring(0, pathName.lastIndexOf("/"));
            window.location.href = pathName + "/#" + this.dataset.name;
        });
    }

    // Deactivates all the PAGE_0
    // deactivatePages(index);
}



/* 

    STAPLE FUNCTIONS

*/
function isArray(obj) {
    return isObject(obj) && (obj instanceof Array);
}

// All arrays are objects but not all objects are arrays
function isObject(obj) {
    return obj && (typeof obj === "object");
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
window.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function toggleClass(element, val, vBool, check, cBool) {
    if (check != undefined && element.classList.contains(check) === cBool) {
        element.classList.toggle(val, vBool);
    } else {
        element.classList.toggle(val, vBool);
    }
}

function getBodyTopEle() { var el = document.scrollingElement || document.documentElement; return el; }




var scrollInt = 5;

function scrollTo(element, to, duration) {
    var rem = to - element.scrollTop;

    var scrollTime = Math.abs(rem) / 3;
    if (scrollTime > duration)
        scrollTime = duration;

    // if (Math.abs(rem / duration) < 1)
    // duration = Math.abs(rem);

    scrollToEle(element, to, scrollTime);
}

function scrollToEle(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * scrollInt;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollToEle(element, to, duration - scrollInt);
    }, scrollInt);
}

function deactivateFocus() {}



function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
        parseFloat(styles['marginBottom']);

    return Math.ceil(el.offsetHeight + margin);
}

function getAbsoluteWidth(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginRight']) +
        parseFloat(styles['marginLeft']);

    return Math.ceil(el.offsetWidth + margin);
}




/*
    @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
    @b is the beginning value of the property.
    @c is the change between the beginning and destination value of the property.
    @d is the total time of the tween.
*/
function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}