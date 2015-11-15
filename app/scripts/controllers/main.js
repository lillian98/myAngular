'use strict';

/**
 * @ngdoc function
 * @name myAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAngularApp
 */
angular.module('myAngularApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.layers = [
      {'layerId':1,'layerName':'图层0','layerType':'0','frames':[
        {'frameId':0,'timestamp':10,'frameType':'0','frameContent':'text1','pos-left':0,'pos-top':100},
        {'frameId':1,'timestamp':30,'frameType':'1','frameContent':'https://www.baidu.com/img/bd_logo1.png','pos-left':50,'pos-top':200}
      ]},
      {'layerId':2,'layerName':'图层1','layerType':'1','frames':[]},
      {'layerId':3,'layerName':'图层2','layerType':'2','frames':[]}
    ];

  })
  .controller('layerCtrl',function($scope){

  })
  .controller('frameCtrl',function($scope){
    $scope.frames = [];
    for(var i = 0;i<$scope.layers.length;i++){
      if($scope.layers[i].frames != []){
        for(var j = 0;j< $scope.layers[i].frames.length;j++){
          $scope.frames.push($scope.layers[i].frames[j])
        }
      }
    }
  })
  .controller('toolCtrl',function($scope){

  })
  .controller('symbolCtrl',function($scope){


  }).controller('editCtrl',function($scope){

  })
