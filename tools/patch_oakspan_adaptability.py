from pathlib import Path

path = Path("projects/oakspan/index.html")
html = path.read_text(encoding="utf-8")

section_marker = '        <section class="section" id="live-demo" aria-labelledby="live-demo-title">'

reusable_section = '''        <section class="section" id="adaptable" aria-labelledby="adaptable-title">
            <div class="container">
                <p class="section-label">Reusable Local-Service Architecture</p>
                <h2 class="section-title" id="adaptable-title">Roofing is the verified implementation. The operating pattern is broader.</h2>
                <p class="section-intro">
                    Oakspan is deliberately concrete: one fictional roofing company, one tested
                    HighLevel environment, and observable CRM state. The value of the architecture,
                    however, is that the same control pattern can be reconfigured for other
                    appointment-, estimate-, consultation-, and service-driven businesses without
                    rebuilding the operating model from scratch.
                </p>

                <div class="card-grid">
                    <article class="detail-card">
                        <span class="card-index">01 · STRUCTURE</span>
                        <h3>The control pattern stays recognizable</h3>
                        <p>Multi-channel intake, qualification, routing, scheduling, opportunity state, ownership, review queues, and human handoff remain the core operating sequence.</p>
                    </article>
                    <article class="detail-card">
                        <span class="card-index">02 · CONFIGURATION</span>
                        <h3>The business rules are what change</h3>
                        <p>Service catalog, qualification questions, service area, appointment type, pipeline stages, assignment rules, handoff conditions, and channel configuration are adapted to the client operation.</p>
                    </article>
                    <article class="detail-card">
                        <span class="card-index">03 · EXAMPLES</span>
                        <h3>One architecture, different local-service journeys</h3>
                        <p>An HVAC company can route repair versus replacement; a plumber can triage urgency and service area; a remodeler can qualify project type and consultation readiness; a med spa can route treatment interest into consultation scheduling and staff review.</p>
                    </article>
                    <article class="detail-card">
                        <span class="card-index">04 · DELIVERY</span>
                        <h3>Useful for direct clients or agency implementation</h3>
                        <p>The same backend operating layer can be configured for a business directly or implemented inside an agency's existing HighLevel delivery stack—fields, workflows, calendars, pipelines, ownership, and handoff included.</p>
                    </article>
                </div>

                <div class="callout mt-24">
                    <strong>Adaptation boundary</strong>
                    Oakspan's roofing configuration is the implementation verified in this case
                    study. HVAC, plumbing, remodeling, med-spa, and other local-service examples
                    describe how the architecture can be configured; they are not represented as
                    completed or tested client deployments.
                </div>

                <div class="button-row mt-24">
                    <a class="button button-primary" href="../../#contact">Adapt this operating model →</a>
                    <a class="button button-secondary" href="#live-demo">Try the Oakspan live demo</a>
                </div>
            </div>
        </section>

'''

if 'id="adaptable"' not in html:
    if section_marker not in html:
        raise SystemExit("Expected live-demo insertion marker was not found.")
    html = html.replace(section_marker, reusable_section + section_marker, 1)

boundary_marker = '''                    <p>
                        Email is verified through the connected Oakspan Gmail account for inbound
                        intake and operator reply. A custom sending domain and automated outbound
                        email sequence are not represented as completed capabilities. WhatsApp also
                        remains outside the verified channel set and would require separate business-number
                        and account setup.
                    </p>'''

boundary_addition = '''                    <p>
                        The reusable-architecture examples describe possible configurations of the
                        verified operating pattern. They do not claim completed HVAC, plumbing,
                        remodeling, med-spa, or other industry deployments.
                    </p>
'''

if "The reusable-architecture examples describe possible configurations" not in html:
    if boundary_marker not in html:
        raise SystemExit("Expected production-boundary marker was not found.")
    html = html.replace(boundary_marker, boundary_addition + boundary_marker, 1)

required = [
    'id="adaptable"',
    "Reusable Local-Service Architecture",
    "Adapt this operating model →",
    "HVAC, plumbing, remodeling, med-spa",
    "Verified HighLevel portfolio system · 12 workflows",
    'data-widget-id="6a98598fff05ad752dee3a39"',
    'data-form-id="8ZleCprpAoQyjmqyt5vA"',
]
missing = [item for item in required if item not in html]
if missing:
    raise SystemExit(f"Missing expected content after patch: {missing}")

path.write_text(html, encoding="utf-8")
print("Oakspan adaptability patch validated and written.")
