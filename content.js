document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';
var translateUrl = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";
var watsonUrl = "https://access.alchemyapi.com/calls/html/HTMLGetCombinedData";
var alchemyApiKey = "6edb6458004208aaa14bb2d235e0ef200e1a846f";

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
      $("body").append("<button class='btn-class' style='position:absolute;border-radius:5px;'>Check</button>");
      $(".btn-class").css("left", (position.left + width) + "px");
      $(".btn-class").css("top", position.top + "px");
      $(".btn-class").css("background-color", "#3B5998");
      $(".btn-class").css("color", "white");
      $(".btn-class").css("position", "absolute");
      $(".btn-class").css("border", "none");
      $(".btn-class").css("padding", "10px");
      $(".btn-class").css("font-weight", "bold");
      $(".btn-class").css("z-index", "1001");

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
      $("body").append("<div id='translation-box' style='background-color: #EDF0F5; position:absolute; width:20%; height:auto;'></div>");
      $("#translation-box").css("left", (position.left + width) + "px");
      $("#translation-box").css("top", position.top + "px");
      $("#translation-box").css("padding", "20px");
      $("#translation-box").css("z-index", "1000");

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
        if (data["status"] == "OK") {
          var count = 5; //num. of emotions
          var emotions = ["anger", "disgust", "fear", "joy", "sadness"];
          //colors: red, green, purple, orange, blue
          var barColors = ["#E73737", "#1D884B", "#7B44AF", "#FF871C", "#1D64C4"];
          var lefts = ["0", "50", "100", "150", "200"];
          var list = [0, 1, 2, 3, 4];
          var barWidth = $("#translation-box").width() * (.5);
          $("#translation-box").append("<h2 style='padding-bottom:" + barWidth + "px;'> Emotion Analysis: </h2>");
          for (var i = 0; i < count; i++) {
            var name = "rect" + i;
            var emotion = emotions[i];
            var barColor = barColors[i];
            var leftPos = lefts[i];
            var emotionPercentage = data["docEmotions"][emotion];
            var roundedEmotionPercentage = Math.round(emotionPercentage * 100);

            var barHeight;
            if ((barWidth * emotionPercentage) > 5) {
              barHeight = barWidth * emotionPercentage;
            }
            else {
              barHeight = 5;
            }
            $("#translation-box").append("<div class='rect'style='margin-left: 25px;border-radius: 5px;position:absolute;bottom:210px;left:" + leftPos + "px; height:" + barHeight + "px;padding:5px; border:0px solid#000;line-height: " + barHeight + "px; background-color:" + barColor + ";color:white;display:inline-block;vertical-align: middle; '>" + roundedEmotionPercentage + " %</div>");

            /*
             $("#translation-box").append("<div class='rect' id= " + name + "; style='text-align: center; font-weight: bold;color:white;'>" + roundedEmotionPercentage +" %</div>");
             console.log(name);
             $(".rect").css("margin-left", "25px");
             $(".rect").css("position", "absolute");
             $(".rect").css("bottom", "240px");
             $(".rect").css("border", "0px solid#000");
             $(".rect").css("display", "inline-block");

             $("#" + name).css("left", leftPos + "px");
             $("#" + name).css("background-color", barColor);

             //if height is big enough to hold text (5 px)
             if ((barWidth*emotionPercentage) > 5){
             $("#" + name).css("height", (barWidth*emotionPercentage) + "px");
             }
             else{
             $("#" + name).css("height", "5px");
             }

             */
          }
          for (var i = 0; i < count; i++) {
            var emotion = emotions[i];
            var imageUrl = chrome.extension.getURL('/img/' + emotion + '.png');
            var emotionImage = document.createElement('img');
            emotionImage.src = imageUrl;
            $(emotionImage).css("height", "50px");
            $(emotionImage).css("display", "inline");
            //$(emotionImage).css("margin", "5px");
            $("#translation-box").append(emotionImage);
          }

          //run sentiment-analysis
          $("#translation-box").append("<h2>Sentiment Analysis </h2>");
          var sentimentType = data["docSentiment"]["type"];
          var sentimentScore = data["docSentiment"]["score"];
          $("#translation-box").append("<p>Type: " + sentimentType + "<br>");
          $("#translation-box").append("<p>Score: " + sentimentScore + "<br><br>");

          drawSentAnalysisBars(sentimentScore);
        }
        //if error message
        else {
          $("#translation-box").append("Analysis cannot be completed.");

        }
      });

    }

    function drawSentAnalysisBars(score){

      $("#translation-box").append("<div id='sent-bar-wrapper'> <div class='sent-bar' id='neg'>negative</div><div class='sent-bar' id='pos'>positive</div></div>");
      $("#translation-box").append("<div id='sent-arrow'></div>");

      $(".sent-bar").css("height", "20px");
      $(".sent-bar").css("width", "100px");
      $(".sent-bar").css("display", "inline-block");
      $(".sent-bar").css("text-align", "center");
      $(".sent-bar").css("font-weight", "bold");
      $(".sent-bar").css("padding", "2px");

      $("#sent-bar-wrapper").css("text-align", "center");


      $("#neg").css("background-color", "#EB5757");
      $("#neg").css("color", "white");
      $("#pos").css("background-color", "#6FCF97");
      $("#pos").css("color", "white");

      var sentBarWidth = $(".sent-bar").width();
      var arrowLeft = $("#neg").position().left;
      if (score < 0){
          arrowLeft += (1 - score*(-1))*sentBarWidth;
      }
      else if (score == null){
        //minus 6 to account for padding and spacing
        arrowLeft += sentBarWidth - 6;
      }
      else {
        arrowLeft += sentBarWidth + (score*sentBarWidth);
      }
      $("#sent-arrow").css("width", "0");
      $("#sent-arrow").css("height", "0");
      $("#sent-arrow").css("border-right", "10px solid transparent");
      $("#sent-arrow").css("border-left", "10px solid transparent");
      $("#sent-arrow").css("border-top", "20px solid black");
      $("#sent-arrow").css("position", "absolute");
      $("#sent-arrow").css("bottom", "45px");
      $("#sent-arrow").css("left", arrowLeft + "px");

    }

  });
});
