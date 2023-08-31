let dapp_id = "9fe80a60-664a-458f-b1eb-0bb8ae0943a0"; // replace with dapp_id provided by hashmail
!function() {
  window.hashmail || (window.hashmail = []), window.hashmail.queue = [];
  let i = ["load", "identify", "track"], t = function(i) {
    return function() {
      a = Array.prototype.slice.call(arguments), a.unshift(i), window.hashmail.queue.push(a);
    };
  };
  for (var e = 0; i.length > e; e++) window.hashmail[i[e]] = t(i[e]);
  hashmail.methods = i, window.hashmail.load = function(i) {
    window.hashmail.dapp_id = i;
    var e = document, s = e.getElementsByTagName("script")[0], h = e.createElement("script");
    h.type = "text/javascript", h.async = !0, h.src = "https://widget.hashmail.dev/notifier_tracking_script.js", s.parentNode.insertBefore(h, s);
  }, window.hashmail.identify = i => {
    window.hashmail.wallet_address = i, localStorage.setItem("hashmail-wallet_address", i);
  }, window.hashmail.load(dapp_id);
}();
