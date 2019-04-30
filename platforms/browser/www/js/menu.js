document.getElementById("closeNav").addEventListener("click", closeNav);
document.getElementById("activeNav").addEventListener("click", openNav);

function openNav() {
    document.getElementById("mySidenav").style.width = "25%";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}