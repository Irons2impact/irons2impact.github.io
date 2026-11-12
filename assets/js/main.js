(function () {
  'use strict';
  const config = window.IRONS2IMPACT_CONFIG || {};
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
      }
    });
  }

  const elements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {entry.target.classList.add('in-view'); obs.unobserve(entry.target);}
      });
    }, { threshold: .08 });
    elements.forEach(function (el) {observer.observe(el);});
  } else {elements.forEach(function(el){el.classList.add('in-view');});}

  const emailAddress = (config.CONTACT_EMAIL || '').trim();
  document.querySelectorAll('[data-contact-address]').forEach(function (el) {
    if (emailAddress && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      el.textContent = emailAddress;
      el.href = 'mailto:' + emailAddress;
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  });
  if (emailAddress && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
    document.querySelectorAll('[data-email-unset]').forEach(function(el) {el.hidden = true;});
  }
  document.querySelectorAll('[data-year]').forEach(function (el) {el.textContent = new Date().getFullYear();});

  const form = document.getElementById('athlete-inquiry');
  if (!form) return;
  const status = document.getElementById('form-status');
  const saveBtn = document.getElementById('save-inquiry');
  const guardianInput = document.getElementById('guardian-name');
  const guardianEmail = document.getElementById('guardian-email');
  const ageSelect = document.getElementById('age-group');
  const guardianNote = document.getElementById('guardian-note');
  const sendBtn = document.getElementById('prepare-email');
  function setStatus(message, kind) {
    status.textContent = message;
    status.className = 'status is-visible ' + (kind || 'info');
    status.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  }
  function updateGuardian() {
    const isMinor = ageSelect.value && ageSelect.value !== '18+';
    guardianInput.required = !!isMinor;
    guardianEmail.required = !!isMinor;
    guardianNote.textContent = isMinor ? 'Parent/guardian name and email are required for athletes under 18.' : 'Parent/guardian information is optional for adult athletes.';
  }
  ageSelect.addEventListener('change', updateGuardian);
  updateGuardian();
  const fields = [
    ['athlete-name', 'Athlete name'], ['age-group', 'Age group'],
    ['guardian-name', 'Parent/guardian'], ['guardian-email', 'Parent/guardian email'],
    ['contact-email', 'Primary contact email'], ['phone', 'Phone (optional)'],
    ['state', 'City / state'], ['program', 'Main interest'],
    ['graduation-year', 'Graduation year'], ['notes', 'Athlete goals / questions']
  ];
  function valid() { return form.reportValidity(); }
  function buildText() {
    const lines = ['IRONS2IMPACT — ATHLETE INQUIRY', ''];
    fields.forEach(function (entry) {
      const el = document.getElementById(entry[0]);
      if (el && el.value.trim()) lines.push(entry[1] + ': ' + el.value.trim());
    });
    lines.push('', 'Submitted by the individual completing this form.');
    return lines.join('\n');
  }
  function downloadText() {
    const content = buildText();
    const file = new Blob([content], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'Irons2Impact-Athlete-Inquiry.txt';
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(function () {URL.revokeObjectURL(url);}, 1000);
    setStatus('Your inquiry has been downloaded. It has not been sent to Irons2Impact.', 'success');
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valid()) return;
    if (!emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setStatus('Email delivery is not configured yet. Use “Download inquiry” to save your information; it has not been submitted.', 'info');
      return;
    }
    const subject = encodeURIComponent('Athlete Inquiry — Irons2Impact Sports Management');
    const body = encodeURIComponent(buildText());
    window.location.href = 'mailto:' + emailAddress + '?subject=' + subject + '&body=' + body;
    setStatus('Your email application should open with a prepared message. Review it and press Send in your email app to deliver your inquiry.', 'info');
  });
  if (saveBtn) saveBtn.addEventListener('click', function () {if (valid()) downloadText();});
  if (!emailAddress) {
    sendBtn.textContent = 'Prepare Email (setup needed)';
    setStatus('The site owner must set CONTACT_EMAIL in assets/js/config.js to activate email inquiries. You can still download a completed inquiry.', 'info');
  }
})();
