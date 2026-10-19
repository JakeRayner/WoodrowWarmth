/* Woodrow Warmth — interactions */
(function () {
  "use strict";

  /* ----- serpentine heating pipe in the hero floor ----- */
  var svg = document.getElementById("pipe-svg");
  if (svg) {
    var W = 1200, H = 160;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);

    // Build a serpentine path programmatically, like a UFH pipe loop.
    var runs = 3;                     // horizontal runs
    var top = 30, gap = (H - top - 20) / (runs - 1);
    var left = -20, right = W + 20, r = gap / 2;
    var d = "M " + left + " " + top;
    for (var i = 0; i < runs - 1; i++) {
      var y = top + i * gap;
      if (i % 2 === 0) {
        d += " H " + (right - r) + " A " + r + " " + r + " 0 0 1 " + (right - r) + " " + (y + gap);
      } else {
        d += " H " + (left + r) + " A " + r + " " + r + " 0 0 0 " + (left + r) + " " + (y + gap);
      }
    }
    d += (runs % 2 === 1) ? " H " + right : " H " + left;

    var ns = "http://www.w3.org/2000/svg";
    var defs = document.createElementNS(ns, "defs");
    var grad = document.createElementNS(ns, "linearGradient");
    grad.setAttribute("id", "heatGrad");
    grad.setAttribute("x1", "0"); grad.setAttribute("y1", "0");
    grad.setAttribute("x2", "1"); grad.setAttribute("y2", "0");
    [["0%", "#ff6b2c"], ["100%", "#ffb84d"]].forEach(function (s) {
      var stop = document.createElementNS(ns, "stop");
      stop.setAttribute("offset", s[0]);
      stop.setAttribute("stop-color", s[1]);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
    svg.appendChild(defs);

    var base = document.createElementNS(ns, "path");
    base.setAttribute("d", d);
    base.setAttribute("class", "pipe-path");
    svg.appendChild(base);

    var hot = document.createElementNS(ns, "path");
    hot.setAttribute("d", d);
    hot.setAttribute("class", "pipe-hot");
    svg.appendChild(hot);
  }

  /* ----- reveal on scroll ----- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----- mobile nav ----- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- enquiry form: composes an email to the office ----- */
  var form = document.getElementById("enquiry-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var subject = form.subject.value;
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        note.textContent = "Please fill in your name, email and message.";
        return;
      }

      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        (phone ? "Phone: " + phone + "\n" : "") +
        "\n" + message;

      window.location.href =
        "mailto:info@woodrowwarmth.co.uk" +
        "?subject=" + encodeURIComponent("Enquiry: " + subject + " — " + name) +
        "&body=" + encodeURIComponent(body);

      note.textContent = "Opening your email app… or call us on 01260 540010.";
    });
  }

  /* ----- footer year ----- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
