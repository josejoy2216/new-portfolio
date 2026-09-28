/* Resume builder (/resume-builder.html)
   Generates an editable, ATS-friendly resume draft from resumeData, autosaves
   edits to this browser's localStorage, and exports through a print-ready
   window (browser print → Save as PDF).

   Every value in resumeData comes from the site's facts ledger (IDs in the
   comments) and mirrors /resume.html. Keep the two in sync, and bump
   DATA_VERSION whenever resumeData changes so saved drafts are flagged as
   older. No phone number, by design. */
(function () {
  'use strict';

  var STORAGE_KEY = 'jose_resume_builder_html_v3';
  var DATA_VERSION = '2026-09-26';
  var PRINT_TITLE = 'Jose Chacko Resume';

  /* ---------- Data ---------- */
  var resumeData = {
    basics: {
      name: 'Jose Chacko', // ID-1
      headline: 'Assistant Manager – Web Developer, PPFAS · Developer by background, product thinker by instinct', // ID-2 ID-9
      location: 'Mumbai, India', // ID-3
      email: 'josejoy2216@gmail.com', // ID-4
      website: 'https://josechacko.com', // ID-8
      linkedin: 'https://www.linkedin.com/in/josejoychacko/', // ID-5
      github: 'https://github.com/josejoy2216' // ID-6
    },

    summary: [
      'Assistant Manager – Web Developer at PPFAS, building business-critical websites, portals, an investment platform and internal systems.', // ID-2 ID-P1
      'Saved ₹20+ lakh in fixed costs, combined across seven builds, and ₹10+ lakh in annual recurring cost, attributed jointly to an event-management system and a Career portal.', // ID-P5 ID-P6 ID-P26
      'Built two prototypes: SYNAPSE, an AI SaaS product prototype for LinkedIn personal branding (not deployed, no users), and SignBridge, an accessibility research prototype that maps speech in a video to a sequence of Indian Sign Language concepts.', // ID-Y1 ID-Y2 ID-B1 ID-B2
      'Currently enrolled in the PPM-AI program (Masai School × IIT Roorkee) and exploring Associate Product Manager and Product Manager roles.' // ID-E3 ID-10
    ],

    experience: [
      {
        title: 'Assistant Manager – Web Developer', // ID-2
        company: 'PPFAS', // ID-2
        location: 'Mumbai, India', // ID-2
        dates: 'Apr 2026 – Present', // ID-2 ID-P14
        earlier: 'At PPFAS since Oct 2024: Web Designer (Oct 2024 – Mar 2025), Executive – Web Developer (Apr 2025 – Mar 2026)', // ID-P14
        highlights: [
          'Built static pages and management portals that reduced dependency on the tech team; ₹20+ lakh in fixed costs saved, combined across seven builds.', // ID-P5
          'Built an event-management system (QR scanning and door list) and a Career portal; ₹10+ lakh in annual recurring cost saved, attributed jointly to the two.', // ID-P6 ID-P18 ID-P26
          'Built and launched gift.ppfas.com and wealth.ppfas.com, and built the separate PPFAS Gift investment platform, integrated with a third-party payment gateway, with international payment support.', // ID-P3 ID-P7 ID-P25
          'Created a management portal for amc.ppfas.com covering backend-managed website workflows, job portal features and related internal portals.', // ID-P4
          'Built a compliance and QC backend portal for uploads and staff management.', // ID-P8
          'Designed website layouts and email templates in Figma and Photoshop before implementation. Stack: Laravel, React, PHP, WordPress, AWS, CI/CD-driven deployment workflows.' // ID-P9 ID-P2
        ]
      },
      {
        title: 'Professional Software Developer', // ID-A1
        company: 'Akbar Travels', // ID-A1
        dates: 'Feb 2024 – Sep 2024', // ID-A1
        highlights: [
          'Full-stack delivery across React, Express, Node.js, MongoDB, MySQL, Firebase and Java, with a web development focus centred on JavaScript.', // ID-A2
          'Delivered work across web, real-time and data-driven use cases.' // ID-A3
        ]
      },
      {
        title: 'Data Analyst and Billing', // ID-M1
        company: 'Mansha Distributors LLP', // ID-M1
        dates: 'Jun 2021 – May 2022', // ID-M1
        highlights: [
          'Implemented pricing strategies that increased net profit by 150%, from INR 100,000 to INR 250,000.', // ID-M3
          'Handled pricing, billing and sales-support analysis to improve business decisions and operational performance.', // ID-M2
          'Managed product suggestions and sales-force optimization.' // ID-M4
        ]
      }
    ],

    // Only fields with real values are set. No repo or live links exist for
    // either project (not public, not deployed).
    projects: [
      {
        title: 'SYNAPSE: an AI SaaS product prototype for LinkedIn personal branding', // ID-Y1
        category: 'Full-stack AI prototype', // ID-Y1 ID-Y2
        shortDescription: 'Surfaces trending topics in a user’s niche and drafts three LinkedIn post variations in the user’s voice; nothing is posted without the user’s explicit action.', // ID-Y1 ID-Y5 ID-Y18
        problem: 'Showing up consistently on LinkedIn without spending hours on content.', // ID-Y21
        role: 'Built the SYNAPSE prototype hands-on, using Claude Code as an AI coding assistant', // approved role line (Jose, 2026-09-28); never a sole-creator claim
        status: 'Prototype, not deployed', // ID-Y17
        technologies: ['Next.js', 'React', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'GitHub Actions'], // ID-Y2
        outcomes: [
          'Built a full-stack prototype that surfaces trending topics in a user’s niche from Hacker News, Google News and LinkedIn hashtag feeds, and drafts three LinkedIn post variations in the user’s voice with OpenAI, Gemini or Claude.', // ID-Y1 ID-Y4 ID-Y5 ID-Y10
          'Built an approval-first flow (nothing is posted without an explicit user action), style learning from the user’s own edits to AI drafts, multi-provider support, bring-your-own API keys (stored encrypted) and per-plan monthly token limits.', // ID-Y18 ID-Y9 ID-Y10
          'LinkedIn publishing, scheduling, Razorpay subscriptions and the daily email digest are implemented but not verified live, and there are no automated tests.' // ID-Y12 ID-Y13 ID-Y14 ID-Y17
        ],
        caseStudyUrl: 'https://josechacko.com/case-studies/synapse.html',
        dates: 'May – Jun 2026', // ledger: work dated May–June 2026 (ID-Y23)
        tags: ['AI', 'LinkedIn', 'Content workflow', 'Full stack'] // ID-Y1 ID-Y2
      },
      {
        title: 'SignBridge: spoken video to a sequence of Indian Sign Language concepts', // ID-B1
        category: 'Accessibility research prototype', // ID-B1 ID-B2
        shortDescription: 'Transcribes a spoken video, translates its meaning into a sequence of sign-language concepts and plays the signs back in sync with the video.', // ID-B1
        problem: 'Spoken video content is not automatically available in sign-language form, and captions are not the same thing as sign language.', // ID-B4
        role: 'Personal project', // ledger: single author (Jose)
        status: 'Research prototype', // ID-B2
        technologies: ['Python', 'FastAPI', 'faster-whisper', 'FFmpeg', 'React', 'three.js', 'MediaPipe'], // ID-B5 ID-B10
        outcomes: [
          'Built a weekend-scale MVP to test technical feasibility: it transcribes a spoken video, maps its meaning to a sequence of sign-language concepts and plays the signs back in sync with the video (2 of 209 vocabulary entries are real ISL clips).', // ID-B1 ID-B2 ID-B5 ID-B8
          'In a separate research track, retargeted real ISL motion (MediaPipe landmarks) onto a rigged three.js avatar; an analytical two-bone IK correction cut mean wrist trajectory error by roughly 85% on a HELLO clip versus the earlier clamp-based approach (0.2405 to 0.0354 of arm length); a later arm-clipping fix raised it to 0.0665.', // ID-B10 ID-B11 ID-B17
          'Documented the limits: on FRIEND, a sign with hand-to-hand contact, right-hand tracking fell to 34% of frames (77% on HELLO), and translations have not been reviewed by a qualified ISL interpreter.' // ID-B13 ID-B3
        ],
        caseStudyUrl: 'https://josechacko.com/case-studies/signbridge.html',
        dates: 'Aug 2026', // ledger: commits 2026-08-08 … 2026-08-09
        tags: ['Accessibility', 'Indian Sign Language', 'Speech pipeline', 'Motion retargeting'] // ID-B1 ID-B5 ID-B10
      }
    ],

    earlierSummary: 'Earlier: Book Nook (MERN e-commerce app for books) and a real-time multiplayer Mafia game.', // ID-X1 ID-X2 (same wording as /resume.html)

    earlierProjects: [
      {
        title: 'Book Nook', // ID-X1 (display name used by the app's own UI)
        shortDescription: 'MERN e-commerce app for books',
        technologies: ['React', 'Node.js', 'MongoDB', 'Firebase'],
        githubUrl: 'https://github.com/josejoy2216/Ecommerce'
      },
      {
        title: 'Mafia', // ID-X2
        shortDescription: 'real-time multiplayer game',
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
        githubUrl: 'https://github.com/josejoy2216/mafia/'
      },
      {
        title: 'Movie Recommendation System', // ID-X3
        held: true, // not shown: ownership/originality unresolved (Jose, 2026-09-27)
        shortDescription: 'content-based, with sentiment analysis on user reviews',
        technologies: ['Python'],
        projectUrl: 'https://josejoy2216.github.io/Movie-Recommendation-System-with-Sentiment-Analysis/'
      }
    ],

    skills: [
      // ID-S4 with its evidence: ID-B2 ID-P9 ID-P5 ID-P10 ID-Y17 ID-B8 ID-B17
      { label: 'Product practice', text: 'scoping a weekend-scale MVP around one feasibility question (SignBridge); designing before building (PPFAS); building workflow tools that reduce dependency on a tech team (PPFAS); documenting limitations (SignBridge, SYNAPSE); keeping a visually correct fix even when it worsened the evaluation metric (SignBridge).' },
      // ID-S1
      { label: 'Technical', text: 'PHP, Laravel, JavaScript, TypeScript, React, Next.js, Node.js, Express, NestJS, Python, FastAPI, HTML, CSS, WordPress, REST APIs, MySQL, PostgreSQL, MongoDB, Firebase, Prisma, Redis, AWS, CI/CD, Git/GitHub, three.js, MediaPipe.' },
      // ID-S2 ID-P9
      { label: 'Design and tools', text: 'Figma, Photoshop (website layouts and email templates).' },
      // ID-S3
      { label: 'Data and analysis', text: 'pricing and billing analysis (Mansha Distributors); quantitative evaluation of experiments (SignBridge); Google Data Analytics certificate.' }
    ],

    education: [
      // ID-E3: currently enrolled, no dates. Program name as on /resume.html.
      { degree: 'PPM-AI program', institution: 'Masai School × IIT Roorkee', dates: 'Currently enrolled' },
      // ID-E1
      { degree: 'Master of Computer Applications (MCA)', institution: 'Thakur Institute of Management Studies, Career Development & Research (TIMSCDR)', dates: '2022 – 2024', grade: 'CGPA 7.83 / 10' },
      // ID-E2
      { degree: 'Bachelor of Science in Computer Science', institution: 'Thakur Ramnarayan College of Arts & Commerce', dates: '2018 – 2021', grade: 'CGPA 8.65 / 10' }
    ],

    certifications: [
      { name: 'NISM Series V-A Certification' }, // ID-C1
      { name: 'Google Data Analytics', issuer: 'Coursera / Google' }, // ID-C2
      { name: 'Google Cloud', issuer: 'Google', year: '2022' }, // ID-C3
      { name: 'Programming using JavaScript', issuer: 'Microsoft', year: '2020' }, // ID-C4
      { name: 'Programming in Java', issuer: 'NPTEL' }, // ID-C5
      { name: 'Cross-Platform Mobile App Development', issuer: 'Microsoft' }, // ID-C6
      { name: 'Java Certification and RDBMS PostgreSQL', issuer: 'Spoken Tutorial Project, IIT Bombay' } // ID-C7
    ],

    // ID-L1
    activities: 'Developed leadership through fest, NSS and coaching responsibilities; built communication and presentation skills.'
  };

  /* ---------- Storage (every access guarded) ---------- */
  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }

  function storageRemove(key) {
    try { window.localStorage.removeItem(key); return true; } catch (e) { return false; }
  }

  function storageAvailable() {
    var probe = '__rb_probe__';
    try {
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return true;
    } catch (e) {
      return false;
    }
  }

  function readSavedDraft() {
    var raw = storageGet(STORAGE_KEY);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed.html === 'string' && parsed.html.trim()) return parsed;
    } catch (e) { /* unknown format: ignore */ }
    return null;
  }

  /* ---------- Rendering helpers ---------- */
  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // "https://www.linkedin.com/in/x/" → "linkedin.com/in/x"
  function displayUrl(url) {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
  }

  // Escape, then link public PPFAS properties mentioned in the text.
  function rich(text) {
    return esc(text).replace(/\b([a-z]+\.ppfas\.com)\b/g, '<a href="https://$1/">$1</a>');
  }

  function link(url, text) {
    return '<a href="' + esc(url) + '">' + esc(text || displayUrl(url)) + '</a>';
  }

  function list(items) {
    return '<ul>' + items.map(function (item) { return '<li>' + rich(item) + '</li>'; }).join('') + '</ul>';
  }

  function row(title, side) {
    return '<div class="rb-doc__row"><h3>' + esc(title) + '</h3>' + (side ? '<span>' + esc(side) + '</span>' : '') + '</div>';
  }

  function section(title, body) {
    return '<div class="rb-doc__section"><h2>' + esc(title) + '</h2>' + body + '</div>';
  }

  function buildDraftHtml(data) {
    var b = data.basics;

    var header =
      '<div class="rb-doc__header">' +
        '<h2 class="rb-doc__name">' + esc(b.name) + '</h2>' +
        '<p class="rb-doc__headline">' + esc(b.headline) + '</p>' +
        '<p class="rb-doc__contact">' + [
          esc(b.location),
          link('mailto:' + b.email, b.email),
          link(b.website),
          link(b.linkedin),
          link(b.github)
        ].join(' · ') + '</p>' +
      '</div>';

    var summary = section('Summary', '<p>' + data.summary.map(esc).join(' ') + '</p>');

    var experience = section('Experience', data.experience.map(function (job) {
      return '<div class="rb-doc__item">' +
        row(job.title, job.dates) +
        '<p class="rb-doc__sub">' + esc([job.company, job.location].filter(Boolean).join(' · ')) + '</p>' +
        (job.earlier ? '<p class="rb-doc__sub">' + esc(job.earlier) + '</p>' : '') +
        list(job.highlights) +
      '</div>';
    }).join(''));

    var earlier = data.earlierProjects.filter(function (p) { return !p.held; }).map(function (p) {
      return p.title + ' (' + p.shortDescription + ')';
    });
    var earlierLine = data.earlierSummary || ('Earlier: ' + earlier.slice(0, -1).join(', ') + ' and ' + earlier[earlier.length - 1] + '.');

    var projects = section('Selected projects', data.projects.map(function (p) {
      return '<div class="rb-doc__item">' +
        row(p.title, p.status) +
        (p.technologies ? '<p class="rb-doc__sub">' + esc(p.technologies.join(', ')) + '</p>' : '') +
        (p.outcomes ? list(p.outcomes) : '') +
        (p.caseStudyUrl ? '<p class="rb-doc__meta">Case study: ' + link(p.caseStudyUrl) + '</p>' : '') +
      '</div>';
    }).join('') + '<p>' + esc(earlierLine) + '</p>');

    var skills = section('Skills', '<ul class="rb-doc__labelled">' + data.skills.map(function (s) {
      return '<li><strong>' + esc(s.label) + ':</strong> ' + esc(s.text) + '</li>';
    }).join('') + '</ul>');

    var education = section('Education', data.education.map(function (e) {
      return '<div class="rb-doc__item">' +
        row(e.degree, e.dates) +
        '<p class="rb-doc__sub">' + esc([e.institution, e.grade].filter(Boolean).join(' · ')) + '</p>' +
      '</div>';
    }).join(''));

    var certifications = section('Certifications', '<p>' + data.certifications.map(function (c) {
      var detail = [c.issuer, c.year].filter(Boolean).join(', ');
      return esc(c.name + (detail ? ' (' + detail + ')' : ''));
    }).join(' · ') + '</p>');

    var activities = section('Leadership and activities', '<p>' + esc(data.activities) + '</p>');

    return header + summary + experience + projects + skills + education + certifications + activities;
  }

  /* ---------- Sanitising stored / exported HTML ---------- */
  var DROP_TAGS = /^(SCRIPT|STYLE|LINK|META|BASE|TITLE|IFRAME|FRAME|FRAMESET|OBJECT|EMBED|APPLET|TEMPLATE|NOSCRIPT|SVG|MATH|IMG|PICTURE|VIDEO|AUDIO|SOURCE|TRACK|CANVAS|MAP|AREA|FORM|INPUT|BUTTON|SELECT|TEXTAREA|OPTION|DIALOG)$/;
  var KEEP_TAGS = /^(A|B|BR|DIV|EM|H1|H2|H3|H4|I|LI|OL|P|SMALL|SPAN|STRONG|SUB|SUP|U|UL)$/;

  function sanitize(html) {
    var box = document.createElement('div');
    box.innerHTML = html;
    var all = box.querySelectorAll('*');
    for (var i = all.length - 1; i >= 0; i--) {
      var el = all[i];
      var tag = el.nodeName.toUpperCase();
      if (DROP_TAGS.test(tag)) {
        if (el.parentNode) el.parentNode.removeChild(el);
        continue;
      }
      if (!KEEP_TAGS.test(tag)) {
        while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
        el.parentNode.removeChild(el);
        continue;
      }
      var attrs = Array.prototype.slice.call(el.attributes);
      for (var j = 0; j < attrs.length; j++) {
        var name = attrs[j].name.toLowerCase();
        var keep = name === 'class' || (name === 'href' && tag === 'A' && /^(https?:|mailto:)/i.test(attrs[j].value.trim()));
        if (!keep) el.removeAttribute(attrs[j].name);
      }
    }
    return box.innerHTML;
  }

  // Link bare URLs and email addresses typed into the draft (skips existing links).
  function addHyperlinks(container) {
    var candidates = [];
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
      var node = walker.currentNode;
      if (!/https?:\/\/|@/.test(node.nodeValue)) continue;
      var inLink = false;
      for (var p = node.parentNode; p && p !== container; p = p.parentNode) {
        if (p.nodeName === 'A') { inLink = true; break; }
      }
      if (!inLink) candidates.push(node);
    }

    candidates.forEach(function (textNode) {
      var text = textNode.nodeValue;
      var pattern = /(https?:\/\/[^\s|<>"]+)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
      var fragment = document.createDocumentFragment();
      var last = 0;
      var match;
      while ((match = pattern.exec(text)) !== null) {
        var value = match[0].replace(/[.,;:!?)\]]+$/, '');
        if (!value) continue;
        if (match.index > last) fragment.appendChild(document.createTextNode(text.slice(last, match.index)));
        var anchor = document.createElement('a');
        anchor.href = match[2] ? 'mailto:' + value : value;
        anchor.textContent = value;
        fragment.appendChild(anchor);
        last = match.index + value.length;
      }
      if (!last) return;
      if (last < text.length) fragment.appendChild(document.createTextNode(text.slice(last)));
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  }

  /* ---------- Plain-text export (Copy text) ---------- */
  var BLOCK_TAGS = /^(ADDRESS|ARTICLE|BLOCKQUOTE|DD|DIV|DL|DT|FOOTER|H[1-6]|HEADER|HR|LI|OL|P|PRE|SECTION|TABLE|TR|UL)$/;

  function collapse(value) {
    return value.replace(/\s+/g, ' ').trim();
  }

  function hasClass(node, name) {
    return !!(node && node.classList && node.classList.contains(name));
  }

  function toPlainText(root) {
    var lines = [];
    var buffer = '';
    var prefix = '';

    function flush() {
      var text = collapse(buffer);
      if (text) {
        lines.push(prefix + text);
        prefix = '';
      }
      buffer = '';
    }

    function blankLine() {
      flush();
      if (lines.length && lines[lines.length - 1] !== '') lines.push('');
    }

    function walk(node) {
      if (node.nodeType === 3) { buffer += node.nodeValue; return; }
      if (node.nodeType !== 1) return;
      var tag = node.nodeName.toUpperCase();
      if (tag === 'BR') { flush(); return; }

      if (hasClass(node, 'rb-doc__row')) {
        flush();
        var parts = [];
        for (var c = node.firstChild; c; c = c.nextSibling) {
          var part = collapse(c.textContent || '');
          if (part) parts.push(part);
        }
        buffer = parts.join(' | ');
        flush();
        return;
      }

      if (hasClass(node, 'rb-doc__section')) blankLine();

      if (tag === 'H2' && hasClass(node.parentNode, 'rb-doc__section')) {
        flush();
        buffer = (node.textContent || '').toUpperCase();
        flush();
        return;
      }

      var block = BLOCK_TAGS.test(tag);
      if (block) flush();
      if (tag === 'LI') prefix = '- ';
      for (var child = node.firstChild; child; child = child.nextSibling) walk(child);
      if (block) flush();
    }

    for (var n = root.firstChild; n; n = n.nextSibling) walk(n);
    flush();
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.setAttribute('aria-hidden', 'true');
    area.style.position = 'fixed';
    area.style.top = '0';
    area.style.left = '-9999px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    var previous = document.activeElement;
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    if (previous && typeof previous.focus === 'function') previous.focus();
    return ok;
  }

  /* ---------- Print window ---------- */
  var PRINT_CSS = [
    '@page { size: A4; margin: 14mm 14mm 16mm; }',
    ':root { color-scheme: light; }',
    '*, *::before, *::after { box-sizing: border-box; }',
    'html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }',
    'body { margin: 0; background: #e9eaec; color: #111; font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 10pt; line-height: 1.38; font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0, "calt" 0; overflow-wrap: break-word; }',
    '.print-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px 12px; padding: 12px 16px; background: #fff; border-bottom: 1px solid #d4d6db; font: 15px/1.4 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #16181d; }',
    '.print-bar p { margin: 0; }',
    '.print-bar button { min-height: 44px; padding: 0 18px; border: 1px solid #1f4ed8; border-radius: 10px; background: #1f4ed8; color: #fff; font: inherit; font-weight: 650; cursor: pointer; }',
    '.print-bar button.is-secondary { background: #fff; color: #16181d; border-color: #9aa0aa; }',
    '.print-bar button:focus-visible { outline: 3px solid #1f4ed8; outline-offset: 2px; }',
    '.page { width: 210mm; max-width: calc(100% - 24px); min-height: 297mm; margin: 24px auto; padding: 14mm; background: #fff; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14); }',
    'a { color: inherit; text-decoration: underline; text-underline-offset: 0.12em; }',
    'h1, h2, h3, p, ul { margin: 0; }',
    '.rb-doc__header { text-align: center; padding-bottom: 6pt; margin-bottom: 8pt; border-bottom: 1px solid #111; }',
    '.rb-doc__name { font-size: 20pt; line-height: 1.1; font-weight: 700; margin-bottom: 3pt; }',
    '.rb-doc__headline { font-weight: 700; margin-bottom: 2pt; }',
    '.rb-doc__contact { font-size: 9.5pt; }',
    '.rb-doc__section { margin-top: 10pt; }',
    '.rb-doc__section > h2 { font-size: 10pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding-bottom: 2pt; margin-bottom: 5pt; border-bottom: 1px solid #111; }',
    '.rb-doc p { margin-bottom: 3pt; }',
    '.rb-doc ul { margin: 2pt 0 3pt; padding-left: 13pt; }',
    '.rb-doc li { margin-bottom: 2pt; }',
    '.rb-doc__labelled { list-style: none; padding-left: 0 !important; }',
    '.rb-doc__item { margin-bottom: 7pt; }',
    '.rb-doc__row { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 0 12pt; }',
    '.rb-doc__row h3 { font-size: 10.5pt; font-weight: 700; }',
    '.rb-doc__row span { white-space: nowrap; }',
    '.rb-doc__sub { font-style: italic; }',
    '@media screen and (max-width: 40rem) { .page { max-width: none; margin: 0; padding: 16px; min-height: 0; box-shadow: none; } }',
    '@media print {',
    '  body { background: #fff; color: #000; }',
    '  .print-bar { display: none; }',
    '  .page { width: auto; max-width: none; min-height: 0; margin: 0; padding: 0; box-shadow: none; }',
    '  a { color: #000; text-decoration: none; }',
    '  h2, h3, .rb-doc__row { break-after: avoid; page-break-after: avoid; }',
    '  .rb-doc__item, li { break-inside: avoid; page-break-inside: avoid; }',
    '  p, li { orphans: 3; widows: 3; }',
    '}'
  ].join('\n');

  function buildPrintHtml(sourceHtml) {
    var box = document.createElement('div');
    box.innerHTML = sanitize(sourceHtml);

    // The name is the document title in the standalone copy.
    var name = box.querySelector('.rb-doc__name');
    if (name && name.nodeName.toUpperCase() !== 'H1') {
      var h1 = document.createElement('h1');
      h1.className = name.className;
      while (name.firstChild) h1.appendChild(name.firstChild);
      name.parentNode.replaceChild(h1, name);
    }

    addHyperlinks(box);

    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n<head>\n' +
      '<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<meta name="robots" content="noindex">\n' +
      '<title>' + esc(PRINT_TITLE) + '</title>\n' +
      '<style>\n' + PRINT_CSS + '\n</style>\n' +
      '</head>\n<body>\n' +
      '<div class="print-bar">' +
        '<p>In the print dialog, choose “Save as PDF” as the destination.</p>' +
        '<button type="button" id="print-now">Print or save as PDF</button>' +
        '<button type="button" id="print-close" class="is-secondary">Close window</button>' +
      '</div>\n' +
      '<main class="page"><div class="rb-doc">' + box.innerHTML + '</div></main>\n' +
      '</body>\n</html>';
  }

  /* ---------- UI shell ---------- */
  var ICON_DOWNLOAD = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>';

  function buildShellHtml() {
    return '' +
      '<div class="rb">' +
        '<div class="card rb__panel">' +
          '<h2 id="rb-title" class="rb__title">Tailor the draft, then save a PDF</h2>' +
          '<p class="rb__intro">The document is generated from the same data as the resume page. Select any text in it to change it. Changes are saved automatically in this browser.</p>' +
          '<div class="rb__actions">' +
            '<button type="button" class="btn btn--primary" id="rb-print">' + ICON_DOWNLOAD + 'Save as PDF<span class="visually-hidden"> (opens a print window)</span></button>' +
            '<button type="button" class="btn btn--secondary" id="rb-copy">Copy text</button>' +
            '<button type="button" class="btn btn--secondary" id="rb-reset">Reset draft</button>' +
          '</div>' +
          '<p class="form__status rb__status" id="rb-status" role="status" aria-live="polite"></p>' +
          '<h3 class="rb__subtitle">Keep it ATS-friendly</h3>' +
          '<ul class="card__points rb__tips">' +
            '<li>Trim bullets and adjust the summary to match the role you are applying for.</li>' +
            '<li>Save as PDF opens a print-ready copy in a new window. Choose “Save as PDF” as the destination.</li>' +
            '<li>Keep it text-only. Images, tables and multiple columns can confuse applicant tracking systems.</li>' +
            '<li>Copy text gives you a plain-text version for application forms. Pasted text loses its formatting.</li>' +
          '</ul>' +
          '<p class="rb__note">Drafts are stored only in this browser’s local storage and are never sent anywhere. <a href="/privacy.html">Privacy details</a></p>' +
        '</div>' +
        '<div class="rb__stage">' +
          '<p class="rb__hint" id="rb-hint">Editable preview, laid out like the PDF.</p>' +
          '<div class="rb__desk">' +
            '<div class="rb-doc" id="rb-doc" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Editable resume draft" aria-describedby="rb-hint"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---------- Behaviour ---------- */
  function init() {
    var root = document.getElementById('resume-builder-root');
    if (!root) return;

    // Drafts saved by the previous version contained a phone number: remove them.
    try { window.localStorage.removeItem('jose_resume_builder_html_v2'); } catch (e) { /* storage blocked */ }

    root.innerHTML = buildShellHtml();

    var docEl = document.getElementById('rb-doc');
    var statusEl = document.getElementById('rb-status');
    var printBtn = document.getElementById('rb-print');
    var copyBtn = document.getElementById('rb-copy');
    var resetBtn = document.getElementById('rb-reset');
    var canStore = storageAvailable();

    // Serialise the generated draft once, so "is this edited?" is a string compare.
    var pristine = document.createElement('div');
    pristine.innerHTML = buildDraftHtml(resumeData);
    var pristineHtml = pristine.innerHTML;

    var statusTimer = null;
    function setStatus(state, message, force) {
      var apply = function () {
        if (state) statusEl.setAttribute('data-state', state);
        else statusEl.removeAttribute('data-state');
        statusEl.textContent = message;
      };
      clearTimeout(statusTimer);
      if (force && statusEl.textContent === message) {
        // Clear first so screen readers announce a repeated message.
        statusEl.textContent = '';
        statusTimer = setTimeout(apply, 60);
        return;
      }
      if (statusEl.textContent === message && (statusEl.getAttribute('data-state') || '') === (state || '')) return;
      apply();
    }

    /* Initial draft */
    var saved = readSavedDraft();
    if (saved) {
      docEl.innerHTML = sanitize(saved.html);
      if (saved.v !== DATA_VERSION) {
        setStatus('', 'Restored your saved draft. The resume data has changed since then; use Reset draft to load the latest version.');
      } else {
        setStatus('', 'Restored your saved draft from this browser.');
      }
    } else {
      docEl.innerHTML = pristineHtml;
      if (canStore) {
        setStatus('', 'Draft generated from the resume data. Select the document and start typing to edit it.');
      } else {
        setStatus('error', 'This browser is blocking local storage, so edits will not be kept after you leave the page.');
      }
    }

    /* Autosave */
    var saveTimer = null;
    function saveNow() {
      clearTimeout(saveTimer);
      saveTimer = null;
      var html = docEl.innerHTML;
      if (html === pristineHtml) {
        storageRemove(STORAGE_KEY);
        if (canStore) setStatus('success', 'Changes saved in this browser.');
        return;
      }
      if (storageSet(STORAGE_KEY, JSON.stringify({ v: DATA_VERSION, html: html }))) {
        setStatus('success', 'Changes saved in this browser.');
      } else {
        setStatus('error', 'Changes could not be saved in this browser. Copy the text or save a PDF before leaving the page.');
      }
    }

    function scheduleSave() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveNow, 400);
    }

    docEl.addEventListener('input', function () {
      disarmReset();
      scheduleSave();
    });

    docEl.addEventListener('blur', function () {
      if (saveTimer) saveNow();
    });

    window.addEventListener('pagehide', function () {
      if (saveTimer) saveNow();
    });

    docEl.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && (event.key === 's' || event.key === 'S')) {
        event.preventDefault();
        saveNow();
      }
    });

    /* Paste as plain text, so the draft stays ATS-friendly */
    function insertPlainText(text) {
      var selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      var range = selection.getRangeAt(0);
      range.deleteContents();
      var node = document.createTextNode(text);
      range.insertNode(node);
      range.setStartAfter(node);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      scheduleSave();
    }

    docEl.addEventListener('paste', function (event) {
      var data = event.clipboardData;
      if (!data) return;
      event.preventDefault();
      var text = data.getData('text/plain');
      if (!text) return;
      var inserted = false;
      try { inserted = document.execCommand('insertText', false, text); } catch (e) { inserted = false; }
      if (!inserted) insertPlainText(text);
    });

    docEl.addEventListener('drop', function (event) {
      var types = event.dataTransfer && event.dataTransfer.types;
      if (types && Array.prototype.indexOf.call(types, 'Files') !== -1) event.preventDefault();
    });

    /* Reset (asks for a second press when there are edits to lose) */
    var resetArmed = false;
    var resetTimer = null;

    function disarmReset() {
      if (!resetArmed) return;
      resetArmed = false;
      clearTimeout(resetTimer);
      resetBtn.textContent = 'Reset draft';
    }

    resetBtn.addEventListener('click', function () {
      var edited = docEl.innerHTML !== pristineHtml;
      if (edited && !resetArmed) {
        resetArmed = true;
        resetBtn.textContent = 'Confirm reset';
        setStatus('', 'Press Confirm reset to discard your edits and restore the original draft.', true);
        return;
      }
      disarmReset();
      clearTimeout(saveTimer);
      saveTimer = null;
      docEl.innerHTML = pristineHtml;
      storageRemove(STORAGE_KEY);
      setStatus('success', 'Draft reset to the original resume data.', true);
    });

    // Disarm when focus leaves the reset button (no time limit on the confirmation).
    resetBtn.addEventListener('blur', function () { disarmReset(); });

    /* Copy text */
    copyBtn.addEventListener('click', function () {
      var text = toPlainText(docEl);
      var done = function () { setStatus('success', 'Resume text copied to the clipboard.', true); };
      var fallback = function () {
        if (legacyCopy(text)) done();
        else setStatus('error', 'Copying did not work in this browser. Select the text in the document and copy it manually.', true);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });

    /* Download PDF: print-ready window, then the browser's Save as PDF */
    printBtn.addEventListener('click', function () {
      if (saveTimer) saveNow();
      var printWindow = window.open('', '_blank', 'width=1024,height=900');
      if (!printWindow) {
        setStatus('error', 'The print window was blocked. Allow pop-ups for this site, then try again.', true);
        return;
      }

      var printDoc = printWindow.document;
      printDoc.open();
      printDoc.write(buildPrintHtml(docEl.innerHTML));
      printDoc.close();

      var printNow = printDoc.getElementById('print-now');
      var closeNow = printDoc.getElementById('print-close');
      if (printNow) printNow.addEventListener('click', function () { printWindow.print(); });
      if (closeNow) closeNow.addEventListener('click', function () { printWindow.close(); });

      printWindow.focus();
      var triggerPrint = function () {
        setTimeout(function () {
          try { printWindow.print(); } catch (e) { /* the window was closed */ }
        }, 250);
      };
      if (printDoc.readyState === 'complete') triggerPrint();
      else printWindow.addEventListener('load', triggerPrint);

      setStatus('success', 'Print-ready copy opened in a new window. Choose “Save as PDF” as the destination.', true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
