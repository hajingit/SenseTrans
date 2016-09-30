document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var url = "https://www.googleapis.com/language/translate/v2?key=AIzaSyD4rLhLb3ZmwjLJDt-njNqFYP30eHeaBTQ&target=en&q=";

var div = document.createElement( 'div' );
var btnForm = document.createElement( 'form' );
var btn = document.createElement( 'input' );

//append all elements
document.body.appendChild( div );
div.appendChild( btnForm );
btnForm.appendChild( btn );
//set attributes for div
// div.id = 'myDivId';
// div.style.position = 'fixed';
// div.style.top = '50%';
// div.style.left = '50%';
// div.style.width = '100%';   
// div.style.height = '100%';
// div.style.backgroundColor = 'red';

//set attributes for btnForm
btnForm.action = '';

//set attributes for btn
//"btn.removeAttribute( 'style' );
btn.type = 'button';
btn.value = 'hello';
btn.style.position = 'absolute';
btn.style.top = '50%';
btn.style.left = '50%';

$(document).ready(function(){
  $("body").append("<div id='hover-box' style='background-color: yellow; position:absolute; width:100px; height:100px'></div>");

  $("body").append("<div id='translation-box' style='background-color: lightblue; position:absolute; width:200px; height:100px'></div>");

  $(document).on("mouseover", ".userContent", function(){
    var position = $(this).offset();
    var width = $(this).width();
    console.log(position);

    $("#hover-box").css("left", position.left + "px");
    $("#hover-box").css("top", position.top + "px");
    $("#hover-box").css("width", width + "px");
    $("#hover-box").css("height", $(this).height() + "px");

    $("#translation-box").css("left", (position.left + width) + "px");
    $("#translation-box").css("top", position.top + "px");
    $("#translation-box").css("height", $(this).height() + "px");
    $("#translation-box").css("z-index:10000000");

    console.log($(this).html());
    var content = $(this).find("p").first().html();
    console.log(content);
    $.get(url + content, function(data){
      console.log(data);
      $("#translation-box").html(data.data.translations[0].translatedText);

      // $.post(watsonurl, { html: content , apikey: myapikey, extract: "doc-emotion" }, function(data){
        // do some stuff iwth result
      // })
    });
    // $("#hover-box").css("left", position.left + "px");
    // $("#hover-box").css("top", position.top + "px");
  });
});
// css("background-color", "blue");