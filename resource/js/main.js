import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

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
//  * js 키프레임 계산 ()
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
// icons.style = keyframes.insertFule(frames)
// console.log(icons)
// // icons.animate(frames);


/**
 * 요소 가시성 관찰 옵저버 
 * wow 플러그인이랑 같은 기능
 */


const io = new IntersectionObserver(entries => {
  // entries는 `io.observe(el)`로 등록된 모든 관찰 대상 배열.
  entries.forEach(entry => {
    // 사라질 때.
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show')
  })
})
// 관찰할 요소들 검색
const infoEls = document.querySelectorAll('.info') // 배열데이터
// 관찰 시작!
infoEls.forEach(el => io.observe(el))



/**
 * 비디오 컨틀롤러
 */

const video = document.querySelector(".stage-area video");
const playBtn = document.querySelector(".controller--play");
const pauseBtn = document.querySelector(".controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  pauseBtn.classList.remove("hide");
  playBtn.classList.add("hide");

})

pauseBtn.addEventListener("click", function () {
  video.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
})



/**
 * compare recomand ipad js
 * [당신에게 맞는 아이페드는?] 렌더링
 */

const itemsEl = document.querySelector(".recomand-wrap .items-area");
ipads.forEach(ipad => {
  const itemEl = document.createElement('li'); //요소 생성
  itemEl.classList.add("item"); // 생성된 요소에 클래스 부여

  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li class="color" style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
  <!-- 백틱 사용 >> template literal 방식 -->
  <!-- price.toLocaleString('en-Us') 미국에서 사용하는 숫자표s시 단위 정의 -->
  <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name"> ${ipad.name}</h3>
    <div class="tag-line"> ${ipad.tagline}</div>
    <div class="price">₩${ipad.price.toLocaleString('en-Us')}원 부터</div>
    <button class="btn btn-primary" type="button">구입하기</button>
    <div class="links"><a href="${ipad.url}" class="link">더알아보기</a></div>
  `
  itemsEl.append(itemEl)
  console.log(itemEl)
  // itemsEl.append(itemEl) //아이템컨테이너에 하나씩(forEach) 요소를 넣음 

})


/**
 * navigation js
 * [푸터] 렌더링
 */

const navsEl = document.querySelector("footer .navigations");

navigations.forEach(nav => {
  const navEl = document.createElement("div");
  navEl.classList.add("map");

  let mapList = '';
  nav.maps.forEach(map =>
    mapList += /*html */`
      <li><a href="${map.url}">${map.name}</a></li>`
  )


  navEl.innerHTML = /*html */ `
   <h3>${nav.title}</h3>
    <ul>
      ${mapList}
    </ul>
  `

navsEl.append(navEl)
})