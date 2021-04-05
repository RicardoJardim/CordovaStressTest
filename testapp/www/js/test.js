var controller;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  controller = new Controller();
  if (controller != null) {
    controller.changeController("#btn1", "cpu");
  }
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);

  camera();
}

function camera() {
  console.log("ola");
  let opts = {
    quality: 80,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    mediaType: Camera.MediaType.PICTURE,
    encodingType: Camera.EncodingType.JPEG,
    cameraDirection: Camera.Direction.BACK,
    targetWidth: 300,
    targetHeight: 400,
  };

  navigator.camera.getPicture(ftw, wtf, opts);
}

function ftw(imgURI) {
  document.getElementById("msg").textContent = imgURI;
  document.getElementById("photo").src = imgURI;
}
function wtf(msg) {
  document.getElementById("msg").textContent = msg;
}
