/**
 * 장바구니 토글 스크립튼
 */
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation(); // 이벤트 버블링 정지! - 버튼을 클릭했을 때 드롭다운 메뉴가 나타나야 함.
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", (event) => {
  event.stopPropagation(); // 이벤트 버블링 정지! - 드롭다운 메뉴 영역을 클릭했을 때 메뉴가 사라지지 않아야 함.
});
// 화면 전체를 클릭했을 때 메뉴가 사라짐.
window.addEventListener("click", () => {
  hideBasket();
});

// 특정 로직을 직관적인 함수 이름으로 묶음.
function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

/**
 * 검색 관련 스크립트
 */
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")]; // ...전개연산자라는 개념을 통해서 해체를 시킴 li 를 [배열데이터]로 담음
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];
const searchInputEl = searchWrapEl.querySelector("input");

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", function () {
  // function(){}>> 익명함수 이기때문에  지명함수에서 ()를 제거하고 내부에서 동작하도록 넣으면 됨.
  hideSearch(); //>> 지명함수
});
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed"); //html 고정
  // 메뉴 사라짐 애니메이션
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s"; //역순으로 시작
  });

  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  // 메뉴 보임 애니메이션
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s"; //역순으로 시작
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s"; //역순으로 시작
  });

  searchDelayEls.reverse(); // 다시 처음으로 시작하기 위해서 리버스를 한번 더시킴

  searchInputEl.value = ""; // 인풋값 초기화
}

// /**
//  * 스프라이트 이미지
//  */
// let x = 0;
// let y = 0;
// let frames = '';
// // ${x}단위 =보간
// for (let i = 0; i < 60; i += 1) {
//   // 시작/ 종료 /변화
//   frames += `${(100 / 60 * i).toFixed(2)}% { background-position : ${x}px ${y}px;}`
//   if (x <= -500) {
//     x = 0
//     y -= 100
//     continue // for반복문 내부에서  if 조건에서 걸린다면 컨티뉴가 걸릴것이고,  컨티뉴가 걸린다면 밑에있는 실행문을 실행하지 않음.
//   }
//   x -= 100
// }
// const icons = [...document.querySelectorAll(".icon")]; 
// icons.animate(frames);
// console.log(icons)
// // icons.animate(frames);
