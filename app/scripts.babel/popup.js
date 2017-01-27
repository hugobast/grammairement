'use strict';

chrome.extension.getBackgroundPage().console.log('still works');

function templated(match) {
  var value = "Aucune suggestions"

  if (match.replacements.length > 0) {
    value = match.replacements[0].value
  }

  return `
    <li>
      <dl>
        <dt>Règle:</dt>
        <dd>${match.rule.description}</dd>

        <dt>Correction</dt>
        <dd>${value}</dd>
      </dl>
    </li>
  `
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { action: "verify" }, function(textarea) {
      console.log(textarea);

      let instance = axios.create({
        baseURL: 'https://secret-forest-62803.herokuapp.com'
      });

      instance.get('/v2/check', { params: { language: 'fr', text: textarea.content } })
        .then((response) => {
          chrome.browserAction.setBadgeText({ text: response.data.matches.length.toString() });

          response.data.matches.forEach((match, index) => {
            console.log(match);

            $(templated(match)).appendTo('.matches');
          });

          console.log(response);
        });
    });
  });
});
