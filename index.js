const $quickBtn = document.querySelector("#quickBtn");
const $quickSideHiddenList = document.querySelectorAll(".fixed-side-1 li:not(#quickBtn)");

$quickBtn.addEventListener("click", () => {
    $quickSideHiddenList.forEach(li => {
        li.classList.toggle("f-hdn");
});})