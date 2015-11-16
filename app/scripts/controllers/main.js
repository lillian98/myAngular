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
    $scope.screenOpt = {
      'width':1024,
      'height':600
    }
    //测试数据
    $scope.layers = [
      {'layerId':1,'layerName':'图层0','layerType':'0','frames':[
        {'frameId':0,'layerId':1,'timestamp':10,'frameType':'0','frameContent':'text1','pos-left':0,'pos-top':100,'symbols':[
          {'symbolId':0,'symbolContent':'text1','pos-left':0,'pos-top':0,'scale-x':1,'scale-y':1,'scale-z':1,'skew-x':1,'skew-y':1,'rotate-x':0,'rotate-y':0,'opacity':1,'animate-origin':'50% 50%'}
        ]},
        {'frameId':1,'layerId':1,'timestamp':30,'frameType':'1','frameContent':'https://www.baidu.com/img/bd_logo1.png','pos-left':50,'pos-top':200,'symbols':[
          {'symbolId':1,'symbolContent':'https://www.baidu.com/img/bd_logo1.png','pos-left':0,'pos-top':0,'scale-x':1,'scale-y':1,'scale-z':1,'skew-x':1,'skew-y':1,'rotate-x':0,'rotate-y':0,'opacity':1,'animate-origin':'50% 50%'}
        ]}
      ]},
      {'layerId':2,'layerName':'图层1','layerType':'1','frames':[
        {'frameId':3,'layerId':2,'timestamp':20,'frameType':'3','frameContent':'frameMc','pos-left':0,'pos-top':0,'symbols':[
          {'symbolId':2,'symbolContent':'text1','pos-left':0,'pos-top':0,'scale-x':1,'scale-y':1,'scale-z':1,'skew-x':1,'skew-y':1,'rotate-x':0,'rotate-y':0,'opacity':1,'animate-origin':'50% 50%'},
          {'symbolId':3,'symbolContent':'https://www.baidu.com/img/bd_logo1.png','pos-left':0,'pos-top':0,'scale-x':1,'scale-y':1,'scale-z':1,'skew-x':1,'skew-y':1,'rotate-x':0,'rotate-y':0,'opacity':1,'animate-origin':'50% 50%'}
        ]}
      ]},
      {'layerId':3,'layerName':'图层2','layerType':'2','frames':[]}
    ];
    $scope.frames = [];
    $scope.symbols = [];
    //初始化
    $scope.init = function () {
      this.canShowFrame = false;
      this.canShowSymbol = false;
      //初始化新建图层0、帧0@fixme
      this.newLayer();
      this.newFrame();
      this.setScreenHeight();
    }
    $scope.newLayer = function () {

    }
    $scope.newFrame = function () {

    }
    $scope.insetFrame = function(){
      if(currentFrame.length>0){

        for(var i=0;i<currentFrame.length;i++){
          //帧
          for(var j=0;j<frameArray.length;j++){
            if(currentFrame[i].split('_')[0]==frameArray[j].split('_')[0]){
              if(parseInt(currentFrame[i].split('_')[1])>parseInt(frameArray[j].split('_')[1])){
                frameArray[j]=currentFrame[i];
              }

              else{
                frameArray[j]=frameArray[j].split('_')[0]+'_'+(parseInt(frameArray[j].split('_')[1])+1);
              }
            }
          }
          //关键帧
          for(var j=keyFrameArray.length-1;j>=0;j--){
            if(currentFrame[i].split('_')[0]==keyFrameArray[j].split('_')[0]){
              if(parseInt(currentFrame[i].split('_')[1])<parseInt(keyFrameArray[j].split('_')[1])){
                keyFrameArray[j]=keyFrameArray[j].split('_')[0]+'_'+(parseInt(keyFrameArray[j].split('_')[1])+1);
              }
            }
          }
          //空白关键帧
          for(var j=emptyKeyFrameArray.length-1;j>=0;j--){
            if(currentFrame[i].split('_')[0]==emptyKeyFrameArray[j].split('_')[0]){
              if(parseInt(currentFrame[i].split('_')[1])<parseInt(emptyKeyFrameArray[j].split('_')[1])){
                emptyKeyFrameArray[j]=emptyKeyFrameArray[j].split('_')[0]+'_'+(parseInt(emptyKeyFrameArray[j].split('_')[1])+1);
              }
            }
          }
          //关键帧
          for(var j=actionArray.length-1;j>=0;j--){
            if(currentFrame[i].split('_')[0]==actionArray[j].split('_')[0]){
              if(parseInt(currentFrame[i].split('_')[1])<parseInt(actionArray[j].split('_')[1])){
                actionArray[j]=actionArray[j].split('_')[0]+'_'+(parseInt(actionArray[j].split('_')[1])+1);
              }
            }
          }

        }
        keyFrameShow();
        emptyKeyFrameShow();
        lastFrameShow();
        actionShow();
      }

    }
    $scope.insetKeyFrame = function () {

    }
    $scope.insetEmptyKeyFrame = function () {

    }
    $scope.setScreenHeight = function(){
      //屏幕高宽----------------------------------------------------------------------------
      $scope.screenOpt.height= $(window).height()-$('.top-bar').height();
      $scope.screenOpt.width= $(window).width()-$('.scene').width()-$('.tool-bar').width()-$('.attr-bar').width();
        $('.scene').css('height',$scope.screenOpt.height);
        $('.tool-bar').css('height',$scope.screenOpt.height);
        $('.attr-bar').css('height',$scope.screenOpt.height);
        $('.mid-area').css({'width':$scope.screenOpt.width,'height':$scope.screenOpt.height})
        $('.right-area').css('width',$scope.screenOpt.width-210);
        $('.timeline-numb-show').css('width',$scope.screenOpt.width-210);
    }
    $scope.init();
    //时间轴滑动@fixme
    //比例
    var framePercent;
    //滑块
    var isSlideMouseDown = false;

    $('.frame-slide div').mousedown(function(){isSlideMouseDown =true});

    $(window).mouseup(function(){isSlideMouseDown =false});

    $(window).mousemove(function(e){
      var slideX = e.pageX;
      slideX = slideX>875?875: slideX<375?375:slideX;
      if(isSlideMouseDown == true){
        $('.frame-slide div').css('left',slideX-380);
        framePercent=(slideX-375)/500;
        $('.frame').css('left',(($scope.screenOpt.width-5210)*framePercent));
        $('.time-numb').css('left',(($scope.screenOpt.width-5210)*framePercent));
      }
    });
    //时间轴滑动 End
    //绑定resize
    $(window).resize(function(){
      $scope.setScreenHeight();
    });
    //绑定键盘快捷键
    $(document).bind("keydown",function(e){
      e=window.event||e;
      //f5
      if(e.keyCode==116){
        $scope.insetFrame();
        e.keyCode = 0;
        return false;
      }
      //f6
      else if(e.keyCode == 117){
        $scope.insetKeyFrame();
        e.keyCode = 0;
        return false;
      }
      //f7
      else if(e.keyCode == 118){
        $scope.insetEmptyKeyFrame();
        e.keyCode = 0;
        return false;
      }
    });
    //绑定键盘快捷键 End
    //update frame
    $scope.updateFrame = function(_frame){
      $scope.frames = _frame;
    }
  })
  .controller('layerCtrl',function($scope){

      $scope.init = function(){

      }
    $scope.init();
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
    $scope.updateFrame($scope.frames);
  })
  .controller('toolCtrl',function($scope){

  })
  .controller('symbolCtrl',function($scope){
    $scope.symbols = [];
    for(var i = 0;i<$scope.layers.length;i++){
      for(var k = 0;k<$scope.layers[i].frames.length;k++){
        if($scope.layers[i].frames[k].symbols != []){
          for(var j = 0;j< $scope.layers[i].frames[k].symbols.length;j++){
            $scope.symbols.push($scope.layers[i].frames[k].symbols[j])
          }
        }
      }

    }

  }).controller('editCtrl',function($scope){

  }).filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=1; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});
