document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

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
        }
        function onFail(message) {
            alert('Failed because: ' + message); 
        }
    }

    //Coordonnées
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    function geolocationSuccess(position){
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        //alert("localisation => longitude : " + longitude + " /  latitude : " + latitude);
    }
    function geolocationError(){
        alert("Impossible de localiser l'appareil !");
    }
    
    //Vidéo
    document.getElementById("record_input").addEventListener("click", cameraTakeVideo);
    function cameraTakeVideo(){
        var captureSuccess = function(mediaFiles) {
            var i, path, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                path = mediaFiles[i].fullPath;
                alert(path, mediaFiles);
            }
        };
        
        var captureError = function(error) {
            navigator.notification.alert('Erreur code : ' + error.code, null, 'Erreur de capture');
        };
        
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
    }
}
