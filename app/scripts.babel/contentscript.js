'use strict';

console.log('\'Allo \'Allo! Content script');

chrome.runtime.onMessage.addListener(function(message, _, response) {
  if (message.action === "verify") {
    let candidates = document.querySelectorAll('textarea:not([type="hidden"]):not([disabled]):not([value=""])');

    if (!candidates) {
      return
    }

    var target
    candidates.forEach((candidate) => {
      console.log(candidate)
      if (candidate.offsetWidth > 0 && candidate.offsetHeight > 0) {
        console.log(candidate)
        target = candidate
      }
    });

    response({ content: target.value });
  }
});
