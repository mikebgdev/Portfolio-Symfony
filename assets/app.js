import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/app.scss';
import Typed from 'typed.js';


(function () {
  let lightSwitch = document.getElementById("lightSwitch");
  let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (lightSwitch) {
    initializeTheme();

    lightSwitch.addEventListener("change", () => {
      toggleTheme();
    });

    function initializeTheme() {
      let storedTheme = localStorage.getItem("lightSwitch");
      if (storedTheme === null) {
        setTheme(prefersDarkMode ? 'dark' : 'light');
      } else {
        setTheme(storedTheme);
      }
    }

    function toggleTheme() {
      let currentTheme = localStorage.getItem("lightSwitch");
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    function setTheme(theme) {
      document.documentElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem("lightSwitch", theme);
      lightSwitch.checked = theme === 'dark';
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


  const contactForm = document.forms.contact;
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const response = await fetch("/contact", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    const modalResult = document.getElementById("modalResult");
    modalResult.innerText = result.result;

    const contactModal = new bootstrap.Modal(document.getElementById("contactModal"), {
      backdrop: 'static',
      keyboard: false
    });
    contactModal.show();

  });
})()
