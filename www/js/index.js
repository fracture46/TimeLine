/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function loadDataFromStorage(){
    alert(localStorage.length);
    for(var i = 0; i < localStorage.length; i++){
        var articleRef = localStorage.key(i);
        var JSONObject = localStorage.getItem(articleRef);
        var parsedJSON = JSON.parse(JSONObject);
        var articleDate = parsedJSON["date"];
        var articleContent;
        articleContent = document.createElement("div");
        articleContent.className = "article";
        articleContent.id = articleDate;
        var titleNode = document.createElement("h2");
        titleNode.textContent = "le "+articleDate;
        articleContent.appendChild(titleNode);

        if(parsedJSON["coord"] != undefined) {
            var CoordNode = document.createElement("p");
            CoordNode.className = "coord_display";
            CoordNode.textContent = parsedJSON["coord"];
            articleContent.appendChild(CoordNode);
        }
        if(parsedJSON["text"] != undefined){
            var textNode = document.createElement("p");
            textNode.className = "text_display";
            textNode.textContent = parsedJSON["text"];
            articleContent.appendChild(textNode);
        }
        if(parsedJSON["video"] != undefined) {
            var videoNode = document.createElement("video");
            videoNode.className = "video_display";
            videoNode.src = parsedJSON["video"];
            videoNode.controls = "controls";
            articleContent.appendChild(videoNode);
        }
        if(parsedJSON["image"] != undefined) {
            var imageNode = document.createElement("img");
            imageNode.className = "image_display";
            imageNode.src = parsedJSON["image"];
            articleContent.appendChild(imageNode);
        }
        document.getElementById("app").appendChild(articleContent);
    }
}
//Appel pour chargement des articles
loadDataFromStorage();

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    navigator.splashscreen.hide(); //On cache le splashScreen
}
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
};

app.initialize();