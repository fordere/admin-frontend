(function () {

  angular.module('fordere.directives').directive('popup', function () {
    return {
      link: function ($scope, $element, attr) {
        $element.bind('click', function () {
          $(".panel-pop").animate({ "top": "-100%" }, 10).hide();
          $(attr.popupDialogId).show().animate({ "top": "30%" }, 500);
          $("body").prepend("<div class='wrap-pop'></div>");
        });
      }
    };
  });

  angular.module('fordere.directives').directive('popupcloser', function () {
    return {
      link: function ($scope, $element) {
        $element.bind('click', function () {
          $(".panel-pop").animate({ "top": "-100%" }, 500).hide(function () {
            $('.wrap-pop').animate({ "top": "-100%" }, 500);
          });
          $('.wrap-pop').remove();
        });
      }
    };
  });
})();