require('croppie/croppie.css');
const Croppie = require('croppie');

angular.module('ovi.croppie', []).
  component('croppie', {
    bindings: {
      src: '<',
      ngModel: '=',
      options: '<'
    },
    controller: function ($scope, $element) {
      var ctrl = this;

      var c = new Croppie($element[0], {
        viewport: {
          width: 200,
          height: 200
        },
        update: function () {
          c.result('canvas').then(function(img) {
            $scope.$apply(function () {
              ctrl.ngModel = img;
            });
          });
        }
      });

      $scope.$watch(function(){
        return ctrl.src;
      }, function (newSrc) {

        if(!ctrl.src) { return; }
        // bind an image to croppie
        c.bind({
          url: newSrc
        });
      });
    }
  });
