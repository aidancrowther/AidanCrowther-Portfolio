var body,nav,pages,contentBody,navEle,header,contact,clientWidth,clientHeight,windowY,windowX,loadFrame,prevScroll,scrollInterval,xhr,hasScrolled=!1,bodyEle=getBodyTopEle(),savedScroll=0,contentScroll=0,indexReady=!0,loadStatus=!1,sidebarPadding=16,pageList=["portfolio","networkscaling","biasedpost","apexdesigns","acapollo"];function startMain(){function e(){document.body.classList.toggle("focused",!1),document.body.classList.toggle("blurred",!0)}function t(){document.body.classList.toggle("blurred",!1),document.body.classList.toggle("focused",!0)}initSupports(),initElements(),window.onfocus=t,window.onblur=e;var n=debounce(function(){resize()},2);window.onresize=n,resize();var o=debounce(function(){handleWindowScroll()},10);window.onscroll=o,handleWindowScroll(),introSequence()}function introSequence(){initVariables(),initListeners(),initIntervals(),loadStatus=!0,finishLoad(),resize()}function finishLoad(){body.classList.toggle("LOADED",!0),setTimeout(function(){body.classList.toggle("READY",!0)},1500)}function handleImmediateScroll(){windowY=bodyEle.scrollTop,prevScroll!=windowY&&(prevScroll=windowY)}var sidebarFixed=!1,lastPage=-1,lastScroll=-1;function handleWindowScroll(){var e;e=pages.length;var t=bodyEle.scrollTop;if(body.classList.contains("CONTENTPAGE"))for(var n=0;n<e&&(lastScroll-t<0||n!=lastPage);n++)if(t<pages[n].offsetTop+(pages[n].clientHeight-.55*clientHeight)){lastPage=n,setCurrPage(n,e);break}lastScroll=t}function setCurrPage(e,t){body.classList.contains("PAGE_"+e)||body.classList.toggle("PAGE_"+e,!0)}function deactivatePages(e){for(var t=0;t<len;t++){var n="PAGE_"+t;t!=e&&body.classList.contains(n)?body.classList.toggle("UN"+n,!0):body.classList.toggle("UN"+n,!1),body.classList.toggle(n,!1)}}function resize(){clientWidth=Math.max(document.documentElement.clientWidth,window.innerWidth||0),clientHeight=Math.max(document.documentElement.clientHeight,window.innerHeight||0);document.body;var e=document.documentElement;pageHeight=Math.max(body.scrollHeight,body.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight);try{SIDEBAR_RESIZE(clientWidth,clientHeight)}catch(e){}}function setEleHeights(){for(var e=document.getElementsByClassName("heightRef"),t=0;t<e.length;t++)for(var n=iterateElements(e[t],"heightSet","heightRef"),o=0;o<n.length;o++)n[o].style.height=e[t].clientHeight+"px"}function iterateElements(e,t,n){for(var o=e.childNodes,i=[],l=0;l<o.length;l++)void 0!=o[l]&&1===o[l].nodeType&&(o[l].classList.contains(t)&&i.push(o[l]),o[l].classList.contains(n)||(i=i.concat(iterateElements(o[l],t,n))));return i}function initSupports(){if("CSS"in window&&"supports"in window.CSS){window.CSS.supports("mix-blend-mode","multiply");/mobile/i.test(navigator.userAgent)&&document.getElementsByTagName("body")[0].classList.toggle("MOBILE")}document.getElementsByTagName("html")[0].classList.toggle("LOADING",!1)}function initVariables(){sidebarPadding=16}function initIntervals(){handleImmediateScroll()}function initElements(){body=document.getElementsByTagName("body")[0],nav=document.getElementsByTagName("nav")[0],pages=document.getElementsByClassName("page"),projectItems=document.getElementsByClassName("projectItem"),contentBody=document.getElementById("body")}var activePieces=[];function initListeners(){var e;window.addEventListener("click",function(){deactivateFocus()}),(e=document.getElementsByClassName("detailNavItem")).length;for(var t=0;t<e.length;t++)e[t].addEventListener("click",function(){var e=window.location.pathname;e=(e=e.substring(0,e.lastIndexOf("/"))).substring(0,e.lastIndexOf("/")),window.location.href=e+"/#"+this.dataset.name})}function isArray(e){return isObject(e)&&e instanceof Array}function isObject(e){return e&&"object"==typeof e}function toggleClass(e,t,n,o,i){void 0!=o&&e.classList.contains(o),e.classList.toggle(t,n)}function getBodyTopEle(){return document.scrollingElement||document.documentElement}window.debounce=function(e,t,n){var o;return function(){var i=this,l=arguments,s=n&&!o;clearTimeout(o),o=setTimeout(function(){o=null,n||e.apply(i,l)},t),s&&e.apply(i,l)}};var scrollInt=5;function scrollTo(e,t,n){var o=t-e.scrollTop,i=Math.abs(o)/3;i>n&&(i=n),scrollToEle(e,t,i)}function scrollToEle(e,t,n){if(!(n<=0)){var o=(t-e.scrollTop)/n*scrollInt;setTimeout(function(){e.scrollTop=e.scrollTop+o,e.scrollTop!==t&&scrollToEle(e,t,n-scrollInt)},scrollInt)}}function deactivateFocus(){}function offset(e){var t=e.getBoundingClientRect(),n=window.pageXOffset||document.documentElement.scrollLeft,o=window.pageYOffset||document.documentElement.scrollTop;return{top:t.top+o,left:t.left+n}}function getAbsoluteHeight(e){e="string"==typeof e?document.querySelector(e):e;var t=window.getComputedStyle(e),n=parseFloat(t.marginTop)+parseFloat(t.marginBottom);return Math.ceil(e.offsetHeight+n)}function getAbsoluteWidth(e){e="string"==typeof e?document.querySelector(e):e;var t=window.getComputedStyle(e),n=parseFloat(t.marginRight)+parseFloat(t.marginLeft);return Math.ceil(e.offsetWidth+n)}function easeInOutQuad(e,t,n,o){return(e/=o/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t}function easeOutQuad(e,t,n,o){return-n*(e/=o)*(e-2)+t}function easeInQuad(e,t,n,o){return n*(e/=o)*e+t}