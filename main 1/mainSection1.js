//슬라이드 변수 선언
const mainSlides = [
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/main/20250904012243_1756916563489_XAmYNqfY6G.jpg?ver=202207071306",
        title: "리얼타임 청춘기록"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/main/20251023110728_1761185248895_41p1zdqV0x.jpg?ver=202207071306",
        title: "응원으로 채워가는 내 안의 우주"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/main/20250516164107_1747381267051_ImhzD_CLQI.jpg?ver=202207071306",
        title: "메가커피 x 라이즈 콜라보 오디세이"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/main/20250424000230_1745420550423_8nOaXZV6Ww.jpg?ver=202207071306",
        title: "다같이 놀자~ 마루한바퀴"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/main/20250319235554_1742396154719_ZFON8RAMW6.jpg?ver=202207071306",
        title: "큰 거 옆에 또 큰 거! new 왕메가 출시"
    },
    {
        img: "https://img.79plus.co.kr/megahp/manager/upload/main/20240926210426_1727352266910_QC_A3rqBQj.jpg?ver=202207071306",
        title: "디카페인 출시! 편안하게 즐겨보세요"
    }
];

//요소 선언
const slideBox = document.querySelector("#main1-slide");
const dotsControl = document.querySelector(".controls"); //도트 생성 구역

//슬라이드 상태의 변수 선언
let mainCurrentIndex = 0; //처음 보여줄 인덱스 번호
let currentTranslate = 0; //translate 값
const slideCount = mainSlides.length; // 총 슬라이드 갯수
let dots = []; // dots 저장 배열

//dot 생성
function createDots() {
    for(let i = 0; i < slideCount; i++){
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if(i === 0){
            dot.classList.add("active"); //첫번째 dot 활성화
        }
        dotsControl.append(dot);
        dot.addEventListener("click", () => goToSlide(i));
        dots.push(dot);
    }
}

//dot의 active 상태 갱신, index 번호가 슬라이드 번호와 같으면 active를 추가하겠다
function newDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === mainCurrentIndex);
    });
}

//슬라이드 이동
function goToSlide(index) {
    if(index < 0){
        index = slideCount - 1;
    }
    if(index >= slideCount) index = 0;
    mainCurrentIndex = index;
    currentTranslate = -mainCurrentIndex * window.innerWidth;

    slideBox.style.transform = `translateX(${currentTranslate}px)`; //이동할 px값을 계산한다
    newDots(); //슬라이드 이동할 때마다 dots의 active 상태를 계속 업데이트
}

window.addEventListener("DOMContentLoaded", () => {
    mainSlides.forEach((item, index) => {
    const slideItem = document.createElement("li");
    slideItem.classList.add("main1-slide-item");


    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title;
    slideItem.appendChild(img);
    slideBox.appendChild(slideItem);
    });
    createDots();
    goToSlide(0);
}); // dom이 완전히 로드되면 이벤트를 실행해라.