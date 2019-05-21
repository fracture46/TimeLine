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
        function onSuccess(imageDataRaw) {
            imageData = "data:image/jpeg;base64," + imageDataRaw;
            alert("Photo prise en compte.");
        }
        function onFail(message) {
            alert('Erreur : ' + message); 
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

    function checkExist(date) {
        for(var i = 0; i < localStorage.length; i++){
            var listName = localStorage.key(i);
            var JSONObject = localStorage.getItem(listName);
            var parsedJSON = JSON.parse(JSONObject);
            var articleDateFor = parsedJSON["date"];
            if(articleDateFor == date){
                return true;
            }
        }
        return false;
    }

    //Validation de l'article
    document.getElementById("validate").addEventListener("click", saveArticle);
    function saveArticle(){
        currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth()+1; //car Janvier vaut 0
        var year = currentDate.getFullYear();
        var articleDate = year + "-" + month + "-" + day;

        //Vérification que la date n'existe pas déjà dans le localStorage
        var k = 1;
        var dateExist = checkExist(articleDate);
        while(dateExist != false) {
            if(articleDate.indexOf("_") != -1) {
                var articleDateExploded = articleDate.split("_");
                articleDate = articleDateExploded[0];
            }
            articleDate = articleDate + "_" + k;
            k++;
            dateExist = checkExist(articleDate);
        }

        var article = {
            date : articleDate,
            text : document.getElementById("text_input").value,
            image : imageData,
            video : videoData,
            coord : coordsData
        }
        var articleJSON = JSON.stringify(article);
        localStorage.setItem(articleDate,articleJSON);
        //Redirection vers le menu
        window.location = "index.html";
    }
}
