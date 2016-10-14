document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';
var translateUrl = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";
//
// $(".userContent").append("<div id='hover-box' style='background-color: blue; opacity: 0.2; position:absolute; width:auto; height:auto;'></div>");
// var userContentLeft = $(".userContent").left;
// var userContentTop = $(".userContent").top;
// var userContentWidth = $(".userContent").width;
// var userContentHeight = $(".userContent").height;
//
// $("#hover-box").css("left", userContentLeft + "px");
// $("#hover-box").css("top", userContentTop + "px");
// $("#hover-box").css("width", userContentWidth + "px");
// $("#hover-box").css("height", userContentHeight + "px");

//var btn = document.createElement("button");
//btn.text = "Check";

$('.userContent').each(function() {

  //var btn= $(document.createElement('button'));
  //btn.innerHTML = 'Check';
  //console.log('button' + btn);

  //btn.addClass('btn-class');
  var userContentPosition = $(this).position();
  //console.log(userContentPosition);
  var userContentWidth = $(this).width();
  var userContentHeight = $(this).height();

  $(this).append("<div class='hover-box' style='background-color: blue; opacity: 0.2; position:absolute;'></div>");
  $(".hover-box").css("left", userContentPosition.left + "px");
  $(".hover-box").css("top", userContentPosition.top + "px");
  $(".hover-box").css("width", userContentWidth + "px");
  $(".hover-box").css("height", userContentHeight + "px");

  var left = userContentPosition.left + userContentWidth;
 // console.log("left" + userContentPosition.left);
 // console.log("width " + userContentWidth);
  //console.log("total" + left);

  $(this).append("<button class='btn-class' style='position:absolute;'>Check</button>");

  $(".btn-class").css("left", left + "px");
  $(".btn-class").css("top", userContentPosition.top + "px");
  $(".btn-class").css("z-index", 10000000000);
  $(".btn-class").css("background-color", "#169BD4");
  $(".btn-class").css("position", "absolute");
  $(".btn-class").css("border", "none");
  $(".btn-class").css("padding", "10px");
  $(".btn-class").css("color", "white");
  $(".btn-class").css("font-weight", "bold");


  //$(this).append(btn);
});


//console.log(userContentPosition);
//$("body").append("<button>Check</button>");



$(document).ready(function(){
  $(".btn-class").on("click", function(){
    console.log('clicked');
    var userContent = $(".userContent");
    //console.log($(this).position());
    //$("body").append("<div id='hover-box' style='background-color: blue; opacity: 0.2; position:absolute; width:auto; height:auto;'></div>");
    $("body").append("<div id='translation-box' style='background-color: lightblue; position:absolute; width:auto; height:auto;'></div>");
    var position = $(userContent).offset();
    var width = $(userContent).width();


    $("#translation-box").css("left", (position.left + width) + "px");
    console.log("translate-left" + (position.left + width));
    $("#translation-box").css("top", position.top + "px");
    //$("#translation-box").css("height", $(this).height() + "px");
    $("#translation-box").css("z-index", 10000000);
    $("#translation-box").css("padding", "30px");

    var content = $(userContent).find("p").first().html();
    console.log('content' + content);
    $.get(translateUrl + content, function(data) {
      $("#translation-box").html("<h2> Translation: </h2>" + data.data.translations[0].translatedText);
    });

    var words = $(this).html();
    //console.log(words);
    var watsonUrl = "https://access.alchemyapi.com/calls/html/HTMLGetCombinedData";
    var alchemyApiKey = "07cb048088ebb9dc710d357c380108f66e3fa29a";
    $.post(watsonUrl, {html: content, apikey: alchemyApiKey, outputMode: "json", extract: "doc-emotion"},function(data){
      //console.log(data);
      var count = Object.keys(data).length;
      var emotions = ["anger", "disgust", "fear", "joy", "sadness"];
      $("#translation-box").append("<h2> Emotion Analysis: </h2>");
      for (var i=0; i<count; i++){
          var emotion = emotions[i];
            //console.log(emotion + ": " + data["docEmotions"][emotion]);
          var analysis = emotion + ": " + data["docEmotions"][emotion];
          $("#translation-box").append(analysis + "<br>");
    }
    });
  });
});