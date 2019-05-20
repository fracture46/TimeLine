//Variable servant de base pour générer l'objet JSON dans le LocalStorage
var coordsData = null;
var imageData = null;
var videoData = null;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    navigator.splashscreen.hide(); //On cache le splashScreen

    //Image
    document.getElementById("picture_input").addEventListener("click", cameraTakePicture);
    function cameraTakePicture() { 
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 90, 
            destinationType: Camera.DestinationType.DATA_URL 
        });
        function onSuccess(imageData) { 
            var image = document.getElementById('myImage'); 
            image.src = "data:image/jpeg;base64," + imageData; 
            imageData = image.src;
            alert("Photo prise en compte.");
        }
        function onFail(message) {
            alert('Failed because: ' + message); 
        }
    }

    //Coordonnées
    document.getElementById("use_coord").addEventListener("click", keepCoords);
    function keepCoords(){
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
        function geolocationSuccess(position){
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            coordsData = longitude+"/"+latitude;
            alert("Localisation prise en compte.");
        }
        function geolocationError(){
            alert("Impossible de localiser l'appareil !");
        }
    }
    
    //Vidéo
    document.getElementById("record_input").addEventListener("click", cameraTakeVideo);
    function cameraTakeVideo(){
        var captureSuccess = function(mediaFiles) {
            var i, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                videoData = mediaFiles[i].fullPath;
                alert("Vidéo prise en compte.");
            }
        };
        
        var captureError = function(error) {
            navigator.notification.alert('Code erreur : ' + error.code, null, 'Erreur de capture');
        };
        
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
    }

    //Validation de l'article
    document.getElementById("validate").addEventListener("click", saveArticle);
    function saveArticle(){
        var articleDate = Date.now(); 
        var article = {
            date : articleDate,
            text : document.getElementById("text_input").text,
            image : imageData,
            video : videoData,
            coord : coordsData
        }
        var articleJSON = JSON.stringify(article);

        //Mise à jour de l'ordre pour que la tâche ajoutée soit affichée en cas de rechargement sans changement d'ordre
        /*var order = $("#todolist").sortable('toArray').toString();
        console.log(order);
        var orderArray = {
            order : order.split(',')
        };
        console.log(orderArray);
        var orderdJSON = JSON.stringify(orderArray);
        console.log(orderdJSON);
        localStorage.setItem("sortOrder",orderdJSON);*/

        localStorage.setItem(newArticle,articleJSON);
        alert("test : item saved => redirect !");
        //Redirection vers le menu
        window.location = "index.html";
    }
}
