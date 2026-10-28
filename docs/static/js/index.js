// Copy the BibTeX block to the clipboard (adapted from the Academic Project Page Template).
function copyBibTeX() {
  var el = document.getElementById('bibtex-code');
  var button = document.querySelector('.copy-bibtex-btn');
  if (!el || !button) return;

  function done() {
    button.classList.add('copied');
    button.textContent = 'Copied!';
    setTimeout(function () {
      button.classList.remove('copied');
      button.textContent = 'Copy';
    }, 2000);
  }

  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = el.textContent;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { console.error(e); }
    document.body.removeChild(ta);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(el.textContent).then(done).catch(fallback);
  } else {
    fallback();
  }
}

// Light/dark toggle. Starts from the system setting; an explicit choice is remembered in localStorage.
function toggleTheme() {
  var root = document.documentElement;
  var current = root.getAttribute('data-theme');
  if (!current) {
    current = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  var next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('sb-theme', next); } catch (e) {}
}
