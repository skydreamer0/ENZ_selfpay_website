import './style.css'

// === Mobile Navigation Toggle ===
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.header__hamburger')
  const nav = document.querySelector('.header__nav')
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open')
      hamburger.textContent = nav.classList.contains('open') ? '✕' : '☰'
    })
    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open')
        hamburger.textContent = '☰'
      })
    })
  }

  // === Accordion ===
  document.querySelectorAll('.accordion__header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion__item')
      const isOpen = item.classList.contains('open')
      // Close all siblings
      item.closest('.accordion').querySelectorAll('.accordion__item').forEach(i => i.classList.remove('open'))
      if (!isOpen) item.classList.add('open')
    })
  })

  // === Tabs ===
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tabs-group')
      const target = btn.dataset.tab
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
      btn.classList.add('active')
      group.querySelector(`#${target}`).classList.add('active')
    })
  })

  // === Active nav link ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('.header__nav a').forEach(link => {
    const href = link.getAttribute('href')
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active')
    }
  })

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
})
