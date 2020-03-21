﻿(function() {

  angular.module('fordere.services').factory('toastr', [
  function () {
    return {
      success: function (text) {
        toastr.success(text, "Success");
      },
      error: function (text) {
        toastr.error(text, "Error");
      }
    };
  }
  ]);

})();