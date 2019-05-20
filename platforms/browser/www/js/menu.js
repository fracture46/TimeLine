document.getElementById("closeNav").addEventListener("click", closeNav);
document.getElementById("activeNav").addEventListener("click", openNav);
document.getElementById("menu_list").addEventListener("click", splashScreen);
document.getElementById("menu_plus").addEventListener("click", splashScreen);

function openNav() {
    document.getElementById("mySidenav").style.width = "50%";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function splashScreen(){
    navigator.splashscreen.show(); //ajouter un hide ici pour le retour au menu
}