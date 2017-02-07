document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';
var translateUrl = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";
var watsonUrl = "https://access.alchemyapi.com/calls/html/HTMLGetCombinedData";
var alchemyApiKey = "ebdc494fb03a3ef1a8e1c43716e8fe2aea9b7d95";

$(document).ready(function(){
  $(document).on("mouseover", ".userContent", function() {
    var position = $(this).offset();
    var width = $(this).width();
    var content = $(this).html();
    var height = $(this).height();

    function addHoverBox(){
      $("body").append("<div id='hover-box' style='background-color: blue; opacity: 0.2; position:absolute; width:auto; height:auto;'></div>");

      $("#hover-box").css("left", position.left + "px");
      $("#hover-box").css("top", position.top + "px");
      $("#hover-box").css("width", width + "px");
      $("#hover-box").css("height", height + "px");
    }

    function createButton(){
      $("body").append("<button class='btn-class' style='position:absolute;'>Check</button>");
      $(".btn-class").css("left", (position.left + width) + "px");
      $(".btn-class").css("top", position.top + "px");
      $(".btn-class").css("background-color", "#3B5998");
      $(".btn-class").css("color", "white");
      $(".btn-class").css("position", "absolute");
      $(".btn-class").css("border", "none");
      $(".btn-class").css("padding", "10px");
      $(".btn-class").css("font-weight", "bold");
    }

   function detectLanguage(foreignText) {
      $.post(watsonUrl, {html: foreignText, apikey: alchemyApiKey, outputMode: "json"}, function (data) {
        console.log(data);
        var language = data["language"];
        if (language != "english" && language!=null) {
          console.log("not english");
          addHoverBox();
          createButton();
          clickButton();

        }
        else{
          console.log("english");
        }
      });
    }

    detectLanguage(content);

    function clickButton(){
      $(".btn-class").click(function(){
        console.log('clicked');
        addTranslationBox();
        translateText();
        //drawRect();
      });
    }
    function addTranslationBox(){
      $("body").append("<div id='translation-box' style='background-color: #8B9DC3; position:absolute; width:20%; height:auto;'></div>");
      $("#translation-box").css("left", (position.left + width) + "px");
      $("#translation-box").css("top", position.top + "px");
      $("#translation-box").css("padding", "20px");
    }

    function translateText() {
      $.get(translateUrl + content, function (data) {
        var translatedText = data.data.translations[0].translatedText;
        $("#translation-box").html("<br> <br> <h2> Translation: </h2>" + translatedText + "<br>");
        runEmotionAnalysis(translatedText);
      });

    }

    function runEmotionAnalysis(transText) {
      $.post(watsonUrl, {
        html: transText,
        apikey: alchemyApiKey,
        outputMode: "json",
        //extract: ["doc-emotion", "doc-sentiment"]
        extract: "doc-emotion, doc-sentiment"

      }, function (data) {
        console.log(data);

        var count = 5; //num. of emotions
        console.log('count' + count);
        var emotions = ["anger", "disgust", "fear", "joy", "sadness"];
        var barColors = ["blue","green","darkorange","darkviolet","red"];
        var lefts = ["0","50","100","150","200"];
        var list = [0,1,2,3,4];
        var barWidth = $("#translation-box").width()*(.5);
        $("#translation-box").append("<h2 style='padding-bottom:" + barWidth +"px;'> Emotion Analysis: </h2>");
        for (var i = 0; i < count; i++) {
          var emotion = emotions[i];
          var barColor = barColors[i];
          var leftPos = lefts[i];
          if (emotion != "else") {
            var emotionPercentage = data["docEmotions"][emotion];
            var roundedEmotionPercentage = Math.round(emotionPercentage*100);
            $("#translation-box").append("<div class='rect'style='margin-left: 25px;position:absolute;bottom:170px;left:" + leftPos + "px; height:" + (barWidth*emotionPercentage) + "px;z-index: 10000000000;padding:5px; border:0px solid#000; background-color:" + barColor + ";color:white;display:inline-block;'>" + roundedEmotionPercentage +" %</div>");
          }
        }
        $("#translation-box").append("<br>");
        for (var i = 0; i < count; i++) {
          var emotion = emotions[i];
          var imageUrl = chrome.extension.getURL('/img/' + emotion + '.png');
          var emotionImage = document.createElement('img');
          emotionImage.src = imageUrl;
          $(emotionImage).css("height", "50px");
          $(emotionImage).css("display", "inline");
          //$(emotionImage).css("margin", "5px");
          $("#translation-box").append(emotionImage);
          var analysis = emotion + ": " + data["docEmotions"][emotion];


        }

        //run sentiment-analysis
        $("#translation-box").append("<h2>Sentiment Analysis </h2>");
        var sentimentType = data["docSentiment"]["type"];
        var sentimentScore = data["docSentiment"]["score"];
        console.log('type' + sentimentType);
        console.log(sentimentScore);
        $("#translation-box").append("<p>Type: " + sentimentType + "<br>");
        $("#translation-box").append("<p>Score: " + sentimentScore + "<br>");

      });
    }


  });
});
