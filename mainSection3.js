const contactBtn = {
    phone : document.querySelector("#contactPhone"),
    chat : document.querySelector("#contactEmail"),
}

contactBtn.phone.addEventListener("click", alertMsg);
contactBtn.chat.addEventListener("click", alertMsg);

function alertMsg() {
    return alert("전화상담과 상담문의 alert 입니다.");
}

