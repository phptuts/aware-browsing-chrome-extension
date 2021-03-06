(function() {
  let currentUrlInfo = {
    date: undefined,
    url: undefined
  };
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (currentUrlInfo.date < new Date().getTime() - 5 * 60 * 1000) {
      currentUrlInfo.url = undefined;
    }
    console.log(currentUrlInfo);
    console.log(tab);
    if (currentUrlInfo.url === tab.url || !tab.url) {
      return;
    }
    currentUrlInfo.url = tab.url;
    currentUrlInfo.date = new Date().getTime();
    const shortenUrl = new URL(currentUrlInfo.url).hostname;
    const goodIdea = confirm(
      `You are confirming that viewing this ${shortenUrl} is a good idea?`
    );

    chrome.storage.sync.get('reasons', function(data) {
      const reasons = data.reasons || [];
      const date = new Date();
      reasons.push({
        url: currentUrlInfo.url,
        time: date.getTime(),
        goodReason: goodIdea
      });
      chrome.storage.sync.set({ reasons }, function() {
        console.log('this was saved');
      });
    });
  });
})();
