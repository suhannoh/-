//요소 선언
const infoInner = document.querySelector(".info-inner");
const slideWrap = document.getElementById("slide-wrap");

//우측 텍스트박스 변수 선언
const infoText = [
    {
        season: "메가MGC커피 가을시즌 신메뉴",
        maintitle: "리얼타임 청춘기록",
        subtitle: "RIIZE into FAll",
        info: `깊어지는 가을🍂<br>함께할수록 더 특별한 순간의 <span class="b">리얼타임 청춘기록</span>을<br>메가MGC커피에서 라이즈와 함께 만나보세요`
    }
];

//슬라이드 변수 선언
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
infoText.forEach((item) => {
    infoInner.innerHTML +=`
        <div class="info-box">
            <p>${item.season}</p>
            <h3>${item.maintitle}</h3>
        </div>
        <p>${item.subtitle}</p>
        <p>${item.info}</p>
    `
});

//슬라이드 생성
slides.forEach((item, index) => { 
    const card = document.createElement("div"); //div 생성
    card.classList.add("card");
    if(index === 0) { //만약 index가 0이라면
        card.classList.add("active"); //첫번째 index에 .active를 붙여라
    }

    const imgArea = document.createElement("div"); //img를 감싸는 div 생성
    imgArea.classList.add("slide-item-area");

    const img = document.createElement("img"); //img 생성
    img.src = item.img; //여기서 item은 slides를 가리킨다
    img.alt = item.title;
    imgArea.appendChild(img);

    const textBox = document.createElement("div"); //textbox 생성
    textBox.classList.add("text-box");
    textBox.innerHTML = `
        <div>
            <h4 class="con-text">${item.title}</h4>
            <p class="text1">${item.subtitle}</p>
        </div>
        <div class="text1">${item.info}</div>
    `;

    card.appendChild(imgArea);
    card.appendChild(textBox);
    slideWrap.appendChild(card);
});

//슬라이드 이동
const total = slides.length; //슬라이드 안의 배열 수를 total로 정한다
const cards = document.querySelectorAll(".card");

let currentIndex = 0; //현재 인덱스를 0으로 정한다

const activeSlide = () => {
    slideWrap.style.transform = `translateX(-${currentIndex * 428}px)`; //카드의 폭 + 갭 10px를 더한 값 428
    cards.forEach((c,i)=>{
        c.classList.toggle("active", i === currentIndex);
    });
};

const nextSlide = () => {
    currentIndex = (currentIndex +1) % total; // 슬라이드가 끝났을 때 다시 처음으로 돌아온다
    activeSlide();
}

const prevSlide = () => {
    currentIndex = (currentIndex -1 +total) % total; // 음수로 떨어지지 않게 막는다
    activeSlide();
}

let autoSlide = setInterval(nextSlide, 5000); //nextSlide를 5초 간격으로 실행한다

//버튼 연결
document.querySelector(".prev").addEventListener("click", () => {
    prevSlide();
})

document.querySelector(".next").addEventListener("click",() => {
    nextSlide();
})