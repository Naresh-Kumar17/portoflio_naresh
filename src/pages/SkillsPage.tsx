import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Terminal, Cpu, Globe, Code2, ExternalLink, Layers, ShieldCheck } from 'lucide-react';
import './SkillsPage.css';

export function SkillsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'python-ml' | 'cpp-systems' | 'web-dev'>('all');

  return (
    <main className="page skills-doc-page">
      <div className="container container--wide">
        {/* Top Navigation Breadcrumbs & Back */}
        <div className="skills-doc-topbar">
          <Link to="/" className="skills-doc-back">
            <ArrowLeft size={16} />
            <span>← Back to Portfolio</span>
          </Link>
          <div className="skills-doc-badge">
            <BookOpen size={14} />
            <span>Developer Documentation · Technical Specifications</span>
          </div>
        </div>

        {/* Documentation Header */}
        <header className="skills-doc-header">
          <div className="skills-doc-kicker">TECHNICAL COMPETENCIES & SUPERPOWERS</div>
          <h1 className="skills-doc-title">Engineering Documentation</h1>
          <p className="skills-doc-lead">
            Comprehensive technical specifications of foundational capabilities across Applied Machine Learning pipelines, Systems Programming in C++, and Interactive Web Architectures.
          </p>

          {/* Table of Contents / Filter Pills */}
          <div className="skills-doc-toc">
            <button
              type="button"
              className={`doc-toc-pill ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Specifications
            </button>
            <a
              href="#python-ml"
              className={`doc-toc-pill ${activeTab === 'python-ml' ? 'active' : ''}`}
              onClick={() => setActiveTab('python-ml')}
            >
              <Terminal size={14} />
              <span>01 · Python & Machine Learning</span>
            </a>
            <a
              href="#cpp-systems"
              className={`doc-toc-pill ${activeTab === 'cpp-systems' ? 'active' : ''}`}
              onClick={() => setActiveTab('cpp-systems')}
            >
              <Cpu size={14} />
              <span>02 · C++ & Systems Programming</span>
            </a>
            <a
              href="#web-dev"
              className={`doc-toc-pill ${activeTab === 'web-dev' ? 'active' : ''}`}
              onClick={() => setActiveTab('web-dev')}
            >
              <Globe size={14} />
              <span>03 · Web Development & Cloud</span>
            </a>
          </div>
        </header>

        {/* ── SECTION 01: PYTHON & MACHINE LEARNING ── */}
        {(activeTab === 'all' || activeTab === 'python-ml') && (
          <section id="python-ml" className="doc-section card">
            <div className="doc-section-head">
              <div className="doc-sec-icon python-accent">
                <Terminal size={22} />
              </div>
              <div>
                <div className="doc-sec-num">SPECIFICATION 01.0</div>
                <h2 className="doc-sec-title">Python with Machine Learning Libraries</h2>
              </div>
            </div>

            <p className="doc-sec-desc">
              Primary scientific and computational ecosystem utilized for empirical research, non-linear classification boundaries, class-imbalanced risk estimation, and environmental time-series forecasting at FAST-NUCES Karachi.
            </p>

            <div className="doc-table-wrap">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Library / Tool</th>
                    <th>Core Focus</th>
                    <th>Architectural Role & Implementation Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>scikit-learn</code></td>
                    <td>Supervised ML & Margin Optimization</td>
                    <td>Trained Support Vector Machines (SVM) with RBF and polynomial kernels; regularization parameter tuning (C, &gamma;); ROC diagnostics and confusion matrix diagnostics.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                  <tr>
                    <td><code>pandas</code></td>
                    <td>Data Wrangling & Time-Series</td>
                    <td>Tabular data ingestion, missing value remediation, rolling aggregate features, datetime indexing, and temporal trend extraction.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                  <tr>
                    <td><code>NumPy</code></td>
                    <td>High-Performance Matrix Operations</td>
                    <td>Vectorized mathematical transformations, n-dimensional array manipulation, and fast computational linear algebra routines for model inputs.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                  <tr>
                    <td><code>Matplotlib & Seaborn</code></td>
                    <td>Statistical Visualizations</td>
                    <td>Distribution histograms, correlation heatmaps, residual scatter diagnostics, and publication-ready statistical visual graphics.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                  <tr>
                    <td><code>SMOTE (imbalanced-learn)</code></td>
                    <td>Synthetic Resampling</td>
                    <td>Mitigated severe class imbalance in traffic collision injury severity prediction by generating synthetic minority instances to maximize recall.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-case-studies">
              <div className="doc-cs-title">Verified Machine Learning & Data Science Implementations:</div>
              <div className="doc-cs-grid">
                <div className="doc-cs-card">
                  <div className="doc-cs-head">
                    <span className="doc-cs-name">SVM Handwritten Digit Recognition</span>
                    <a href="https://github.com/Naresh-Kumar17/svm-handwritten-digits" target="_blank" rel="noopener noreferrer" className="doc-cs-link">
                      GitHub <ExternalLink size={12} />
                    </a>
                  </div>
                  <p>Evaluated linear, polynomial, and RBF kernels on 8x8 pixel feature vectors with margin optimization.</p>
                  <div className="doc-cs-tags">
                    <span>scikit-learn</span>
                    <span>SVM Kernels</span>
                    <span>ROC Analysis</span>
                  </div>
                </div>

                <div className="doc-cs-card">
                  <div className="doc-cs-head">
                    <span className="doc-cs-name">Road Accident Severity Prediction</span>
                    <a href="https://github.com/Naresh-Kumar17/Road-Accident-Severity" target="_blank" rel="noopener noreferrer" className="doc-cs-link">
                      GitHub <ExternalLink size={12} />
                    </a>
                  </div>
                  <p>Applied SMOTE rebalancing across multi-class environmental and geometric collision datasets.</p>
                  <div className="doc-cs-tags">
                    <span>pandas</span>
                    <span>SMOTE</span>
                    <span>Risk Classification</span>
                  </div>
                </div>

                <div className="doc-cs-card">
                  <div className="doc-cs-head">
                    <span className="doc-cs-name">Air Quality Forecasting Model</span>
                    <a href="https://github.com/Naresh-Kumar17/Air_Quality_Forcasating-" target="_blank" rel="noopener noreferrer" className="doc-cs-link">
                      GitHub <ExternalLink size={12} />
                    </a>
                  </div>
                  <p>Seasonal-Trend decomposition (STL) with lagged rolling features to forecast particulate matter episodes.</p>
                  <div className="doc-cs-tags">
                    <span>Time-Series</span>
                    <span>pandas</span>
                    <span>Rolling Windows</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 02: C++ & SYSTEMS PROGRAMMING ── */}
        {(activeTab === 'all' || activeTab === 'cpp-systems') && (
          <section id="cpp-systems" className="doc-section card">
            <div className="doc-section-head">
              <div className="doc-sec-icon cpp-accent">
                <Cpu size={22} />
              </div>
              <div>
                <div className="doc-sec-num">SPECIFICATION 02.0</div>
                <h2 className="doc-sec-title">C++ & Systems Programming</h2>
              </div>
            </div>

            <p className="doc-sec-desc">
              Foundational low-level computational backbone focusing on deterministic memory management, modular object-oriented software architectures, and rigorous algorithmic complexity analysis at FAST-NUCES Karachi.
            </p>

            <div className="doc-table-wrap">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Core Focus</th>
                    <th>Architectural Role & Implementation Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>C++ Core (C++20)</code></td>
                    <td>Systems Foundations</td>
                    <td>Memory management, pointers and reference semantics, resource acquisition is initialization (RAII), and manual heap cleanup.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                  <tr>
                    <td><code>OOP Architecture</code></td>
                    <td>Modular Software Design</td>
                    <td>Polymorphism, virtual dispatch tables, encapsulation, inheritance hierarchies, operator overloading, and interface decoupling.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                  <tr>
                    <td><code>Data Structures</code></td>
                    <td>Algorithmic Storage</td>
                    <td>Implementations of dynamic arrays, doubly linked lists, binary search trees, hash tables with collision resolution, and graphs.</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                  <tr>
                    <td><code>Algorithms & Complexity</code></td>
                    <td>Asymptotic Performance</td>
                    <td>Rigorous big-O notation complexity analysis, recursion, divide-and-conquer, sorting algorithms (MergeSort, QuickSort), and graph traversals (BFS, DFS).</td>
                    <td><span className="doc-badge success">Mastered</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-highlights-grid">
              <div className="doc-hl-box">
                <ShieldCheck size={18} className="doc-hl-icon" />
                <div className="doc-hl-title">Deterministic Memory Management</div>
                <p>Preventing memory leaks, double-frees, and dangling pointers through deterministic RAII and strict lifecycle control.</p>
              </div>
              <div className="doc-hl-box">
                <Layers size={18} className="doc-hl-icon" />
                <div className="doc-hl-title">Academic Foundations at FAST-NUCES</div>
                <p>BS Data Science (2025–2029) core coursework reinforcing mathematical rigor, proof-based computing, and systems design.</p>
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 03: WEB DEVELOPMENT & CLOUD ── */}
        {(activeTab === 'all' || activeTab === 'web-dev') && (
          <section id="web-dev" className="doc-section card">
            <div className="doc-section-head">
              <div className="doc-sec-icon web-accent">
                <Globe size={22} />
              </div>
              <div>
                <div className="doc-sec-num">SPECIFICATION 03.0</div>
                <h2 className="doc-sec-title">Web Development & 3D Visual Computing</h2>
              </div>
            </div>

            <p className="doc-sec-desc">
              Engineering high-performance, strictly typed responsive web interfaces, mathematical 2D/3D visual computing engines running at 60 FPS, and reliable cloud deployments with AWS Amplify.
            </p>

            <div className="doc-table-wrap">
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>Technology</th>
                    <th>Core Focus</th>
                    <th>Architectural Role & Implementation Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>React 19 & TypeScript</code></td>
                    <td>Type-Safe Frontend Architecture</td>
                    <td>Strict compile-time type validation, functional component design, custom hooks for canvas lifecycle, and optimized reconciliation.</td>
                    <td><span className="doc-badge success">Production</span></td>
                  </tr>
                  <tr>
                    <td><code>HTML5 Canvas 2D Engine</code></td>
                    <td>Mathematical 3D Projection</td>
                    <td>Custom perspective projection algorithm (persp = 6.0 / (6.0 - z * 0.4)), trigonometric turntable rotation matrices (yaw and pitch), and 60 FPS requestAnimationFrame physics.</td>
                    <td><span className="doc-badge success">Production</span></td>
                  </tr>
                  <tr>
                    <td><code>Computational Visuals</code></td>
                    <td>Atmospheric Simulations</td>
                    <td>Box-Muller Gaussian volumetric nebula haze generation, quadratic bezier photon transit trails, and interactive pointer drag mechanics.</td>
                    <td><span className="doc-badge success">Production</span></td>
                  </tr>
                  <tr>
                    <td><code>AWS Amplify Hosting</code></td>
                    <td>Cloud CI/CD & Delivery</td>
                    <td>Git-driven continuous integration, automated deployment builds, global CDN edge caching, and SSL certificate provisioning.</td>
                    <td><span className="doc-badge success">Production</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="doc-cs-card" style={{ marginTop: '24px' }}>
              <div className="doc-cs-head">
                <span className="doc-cs-name">Flagship Implementation: 3D Cosmos Constellation Portfolio</span>
                <a href="https://github.com/Naresh-Kumar17/portoflio_naresh" target="_blank" rel="noopener noreferrer" className="doc-cs-link">
                  View Repository <ExternalLink size={12} />
                </a>
              </div>
              <p>
                Built from scratch to demonstrate fullstack data science and frontend engineering capabilities. Features an interactive mathematical coordinate universe, dynamic camera gliding physics, and instant responsive layouts.
              </p>
              <div className="doc-cs-tags">
                <span>React 19</span>
                <span>TypeScript</span>
                <span>HTML5 Canvas 2D</span>
                <span>AWS Amplify</span>
              </div>
            </div>
          </section>
        )}

        {/* Footer Return CTA */}
        <div className="skills-doc-footer">
          <Link to="/" className="btn btn--primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} />
            <span>Return to Constellation Portfolio</span>
          </Link>
          <a
            href="https://github.com/Naresh-Kumar17"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Code2 size={16} />
            <span>Explore GitHub Repositories ↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}
