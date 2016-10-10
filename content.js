document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';
var url = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";

$(document).ready(function(){
  $(document).on("mouseover", ".userContent", function(){
    $("body").append("<div id='hover-box' style='background-color: blue; opacity: 0.2; position:absolute; width:auto; height:auto;'></div>");
    $("body").append("<div id='translation-box' style='background-color: lightblue; position:absolute; width:auto; height:auto;'></div>");
    var position = $(this).offset();
    var width = $(this).width();

    $("#hover-box").css("left", position.left + "px");
    $("#hover-box").css("top", position.top + "px");
    $("#hover-box").css("width", width + "px");
    $("#hover-box").css("height", $(this).height() + "px");

    $("#translation-box").css("left", (position.left + width) + "px");
    $("#translation-box").css("top", position.top + "px");
    //$("#translation-box").css("height", $(this).height() + "px");
    $("#translation-box").css("z-index", 10000000);
    $("#translation-box").css("padding", "20px");

    var content = $(this).find("p").first().html();
    $.get(url + content, function(data) {
      $("#translation-box").html("<h2> Translation: </h2>" + data.data.translations[0].translatedText);
    });

    var words = $(this).html();
    //console.log(words);
    var watsonUrl = "https://access.alchemyapi.com/calls/html/HTMLGetCombinedData";
    var alchemyApiKey = "07cb048088ebb9dc710d357c380108f66e3fa29a";
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