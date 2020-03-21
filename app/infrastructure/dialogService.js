(function () {

    angular.module('fordere.services').factory('dialogService', [
        function () {
            return {
                show: function (id) {
                    //var currentParent = $(id).parent().prop('tagName');

                    //if (currentParent !== 'BODY') {
                    //    $(id).appendTo('body');
                    //}

                    $(id).modal('show');
                },
                hide: function (id) {
                    $(id).modal('hide');
                }
            };
        }
    ]);

})();