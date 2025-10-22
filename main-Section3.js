const contactBtn = {
    phone : document.querySelector("#contactPhone"),
    chat : document.querySelector("#contactEmail"),
}
const $quickBtn = document.querySelector("#quickBtn");
const q = document.querySelectorAll(".fixed-side-1 li");

contactBtn.phone.addEventListener("click", alertMsg);
contactBtn.chat.addEventListener("click", alertMsg);
$quickBtn.addEventListener("click", () => {
    q.forEach(qq => {
        qq.classList.toggle("f-hdn");
    });


})


function alertMsg() {
    return alert("전화상담과 상담문의 alert 입니다.");
}

