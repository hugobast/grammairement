'use strict';

chrome.extension.getBackgroundPage().console.log('still works');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { action: "verify" }, function(content) {
      console.log(content);
    });
  });
});
