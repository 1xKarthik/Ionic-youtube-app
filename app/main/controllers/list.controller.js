(function () {
  'use strict';
  angular
    .module('main')
    .controller('listCtrl', ListCtrl);

  function ListCtrl($scope, $sce, $http, $q) {

    // ionic.Platform.fullScreen(true, false);
    // $cordovaScreenOrientation.lockOrientation('landscape');

    var vm = this;
    vm.thumbnail = null;
    vm.title = null;
    vm.channelTitle = null;
    vm.description = null;
    vm.viewCount = null;
    vm.likeCount = null;
    vm.arr = new Array(1);

    vm.description_text = "Show Description";
    vm.hide_desc = true;
    vm.show_desc = show_desc;

    function show_desc() {
      vm.hide_desc = !vm.hide_desc;
      vm.description_text = vm.description_text === "Show Description" ? 'Hide Description' : 'Show Description';
    }

    // var videoUrl = 'http://storage.googleapis.com/vrview/examples/video/congo_2048.mp4&is_stereo=true';
    var videoUrl = 'http://storage.googleapis.com/vrview/examples/video/congo_2048.mp4&is_stereo=true';

    var baseUrl = 'http://storage.googleapis.com/vrview/2.0/index.html?video=' + videoUrl;

    console.log(baseUrl);

    vm.URL = $sce.trustAsResourceUrl(baseUrl);

    thumbnail();

    function thumbnail() {
      return getThumbnail().then(function (resp) {
        vm.thumbnail = resp.snippet.thumbnails.medium.url;
        vm.title = resp.snippet.title;
        vm.channelTitle = resp.snippet.channelTitle;
        var description = resp.snippet.description;
        var new_description = description.split('Follow')[0];
        var newer_description = new_description.replace(/https:\/\/youtu.be\/I6TaHL1uSlE/g, "<a href='https://youtu.be/I6TaHL1uSlE'>https://youtu.be/I6TaHL1uSlE</a>");
        vm.description = jsonEscape(newer_description);
        var viewCount = resp.statistics.viewCount;
        vm.viewCount = commaSeparateNumber(viewCount);
        var likeCount = resp.statistics.likeCount;
        vm.likeCount = commaSeparateNumber(likeCount);
        return vm.thumbnail;
      })
    }

    function jsonEscape(str) {
      return str.replace(/\n/g, "<br/>").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    }

    function linkify(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

      return replacedText;
    }

    function getThumbnail() {
      return $http({
        url: 'https://www.googleapis.com/youtube/v3/videos',
        method: 'GET',
        params: {
          id: 'hR1mNJ11ycU',
          key: 'AIzaSyC7FBxH7ZO7XDgzMJnRIAK8ONY2fDspA8s',
          part: 'snippet,contentDetails,statistics,status'
        }
      }).then(function (response) {
        console.log(response.data.items[0]);
        return $q.when(response.data.items[0]);
      }).catch(function (error) {
        console.log(error);
        switch (error.data) {
          default:
            error.data = 'Server error. Please, try later';
            break;
        }
        return $q.reject(error.data);
      });
    }

    function commaSeparateNumber(val) {
      while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
      }
      return val;
    }

    // function activated() {
    //   var vrView = new VRView.Player('#vrview', {
    //     width: '100%',
    //     height: 400,
    //     video: 'http://storage.googleapis.com/vrview/examples/video/congo_2048.mp4',
    //     is_stereo: true,
    //     is_debug: true,
    //   });
    //   return vrView;
    // }

    // vm.myGoBack = function () {
    //   $ionicHistory.goBack();
    // };
  }

})();
