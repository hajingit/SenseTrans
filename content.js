document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';
var translateUrl = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";
var watsonUrl = "https://access.alchemyapi.com/calls/html/HTMLGetCombinedData";
var alchemyApiKey = "07cb048088ebb9dc710d357c380108f66e3fa29a";

$(document).ready(function(){
  $(document).on("mouseover", ".userContent", function() {
    var position = $(this).offset();
    var width = $(this).width();

    //function addHoverBox(){
      $("body").append("<div id='hover-box' style='background-color: blue; opacity: 0.2; position:absolute; width:auto; height:auto;'></div>");

      $("#hover-box").css("left", position.left + "px");
      $("#hover-box").css("top", position.top + "px");
      $("#hover-box").css("width", width + "px");
      $("#hover-box").css("height", $(this).height() + "px");
    //}
    //addHoverBox();


    function detectLanguage(foreignText) {
      $.post(watsonUrl, {html: foreignText, apikey: alchemyApiKey, outputMode: "json"}, function (data) {
        console.log(data);
        var language = data["language"];
        if (language != "english" && language!=null) {
          console.log("not english");
          addTranslationBox();
          translateText();
        }
        else{
          console.log("english");
        }
      });
    }

    detectLanguage();
    function addTranslationBox(){
      $("body").append("<div id='translation-box' style='background-color: lightblue; position:absolute; width:auto; height:auto;'></div>");
      $("#translation-box").css("left", (position.left + width) + "px");
      $("#translation-box").css("top", position.top + "px");
      //$("#translation-box").css("height", $(this).height() + "px");
      $("#translation-box").css("z-index", 10000000);
      $("#translation-box").css("padding", "20px");
    }
    var content = $(this).find("p").first().html();

    function translateText() {
      $.get(translateUrl + content, function (data) {
        var translatedText = data.data.translations[0].translatedText;
        $("#translation-box").html("<h2> Translation: </h2>" + translatedText);
        runEmotionAnalysis(translatedText);
      });
    }

    function runEmotionAnalysis(transText) {
      $.post(watsonUrl, {
        html: transText,
        apikey: alchemyApiKey,
        outputMode: "json",
        extract: "doc-emotion"
      }, function (data) {
        //console.log(data);
        var count = Object.keys(data).length;
        var emotions = ["anger", "disgust", "fear", "joy", "sadness"];
        $("#translation-box").append("<h2> Emotion Analysis: </h2>");
        for (var i = 0; i < count; i++) {
          var emotion = emotions[i];
          if (emotion != "fear") {
            var imageUrl = chrome.extension.getURL('/img/' + emotion + '.png');
            var emotionImage = document.createElement('img');
            emotionImage.src = imageUrl;
            $(emotionImage).css("height", "50px");
            $("#translation-box").append(emotionImage);
            var analysis = emotion + ": " + data["docEmotions"][emotion];
            $("#translation-box").append(analysis + "<br>");
          }
        }
      });
    }
  });
});