'use strict';

console.log('\'Allo \'Allo! Content script');

chrome.runtime.onMessage.addListener(function(message, _, response) {
  if (message.action === "verify") {
    let content = document.querySelectorAll('textarea')[0].value;

    response({ content: content });
  }
});
