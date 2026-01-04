import { useState } from "react";
import "../styles/styleguide.css";

export function StyleGuide() {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <div className="typewriter-guide">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="tw-h1">EssayPulse</h1>
          <p className="tw-body mt-6" style={{ maxWidth: "600px", margin: "1.5rem auto 0" }}>
            A comprehensive style guide showcasing the typewriter aesthetic.
            <br />
            <span className="tw-caption">All components. One cohesive design.</span>
          </p>
        </header>

        <div className="tw-divider">═ ═ ═ ═ ═</div>

        {/* ══════════════════════════════════════════════════════════════════
            TYPOGRAPHY SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Typography</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Display / H1</p>
              <h1 className="tw-h1">EssayPulse</h1>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Heading / H2</p>
              <h2 className="tw-h2">YOUR PROGRESS</h2>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Heading / H3</p>
              <h3 className="tw-h3">Hook & Opening</h3>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Heading / H4</p>
              <h4 className="tw-h4">What's Working</h4>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Body Text</p>
              <p className="tw-body">
                The old typewriter sat in the corner of the antique shop, its keys
                worn smooth by decades of stories.
              </p>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Body Small</p>
              <p className="tw-body-sm">
                Write at least 150 words to receive AI feedback on your narrative.
              </p>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Label</p>
              <p className="tw-label">Your Prompt</p>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Caption / Italic</p>
              <p className="tw-caption">Begin your story here...</p>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Text Styles</p>
              <p className="tw-body">
                Normal text with <span className="tw-underline">underlined emphasis</span> and{" "}
                <span className="tw-strikethrough">corrections</span> and{" "}
                <span className="tw-red-text">red ink</span>.
              </p>
            </div>
          </div>
        </section>

        <div className="tw-divider">* * *</div>

        {/* ══════════════════════════════════════════════════════════════════
            COLORS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Color Palette</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Backgrounds</p>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#FAF6E9" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Primary</p>
                  <p className="tw-color-hex">#FAF6E9 — Aged Paper</p>
                </div>
              </div>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#F0E9D8" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Secondary</p>
                  <p className="tw-color-hex">#F0E9D8 — Warm Cream</p>
                </div>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Text Colors</p>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#1A1814" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Primary</p>
                  <p className="tw-color-hex">#1A1814 — Deep Ink</p>
                </div>
              </div>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#5C564C" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Secondary</p>
                  <p className="tw-color-hex">#5C564C — Faded Ink</p>
                </div>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Accents</p>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#8B0000" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Red Ribbon</p>
                  <p className="tw-color-hex">#8B0000 — Accent</p>
                </div>
              </div>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#B84444" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Red Light</p>
                  <p className="tw-color-hex">#B84444 — Hover</p>
                </div>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Functional</p>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#4A6741" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Success</p>
                  <p className="tw-color-hex">#4A6741 — Forest</p>
                </div>
              </div>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#996B3D" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Warning</p>
                  <p className="tw-color-hex">#996B3D — Sepia</p>
                </div>
              </div>
              <div className="tw-color-swatch">
                <div className="tw-color-box" style={{ background: "#D4CCBA" }} />
                <div className="tw-color-info">
                  <p className="tw-color-name">Border</p>
                  <p className="tw-color-hex">#D4CCBA — Warm Gray</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="tw-divider">— — —</div>

        {/* ══════════════════════════════════════════════════════════════════
            BUTTONS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Buttons</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Default Button</p>
              <button className="tw-btn">Check Progress</button>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Primary Button</p>
              <button className="tw-btn tw-btn-primary">Submit Essay</button>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Danger Button</p>
              <button className="tw-btn tw-btn-danger">Delete Draft</button>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Disabled Button</p>
              <button className="tw-btn" disabled>
                Disabled
              </button>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Typewriter Keys</p>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <button className="tw-key">B</button>
                <button className="tw-key active">I</button>
                <button className="tw-key">U</button>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Button Group</p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="tw-btn">Cancel</button>
                <button className="tw-btn tw-btn-primary">Save</button>
              </div>
            </div>
          </div>
        </section>

        <div className="tw-divider">═ ═ ═ ═ ═</div>

        {/* ══════════════════════════════════════════════════════════════════
            FORM ELEMENTS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Form Elements</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Text Input</p>
              <input type="text" className="tw-input" placeholder="Enter your title..." />
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Input with Value</p>
              <input type="text" className="tw-input" defaultValue="My Summer Adventure" />
            </div>

            <div className="tw-component-box" style={{ gridColumn: "span 2" }}>
              <p className="tw-component-label">Textarea</p>
              <textarea
                className="tw-textarea"
                placeholder="Begin your story here. Let your imagination flow..."
                rows={4}
              />
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Checkbox</p>
              <label className="tw-checkbox">
                <input
                  type="checkbox"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
                <span>I agree to the terms</span>
              </label>
            </div>
          </div>
        </section>

        <div className="tw-divider">* * *</div>

        {/* ══════════════════════════════════════════════════════════════════
            CARDS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Cards</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Basic Card</p>
              <div className="tw-card">
                <h3 className="tw-h4" style={{ marginBottom: "0.5rem" }}>
                  Card Title
                </h3>
                <p className="tw-body-sm">
                  This is a basic card component with some content inside.
                </p>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Interactive Card</p>
              <div className="tw-card tw-card-interactive">
                <h3 className="tw-h4" style={{ marginBottom: "0.5rem" }}>
                  Click Me
                </h3>
                <p className="tw-body-sm">Hover to see the lift effect.</p>
              </div>
            </div>

            <div className="tw-component-box" style={{ gridColumn: "span 2" }}>
              <p className="tw-component-label">Prompt Card</p>
              <div className="tw-card tw-card-interactive tw-prompt-card">
                <p className="tw-prompt-text">
                  Describe a moment when you discovered something unexpected about yourself. What
                  happened, and how did it change the way you see yourself?
                </p>
                <p className="tw-prompt-cta">→ Begin writing</p>
              </div>
            </div>
          </div>
        </section>

        <div className="tw-divider">— — —</div>

        {/* ══════════════════════════════════════════════════════════════════
            EDITOR SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Editor</h2>

          <div className="tw-editor">
            <div className="tw-editor-toolbar">
              <button className="tw-key">B</button>
              <button className="tw-key">I</button>
              <button className="tw-key active">U</button>
            </div>
            <div className="tw-editor-content" contentEditable suppressContentEditableWarning>
              The morning light filtered through the dusty windows of the old library. I had spent
              countless hours here as a child, but today felt different. The familiar scent of aged
              paper filled my lungs as I walked between the towering shelves.
              <span className="tw-cursor" />
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <p className="tw-component-label" style={{ marginBottom: "0.75rem" }}>
              Block Cursor Animation
            </p>
            <span className="tw-body">
              Typing in progress<span className="tw-cursor" />
            </span>
          </div>
        </section>

        <div className="tw-divider">═ ═ ═ ═ ═</div>

        {/* ══════════════════════════════════════════════════════════════════
            SIDEBAR & PANELS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Sidebar & Panels</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem" }}>
            <div className="tw-component-box">
              <p className="tw-component-label">Panel Items</p>
              <div className="tw-panel">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="tw-body-sm">Hook & Opening</span>
                  <span className="tw-body-sm">4/5</span>
                </div>
              </div>
              <div className="tw-panel">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="tw-body-sm">Story Structure</span>
                  <span className="tw-body-sm">3/5</span>
                </div>
              </div>
              <div className="tw-panel">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="tw-body-sm">Descriptive Details</span>
                  <span className="tw-body-sm">5/5</span>
                </div>
              </div>
            </div>

            <div className="tw-sidebar">
              <h3 className="tw-sidebar-header">Your Progress</h3>
              <div className="tw-panel">
                <p className="tw-label" style={{ marginBottom: "0.5rem" }}>
                  Hook & Opening
                </p>
                <div className="tw-rating">
                  <span className="tw-rating-star filled">★</span>
                  <span className="tw-rating-star filled">★</span>
                  <span className="tw-rating-star filled">★</span>
                  <span className="tw-rating-star filled">★</span>
                  <span className="tw-rating-star">★</span>
                </div>
              </div>
              <button className="tw-btn tw-btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
                Check Progress
              </button>
            </div>
          </div>
        </section>

        <div className="tw-divider">* * *</div>

        {/* ══════════════════════════════════════════════════════════════════
            STATUS & BADGES SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Status & Badges</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Status Indicators</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <span className="tw-status tw-status-saved">[ SAVED ]</span>
                <span className="tw-status tw-status-saving">[ SAVING... ]</span>
                <span className="tw-status tw-status-unsaved">[ UNSAVED ]</span>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Badges</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <span className="tw-badge">Default</span>
                <span className="tw-badge tw-badge-success">On Topic</span>
                <span className="tw-badge tw-badge-warning">Review</span>
                <span className="tw-badge tw-badge-danger">Off Topic</span>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Stats Display</p>
              <div className="tw-stats">
                <span>247 words</span>
                <span className="tw-stats-divider">—</span>
                <span>4 paragraphs</span>
                <span className="tw-stats-divider">—</span>
                <span className="tw-status-saved">[ SAVED ]</span>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Star Rating</p>
              <div className="tw-rating">
                <span className="tw-rating-star filled">★</span>
                <span className="tw-rating-star filled">★</span>
                <span className="tw-rating-star filled">★</span>
                <span className="tw-rating-star">★</span>
                <span className="tw-rating-star">★</span>
              </div>
              <p className="tw-body-sm" style={{ marginTop: "0.5rem" }}>
                3/5 — Good progress
              </p>
            </div>
          </div>
        </section>

        <div className="tw-divider">— — —</div>

        {/* ══════════════════════════════════════════════════════════════════
            PROGRESS INDICATORS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Progress & Traits</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Progress Bar</p>
              <div className="tw-progress">
                <p className="tw-body-sm" style={{ marginBottom: "0.5rem" }}>
                  150 / 300 words
                </p>
                <div className="tw-progress-bar">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`tw-progress-segment ${i < 5 ? "filled" : ""}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Trait Cards</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div className="tw-trait-card">
                  <span className="tw-trait-name">Hook & Opening</span>
                  <span className="tw-trait-score">4/5 ★★★★☆</span>
                </div>
                <div className="tw-trait-card">
                  <span className="tw-trait-name">Story Structure</span>
                  <span className="tw-trait-score">3/5 ★★★☆☆</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="tw-divider">═ ═ ═ ═ ═</div>

        {/* ══════════════════════════════════════════════════════════════════
            ALERTS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Alerts & Messages</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="tw-alert tw-alert-info">
              <span className="tw-alert-icon">ℹ</span>
              <div>
                <p className="tw-body-sm">
                  <strong>Note:</strong> Write at least 150 words to receive AI feedback on your
                  narrative.
                </p>
              </div>
            </div>

            <div className="tw-alert tw-alert-success">
              <span className="tw-alert-icon">✓</span>
              <div>
                <p className="tw-body-sm">
                  <strong>Success!</strong> Your essay has been saved successfully.
                </p>
              </div>
            </div>

            <div className="tw-alert tw-alert-warning">
              <span className="tw-alert-icon">⚠</span>
              <div>
                <p className="tw-body-sm">
                  <strong>Warning:</strong> Your essay may be drifting off-topic. Consider reviewing
                  the prompt.
                </p>
              </div>
            </div>

            <div className="tw-alert tw-alert-danger">
              <span className="tw-alert-icon">✕</span>
              <div>
                <p className="tw-body-sm">
                  <strong>Off-Topic:</strong> Your essay doesn't address the prompt. Please revise
                  and try again.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="tw-divider">* * *</div>

        {/* ══════════════════════════════════════════════════════════════════
            NAVIGATION SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Navigation</h2>

          <div className="tw-component-box" style={{ padding: 0, marginBottom: "1.5rem" }}>
            <nav className="tw-nav">
              <a href="#" className="tw-nav-brand">
                EssayPulse
              </a>
              <div style={{ display: "flex", gap: "2rem" }}>
                <a href="#" className="tw-nav-link active">
                  Write
                </a>
                <a href="#" className="tw-nav-link">
                  Prompts
                </a>
                <a href="#" className="tw-nav-link">
                  Progress
                </a>
              </div>
            </nav>
          </div>

          <div className="tw-component-box">
            <p className="tw-component-label">Back Link</p>
            <a href="#" className="tw-back-link">
              ← Back to prompts
            </a>
          </div>
        </section>

        <div className="tw-divider">— — —</div>

        {/* ══════════════════════════════════════════════════════════════════
            LISTS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Lists</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Unordered List</p>
              <ul className="tw-list">
                <li>Strong opening hook</li>
                <li>Clear narrative structure</li>
                <li>Vivid descriptive details</li>
                <li>Smooth transitions</li>
              </ul>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Numbered List</p>
              <ul className="tw-list tw-list-numbered">
                <li>Re-read the prompt carefully</li>
                <li>Revise your essay to address the prompt</li>
                <li>Click "Check Again" when ready</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="tw-divider">═ ═ ═ ═ ═</div>

        {/* ══════════════════════════════════════════════════════════════════
            LOADING STATES SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Loading States</h2>

          <div className="tw-component-grid">
            <div className="tw-component-box">
              <p className="tw-component-label">Dot Loading</p>
              <div className="tw-loading">
                <span>Analyzing</span>
                <span className="tw-loading-dot">.</span>
                <span className="tw-loading-dot">.</span>
                <span className="tw-loading-dot">.</span>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Typewriter Loading</p>
              <div style={{ overflow: "hidden" }}>
                <span className="tw-loading-typewriter">Processing your essay...</span>
              </div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Button Loading</p>
              <button className="tw-btn tw-btn-primary" disabled>
                <span className="tw-loading">
                  <span>Analyzing</span>
                  <span className="tw-loading-dot">.</span>
                  <span className="tw-loading-dot">.</span>
                  <span className="tw-loading-dot">.</span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <div className="tw-divider">* * *</div>

        {/* ══════════════════════════════════════════════════════════════════
            MODAL SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Modal</h2>

          <div className="tw-component-box">
            <p className="tw-component-label">Modal Trigger</p>
            <button className="tw-btn" onClick={() => setModalOpen(true)}>
              Open Modal
            </button>
          </div>

          {modalOpen && (
            <div className="tw-modal-overlay" onClick={() => setModalOpen(false)}>
              <div className="tw-modal" onClick={(e) => e.stopPropagation()}>
                <div className="tw-modal-header">
                  <h3 className="tw-modal-title">Hook & Opening</h3>
                  <button className="tw-modal-close" onClick={() => setModalOpen(false)}>
                    ×
                  </button>
                </div>
                <div className="tw-modal-body">
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 className="tw-h4" style={{ marginBottom: "0.75rem" }}>
                      What's Working
                    </h4>
                    <ul className="tw-list">
                      <li>Strong opening sentence grabs attention</li>
                      <li>Sets up the scene effectively</li>
                      <li>Creates curiosity in the reader</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="tw-h4" style={{ marginBottom: "0.75rem", color: "var(--tw-accent)" }}>
                      Work On
                    </h4>
                    <ul className="tw-list">
                      <li>Consider adding more sensory details</li>
                      <li>The transition to the main event could be smoother</li>
                    </ul>
                  </div>
                </div>
                <div className="tw-modal-footer">
                  <button className="tw-btn" onClick={() => setModalOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="tw-divider">— — —</div>

        {/* ══════════════════════════════════════════════════════════════════
            DIVIDERS SECTION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tw-section">
          <h2 className="tw-section-title">Dividers</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="tw-component-box">
              <p className="tw-component-label">Character Divider</p>
              <div className="tw-divider">═ ═ ═ ═ ═</div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Asterisk Divider</p>
              <div className="tw-divider">* * *</div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Dash Divider</p>
              <div className="tw-divider">— — —</div>
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Line Divider</p>
              <hr className="tw-divider-line" />
            </div>

            <div className="tw-component-box">
              <p className="tw-component-label">Double Line Divider</p>
              <hr className="tw-divider-double" />
            </div>
          </div>
        </section>

        <div className="tw-divider-double" />

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "2rem 0" }}>
          <p className="tw-caption">— End of Style Guide —</p>
          <p className="tw-body-sm" style={{ marginTop: "1rem" }}>
            Built with the typewriter aesthetic in mind.
            <br />
            Authenticity • Craftsmanship • Vintage Charm
          </p>
        </footer>
      </div>
    </div>
  );
}

