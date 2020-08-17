chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
                            'bg_color': 'black',
                            'color': 'white'
                          });

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })
  //     ],
  //     actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});
