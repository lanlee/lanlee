(function() {
  $(".bar1, .bar2,.bar3, .bar4").draggable({
    containment: "parent"
  });
  $(".bar1, .bar2,.bar3, .bar4").resizable({
    containment: "parent",
    grid: 72,
    minWidth:72
  });
    $(".bar1, .bar2,.bar3, .bar4").on("mouseenter", function() {
      $(this).find(".toolbox").slideDown(200);
    });
      $(".bar1, .bar2,.bar3, .bar4").on("mouseleave", function() {
      $(this).find(".toolbox").slideUp(200);
    });
})();