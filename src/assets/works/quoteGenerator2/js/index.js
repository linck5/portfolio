
var currQuote = "";
var currQuoteAuthor = "";


$(document).ready(function() {

  randomizeNewQuote();
  placeLoadingIconOnQuoteArea();

  twttr.widgets.load();
});



function randomizeNewQuote(){
  $.ajax({
      headers: {
        "X-Mashape-Key": "s9w9oj9o4YmshBJtxmFJeOKebyWdp1ctDANjsn4Wpv2qBcpvn7",
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
      success: function(response) {
        var data = response[0];
        currQuote = data.quote;
        currQuoteAuthor = data.author;

        var quoteString = splitStringAtLength(data.quote, 50);

        $("#quote").html(
          '<span class="quote-mark">"</span>' +
          quoteString +
          '<span class="quote-mark">"</span>'
          );
        $("#author").html("-" + data.author);

    }
  });
}




function placeLoadingIconOnQuoteArea(){
  $("#quote").html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');
  $("#author").html("");
}




function splitStringAtLength(string, length){
  if(string.length < length) return string;

  var stringArr = string.split("");
  for(var i = length; i < string.length; i += length){

    while(stringArr[i] !== " " && i < string.length - 1) i++;

    if(i !== string.length - 1){
      stringArr[i] += "<br>";
    }

  }
  return stringArr.join("");
}



$('#newQuoteButton').on('click', function() {
  randomizeNewQuote();
  placeLoadingIconOnQuoteArea();
});

$('#tweetQuoteButton').on('click', function() {
  window.open(
        'https://twitter.com/intent/tweet?text='  + "\"" + currQuote + "\"" + " -" + currQuoteAuthor,
        '_blank',
        'location=yes,height=250,width=800');
});
