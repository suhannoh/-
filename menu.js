document.addEventListener('DOMContentLoaded', () => {
  const menuList = document.querySelector('.menu-list'); //메뉴 ul
  const pageList = document.querySelector('.page-list'); //페이지네이션 ul
  const filterCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]'); //필터 체크박스

  if (!menuList || !pageList || !filterCheckboxes) return; //만약 현재 dom에 위의 세 가지가 없으면 실행중지 (안전장치)

  let menuData = []; // menu.json에서 가져온 데이터
  let filteredMenu = []; //체크박스 필터 적용 후 데이터
  let currentPage = 1; // 현재 페이지 번호/ 초기값1
  const itemsPerPage = 20; // 현재 페이지 최대 메뉴 갯수 // 초기값 20


  window.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner-box');
    setTimeout(() => {
        banner.classList.add('down');}, 100)
    }); //1초 뒤에 .down을 붙여서 움직이게 해라


  //menu.json을 불러온다
  fetch('./menu.json')
  .then(res => res.json())
  .then(data => {
    menuData = data;
    filteredMenu = data;
    applyFilters(); //체크박스의 상태에 맞춰서 메뉴를 불러와
  }).catch(err => console.error('메뉴 불러오기 실패:', err));


  //체크박스
  filterCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters)); //체크&체크해제 시 필터를 다시 적용한다

  function applyFilters() {
    const checkedTags = Array.from(filterCheckboxes) //체크박스를 배열로 변환해서
      .filter(cb => cb.checked && cb.value) //체크되어 있는 요소들만
      .map(cb => cb.value); // value 값을 가져온다
    if (checkedTags.length === 0 || checkedTags.includes("전체 상품보기")) { //체크가 없거나, 전체 상품보기만 체크 중일 때
      filteredMenu = menuData; //데이터를 보여준다
    } else {
      filteredMenu = menuData.filter(item =>
        Array.isArray(item.tags) && item.tags.some(tag => checkedTags.includes(tag)) //tag 중에 하나라도 겹치면 그 데이터를 가져온다
      );
    }
    currentPage = 1; 
    renderMenu(); 
    renderPagination();
  }


  //메뉴 렌더링
  function renderMenu() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredMenu.slice(start, end);

    //혹시 item.tem이 배열로 되어 있는지, 비어있지 않은지?
    //배열이고 요소가 적혀져 있으면 label2
    //없으면 label1을 적용한다
    menuList.innerHTML = pageItems.map(item => `
      <li>
        <div class="menu-list-box">
          <div class="menu-list-img">
            <div class="menu-label ${Array.isArray(item.tem) && item.tem.length > 0 ? 'label2' : 'label1'}"> 
            ${Array.isArray(item.tem) && item.tem.length > 0 ? item.tem.join(', ') : 'ICE'}
            </div>
            <img src="${item.url}" alt="${item.name}">
          </div>
          <div class="menu-info-box">
            <div class="menu-text-title w400">${item.name}</div>
            <p class="text3">${item.enName}</p>
            <div class="text3 text-info">${item.info}</div>
          </div>
        </div>

        <div class="menu-modal" style="display:none;">
          <div class="menu-modal-top">
            <div class="inner-modal">
              <div class="close-btn" style="cursor:pointer;"></div>
              <p class="w400 text4">${item.name}</p>
              <p class="text5">${item.enName}</p>
            </div>
            <div>
              <p>${item.size}ml</p>
              <p>1회 제공량 ${item.kcal}kcal</p>
              <br>
              <p class="m20">${item.info}</p>
              <p class="text5">알레르기 성분: ${item.allergy}</p>
            </div>
          </div>
          <div class="menu-modal-bottom">
            <ul>
              <li>포화지방 ${item.sf}g</li>
              <li>당류 ${item.sugar}g</li>
              <li>나트륨 ${item.Na}mg</li>
              <li>단백질 ${item.Pt}g</li>
              <li>카페인 ${item.caf}mg</li>
            </ul>
          </div>
        </div>
      </li>
    `).join(''); //innerhtml을 문자열로 만들어 ul 안에 추가해라
  }


  // 페이지네이션 렌더링
  function renderPagination() {
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage); //math.ceil을 사용해서 나머지가 나와도 반올림 해서 페이지 생성을 하게 한다
  let html = '';

  // 처음
  html += `<li><a href="#" data-page="1" class="${currentPage === 1 ? 'disabled' : ''}">처음</a></li>`; // 현재 페이지가 1이면 버튼이 눌리지 않게 된다

  // 숫자 페이지
  for (let i = 1; i <= totalPages; i++) {
    html += `<li><a href="#" data-page="${i}" class="${currentPage === i ? 'page-check' : ''}">${i}</a></li>`; // 현재 페이지면 강조 표시를 한다
  }

  // 다음 & 마지막
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages; // 현재 페이지가 마지막 페이지보다 작으면 다음 페이지:마지막페이지
  html += `<li><a href="#" data-page="${nextPage}" class="${currentPage === totalPages ? 'disabled' : ''}">다음</a></li>`; 
  html += `<li><a href="#" data-page="${totalPages}" class="${currentPage === totalPages ? 'disabled' : ''}">마지막</a></li>`;

  pageList.innerHTML = html; //pageList에 넣어 화면에 나타내라
}

    //페이지 이벤트
  pageList.addEventListener('click', e => {
    const a = e.target.closest('a'); // 가장 가까운 a 요소를 찾음
    if (!a) return; // 못 찾으면 종료해라
    e.preventDefault(); //a태그 동작오류 방지
    const selectedPage = Number(a.dataset.page); // data-page 값을 숫자로 가져온다
    if (selectedPage !== currentPage) { // 클릭한 페이지가 현재 페이지와 다른가?
      currentPage = selectedPage; // 둘을 동기화 한다
      renderMenu(); // 해당 페이지에 속하는 메뉴만 표시한다
      renderPagination(); // 페이지네이션을 다시 그린다
    }
  });

  // 모달 이벤트
  menuList.addEventListener('click', e => {
    const li = e.target.closest('li'); //가장 가까운 li를 찾아라
    if (!li) return; //만약 클릭한 곳의 부모가 li가 아니면 그대로 종료

    if (e.target.classList.contains('close-btn')) { //클릭한 요소에 close-btn이 있는가?
      const modal = li.querySelector('.menu-modal');
      if (modal) modal.style.display = 'none'; // 만약 모달이 존재하면 none으로
      return; // 함수 종료
    }

    const modal = li.querySelector('.menu-modal');
    if (modal) modal.style.display = 'block'; // 모달이 존재하면 lock으로
  });
});