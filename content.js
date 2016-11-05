document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';
var translateUrl = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";
var watsonUrl = "https://access.alchemyapi.com/calls/html/HTMLGetCombinedData";
var alchemyApiKey = "07cb048088ebb9dc710d357c380108f66e3fa29a";
var translateUrl = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";

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


    var content = $(this).find("p").first().html();
    $.get(translateUrl + content, function(data) {
      $("#translation-box").html("<h2> Translation: </h2>" + data.data.translations[0].translatedText);
    });

    var words = $(this).html();
    //console.log(words);


    $.post(watsonUrl, {html: words, apikey: alchemyApiKey, outputMode: "json", extract: "doc-emotion"},function(data){
      //console.log(data);
      var count = Object.keys(data).length;
      var emotions = ["anger", "disgust", "fear", "joy", "sadness"];
      $("#translation-box").append("<h2> Emotion Analysis: </h2>");
      for (var i=0; i<count; i++){
          var emotion = emotions[i];
            //console.log(emotion + ": " + data["docEmotions"][emotion]);
          if (emotion != "fear"){
            var imageUrl = chrome.extension.getURL('/img/' + emotion + '.png');
            var emotionImage = document.createElement('img');
            emotionImage.src = imageUrl;
            $(emotionImage).css("height", "50px");
            $("#translation-box").append(emotionImage);
            //$("#translation-box").append(data["docEmotions"][emotion]);
            var analysis = emotion + ": " + data["docEmotions"][emotion];
            $("#translation-box").append(analysis + "<br>");
          }
    }
    });
  });
});