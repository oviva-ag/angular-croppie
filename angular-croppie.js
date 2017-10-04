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

      var options = angular.extend({
        viewport: {
          width: 200,
          height: 200
        }
      }, ctrl.options);

      var resultOptions = angular.extend(
        {type:'canvas', format:'jpeg'},
        options.result
      );

      function resetCroppie(){
        'use strict';
          angular.element($element[0]).empty();
        return new Croppie($element[0], options);
      }

      var c = resetCroppie();
      options.update = function () {
        c.result(resultOptions).then(function(img) {
          $scope.$apply(function () {
            ctrl.ngModel = img;
          });
        });
      };

      $scope.$watch(function(){
        return ctrl.src;
      }, function (newSrc) {

        if(!ctrl.src) { return; }
        // bind an image to croppie
        c = resetCroppie();
        c.bind({ url: newSrc, zoom: 0 });
      });
    }
  });
