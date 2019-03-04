// Originally 2019-1-21 17:00:00:00
var target = new Date();
target.setDate(28);
target.setHours(23, 59, 59);
var isStop = false;
var currentClock = {
  h: '000',
  m: '00',
  s: '00',
};

$(function() {
  $(".gear").addClass("spin");
  $(".gear2").addClass("spin2");

  var $elem = $("img");
  var sp = "img/sp/";
  var pc = "img/pc/";
  var replaceWidth = 768;
  var resizeTimer;

  function imageSwitch() {
    var windowWidth = parseInt($(window).width());
    $elem.each(function() {
      var $this = $(this);
      if (windowWidth >= replaceWidth) {
        $this.attr("src", $this.attr("data-src"));
      } else {
        if ($this.attr("data-src")) {
          $this.attr("src", $this.attr("data-src").replace(pc, sp));
        }
      }
    });
  }
  imageSwitch();

  $(window).on("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 200);
  });

  Boom.init();

  $("#cover").click(function() {
    if (tweens.length > 0) {
      $(".pause").removeClass("pause");
      setTimeout(function(){
        $(".gear").addClass("spin");
        $(".gear2").addClass("spin2");
        isStop = false;
        $("#bgVideo").get(0).play();
        window.requestAnimationFrame(step);
      }, 200);
      $('#sight').removeClass('anim');
      $('#canvas').show();
      $('#btn_tweet, #kv_logo, #btn_fb, #btn_tw, #btn_line, #btn_google, #btn_ios, #btn_dmm, #footer_logo').addClass('event');
      tl.play();
      return;
    }
    $(".gear").removeClass("spin");
    $(".gear2").removeClass("spin2");
    isStop = true;
    $("#bgVideo").get(0).pause();
    $("section").addClass("pause");
    $('#sight').addClass('anim');
    $('#btn_tweet, #kv_logo, #btn_fb, #btn_tw, #btn_line, #btn_google, #btn_ios, #btn_dmm, #footer_logo').removeClass('event');
    setTimeout(function() {
      html2canvas(document.body, {
        logging: false,
        scale: 1,
        width: window.innerWidth,
        height: window.innerHeight,
      }).then(function(canvas) {
        $('#canvas').hide();
        var context = canvas.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        context.putImageData(imageData, 0, 0);
        setCanvas(canvas);
      });
    });
    return false;
  });

  function step() {
    var now = new Date();
    var diff = Math.max(0, target.getTime() - now.getTime());
    var h = Math.floor(diff / (1000 * 60 * 60));
    var m = Math.floor(diff / (1000 * 60)) - h * 60;
    var s = Math.floor(diff / 1000) - h * 60 * 60 - m * 60;
    var ms = Math.floor(diff % 1000);
    setClock(h, m, s, ms);
    if (isStop) return;
    setTimeout(function(){
      window.requestAnimationFrame(step);
    }, 100);
  }
  window.requestAnimationFrame(step);

  var time = new Date().getTime();
  $(window).on('load', function(){
    var now = new Date().getTime();
    if (now - time <= 1000) {
      setTimeout(function(){
        $('#loading').fadeOut(80, function () {
          $('#loading').remove();
        });
        $('section').fadeIn();
      }, 1000 - (now - time));
      return;
    } else {
      $('#loading').fadeOut(80, function () {
        $('#loading').remove();
      });
      $('section').fadeIn();
    }
  });
});

function setClock(h, m, s, ms) {
  h = Math.min(999, h);
  $("#h").attr("class", "clock");
  $("#m").attr("class", "clock");
  $("#s").attr("class", "clock");

  $("#h").addClass("f" + (Math.floor((-1 + 24 * (60 - m)) / 60) % 24));
  $("#m").addClass("f" + (Math.floor((-1 + 24 * (60 - s)) / 60) % 24));
  $("#s").addClass("f" + (Math.floor((-1 + 24 * (1000 - ms)) / 1000) % 24));

  var replaceWidth = 768;
  var windowWidth = parseInt($(window).width());
  var d = 'sp';
  if (windowWidth >= replaceWidth) {
    d = 'pc';
  }

  if (currentClock.h !== ''+h) {
    $('#h').addClass('inv');
    setTimeout(function(){
      $('#h').removeClass('inv');
    }, 250);
    currentClock.h = ''+h;
    if (h >= 100) {
      $("#h .num1").html('<img src="img/' + d + '/' + Math.floor(h / 100) + '.png"><img src="img/' + d + '/' + Math.floor(h % 100 / 10) + '.png"><img src="img/' + d + '/' + (h % 100 % 10) + '.png">');
      $("#h .num2").html('<img src="img/' + d + '/' + Math.floor(h / 100) + '.png"><img src="img/' + d + '/' + Math.floor(h % 100 / 10) + '.png"><img src="img/' + d + '/' + (h % 100 % 10) + '.png">');
      $("#h .num").html('<img src="img/' + d + '/' + Math.floor(h / 100) + 'b.png"><img src="img/' + d + '/' + Math.floor(h % 100 / 10) + 'b.png"><img src="img/' + d + '/' + (h % 100 % 10) + 'b.png">');
    } else if (h >= 10) {
      $("#h .num1").html('<img src="img/' + d + '/' + Math.floor(h / 10) + '.png"><img src="img/' + d + '/' + (h % 10) + '.png">');
      $("#h .num2").html('<img src="img/' + d + '/' + Math.floor(h / 10) + '.png"><img src="img/' + d + '/' + (h % 10) + '.png">');
      $("#h .num").html('<img src="img/' + d + '/' + Math.floor(h / 10) + 'b.png"><img src="img/' + d + '/' + (h % 10) + 'b.png">');
    } else {
      $("#h .num1").html('<img src="img/' + d + '/' + h + '.png">');
      $("#h .num2").html('<img src="img/' + d + '/' + h + '.png">');
      $("#h .num").html('<img src="img/' + d + '/' + h + 'b.png">');
    }
  }

  if (currentClock.m !== ''+m) {
    $('#m').addClass('inv');
    setTimeout(function(){
      $('#m').removeClass('inv');
    }, 250);
    currentClock.m = ''+m;
    if (m >= 10) {
      $("#m .num1").html('<img src="img/' + d + '/' + Math.floor(m / 10) + '.png"><img src="img/' + d + '/' + (m % 10) + '.png">');
      $("#m .num2").html('<img src="img/' + d + '/' + Math.floor(m / 10) + '.png"><img src="img/' + d + '/' + (m % 10) + '.png">');
      $("#m .num").html('<img src="img/' + d + '/' + Math.floor(m / 10) + 'b.png"><img src="img/' + d + '/' + (m % 10) + 'b.png">');
    } else {
      $("#m .num1").html('<img src="img/' + d + '/' + m + '.png">');
      $("#m .num2").html('<img src="img/' + d + '/' + m + '.png">');
      $("#m .num").html('<img src="img/' + d + '/' + m + 'b.png">');
    }
  }

  if (currentClock.s !== ''+s) {
    $('#s').addClass('inv');
    setTimeout(function(){
      $('#s').removeClass('inv');
    }, 250);
    currentClock.s = ''+s;
    if (s >= 10) {
      $("#s .num1").html('<img src="img/' + d + '/' + Math.floor(s / 10) + '.png"><img src="img/' + d + '/' + (s % 10) + '.png">');
      $("#s .num2").html('<img src="img/' + d + '/' + Math.floor(s / 10) + '.png"><img src="img/' + d + '/' + (s % 10) + '.png">');
      $("#s .num").html('<img src="img/' + d + '/' + Math.floor(s / 10) + 'b.png"><img src="img/' + d + '/' + (s % 10) + 'b.png">');
    } else {
      $("#s .num1").html('<img src="img/' + d + '/' + s + '.png">');
      $("#s .num2").html('<img src="img/' + d + '/' + s + '.png">');
      $("#s .num").html('<img src="img/' + d + '/' + s + 'b.png">');
    }
  }
}

function shatterCompleteHandler() {
  tl = new TimelineMax({onComplete:shatterCompleteHandler});
  tweens = [];
  while(scene.children.length > 0){
    scene.remove(scene.children[0]);
  }
}

var Boom = {};
var scene, camera, renderer;
var tl = new TimelineMax({onComplete:shatterCompleteHandler}), tweens = [];
Boom.init = function() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 2800;
  camera.position.x = window.innerWidth/2;
  camera.position.y = -window.innerHeight/2;

  renderer = new THREE.CSS3DRenderer();
  renderer.sortObjects = false;
  renderer.setSize(document.getElementById('canvas').offsetWidth, document.getElementById('canvas').offsetHeight);
  renderer.domElement.classList.add("three");
  document.getElementById('canvas').appendChild(renderer.domElement);

  window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('canvas').offsetWidth, document.getElementById('canvas').offsetHeight);
    renderer.render(scene, camera);
  });
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function makeRandomNegative(number) {
  var conditional = Math.random();
  if (conditional > 0.5) {
    return number * -1;
  } else {
    return number;
  }
}

// Shattered glass
(function() {
  var Fragment = function(options) {
    var opts = options || {};
    this.side = opts.count % 2;
    this.index = opts.count;
    this.gridIndex = opts.gridIndex;
    this.sourceCanvas = opts.sourceCanvas;
    this.tileWidth = Math.round(this.sourceCanvas.width / opts.rows);
    this.tileHeight = Math.round(this.sourceCanvas.height / opts.columns);
    this.cRow = Math.floor(this.gridIndex / opts.rows);
    this.cCol = Math.floor(this.gridIndex % opts.rows);
    this.x = this.cCol * this.tileWidth;
    this.y = -(this.cRow * this.tileHeight);
    this.initCanvas();
    THREE.CSS3DObject.call(this, this.element);
    this.setStartPosition();
    this.setTween();
  };

  var p = (Fragment.prototype = Object.create(THREE.CSS3DObject.prototype));

  p.setTween = function() {
    tweens.push(
      TweenMax.to(this.position, 3, {
        x: this.position.x + getRandomArbitrary(-2500, 2500),
        y: this.position.y + getRandomArbitrary(-2500, 2500),
        Z: this.position.z + getRandomArbitrary(-1200, 1200),
      })
    );
    tweens.push(
      TweenMax.to(this.rotation, 3, {
        x: this.position.x * 0.02,
        y: this.position.y * 0.02,
        Z: this.position.z * 0.02,
        ease: Power0.easeOut,
      })
    );
    tweens.push(
      TweenMax.to(this.element, 1, {
        opacity: 0,
        delay: 1.5,
      })
    );
    tl.insertMultiple(tweens);
    tl.pause();
  };

  p.initCanvas = function() {
    var c = document.createElement("canvas");
    c.setAttribute("data-index", this.index);
    c.setAttribute("data-side", this.side);
    c.setAttribute("width", this.tileWidth);
    c.setAttribute("height", this.tileHeight);
    c.style.width = this.tileWidth;
    c.style.height = this.tileHeight;
    this.element = c;
    this.drawToCanvas(c);
  };

  p.drawToCanvas = function(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "transparent";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    if (this.side == 1) {
      ctx.lineTo(this.tileWidth, 0);
    } else {
      ctx.lineTo(0, this.tileHeight);
    }
    ctx.lineTo(this.tileWidth, this.tileHeight);
    ctx.fill();
    ctx.clip();
    ctx.drawImage(this.sourceCanvas, -this.x, this.y);
  };

  p.setStartPosition = function() {
    this.position.x = this.x;
    this.position.y = this.y;
    this.position.z = 0;
  };

  window.Fragment = Fragment;
})();

// Triangulation settings
var ts = {
  rows: 5,
  columns: 5
};
var totalSections = ts.rows * ts.columns * 2;
var sourceCanvas;

function triangulate(total) {
  var gridIndex = 0;
  for (var i = 0; i < total; i++) {
    var frag = new Fragment({
      count: i,
      sourceCanvas: sourceCanvas,
      rows: ts.rows,
      columns: ts.columns,
      gridIndex: gridIndex
    });
    if (frag.side == 1) {
      gridIndex++;
    }
    scene.add(frag);
  }
}

function setCanvas(canvas) {
  sourceCanvas = canvas;
  var canvas3d = new THREE.CSS3DObject(canvas);
  triangulate(totalSections);
}

TweenMax.ticker.addEventListener("tick", function(){
  if (!renderer) return;
  renderer.render(scene, camera);
});

$(function () {
  var topBtn = $("#page-top");
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $("body,html").animate(
      {scrollTop: 0},
      500
    );
    return false;
  });
  $("#kv_logo").click(function (e) {
    e.preventDefault();
  });
  $("#footer_logo").click(function (e) {
    e.preventDefault();
  });
});
