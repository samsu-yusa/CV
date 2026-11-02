/* Skrip situs: tema, filter portofolio, formulir kontak. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     PENGATURAN KONTAK. Ganti nilai di bawah ini dengan data Anda.
     ------------------------------------------------------------------ */
  var CONTACT_EMAIL = "ahmadsamsuyu@gmail.com";

  /* ---------- Tema terang dan gelap ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  function currentTheme() { return root.getAttribute("data-bs-theme") === "dark" ? "dark" : "light"; }
  function paintToggle() {
    if (!toggle) return;
    var dark = currentTheme() === "dark";
    toggle.textContent = dark ? "Mode terang" : "Mode gelap";
    toggle.setAttribute("aria-pressed", dark ? "true" : "false");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-bs-theme", next);
      try { localStorage.setItem("asy-theme", next); } catch (e) {}
      paintToggle();
    });
  }
  paintToggle();

  /* ---------- Filter portofolio ---------- */
  var filterBar = document.getElementById("portfolioFilters");
  if (filterBar) {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-category]"));
    var buttons = Array.prototype.slice.call(filterBar.querySelectorAll("[data-filter]"));
    var counts = { semua: items.length };
    items.forEach(function (el) { counts[el.dataset.category] = (counts[el.dataset.category] || 0) + 1; });
    buttons.forEach(function (btn) {
      var c = btn.querySelector(".count");
      if (c) c.textContent = counts[btn.dataset.filter] || 0;
      btn.addEventListener("click", function () {
        var f = btn.dataset.filter;
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        items.forEach(function (el) {
          el.classList.toggle("d-none", !(f === "semua" || el.dataset.category === f));
        });
      });
    });
  }

  /* ---------- Formulir kontak (membuka aplikasi email) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var shown = document.getElementById("contactEmailShown");
    if (shown) shown.textContent = CONTACT_EMAIL;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
      var nama = form.elements.nama.value.trim();
      var topik = form.elements.topik.value;
      var pesan = form.elements.pesan.value.trim();
      var subject = "[" + topik + "] Pesan dari " + nama;
      var body = pesan + "\n\nSalam,\n" + nama + "\n" + form.elements.email.value.trim();
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var note = document.getElementById("contactNote");
      if (note) note.textContent = "Aplikasi email Anda akan terbuka dengan pesan yang sudah terisi. Tekan kirim di sana.";
    });
  }
})();
