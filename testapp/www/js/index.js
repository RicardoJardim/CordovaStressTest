var controller;
var app = {
  // Application Constructor
  initialize: function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      document.addEventListener("deviceready", this.onDeviceReady, false);
    } else {
      this.onDeviceReady();
    }
  },

  onDeviceReady: function () {
    controller = new Controller();
    if (controller != null) {
      controller.changeController("#btn1", "cpu");
    }
  },

  makeGetRequest2: function (link, callback) {
    const options = {
      method: "get",
    };

    cordova.plugin.http.sendRequest(
      link,
      options,
      function (response) {
        callback(response.data);
      },
      function (response) {
        console.log(response.error);
      }
    );
  },

  camera: function (source) {
    let opts = {
      quality: 80,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      mediaType: Camera.MediaType.PICTURE,
      encodingType: Camera.EncodingType.JPEG,
      cameraDirection: Camera.Direction.BACK,
      targetWidth: 300,
      targetHeight: 400,
    };

    navigator.camera.getPicture(
      (imgURI) => {
        console.log(imgURI);
      },
      (msg) => {
        console.log(msg);
      },
      opts
    );
  },

  gps: function () {
    var onSuccess = function (position) {
      console.log(
        "Latitude: " +
          position.coords.latitude +
          "\n" +
          "Longitude: " +
          position.coords.longitude
      );
    };

    function onError(error) {
      console.log(
        "code: " + error.code + "\n" + "message: " + error.message + "\n"
      );
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  },

  writeFile: function (where, data) {
    function saveFile(dirEntry, fileData, fileName) {
      window.resolveLocalFileSystemURL(
        cordova.file.dataDirectory,
        function (dir) {
          console.log("got main dir", dir);
          dir.getFile(
            fileName,
            { create: true, exclusive: false },
            function (fileEntry) {
              writeFile(fileEntry, fileData);
            },
            onErrorCreateFile
          );
        }
      );
    }
    function onErrorCreateFile(e) {
      console.log("Failed file write: " + e.toString());
    }
    function writeFile(fileEntry, dataObj, isAppend) {
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {
          console.log(where + " " + new Date());
        };

        fileWriter.onerror = function (e) {
          console.log("Failed file write: " + e.toString());
        };

        fileWriter.write(dataObj);
      });
    }
    saveFile(cordova.file.dataDirectory, data, where);
  },
  calendar: function () {
    var success = function (message) {
      console.log("Success: " + JSON.stringify(message));
    };
    var error = function (message) {
      console.log("Error: " + message);
    };
    window.plugins.calendar.listCalendars(success, error);
  },

  contacts: function () {
    function onSuccess(contacts) {
      var list = "";

      for (var i = 0; i < contacts.length; i++) {
        console.log(contacts[i]);
        list += contacts[i].displayName;
      }
      console.log(list);
    }

    function onError(contactError) {
      console.log("onError! " + contactError.toString());
    }
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var filter = ["displayName", "name"];
    navigator.contacts.find(filter, onSuccess, onError, options);
  },
};

app.initialize();
