//슬라이드 변수 선언
const mainSlides = [
    {
        pc: "https://img.79plus.co.kr/megahp/manager/upload/main/20250904012243_1756916563489_XAmYNqfY6G.jpg?ver=202207071306",
        mobile: "https://img.79plus.co.kr/megahp/manager/upload/main/20250904012243_1756916563716_KnxMTX3FZ4.jpg?ver=202207071306",
        title: "리얼타임 청춘기록"
    },
    {
        pc: "https://img.79plus.co.kr/megahp/manager/upload/main/20251023110728_1761185248895_41p1zdqV0x.jpg?ver=202207071306",
        mobile: "https://img.79plus.co.kr/megahp/manager/upload/main/20251023110729_1761185249147_mndrQQdtR8.jpg?ver=202207071306",
        title: "응원으로 채워가는 내 안의 우주"
    },
    {
        pc: "https://img.79plus.co.kr/megahp/manager/upload/main/20250516164107_1747381267051_ImhzD_CLQI.jpg?ver=202207071306",
        mobile: "https://img.79plus.co.kr/megahp/manager/upload/main/20250516164107_1747381267275_2MwT2hAI9p.jpg?ver=202207071306",
        title: "메가커피 x 라이즈 콜라보 오디세이"
    },
    {
        pc: "https://img.79plus.co.kr/megahp/manager/upload/main/20250424000230_1745420550423_8nOaXZV6Ww.jpg?ver=202207071306",
        mobile: "https://img.79plus.co.kr/megahp/manager/upload/main/20250424000230_1745420550887_Wj79OVa38k.jpg?ver=202207071306",
        title: "다같이 놀자~ 마루한바퀴"
    },
    {
        pc: "https://img.79plus.co.kr/megahp/manager/upload/main/20250319235554_1742396154719_ZFON8RAMW6.jpg?ver=202207071306",
        mobile: "https://img.79plus.co.kr/megahp/manager/upload/main/20250319235554_1742396154936_nDHDrfMrMv.jpg?ver=202207071306",
        title: "큰 거 옆에 또 큰 거! new 왕메가 출시"
    },
    {
        pc: "https://img.79plus.co.kr/megahp/manager/upload/main/20240926210426_1727352266910_QC_A3rqBQj.jpg?ver=202207071306",
        mobile: "https://img.79plus.co.kr/megahp/manager/upload/main/20240926210427_1727352267126_pw5jCrVvPI.jpg?ver=202207071306",
        title: "디카페인 출시! 편안하게 즐겨보세요"
    }
];

//요소 선언
const slideBox = document.querySelector("#main1-slide");
const dotsControl = document.querySelector(".controls"); //도트 생성 구역

//슬라이드 상태의 변수 선언
let mainCurrentIndex = 0; //처음 보여줄 인덱스 번호
let currentTranslate = 0; //translate 값
let slideWidth = window.innerWidth;
const slideCount = mainSlides.length; // 총 슬라이드 갯수
let dots = []; // dots 저장 배열


//뷰포트 타입에 따라 이미지 타입 변경하는 삼항연산자
const getImgUrl = (item) => 
    window.innerWidth <= 760 ? item.mobile : item.pc;

//슬라이드 생성
function renderSlide() {
    const fragment = document.createDocumentFragment();

    mainSlides.forEach((item) => {
    const slideItem = document.createElement("li");
    slideItem.classList.add("main1-slide-item");

    const img = document.createElement("img");
    img.src = getImgUrl(item);
    img.alt = item.title;
    slideItem.appendChild(img);

    fragment.appendChild(slideItem);
    });
    slideBox.innerHTML = "";
    slideBox.appendChild(fragment);
}

//도트 생성
function createDots() {
    const fragment = document.createDocumentFragment();
    dots = [];

    for(let i = 0; i < slideCount; i++){
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if(i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => goToSlide(i));
        dots.push(dot);
        fragment.appendChild(dot);
    }
    dotsControl.innerHTML = "";
    dotsControl.appendChild(fragment);
}

//dot의 active 상태 갱신, index 번호가 슬라이드 번호와 같으면 active를 추가하겠다
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === mainCurrentIndex);
    });
}

//슬라이드 이동
function goToSlide(index) {
  if (index < 0) index = slideCount - 1;
  if (index >= slideCount) index = 0;

  mainCurrentIndex = index;
  currentTranslate = -mainCurrentIndex * slideWidth;

  slideBox.style.transform = `translateX(${currentTranslate}px)`;
  updateDots();
}

function handleResize() {
  const newWidth = window.innerWidth;
  if (newWidth === slideWidth) return; // 불필요한 재렌더 방지
  slideWidth = newWidth;

  renderSlides();
  goToSlide(mainCurrentIndex); // 현재 위치 유지
}

window.addEventListener("DOMContentLoaded", () => {
  renderSlide();
  createDots();
  goToSlide(0);
});

window.addEventListener("resize", handleResize);