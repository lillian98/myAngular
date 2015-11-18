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
      {'layerId':0,'layerName':'图层0','layerType':'0','frames':[
        {'frameId':0,'layerId':1,'timestamp':10,'symbolType':'0','type':'0','frameContent':'text1','posLeft':0,'posTop':100,'symbols':[
          {'symbolId':0,'frameId':0,'symbolType':0,'symbolContent':'text1','posLeft':10,'posTop':0,'scaleX':1,'scaleY':1,'scaleZ':1,'skewX':1,'skewY':1,'rotateX':0,'rotateY':0,'opacity':1,'origin':'50% 50%'}
        ]},
        {'frameId':1,'layerId':1,'timestamp':30,'symbolType':'1','type':'1','frameContent':'https://www.baidu.com/img/bd_logo1.png','posLeft':50,'posTop':200,'symbols':[
          {'symbolId':1,'frameId':1,'symbolType':1,'symbolContent':'https://www.baidu.com/img/bd_logo1.png','posLeft':0,'posTop':0,'scaleX':1,'scaleY':1,'scaleZ':1,'skewX':1,'skewY':1,'rotateX':0,'rotateY':0,'opacity':1,'origin':'50% 50%'}
        ]},
        {'frameId':2,'layerId':1,'timestamp':80,'symbolType':'1','type':'0','frameContent':'https://www.baidu.com/img/bd_logo1.png','posLeft':50,'posTop':200,'symbols':[
          {'symbolId':2,'frameId':2,'symbolType':1,'symbolContent':'https://www.baidu.com/img/bd_logo1.png','posLeft':0,'posTop':0,'scaleX':1,'scaleY':1,'scaleZ':1,'skewX':1,'skewY':1,'rotateX':0,'rotateY':0,'opacity':1,'origin':'50% 50%'}
        ]}
      ]},
      {'layerId':1,'layerName':'图层1','layerType':'1','frames':[
        {'frameId':3,'layerId':2,'timestamp':20,'symbolType':'2','type':'1','frameContent':'frameMc','posLeft':0,'posTop':0,'symbols':[
          {'symbolId':3,'frameId':3,'symbolType':0,'symbolContent':'text1','posLeft':0,'posTop':0,'scaleX':1,'scaleY':1,'scaleZ':1,'skewX':1,'skewY':1,'rotateX':0,'rotateY':0,'opacity':1,'origin':'50% 50%'},
          {'symbolId':4,'frameId':3,'symbolType':1,'symbolContent':'https://www.baidu.com/img/bd_logo1.png','posLeft':0,'posTop':0,'scaleX':1,'scaleY':1,'scaleZ':1,'skewX':1,'skewY':1,'rotateX':0,'rotateY':0,'opacity':1,'origin':'50% 50%'}
        ]}
      ]},
      {'layerId':2,'layerName':'图层2','layerType':'2','frames':[
        {'frameId':4,'layerId':3,'timestamp':20,'symbolType':'2','type':'2','frameContent':'frameMc','posLeft':0,'posTop':0,'symbols':[
        ]}
      ]}
    ];
    $scope.frames = [];
    $scope.symbols = [];
    $scope.curTime = 0;
    $scope.curFrameIndex = 0;
    //初始化
    $scope.init = function () {
      this.canShowFrame = false;
      this.canShowSymbol = false;
      //初始化新建图层0、帧0@fixme
      this.newLayer();
      this.newFrame();
      this.setScreenHeight();
      this.anaSymbol();
    }
    //解析帧对象
    $scope.anaFrame = function(){
      for(var i = 0;i<$scope.layers.length;i++){
        $scope.frames.push($scope.layers[i].frames)
        if($scope.layers[i].frames != []){
          for(var j = 0;j< $scope.layers[i].frames.length;j++){
            //$scope.frames.push($scope.layers[i].frames[j]);//frames保存为数组形式，下标为layerid对应
            switch ($scope.layers[i].frames[j].type){
              case '0':
                //普通帧"frame-style"
                    break;
              case '1':
                //关键帧"frame-key"
                $('.frame-contrl').eq(i).find('span').eq($scope.layers[i].frames[j].timestamp-1).addClass('frame-key')
                    break;
              case '2':
                //空白关键帧"frame-empty"
                $('.frame-contrl').eq(i).find('span').eq($scope.layers[i].frames[j].timestamp-1).addClass('frame-empty')
                    break;
            }
            if(j == $scope.layers[i].frames.length -1){
              for(var _n = 0;_n<$scope.layers[i].frames[j].timestamp;_n++){
                $('.frame-contrl').eq(i).find('span').eq(_n).addClass('frame-style')
              }
            }
          }
        }
      }
    }
    //解析元件对象
    $scope.anaSymbol = function(){
      for(var i = 0;i<$scope.layers.length;i++){
        var tmpSymbol = [];
        for(var k = 0;k<$scope.layers[i].frames.length;k++){
          //tmpSymbol = [];
          if($scope.layers[i].frames[k].symbols != []){
            for(var j = 0;j< $scope.layers[i].frames[k].symbols.length;j++){
              tmpSymbol.push($scope.layers[i].frames[k].symbols[j])
            }
          }
        }
        $scope.symbols.push(tmpSymbol)
      }
      console.log('1111',$scope.symbols)
    }
    //选中图层
    $scope.chooseLayer = function(_index){
      console.log('_index',_index)
      $('.layer-contrl').removeClass('layer-choice');
      $('.layer-contrl').eq(_index).addClass('layer-choice');
    }
    //新建图层
    $scope.newLayer = function () {

    }
    //新建帧
    $scope.newFrame = function () {

    }
    $scope.insetKeyFrame = function () {

    }
    $scope.insetEmptyKeyFrame = function () {

    }
    //显示当前画布状态
    $scope.showCur = function(_layer,_timestamp){
      $scope.curTime =_timestamp;
      //图层状态
      $('.layer-contrl').removeClass('layer-choice');
      $('.layer-contrl').eq(_layer).addClass('layer-choice');
      //帧状态
      $('.frame-contrl span').removeClass('current');
      $('.frame-contrl').eq(_layer).find('span').eq(_timestamp-1).addClass('current');
      //元件状态
      $('.stage-wrap').removeClass('current');
      $('.stage-wrap').eq(_layer).addClass('current');
      for(var i = $scope.frames[_layer].length-1;i>=0;i--){
        if($scope.frames[_layer][0].timestamp > _timestamp){
          $scope.curFrameIndex = -1;
          break;
        }
        if($scope.frames[_layer][i].timestamp <= _timestamp){
          $scope.curFrameIndex = $scope.frames[_layer][i].frameId;
          break;
        }
      }
      var attrFrameId = $scope.curFrameIndex;
      $('.stage-wrap.current .symbolWrap').removeClass('current');
      if(attrFrameId != -1){
        $('.stage-wrap.current .symbolWrap[data-frame='+attrFrameId+']').addClass('current');
      }
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
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
      //$scope.chooseLayer(0);//默认选中第一个图层
      $scope.anaFrame();//将frame状态显示出来
      $scope.showCur(0,0);//显示当前的画布状态：图层、时间确定当前元件
    });
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

  })
  .controller('layerCtrl',function($scope){


  })
  .controller('frameCtrl',function($scope){


  })
  .controller('toolCtrl',function($scope){

  })
  .controller('symbolCtrl',function($scope){


  }).controller('editCtrl',function($scope){

  }).filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=1; i<total; i++) {
      input.push(i);
    }

    return input;
  };
}).directive('onFinishRenderFilters', function ($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function() {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    };
  });;
