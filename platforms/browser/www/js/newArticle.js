document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
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
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    function geolocationSuccess(){
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        alert(longitude + " / " + latitude);
    }
    function geolocationError(){
        alert("Unable to resolve position !");
    }
}

