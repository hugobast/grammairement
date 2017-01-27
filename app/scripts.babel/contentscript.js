'use strict';

console.log('\'Allo \'Allo! Content script');

chrome.runtime.onMessage.addListener(function(message, _, response) {
  if (message.action === "verify") {
    if (!document.querySelectorAll('textarea')) {
      return
    }

    let content = document.querySelectorAll('textarea')[0].value;

    response({ content: content });
  }
});
