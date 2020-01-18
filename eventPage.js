(function() {
  let currentUrl = '';

  chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (currentUrl === tab.url || !tab.url) {
        return;
      }
      currentUrl = tab.url;
      const shortenUrl = new URL(currentUrl).hostname;
      const reason =
        prompt(`Why are you going to this page ${shortenUrl}?`, 'Good idea!') ||
        'reason not known.';
      chrome.storage.sync.get('reasons', function(data) {
        const reasons = data.reasons || [];
        const date = new Date();
        reasons.push({
          url: currentUrl,
          time: date.getTime(),
          reason
        });
        chrome.storage.sync.set({ reasons }, function() {
          console.log('this was saved');
        });
      });
    });
  });
})();
