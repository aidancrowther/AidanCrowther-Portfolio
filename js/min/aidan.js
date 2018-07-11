var body,nav,pages,contentBody,navEle,header,contact,clientWidth,clientHeight,windowY,windowX,prevScroll,scrollInterval,xhr,hasScrolled=!1,bodyEle=getBodyTopEle(),savedScroll=0,contentScroll=0,indexReady=!0,loadStatus=!1,allowedEndings=["aidan"],pageList=["about","project","contact"];function startMain(){initSupports(),initElements();var t=window.location.hash;function e(){document.body.classList.toggle("focused",!1),document.body.classList.toggle("blurred",!0)}function n(){document.body.classList.toggle("blurred",!1),document.body.classList.toggle("focused",!0)}(t=t.substring(1)).length>0&&-1!=pageList.indexOf(t)&&toggleContent(t),window.onfocus=n,window.onblur=e;var o=debounce(function(){resize()},2);window.onresize=o,resize();var i=debounce(function(){handleWindowScroll()},10);window.onscroll=i,handleWindowScroll(),introSequence()}function introSequence(){initVariables(),initListeners(),initIntervals(),loadStatus=!0,finishLoad(),resize()}function finishLoad(){body.classList.toggle("LOADED",!0),setTimeout(function(){body.classList.toggle("READY",!0)},1500)}function handleImmediateScroll(){windowY=bodyEle.scrollTop,prevScroll!=windowY&&(prevScroll=windowY)}var sidebarFixed=!1,lastPage=-1,lastScroll=-1;function handleWindowScroll(){var t;t=pages.length;var e=bodyEle.scrollTop;if(body.classList.contains("CONTENTPAGE"))for(var n=0;n<t&&(lastScroll-e<0||n!=lastPage);n++)if(e<pages[n].offsetTop+(pages[n].clientHeight-.55*clientHeight)){lastPage=n,setCurrPage(n,t);break}lastScroll=e}function setCurrPage(t,e){body.classList.contains("PAGE_"+t)||body.classList.toggle("PAGE_"+t,!0)}function deactivatePages(t){for(var e=0;e<len;e++){var n="PAGE_"+e;e!=t&&body.classList.contains(n)?body.classList.toggle("UN"+n,!0):body.classList.toggle("UN"+n,!1),body.classList.toggle(n,!1)}}function resize(){clientWidth=Math.max(document.documentElement.clientWidth,window.innerWidth||0),clientHeight=Math.max(document.documentElement.clientHeight,window.innerHeight||0);document.body;var t=document.documentElement;pageHeight=Math.max(body.scrollHeight,body.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight);try{SIDEBAR_RESIZE(clientWidth,clientHeight)}catch(t){}}function setEleHeights(){for(var t=document.getElementsByClassName("heightRef"),e=0;e<t.length;e++)for(var n=iterateElements(t[e],"heightSet","heightRef"),o=0;o<n.length;o++)n[o].style.height=t[e].clientHeight+"px"}function iterateElements(t,e,n){for(var o=t.childNodes,i=[],l=0;l<o.length;l++)void 0!=o[l]&&1===o[l].nodeType&&(o[l].classList.contains(e)&&i.push(o[l]),o[l].classList.contains(n)||(i=i.concat(iterateElements(o[l],e,n))));return i}function initSupports(){if("CSS"in window&&"supports"in window.CSS){window.CSS.supports("mix-blend-mode","multiply");/mobile/i.test(navigator.userAgent)&&document.getElementsByTagName("body")[0].classList.toggle("MOBILE")}document.getElementsByTagName("html")[0].classList.toggle("LOADING",!1)}function initVariables(){sidebarPadding=16}function initIntervals(){handleImmediateScroll()}function initElements(){body=document.getElementsByTagName("body")[0],nav=document.getElementsByTagName("nav")[0],pages=document.getElementsByClassName("page"),projectItems=document.getElementsByClassName("projectItem"),contentBody=document.getElementById("body")}function toggleContent(t){body.classList.contains("FADENAV")||(body.classList.toggle("FADENAV",!0),t=document.getElementById(t+"Page"),setTimeout(function(t){if(!body.classList.contains("CONTENTPAGE")){body.classList.toggle("FADENAV",!1),body.classList.toggle("HIDENAV",!0),body.classList.toggle("CONTENTPAGE",!0);var e=t.offsetTop;0!=e&&(e+=1),bodyEle.scrollTop=e,handleWindowScroll()}}.bind(null,t),900))}var activePieces=[];function initListeners(){var t,e;window.addEventListener("click",function(){deactivateFocus()}),e=(t=document.getElementsByClassName("navIntroItem")).length;for(var n=0;n<e;n++)t[n].addEventListener("click",function(){var t=window.location.pathname;0===t.substring(t.length-1).localeCompare("/")&&(t=t.substring(0,t.length-1)),window.history.pushState("","",t+"/#"+this.dataset.name),toggleContent(this.dataset.name)});e=(t=document.getElementsByClassName("contentOption")).length;for(n=0;n<t.length;n++)t[n].addEventListener("click",function(){targetPage=document.getElementById(this.dataset.name+"Page"),scrollTo(bodyEle,targetPage.offsetTop,500),handleWindowScroll()})}function isArray(t){return isObject(t)&&t instanceof Array}function isObject(t){return t&&"object"==typeof t}function toggleClass(t,e,n,o,i){void 0!=o&&t.classList.contains(o),t.classList.toggle(e,n)}function getBodyTopEle(){return document.scrollingElement||document.documentElement}window.debounce=function(t,e,n){var o;return function(){var i=this,l=arguments,s=n&&!o;clearTimeout(o),o=setTimeout(function(){o=null,n||t.apply(i,l)},e),s&&t.apply(i,l)}};var scrollInt=5;function scrollTo(t,e,n){var o=e-t.scrollTop,i=Math.abs(o)/3;i>n&&(i=n),scrollToEle(t,e,i)}function scrollToEle(t,e,n){if(!(n<=0)){var o=(e-t.scrollTop)/n*scrollInt;setTimeout(function(){t.scrollTop=t.scrollTop+o,t.scrollTop!==e&&scrollToEle(t,e,n-scrollInt)},scrollInt)}}function deactivateFocus(){}function offset(t){var e=t.getBoundingClientRect(),n=window.pageXOffset||document.documentElement.scrollLeft,o=window.pageYOffset||document.documentElement.scrollTop;return{top:e.top+o,left:e.left+n}}function getAbsoluteHeight(t){t="string"==typeof t?document.querySelector(t):t;var e=window.getComputedStyle(t),n=parseFloat(e.marginTop)+parseFloat(e.marginBottom);return Math.ceil(t.offsetHeight+n)}function getAbsoluteWidth(t){t="string"==typeof t?document.querySelector(t):t;var e=window.getComputedStyle(t),n=parseFloat(e.marginRight)+parseFloat(e.marginLeft);return Math.ceil(t.offsetWidth+n)}function easeInOutQuad(t,e,n,o){return(t/=o/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e}function easeOutQuad(t,e,n,o){return-n*(t/=o)*(t-2)+e}function easeInQuad(t,e,n,o){return n*(t/=o)*t+e}