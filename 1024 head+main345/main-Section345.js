const contactBtn = {
    phone : document.querySelector("#contactPhone"),
    chat : document.querySelector("#contactEmail"),
    brand : document.querySelector("#aboutBrand"),
    Franchise : document.querySelector("#contactFranchise"),
}

contactBtn.phone.addEventListener("click", alertMsg1);
contactBtn.chat.addEventListener("click", alertMsg1);
contactBtn.brand.addEventListener("click", alertMsg2);
contactBtn.Franchise.addEventListener("click", alertMsg2);

function alertMsg1() {
    return alert("모바일 - 전화상담 상담문의 버튼 이벤트 전달 확인완료");
}
function alertMsg2() {
    return alert("브랜드소개 창업문의 버튼 이벤트 전달 확인완료");
}
