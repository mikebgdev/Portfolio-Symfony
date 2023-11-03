import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

import './styles/app.scss';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Typed from 'typed.js';


(function () {
  let lightSwitch = document.getElementById("lightSwitch");
  if (lightSwitch) {
    darkMode();
    lightSwitch.addEventListener("change", () => {
      lightMode();
    });

    function darkMode() {
      let isSelected =
        localStorage.getItem("lightSwitch") === null ||
        localStorage.getItem("lightSwitch") === "dark";

      if (isSelected) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        lightSwitch.checked = true;
      } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        lightSwitch.checked = false;
      }
    }

    function lightMode() {
      if (lightSwitch.checked) {
        localStorage.setItem("lightSwitch", "dark");
        darkMode();
      } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem("lightSwitch", "light");
      }
    }
  }

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  const navbarlinks = select('.navbar .scrollto', true);

  const navbarlinksActive = () => {
    let position = window.scrollY + 250
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }

  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
})()