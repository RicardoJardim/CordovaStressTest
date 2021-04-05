var Controller = function () {
  var controller = {
    self: null,
    initialize: function () {
      self = this;
      self.bindEvents();
    },

    bindEvents: function () {
      $(".nav__link").on("click", this.onTabClick);
      this.changeController("#btn1", "cpu");
    },

    onTabClick: function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        return;
      }
      var tab = this.id;
      if (tab === "btn1") {
        self.changeController("#btn1", "cpu");
      } else if (tab === "btn2") {
        self.changeController("#btn2", "serverdata");
      } else if (tab === "btn3") {
        self.changeController("#btn3", "api");
      }
    },

    changeController: function (id, where) {
      $(".nav__link").removeClass("active");
      $(id).addClass("active");

      $("#tab-content").empty();
      $("#tab-content").load(`./views/${where}.html`, function (data) {});
    },
  };
  controller.initialize();
  return controller;
};
