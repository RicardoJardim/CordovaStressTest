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
};

app.initialize();
