# Resume Page — AI Prompts

This document contains the full prompts used to generate the AI-built resume page (`pages/resume.html`, `css/resume.css`, `js/resume.js`).

**Model used:** Claude Opus 4.6 (Anthropic) via Claude Code CLI

---

## Master Prompt

Used to generate `pages/resume.html`, `css/resume.css`, and `js/resume.js` in a single shot.

```
Build me a resume.html page for my personal homepage. I already have index.html at the project root and interests.html inside a pages/ folder that share the same nav and theme. This page needs to fit in.

## Tech requirements
- Plain HTML + CSS + vanilla JavaScript (no React, no frameworks)
- Bootstrap 5, which is already loaded in other two html pages
- Put the HTML in resume.html inside the pages/ folder (alongside my existing interests.html; index.html lives at the project root)
- Put the styling in resume.css inside the css/ folder (same folder as my existing style.css)
- Put the interactivity in resume.js inside the js/ folder (same folder as my existing main.js)
- Don't touch my existing style.css or main.js or the existing html files unless requested
- Use semantic HTML (header, nav, main, section, footer, address)
- All images need alt attributes
- No inline styles, no !important
- Responsive layout that works on mobile

## Match my existing site
- Same top nav as my other pages with About Me, Resume (active), Interests links
- Include meta tags: description, author (Khush Patel), favicon (../images/resume-icon.png)
- Warm earthy color palette: beige background, brown borders, orange accent, deep brown text
- Use Google Fonts: Lora for headings, Open Sans for body text

## Layout
- Sticky sidebar nav on the left that lists each section (Education, Experience, Projects, Skills) and highlights the active section as I scroll
- Main content area on the right with horizontal cards for each entry
- Each card has dates on the left and content on the right
- Header at the top with my name, contact info, and a Download Resume button

## Interactive features (use vanilla JS)
1. Scroll-triggered fade-ins for each card
2. Sticky sidebar that highlights the current section based on scroll position
3. Expandable job cards - show just title and dates by default, click to expand bullet points
4. Skill pills that I can click to filter projects and jobs that use that skill
5. Theme toggle button (light cream / dark charcoal) that saves preference in localStorage
6. Subtle hover tilt effect on cards (rotate based on mouse position)

## Resume content

Contact:
- Khush M. Patel
- Phone: (973) 970-5875
- Email: kmpat339@gmail.com
- LinkedIn: linkedin.com/in/khushmpatel5875
- GitHub: github.com/kmpat339

Education:
- Northeastern University, Khoury College of Computer Sciences (Boston, MA)
  - Master of Science in Computer Science
  - GPA: 4.000 / 4.000
  - January 2025 - Present
  - Coursework: Computer Systems, Object-Oriented Design, Algorithms, Database Management Systems
- Rutgers University, School of Arts and Sciences (New Brunswick, NJ)
  - Bachelor of Arts in Cell Biology & Neuroscience
  - September 2016 - May 2020

Projects:

- Project Name: Urgent Care Management System
  Type: Full Stack/Backend Development
  Tech: Python, Flask, React, JavaScript, MySQL, HTML, CSS
  Description:
    - Built a healthcare system using Python Flask/React.js for real-time patient tracking and practitioner queue management
    - Designed 10+ tables in MySQL database in 3NF with stored procedures/triggers
    - Created an automated billing module with insurance calculations using database triggers

- Project Name: Hybrid Visual-Lexical RAG Pipeline for Biomedical QA
  Type: Systems and Shell Scripting
  Tech: Python, Linux, SQLite, Qdrant, PaddleOCR, Ollama, Llama 3.1
  Description:
    - Built end-to-end RAG system comparing BM25 vs ColPali vision-guided prefiltering on BioASQ/PMC PDFs
    - Designed offline pipeline: PaddleOCR extraction, fixed-window chunking, ColPali embeddings (Qdrant), BM25 indexing
    - Stored chunk metadata and retrieval logs in a local SQLite database for offline analysis
    - Evaluated with Rouge-L, BERTscore, Exact Match, Recall@K using Llama 3.18B through Ollama locally

- Project Name: GRIME Image Processing App
  Type: Java Development
  Tech: Java, Java Swing, JUnit
  Description:
    - Built an image editor with Java, Java Swing, and a custom database
    - Implemented MVC architecture with command/strategy pattern
    - Dual-interface support (CLI + GUI) with real-time image previews

Experience:

- Company: Birth Model
  Location: Remote
  Job Title: Full Stack Software Engineering Intern
  Date: November 2025 - January 2026
  Description:
    - Automated clinical diagnosis workflows with backend logic and Postgres DB migrations for 10+ patient categories
    - Refactored HL7 message parsing into a modular architecture
    - Increased backend test coverage for FHIR API integrations, resolving 44+ failing tests

- Company: Advanced Orthopaedic Associates
  Location: Wayne, NJ
  Job Title: Medical Scribe / Medicolegal Assistant
  Date: February 2023 - December 2024
  Description:
    - Generated 1000+ patient charts through real-time transcription in eClinicalWorks EHR
    - Created a structured follow-up visit EHR template
    - Built a framework to generate 700+ medicolegal guidelines

- Company: Genetics Research Project at RWJ
  Location: Piscataway, NJ
  Job Title: Research Associate
  Date: May 2018 - August 2018
  Description:
    - Researched effect of Zag-1 Transcriptional Factor on Hermaphrodite Specific Motor Neurons in C. elegans
    - Analyzed GFP expression between control and mutant strains

Skills:
- Languages/Frameworks: Java, Python, Linux, C, JavaScript, React, Flask, Django, Node.js, HTML, CSS, SQL
- Tools/Libraries: Postgres, Git, scikit-learn, Pytest, Junit, Tableau, Power BI

## Output
Give me all three files in full with no shortcuts or placeholders:
1. pages/resume.html (inside the pages folder)
2. css/resume.css (inside the css folder)
3. js/resume.js (inside the js folder)
```

---

## Follow-up Prompt 1

Fixed a layout bug where the project type text overflowed into the adjacent project title.

```
The Systems/Shell Scripting overflows into the project title next to it called: Hybrid Visual-Lexical RAG Pipeline for Biomedical QA
```

---

## Follow-up Prompt 2

Swapped plain-text contact labels for icon images.

```
Replace and use these icons from the images folder in this project for these parts specified below:

- Phone number: ../images/phone-icon.png
- Email: ../images/mail-icon.png
- LinkedIn: ../images/linkedin-icon.png
- GitHub: ../images/github-icon.png
```
