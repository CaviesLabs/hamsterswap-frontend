try {
  const s = {
    placement: "bottom",
    triggerType: "click",
    offsetSkidding: 0,
    offsetDistance: 10,
    onShow: function () {},
    onHide: function () {},
  };
  const a = window.Dropdown;
  document.querySelectorAll("[data-dropdown-toggle]").forEach(function (t) {
    var e = t.getAttribute("data-dropdown-toggle"),
      i = document.getElementById(e);
    if (i) {
      var n = t.getAttribute("data-dropdown-placement"),
        o = t.getAttribute("data-dropdown-offset-skidding"),
        r = t.getAttribute("data-dropdown-offset-distance");
      new a(i, t, {
        placement: n || s.placement,
        offsetSkidding: o ? parseInt(o) : s.offsetSkidding,
        offsetDistance: r ? parseInt(r) : s.offsetDistance,
      });
      i.style = "transform: translate3d(50px, 148.889px, 0px);";
    } else console.error('The dropdown element with id "'.concat(e, '" does not exist. Please check the data-dropdown-toggle attribute.'));
  });
} catch {}
