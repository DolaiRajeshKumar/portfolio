/**
 * Dolai Rajesh Kumar - DevOps Portfolio Application Logic
 * Terminal emulator, animated pipeline visualizer, typewriter, metrics counters & theming
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initThemeToggle();
  initMobileMenu();
  initAnimatedMetrics();
  initSkillFilters();
  initPipelineSimulator();
  initTerminal();
  initCopyButtons();
  initContactForm();
});

/* ==========================================================================
   Typewriter Effect in Hero
   ========================================================================== */
function initTypewriter() {
  const textElement = document.querySelector('.typed-text');
  if (!textElement) return;

  const roles = [
    'DevOps Engineer',
    'Cloud & Automation Specialist',
    'Kubernetes & Docker Practitioner',
    'Infrastructure as Code (IaC) Builder',
    'SRE & Observability Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('rajesh_theme') || 'dark-theme';
  document.body.className = savedTheme;

  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('rajesh_theme', 'light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('rajesh_theme', 'dark-theme');
    }
  });
}

/* ==========================================================================
   Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   Animated Metrics Counter
   ========================================================================== */
function initAnimatedMetrics() {
  const metricCards = document.querySelectorAll('.metric-number');
  if (!metricCards.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        metricCards.forEach(card => {
          const target = parseFloat(card.getAttribute('data-target'));
          const decimals = parseInt(card.getAttribute('data-decimals') || '0', 10);
          const prefix = card.getAttribute('data-prefix') || '';
          const suffix = card.getAttribute('data-suffix') || '';
          
          let current = 0;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            card.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   Skills Category Filter
   ========================================================================== */
function initSkillFilters() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   Visual Interactive CI/CD Pipeline Simulator
   ========================================================================== */
function initPipelineSimulator() {
  const triggerBtn = document.getElementById('trigger-pipeline-btn');
  const statusText = document.getElementById('pipeline-status-text');
  const nodes = document.querySelectorAll('.pipeline-node');

  if (!triggerBtn || !nodes.length) return;

  let isRunning = false;

  window.runPipelineSimulation = function() {
    if (isRunning) return;
    isRunning = true;
    triggerBtn.disabled = true;
    triggerBtn.style.opacity = '0.6';

    // Reset all nodes
    nodes.forEach(node => {
      node.classList.remove('running', 'passed');
      const badge = node.querySelector('.node-badge');
      if (badge) {
        badge.className = 'node-badge status-idle';
        badge.textContent = 'Waiting';
      }
    });

    const stages = [
      { name: 'Git Webhook PR Trigger', delay: 700 },
      { name: 'Maven Compilation & Unit Tests', delay: 900 },
      { name: 'SonarQube & Trivy Security Gates (>80%)', delay: 900 },
      { name: 'Docker Build & ECR Push', delay: 800 },
      { name: 'Kubernetes Blue/Green Deployment', delay: 1000 },
      { name: 'Prometheus Healthcheck & Slack Notification', delay: 700 }
    ];

    let currentStage = 0;

    function executeNextStage() {
      if (currentStage > 0) {
        const prevNode = nodes[currentStage - 1];
        prevNode.classList.remove('running');
        prevNode.classList.add('passed');
        const prevBadge = prevNode.querySelector('.node-badge');
        if (prevBadge) {
          prevBadge.className = 'node-badge status-success';
          prevBadge.textContent = 'Passed';
        }
      }

      if (currentStage < stages.length) {
        const currentNode = nodes[currentStage];
        currentNode.classList.add('running');
        const currentBadge = currentNode.querySelector('.node-badge');
        if (currentBadge) {
          currentBadge.className = 'node-badge status-running';
          currentBadge.textContent = 'Running';
        }
        statusText.innerHTML = `[Stage ${currentStage + 1}/6] <strong>${stages[currentStage].name}</strong> in progress...`;

        setTimeout(() => {
          currentStage++;
          executeNextStage();
        }, stages[currentStage].delay);
      } else {
        // Pipeline Complete
        statusText.innerHTML = `✅ <strong style="color:#10b981;">Pipeline Succeeded!</strong> Blue/Green release deployed with zero downtime.`;
        isRunning = false;
        triggerBtn.disabled = false;
        triggerBtn.style.opacity = '1';
      }
    }

    executeNextStage();
  };

  triggerBtn.addEventListener('click', window.runPipelineSimulation);
}

/* ==========================================================================
   Interactive DevOps Terminal Emulator
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');
  const clearBtn = document.getElementById('term-clear-btn');
  const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
Available Commands:
  <span class="term-highlight">help</span>             Show this help menu
  <span class="term-highlight">whoami</span>           Print bio and professional background
  <span class="term-highlight">skills</span>           Display tech stack & competencies
  <span class="term-highlight">experience</span>       Display employment history & achievements
  <span class="term-highlight">projects</span>         Summarize featured production projects
  <span class="term-highlight">pipeline --run</span>   Trigger the interactive CI/CD visualizer
  <span class="term-highlight">cat resume.txt</span>   Dump quick resume highlights
  <span class="term-highlight">metrics</span>          Display quantifiable DevOps business impact
  <span class="term-highlight">contact</span>          Show email, phone, and LinkedIn
  <span class="term-highlight">uptime</span>           Simulated cloud cluster status
  <span class="term-highlight">clear</span>            Clear terminal screen
`,
    whoami: () => `
<span class="term-highlight">Dolai Rajesh Kumar</span>
Role: DevOps Engineer | Cloud & Automation Specialist
Location: Hyderabad, India
Experience: Hands-on expertise architecting Jenkins CI/CD, Kubernetes clusters, 
and AWS cloud infrastructure with Terraform & Ansible. MCA Graduate (2023).
`,
    skills: () => `
<span class="term-highlight">[Cloud & Infrastructure]</span> AWS (EC2, S3, EKS, RDS, VPC, IAM, Route 53, CloudWatch, Lambda)
<span class="term-highlight">[Containers & K8s]</span>     Docker, Kubernetes (EKS), Helm, Multi-stage Builds, HPA
<span class="term-highlight">[CI/CD & Automation]</span>   Jenkins Declarative Pipelines, GitHub Actions, Maven, ArgoCD
<span class="term-highlight">[IaC & Configuration]</span>  Terraform (Modules & State), Ansible (Playbooks & Roles)
<span class="term-highlight">[Observability & SRE]</span>  Prometheus, Grafana, Alertmanager, AWS CloudWatch, SLIs/SLOs
<span class="term-highlight">[DevSecOps & Script]</span>  SonarQube Quality Gates, Trivy Scan, Linux/Bash, Python
`,
    experience: () => `
<span class="term-highlight">CW Suite India Pvt Ltd — Hyderabad, India</span>
Associate Software Engineer (DevOps & Cloud) | June 2024 – Present
• Accelerated release cycles by 70% (4 hours down to 12 minutes) via Jenkins.
• Maintained 99.9% uptime for 5,000+ DAU on AWS EKS with HPA.
• Deployed 10-node clusters in &lt;5 mins with reusable Terraform & Ansible modules.
• Slashed MTTR by 60% with Prometheus & Grafana alerting.
• Enforced >80% code coverage quality gates via SonarQube & Trivy.
`,
    projects: () => `
<span class="term-highlight">1. End-to-End DevSecOps CI/CD Automation Platform</span>
   Stack: Jenkins, GitHub Actions, Docker, SonarQube, Trivy, AWS EC2/S3, Maven, Slack
   Highlights: PR webhooks, automated gates, blue/green deploy, instant rollback.

<span class="term-highlight">2. Cloud Infrastructure Provisioning & Microservices Deployment</span>
   Stack: AWS VPC, EC2, S3, IAM, CloudWatch, Terraform, Docker, Nginx, Bash
   Highlights: Modular IaC, multi-stage containers, CloudWatch/SNS alerts, Bash snapshots.

<span class="term-highlight">3. Kubernetes Cluster Observability & GitOps Fleet Management</span>
   Stack: Kubernetes / EKS, Helm, Prometheus, Grafana, Alertmanager, ArgoCD
   Highlights: Prometheus Operator, HPA autoscaling, p95/p99 latency tracking.
`,
    metrics: () => `
<span class="term-highlight">Key Quantifiable DevOps Metrics:</span>
  • Release Turnaround:   <span style="color:#10b981;">70% faster (4h -> 12m)</span>
  • EKS Cluster Uptime:   <span style="color:#10b981;">99.9% availability</span>
  • IaC Deploy Speed:     <span style="color:#10b981;">&lt; 5 minutes</span>
  • MTTR Reduction:       <span style="color:#10b981;">60% faster incident resolution</span>
  • Production Rollouts:  <span style="color:#10b981;">0 failed deployments</span> (Blue/Green)
`,
    contact: () => `
<span class="term-highlight">Get In Touch:</span>
  • Email:    <a href="mailto:rajeshprabhakar2000@gmail.com" style="color:#38bdf8;">rajeshprabhakar2000@gmail.com</a>
  • Phone:    +91 7287839925
  • LinkedIn: <a href="https://linkedin.com/in/dolairajeshkumar" target="_blank" style="color:#38bdf8;">linkedin.com/in/dolairajeshkumar</a>
  • GitHub:   <a href="https://github.com/dolairajeshkumar" target="_blank" style="color:#38bdf8;">github.com/dolairajeshkumar</a>
  • Location: Hyderabad, India
`,
    uptime: () => `
12:18:12 up 142 days, 16:40, 1 user, load average: 0.12, 0.08, 0.05
Cluster Nodes: 10/10 Ready | Pods: 48/48 Running | Cloud: AWS ap-south-1 (Mumbai)
`
  };

  commands['cat resume.txt'] = () => `
=====================================================================
                    DOLAI RAJESH KUMAR
         DevOps Engineer | Cloud & Automation Specialist
   Hyderabad, India • rajeshprabhakar2000@gmail.com • +91 7287839925
   LinkedIn: dolairajeshkumar • GitHub: dolairajeshkumar
=====================================================================
SUMMARY:
Results-driven DevOps Engineer with hands-on experience architecting 
automated CI/CD pipelines, scalable Kubernetes clusters, and resilient 
AWS cloud infrastructure.

EDUCATION:
MCA - Aurora's PG College, Hyderabad (Graduated 2023)

EXPERIENCE:
Associate Software Engineer (DevOps & Cloud) @ CW Suite India (2024-Present)
- 70% release turnaround speedup
- 99.9% uptime on EKS
- Terraform & Ansible automated provisioning
- Prometheus & Grafana full-stack monitoring
`;
  commands['resume'] = commands['cat resume.txt'];

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Create command echo element
    const echoDiv = document.createElement('div');
    echoDiv.className = 'term-line';
    echoDiv.innerHTML = `<span class="terminal-prompt-label">rajesh@devops:~$</span> <span class="term-command">${escapeHtml(cmd)}</span>`;
    terminalOutput.appendChild(echoDiv);

    // Process command
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (lowerCmd === 'pipeline --run' || lowerCmd === 'pipeline') {
      const respDiv = document.createElement('div');
      respDiv.className = 'term-line term-output-text';
      respDiv.innerHTML = `🚀 Triggering CI/CD Pipeline Simulator across visual pipeline...`;
      terminalOutput.appendChild(respDiv);
      if (typeof window.runPipelineSimulation === 'function') {
        window.runPipelineSimulation();
        // Scroll to pipeline section
        const pSection = document.getElementById('pipeline');
        if (pSection) {
          pSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    const respDiv = document.createElement('div');
    respDiv.className = 'term-line term-output-text';

    if (commands[lowerCmd]) {
      respDiv.innerHTML = commands[lowerCmd]();
    } else {
      respDiv.innerHTML = `command not found: <span style="color:#ef4444;">${escapeHtml(cmd)}</span>. Type '<span class="term-highlight">help</span>' for available commands.`;
    }

    terminalOutput.appendChild(respDiv);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalOutput.innerHTML = '';
    });
  }

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }
}

/* ==========================================================================
   Copy to Clipboard Helpers
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    });
  });
}

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const msg = document.getElementById('contact-msg').value;

    const mailtoUrl = `mailto:rajeshprabhakar2000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;

    window.location.href = mailtoUrl;

    feedback.innerHTML = `<span style="color:#10b981;">✓ Opening your email client to send message to Rajesh...</span>`;
    form.reset();

    setTimeout(() => {
      feedback.innerHTML = '';
    }, 5000);
  });
}
