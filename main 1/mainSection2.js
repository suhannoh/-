//요소 선언
const infoInner = document.querySelector(".info-inner");
const slideWrap = document.getElementById("slide-wrap");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

//데이터 선언
const infoText = [
    {
        season: "메가MGC커피 가을시즌 신메뉴",
        maintitle: "리얼타임 청춘기록",
        subtitle: "RIIZE into FAll",
        info: `깊어지는 가을🍂<br>함께할수록 더 특별한 순간의 <span class="text-bold">리얼타임 청춘기록</span>을<br>메가MGC커피에서 라이즈와 함께 만나보세요`
    }
];

const slides = [
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/menu/20250902150350_1756793030299_wEBKiCWct1.jpg",
        title: "누룽누룽 바삭 프라페",
        subtitle: "Nurung-ji crisp Frappe",
        info: "대왕님표 여주쌀로 만든 누룽지를 넣어 달달 꼬소~한 프라페 위로 바삭바삭한 누룽지를 한번 더 올린 가을 한정 음료"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/menu/20250902171808_1756801088394_2yZlbc_jH9.jpg",
        title: "요거젤라또 초코베리믹스",
        subtitle: "Yogurt Gelato Choco Berry Mix",
        info: "초코쉘을 입힌 요거트 젤라또에 세가지 달콤상큼 베리와 초코링, 고소한 그래놀라를 더한 시원달달 요거볼"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/menu/20250902170923_1756800563948_7uR3KDEJ6o.jpg",
        title: "매콤 비빔주먹빵",
        subtitle: "Spicy Bibim Bread",
        info: "고소한 삼각 빵 속을 대왕님표 여주쌀이 함유된 매콤한 비빔밥으로 가득 채운, 매콤 고소한 비빔주먹빵"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/menu/20250902170653_1756800413075_x13ar0e3qK.jpg",
        title: "피넛버터 애플 샌드",
        subtitle: "Peanut Butter Apple Sandwich",
        info: "부드러운 피넛버터크림에 사과과육이 가득 씹히는 사과잼을 넣어 달콤 고소한 매력을 한 번에 느낄 수 있는 디저트"
    },
];

//INFO 생성
function renderInfo(){
    infoInner.innerHTML = infoText.map(item => `
        <div class="info-box">
            <p>${item.season}</p>
            <h3>${item.maintitle}</h3>
        </div>
        <p>${item.subtitle}</p>
        <p>${item.info}</p>
        <button class="main2-btn">메뉴 더보기</button>
        `
    ).join("");
}

//슬라이드 생성
function renderSlide(){
    const fragment = document.createDocumentFragment();
    const isDesktop = window.innerWidth > 760;

    slides.forEach((item, index) => { 
    const card = document.createElement("div");
    card.className = "card" + (isDesktop && index === 0 ? " active":"");
    card.innerHTML = `
        <div class="slide-item-area">
            <img src="${item.img}" alt="${item.title}">
        </div>
        <div class="text-box">
            <div>
                <h4 class="con-text">${item.title}</h4>
                <p class="text1">${item.subtitle}</p>
            </div>
            <div class="text1">${item.info}</div>
        </div>
    `;
    fragment.appendChild(card);
});
    slideWrap.innerHTML = "";
    slideWrap.appendChild(fragment);
} //documentfragment를 사용한 최적화

//슬라이드 이동
let currentIndex = 0; //현재 인덱스를 0으로 정한다
let autoSlide = null;

function activeSlide() {
    const cards = document.querySelectorAll(".card");
    const isMobile = window.innerWidth <= 760;
    const slideWidth = isMobile ? 200 : 427;

    slideWrap.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    if(!isMobile){
        cards.forEach((c,i)=>{
        c.classList.toggle("active", i === currentIndex);
        });
    }
} // 슬라이드 이동 로직 최적화

function nextSlide() {
    currentIndex = (currentIndex +1) % slides.length;
    activeSlide();
}

function prevSlide() {
    currentIndex = (currentIndex -1 +slides.length) % slides.length;
    activeSlide();
}

//--
//자동슬라이드

function startSlide(){
    stopSlide();
    if(window.innerWidth > 760) {
        autoSlide = setInterval(nextSlide, 5000);
    }
}

function stopSlide() {
    if(autoSlide) clearInterval(autoSlide);
}

//버튼 연결
prevBtn.addEventListener("click", () => {
    prevSlide();
    startSlide();
});

nextBtn.addEventListener("click",() => {
    nextSlide();
    startSlide();
});

window.addEventListener("resize", () =>{
    renderSlide();
    activeSlide();
    startSlide();
});

//---초기실행
renderInfo();
renderSlide();
activeSlide();
startSlide();