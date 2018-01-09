var knarlia = {

  init: function(objects) {
    knarlia.$container = $("section");
    knarlia.scenery = [];
    knarlia.trigger = false;
    knarlia.rotation = { x: 0, y: 0 };
    knarlia.zoom = 1;

    knarlia.landscape(objects);
    knarlia.events();
  },

  events: function() {
    var start;

    $('img').bind('dragstart', function(event) { event.preventDefault(); });

    events.handler(events.touch_event.start, function(e) {
      knarlia.trigger = true;
      start = e;
    });

    events.handler(events.touch_event.end, function(e) { knarlia.trigger = false; });
    events.handler(events.touch_event.move, function(e) {
      e.preventDefault();

      if (knarlia.trigger) {
        knarlia.rotation.x += (e.pageX - start.pageX);
        knarlia.rotation.x = Math.abs(knarlia.rotation.x % 360) + 360;
        knarlia.rotation.y += (e.pageY - start.pageY);

        knarlia.$container.css("transform", "scale(" + knarlia.zoom + ") translateY(" + knarlia.rotation.y + "px) rotateX(-20deg) rotateY(" + knarlia.rotation.x + "deg)");

        knarlia.rotate_scenery()
        start = e;
      }
    });

    document.addEventListener('mousewheel', function(e) {
      knarlia.zoom += (e.wheelDeltaY / 1200);
      if (knarlia.zoom < 0.4) { knarlia.zoom = 0.4; }

      knarlia.$container.css("transform", "scale(" + knarlia.zoom + ") translateY(" + knarlia.rotation.y + "px) rotateX(-20deg) rotateY(" + knarlia.rotation.x + "deg)");
    });
  },

  landscape: function(objects) {
    for (var x in objects) {
      objects[x].obj = $("<img>").addClass("item").addClass(objects[x].cssClass).attr("src", objects[x].src);

      objects[x].obj.css({ left: objects[x].left + "px", "transform": "translateZ(" + objects[x].z + "px) rotateY(" + (objects[x].y || 0) + "deg)" });

      knarlia.$container.append(objects[x].obj);

      if (objects[x].rotate) { knarlia.scenery.push(objects[x]); }
    }

    var $trajectory = $(".trajectory");

    setInterval(function() {
      $trajectory.css("top", (Math.floor(Math.random() * 20)) + "px");
    }, 1000);
  },

  rotate_scenery: function() {
    for (var x in knarlia.scenery) {
      var s = knarlia.scenery[x];
      s.obj.css("transform", "translateZ(" + s.z + "px) rotateY(-" + knarlia.rotation.x + "deg)");
    }
  }
}