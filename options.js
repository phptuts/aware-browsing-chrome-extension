chrome.storage.sync.get('reasons', function(data) {
  const reasons = data.reasons || [];
  const tableBody = reasons.reduce(function(prev, current) {
    const goodReasonText = current.goodReason ? 'Yes' : 'No';
    return (
      prev +
      '<tr>' +
      '<td>' +
      createUrlLink(current.url) +
      '</td>' +
      '<td>' +
      goodReasonText +
      '</td>' +
      '<td>' +
      new Date(current.time * 1000).toLocaleString() +
      '</td>' +
      '</tr>'
    );
  }, '');

  document.querySelector('table tbody').innerHTML = tableBody;
});

function createUrlLink(path) {
  if (!path) {
    return 'bad link';
  }
  const url = new URL(path);
  return `<a href=${url}>${url.hostname}</a>`;
}

document.querySelector('#clear_history').addEventListener('click', function() {
  chrome.storage.sync.set({ reasons: [] }, function() {
    var notifOptions = {
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'History Erased!',
      message: 'Your history was erased, thank you! :)'
    };
    chrome.notifications.create(
      'limitNotif' + new Date().getTime(), // Id must be unique for every notification
      notifOptions
    );
    document.querySelector('table tbody').innerHTML = '';
  });
});
