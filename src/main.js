import './style.css'

// ================================================
// Patient Finder — 情境資料庫
// ================================================
const PF_SCENARIOS = {
  bcr_selfpay: {
    priority: 'high',
    icon: '▲',
    title: '高優先自費族群：高風險 BCR',
    subtitle: 'EMBARK 試驗強力支持，台灣健保目前無對應給付',
    evidence: { trial: 'EMBARK', stat: 'MFS HR 0.42（降低轉移或死亡風險 58%）；8 年追蹤 OS HR 0.60' },
    detail: 'BCR 是台灣給付落差最大的族群。PSADT ≤ 9 個月且影像陰性，符合 EMBARK 納入條件，亦是 NCCN Category 1 推薦對象，但目前健保無對應給付規範，是最值得優先討論自費介入的族群。',
    talking: '「目前影像還看不到轉移，但 PSA 倍增速度代表疾病風險正在升高，這是可以討論早期介入的時間點。」',
    actions: [
      { href: 'diagnosis.html', text: '進入完整診斷工具', primary: true },
      { href: '#evidence', text: '查看 EMBARK 證據', primary: false }
    ]
  },
  mcspc_selfpay: {
    priority: 'high',
    icon: '▲',
    title: '給付缺口族群：低體積 mCSPC',
    subtitle: 'ARCHES 支持全體積皆獲益，低體積患者健保給付受限',
    evidence: { trial: 'ARCHES', stat: 'rPFS 及 OS 顯著改善；低體積（≤ 3 處骨轉移）目前健保未涵蓋' },
    detail: '低體積 mCSPC 是台灣健保條件（須內臟轉移或多處骨轉移）外的族群，但 NCCN Category 1 支持 ADT + ARPI 強化治療。此族群是值得積極討論自費的重要溝通對象。',
    talking: '「雖然健保目前針對您的狀況還沒有給付，但國際指引已建議現在就加上口服藥，效果會比單用針劑更好。」',
    actions: [
      { href: 'diagnosis.html', text: '進入完整診斷工具', primary: true },
      { href: '#evidence', text: '查看 ARCHES 證據', primary: false }
    ]
  },
  mcrpc_chemo: {
    priority: 'medium',
    icon: '→',
    title: '化療替代選項：Chemo-averse mCRPC',
    subtitle: 'PREVAIL 顯示有效延遲化療起始中位數達 17 個月',
    evidence: { trial: 'PREVAIL', stat: '延遲化療起始 28 vs 10.8 個月；降低死亡風險 29%（HR 0.71）' },
    detail: '化療前 mCRPC 且排斥化療的病人，Enzalutamide 提供有效的口服選項。對年長、共病多或主觀排斥化療者，可討論自費作為化療替代策略，同時也符合健保部分給付情境。',
    talking: '「如果您很擔心化療的副作用，我們可以先使用這款口服藥物，研究顯示它可以有效控制病情，幫您把需要化療的時間延後兩年多。」',
    actions: [
      { href: 'diagnosis.html', text: '進入完整診斷工具', primary: true },
      { href: '#evidence', text: '查看 PREVAIL 證據', primary: false }
    ]
  },
  nmcrpc_review: {
    priority: 'medium',
    icon: '→',
    title: '謹慎規劃：nmCRPC 事前審查期',
    subtitle: '有健保路徑但需審查等待，可同步評估自費先行方案',
    evidence: { trial: 'PROSPER', stat: 'MFS 延長 22 個月（36.6 vs 14.7 個月），HR 0.29' },
    detail: 'nmCRPC 有健保給付路徑（PSADT ≤ 10 個月），但事前審查可能耗時。自費先行須注意不可輪替條款，需提前規劃治療序列，避免影響後續健保給付資格。',
    talking: '「我們可以先申請健保審查，同時評估自費先行啟動的方案，避免在等待期間病情持續進展。」',
    actions: [
      { href: 'pathway.html', text: '查看治療路徑規劃', primary: true },
      { href: 'faq.html', text: '健保 FAQ 常見問題', primary: false }
    ]
  },
  covered_first: {
    priority: 'covered',
    icon: '✓',
    title: '建議優先申請健保給付',
    subtitle: '符合給付條件者，先走健保路徑以減輕病人負擔',
    evidence: null,
    detail: '病人目前符合健保 ARPI 給付條件，建議優先申請健保，減輕經濟負擔。若後續審查受阻或出現給付中斷，再評估自費銜接方案，並提前規劃不可輪替條款的影響。',
    talking: '「您的病情符合健保給付條件，我們先申請看看，若審查通過就不需要自費。」',
    actions: [
      { href: 'pathway.html', text: '查看完整治療路徑', primary: true },
      { href: 'reference-guide.html', text: '健保申請參考指南', primary: false }
    ]
  },
  default: {
    priority: 'default',
    icon: '→',
    title: '建議進一步評估',
    subtitle: '使用詳細診斷工具確認最適合的治療策略',
    evidence: null,
    detail: '根據目前選擇，建議使用完整診斷工具進行更詳細的臨床評估，確認給付條件與自費策略的最佳組合方案。',
    talking: '「讓我們用更完整的工具評估您病人的狀況，再決定最適合的治療策略。」',
    actions: [
      { href: 'diagnosis.html', text: '進入完整診斷工具', primary: true },
      { href: 'reference-guide.html', text: '查看參考指南', primary: false }
    ]
  }
}

function pfGetScenario(stage, coverage, factors) {
  if (coverage === 'yes') return 'covered_first'
  if (stage === 'bcr') return 'bcr_selfpay'
  if (stage === 'mcspc') return 'mcspc_selfpay'
  if (stage === 'mcrpc') return 'mcrpc_chemo'
  if (stage === 'nmcrpc') return 'nmcrpc_review'
  return 'default'
}

function pfRenderResult(key) {
  const s = PF_SCENARIOS[key]
  const hdrClass = {
    high:    'pf-result__header--high',
    medium:  'pf-result__header--medium',
    covered: 'pf-result__header--covered',
    default: 'pf-result__header--default'
  }[s.priority] || 'pf-result__header--default'

  const evidenceHtml = s.evidence
    ? `<div class="pf-evidence-bar">
        <div class="pf-evidence-bar__trial">${s.evidence.trial}</div>
        <div class="pf-evidence-bar__stat">${s.evidence.stat}</div>
       </div>`
    : ''

  const actionsHtml = s.actions
    .map(a => `<a href="${a.href}" class="btn ${a.primary ? 'btn--primary' : 'btn--ghost'}">${a.text}</a>`)
    .join('')

  return `
    <div class="pf-result__header ${hdrClass}">
      <div class="pf-result__icon">${s.icon}</div>
      <div class="pf-result__headline">
        <p class="pf-result__title">${s.title}</p>
        <p class="pf-result__subtitle">${s.subtitle}</p>
      </div>
    </div>
    <div class="pf-result__body">
      ${evidenceHtml}
      <p class="pf-result__detail">${s.detail}</p>
      <div class="pf-talking-point">${s.talking}</div>
      <div class="pf-result__actions">${actionsHtml}</div>
    </div>
  `
}

// ================================================
// DOMContentLoaded — 所有交互初始化
// ================================================
document.addEventListener('DOMContentLoaded', () => {

  // === Mobile Navigation Toggle ===
  const hamburger = document.querySelector('.header__hamburger')
  const nav = document.querySelector('.header__nav')
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open')
      hamburger.textContent = nav.classList.contains('open') ? '✕' : '☰'
    })
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open')
        hamburger.textContent = '☰'
      })
    })
  }

  // === Accordion — 支援動畫開合 ===
  document.querySelectorAll('.accordion__header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion__item')
      const isOpen = item.classList.contains('open')
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
      const panel = group.querySelector(`#${target}`)
      if (panel) panel.classList.add('active')
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

  // === Selector Cards — 觸控優化表單控件 ===
  document.querySelectorAll('.selector-card').forEach(card => {
    const input = card.querySelector('input')
    if (!input) return

    card.addEventListener('click', (e) => {
      if (e.target === input) return
      const name = input.name
      const isCheckbox = input.type === 'checkbox'

      if (isCheckbox) {
        input.checked = !input.checked
        card.classList.toggle('selected', input.checked)
      } else {
        document.querySelectorAll(`input[name="${name}"]`).forEach(sibling => {
          const sibCard = sibling.closest('.selector-card')
          sibling.checked = false
          if (sibCard) sibCard.classList.remove('selected')
        })
        input.checked = true
        card.classList.add('selected')
      }
    })
  })

  // === Patient Finder — 評估邏輯 ===
  document.getElementById('btnAnalyze')?.addEventListener('click', () => {
    const stage    = document.querySelector('input[name="pf_stage"]:checked')?.value
    const coverage = document.querySelector('input[name="pf_coverage"]:checked')?.value
    const factors  = [...document.querySelectorAll('input[name="pf_factors"]:checked')].map(i => i.value)

    const validation = document.getElementById('pfValidation')
    const result     = document.getElementById('finderResult')

    if (!stage) {
      validation.classList.add('visible')
      result.classList.remove('visible')
      validation.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      return
    }

    validation.classList.remove('visible')
    const scenario = pfGetScenario(stage, coverage, factors)
    result.innerHTML = pfRenderResult(scenario)
    result.classList.add('visible')

    setTimeout(() => {
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 50)
  })

})
