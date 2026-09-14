const HL_DEMOS = [
  ["01","Solar Contractor","Lead Qualification + Pipeline Sync","Organize","Captures property, ownership, energy-goal, bill, and timeline details, then routes the lead into Qualified, Needs Review, or Not Qualified while keeping contact tags and opportunity stage synchronized.","Solar inquiries become inconsistent when qualification depends on manual interpretation before sales follow-up.","Property, ownership, goal, bill, and timeline fields route each lead through qualification logic and update tags plus opportunity state.","Qualified, needs-review, and not-qualified paths were tested with separate synthetic contacts and matched the expected pipeline outcomes.",[["solar-01-workflow-routing.png","Qualification routing workflow"],["solar-02-open-qualified-review.png","Qualified and review opportunities"],["solar-03-lost-not-qualified.png","Not-qualified outcome"],["solar-04-execution-logs.png","Execution logs"]]],
  ["02","Dental Clinic","Appointment Booking + Status Sync","Convert","Turns a new-patient booking into an opportunity, then keeps attendance and CRM state synchronized as the appointment moves through Confirmed, Showed, and Completed / Won.","Booking activity loses operational value when calendar status and CRM opportunity stage drift apart.","Appointment booking creates the opportunity, while status changes synchronize Showed, Completed, and Won state.","Mia Santos moved from booking through Showed to Completed / Won with the same CRM record.",[["dental-01-booking-sync-execution.png","Booking sync execution"],["dental-02-status-sync-execution.png","Status sync execution"],["dental-03-completed-contact-state.png","Completed contact state"],["dental-04-completed-opportunity-won.png","Completed / Won opportunity"]]],
  ["03","Med Spa","No-Show Recovery + Rebooking","Recover","Moves a missed consultation into a recovery path with follow-up state and staff action, then updates the same opportunity when the client rebooks instead of creating a disconnected record.","Missed consultations create revenue leakage when recovery and rebooking are handled manually or forgotten.","No-show status triggers recovery logic; a later booking updates the existing opportunity and clears recovery state.","Alyssa Cruz moved from No Show through the recovery path and then into the rebooked state.",[["medspa-01-no-show-recovery-execution.png","No-show recovery execution"],["medspa-02-rebooking-sync-execution.png","Rebooking sync execution"],["medspa-03-rebooked-contact-state.png","Rebooked contact state"],["medspa-04-rebooked-opportunity.png","Rebooked opportunity"]]],
  ["04","Fitness Studio","Speed-to-Lead + Progress Sync","Respond","Assigns a new lead, creates immediate follow-up work, and tracks engagement or escalation after the response window so first-touch speed and opportunity progress stay visible.","New fitness leads cool quickly when ownership, follow-up timing, and progression depend on manual memory.","New leads enter a speed-to-lead workflow, then progress logic updates tags, opportunity stage, and staff ownership signals.","Liam progressed through the intended path while Nina exercised the escalation branch during QA.",[["fitness-01-progressed-execution.png","Progressed lead execution"],["fitness-02-escalation-execution.png","Escalation execution"],["fitness-03-progress-sync-execution.png","Progress sync execution"],["fitness-04-final-opportunity-state.png","Final opportunity state"]]],
  ["05","Real Estate","Buyer Nurture + Readiness Progression","Nurture","Segments buyers by purchase timeline, creates the appropriate nurture state, and advances the same opportunity when readiness changes without creating duplicate opportunities.","Long-cycle buyers need different follow-up intensity depending on purchase timeline and current readiness.","Timeline and readiness fields segment buyers, then progression logic advances warmer buyers while retaining one authoritative opportunity.","Ethan, Camille, and Noah produced active-search, progressed, and early-stage outcomes as designed.",[["realestate-01-routing-execution.png","Buyer routing execution"],["realestate-02-segmented-opportunities.png","Segmented opportunities"],["realestate-03-readiness-progress-sync.png","Readiness progression"],["realestate-04-final-contact-state.png","Final contact state"]]],
  ["06","Marketing Agency","Client Onboarding + Internal Handoff","Onboard","Turns a signed client into structured onboarding work, tracks asset and access readiness, creates internal handoff tasks, and progresses the same opportunity through Ready, Complete, and Won.","Post-sale delivery stalls when onboarding requirements, staff tasks, and CRM progression are tracked separately.","Service package, asset, and access fields drive onboarding status, pipeline progression, and staff tasks.","Olivia progressed Requirements → Ready → Complete / Won while Daniel remained correctly pending requirements.",[["agency-01-onboarding-handoff-execution.png","Onboarding handoff execution"],["agency-02-progress-sync-execution.png","Progress sync execution"],["agency-03-onboarding-pipeline.png","Onboarding pipeline"],["agency-04-final-client-state.png","Final client state"]]],
  ["07","Restaurant / Café","Completion-Triggered Review Request","Reputation","Uses completed visit state to trigger a native HighLevel review request, records request eligibility and trigger status, and leaves ineligible guests untouched.","Review requests need precise timing after service completion instead of generic outreach sent too early or too broadly.","Visit completion triggers native HighLevel Review Request logic and records request eligibility and request-triggered state.","Maya reached the completed path and the native reputation request entered Queued state; Lucas remained an open control.",[["restaurant-01-review-request-execution.png","Review request execution"],["restaurant-02-guest-pipeline.png","Guest visit pipeline"],["restaurant-03-reputation-request.png","Native reputation request"],["restaurant-04-final-contact-state.png","Final contact state"]]],
  ["08","Auto Services","Dormant Reactivation + Reply Sync","Reactivate","Sends reactivation outreach to dormant contacts, stops cleanly on early replies, recovers late replies into Re-engaged, and routes true non-responses into staff follow-up.","Old leads are difficult to recover consistently without clear rules for outreach, reply detection, and no-response handling.","Outreach tracks sent/no-response state, stops on early replies, and uses reply sync to recover late responses into Re-engaged.","Marcus proved early-response stopping, Jenna proved late-reply recovery, and Ryan proved the clean no-response fallback.",[["auto-01-no-response-execution.png","No-response execution"],["auto-02-late-reply-recovery-execution.png","Late-reply recovery execution"],["auto-03-reactivation-pipeline.png","Three-outcome pipeline"],["auto-04-final-reactivated-contact.png","Final reactivated contact"]]],
  ["09","Coach / Consultant","Consultation Funnel + CRM Entry","Capture","Captures a consultation submission into structured contact fields, source and lifecycle tags, one New Inquiry opportunity, and a staff review task while ignoring manually created contacts.","Lead-capture funnels should create usable CRM state from valid submissions without triggering from unrelated manual contacts.","A HighLevel consultation funnel captures business-specific fields; COACH-01 records source/state, creates the New Inquiry opportunity, and assigns review work.","Avery's Preview form submission created the contact, preserved submitted fields, executed every capture action, and created one New Inquiry opportunity; manually created Blake never entered the workflow.",[["coach-01-consultation-form.png","Consultation funnel form"],["coach-02-lead-capture-execution.png","Lead capture execution"],["coach-03-new-inquiry-pipeline.png","New Inquiry pipeline"],["coach-04-final-contact-state.png","Final captured contact"]]]
];

function escapeHTML(value){
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function renderHighLevelDemos(rootId, assetPrefix){
  const root = document.getElementById(rootId);
  if(!root) return;

  const cards = HL_DEMOS.map((demo, index) => {
    const [number, industry, title, capability, subtitle, problem] = demo;
    const id = industry.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    return `<article class="demo-card" id="${id}">
      <div class="demo-head">
        <span class="demo-label">Demo ${number} · ${escapeHTML(industry)} · Verified</span>
        <span class="cap-badge">${escapeHTML(capability)}</span>
      </div>
      <h3>${escapeHTML(title)}</h3>
      <p class="demo-subtitle">${escapeHTML(subtitle)}</p>
      <div class="demo-problem"><strong>Problem</strong><span>${escapeHTML(problem)}</span></div>
      <button class="evidence-open" type="button" data-demo-index="${index}">View 4 evidence captures <span aria-hidden="true">↗</span></button>
    </article>`;
  }).join('');

  root.innerHTML = `<div class="demo-carousel">
    <button class="carousel-arrow prev" type="button" aria-label="Show previous demo" disabled>‹</button>
    <div class="demo-viewport"><div class="demo-track">${cards}</div></div>
    <button class="carousel-arrow next" type="button" aria-label="Show next demo">›</button>
    <div class="carousel-status" aria-live="polite"></div>
  </div>
  <div class="evidence-modal" aria-hidden="true">
    <div class="evidence-modal-panel" role="dialog" aria-modal="true" aria-labelledby="evidenceModalTitle">
      <button class="modal-close" type="button" aria-label="Close evidence">×</button>
      <div class="modal-content"></div>
    </div>
  </div>`;

  const viewport = root.querySelector('.demo-viewport');
  const track = root.querySelector('.demo-track');
  const prev = root.querySelector('.carousel-arrow.prev');
  const next = root.querySelector('.carousel-arrow.next');
  const status = root.querySelector('.carousel-status');
  const modal = root.querySelector('.evidence-modal');
  const modalContent = root.querySelector('.modal-content');
  const modalClose = root.querySelector('.modal-close');
  let index = 0;

  function visibleCount(){
    if(window.innerWidth <= 680) return 1;
    if(window.innerWidth <= 1050) return 2;
    return 3;
  }

  function updateCarousel(){
    const firstCard = track.querySelector('.demo-card');
    if(!firstCard) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const step = firstCard.getBoundingClientRect().width + gap;
    const visible = visibleCount();
    const maxIndex = Math.max(0, HL_DEMOS.length - visible);
    index = Math.min(index, maxIndex);
    track.style.transform = `translateX(${-index * step}px)`;
    prev.disabled = index === 0;
    next.disabled = index >= maxIndex;
    const first = index + 1;
    const last = Math.min(HL_DEMOS.length, index + visible);
    status.textContent = `Showing demos ${first}–${last} of ${HL_DEMOS.length}`;
  }

  prev.addEventListener('click', () => { if(index > 0){ index -= 1; updateCarousel(); } });
  next.addEventListener('click', () => {
    const maxIndex = Math.max(0, HL_DEMOS.length - visibleCount());
    if(index < maxIndex){ index += 1; updateCarousel(); }
  });

  function openModal(demoIndex){
    const [number, industry, title, capability, subtitle, problem, build, verified, images] = HL_DEMOS[demoIndex];
    const evidence = images.map(([file, label]) => `<a class="evidence-item" href="${assetPrefix}${file}" target="_blank" rel="noopener noreferrer"><img src="${assetPrefix}${file}" alt="${escapeHTML(label)}" loading="lazy" decoding="async"><span>${escapeHTML(label)}</span></a>`).join('');
    modalContent.innerHTML = `<p class="modal-kicker">Demo ${number} · ${escapeHTML(industry)} · ${escapeHTML(capability)}</p>
      <h3 id="evidenceModalTitle">${escapeHTML(title)}</h3>
      <p class="modal-subtitle">${escapeHTML(subtitle)}</p>
      <div class="modal-proof">
        <div><strong>Problem</strong><span>${escapeHTML(problem)}</span></div>
        <div><strong>Build</strong><span>${escapeHTML(build)}</span></div>
        <div><strong>Verified</strong><span>${escapeHTML(verified)}</span></div>
      </div>
      <div class="evidence-grid">${evidence}</div>`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  root.querySelectorAll('.evidence-open').forEach(button => {
    button.addEventListener('click', () => openModal(Number(button.dataset.demoIndex)));
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if(event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if(event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  window.addEventListener('resize', updateCarousel);
  requestAnimationFrame(updateCarousel);
}
