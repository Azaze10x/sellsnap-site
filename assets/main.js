/* SellSnap marketing site — language toggle & nav behaviour.
 *
 * SECURITY NOTE: applyLang() uses innerHTML to set translations from the
 * SELLSNAP_I18N dictionary. This is safe ONLY because the dictionary is a
 * static local file (i18n.js) with no user-supplied or remote content.
 * If translations are ever fetched from a remote endpoint, switch to
 * textContent and move all HTML markup into the HTML templates instead.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'sellsnap_lang';
  var i18n = window.SELLSNAP_I18N || {};
  var html = document.documentElement;

  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'th' || stored === 'en') return stored;
    } catch (e) {}
    // Default to Thai for the Thai-first product
    return 'th';
  }

  function applyLang(lang) {
    var dict = i18n[lang];
    if (!dict) return;

    html.setAttribute('lang', lang);

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        nodes[i].innerHTML = dict[key];
      }
    }

    var toggles = document.querySelectorAll('[data-lang]');
    for (var j = 0; j < toggles.length; j++) {
      var t = toggles[j];
      if (t.getAttribute('data-lang') === lang) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function bindToggles() {
    var toggles = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function (e) {
        e.preventDefault();
        var lang = this.getAttribute('data-lang');
        applyLang(lang);
      });
    }
  }

  window.sellsnapSetLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    bindToggles();
    applyLang(getStoredLang());
  });
})();
