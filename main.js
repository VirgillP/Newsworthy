// Page Elements

const news24 = document.getElementById('news24');
const recode = document.getElementById('recode');
const nextWeb = document.getElementById('nextWeb');
const main = document.getElementsByTagName('main')[0];

// News API Data

const apiKey = 'YOUR API KEY';
const news24Url = 'https://newsapi.org/v2/top-headlines?sources=news24&apiKey=YOUR API KEY';
const recodeUrl = 'https://newsapi.org/v2/top-headlines?sources=recode&apiKey=YOUR API KEY';
const nextWebUrl = 'https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey=YOUR API KEY';

// Request News Function
async function getNews (url) {
  let response = await fetch(url);
  let jsonResponse = await response.json();
  //console.log(jsonResponse); To see what the output is via console
  let articlesArray = jsonResponse.articles.slice(0, 5);
  return articlesArray;// This line will return your renderNews(articles)

}
// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
      '<div class="articlerow">' +
      ' <div class="article">' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
      ' </div>' +
      ' <div class="share">' +
      '   <img class="storyimage" src="' + article.urlToImage + '" />' +
      '   <a href="https://twitter.com/@VirgillP" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
      '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
      ' </div>' +
      '</div>';

    main.innerHTML += articleRow;
  });
  return articles;
}

// Post Tweet Function

function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      // Call Post Status function here
      Twitter.postStatus(newsObjects[i].url)
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

// Button Event Listeners

news24.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(news24Url).then(articlesArray => renderNews(articlesArray)).then( articles => sendTweets(articles))

}, false);

recode.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(recodeUrl).then(articlesArray => renderNews(articlesArray)).then( articles => sendTweets(articles))
}, false);

nextWeb.addEventListener('click', function() {
  main.innerHTML = ' ';
  // Call getNews() here
  getNews(nextWebUrl).then(articlesArray => renderNews(articlesArray)).then( articles => sendTweets(articles))
}, false);
