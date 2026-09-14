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
    'Multi-Cloud Specialist (AWS • Azure • GCP)',
    'Kubernetes & Docker Practitioner',
    'Infrastructure as Code (IaC) Builder',
    'SRE & DevSecOps Practitioner'
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
  <span class="term-highlight">skills</span>           Display multi-cloud stack & competencies
  <span class="term-highlight">experience</span>       Display employment history & achievements
  <span class="term-highlight">projects</span>         Summarize featured production projects
  <span class="term-highlight">pipeline --run</span>   Trigger the interactive CI/CD visualizer
  <span class="term-highlight">cat resume.txt</span>   Dump verified resume overview
  <span class="term-highlight">pillars</span>          Display core engineering capabilities
  <span class="term-highlight">contact</span>          Show email, phone, and LinkedIn
  <span class="term-highlight">uptime</span>           Multi-cloud cluster status
  <span class="term-highlight">clear</span>            Clear terminal screen
`,
    whoami: () => `
<span class="term-highlight">Dolai Rajesh Kumar</span>
Role: DevOps Engineer | Multi-Cloud & Automation Specialist
Location: Hyderabad, India
Multi-Cloud: AWS, Microsoft Azure, Google Cloud Platform (GCP)
Experience: Hands-on expertise architecting Jenkins & GitHub Actions CI/CD, 
Kubernetes clusters (EKS/AKS/GKE), and Infrastructure as Code with Terraform & Ansible.
MCA Graduate (2023).
`,
    skills: () => `
<span class="term-highlight">[AWS Cloud]</span>          EC2, S3, EKS, RDS, VPC, IAM, Route 53, CloudWatch, Lambda, Secrets Manager
<span class="term-highlight">[Microsoft Azure]</span>    Azure VMs, Virtual Network (VNet), AKS, Blob Storage, Azure Monitor, DevOps
<span class="term-highlight">[Google Cloud]</span>       Compute Engine, GKE, Cloud Storage, VPC Networks, Cloud Operations
<span class="term-highlight">[Containers & K8s]</span>   Docker, Kubernetes (EKS, AKS, GKE), Helm, Multi-stage Builds, HPA, Ingress
<span class="term-highlight">[CI/CD & Automation]</span> Jenkins Declarative Pipelines, GitHub Actions, Azure DevOps, Maven, ArgoCD
<span class="term-highlight">[IaC & Config]</span>       Terraform (Multi-Cloud Providers & State), Ansible (Playbooks & Roles)
<span class="term-highlight">[Observability & SRE]</span> Prometheus, Grafana, Alertmanager, AWS CloudWatch, Azure Monitor, SLIs/SLOs
<span class="term-highlight">[DevSecOps & Script]</span> SonarQube Quality Gates, Trivy Scan, Linux (Ubuntu/RHEL), Bash, Python
`,
    experience: () => `
<span class="term-highlight">CW Suite India Pvt Ltd — Hyderabad, India</span>
Associate Software Engineer (DevOps & Cloud) | June 2024 – Present
Domain: Retail ERP/POS SaaS
• Designed and implemented declarative Jenkins CI/CD pipelines for microservices.
• Orchestrated containerized workloads using Docker & Kubernetes on AWS with HPA & ingress.
• Standardized infrastructure provisioning using modular Terraform and Ansible.
• Established full-stack monitoring using Prometheus & Grafana dashboards with SLIs/SLOs.
• Integrated SonarQube static code analysis with quality gates into build workflows.
`,
    projects: () => `
<span class="term-highlight">1. End-to-End DevSecOps CI/CD Automation Platform (Personal / Simulation)</span>
   Stack: Jenkins, GitHub Actions, Docker, SonarQube, Trivy, AWS EC2/S3, Maven, Slack
   Highlights: Webhook-driven pipelines, parallelized build stages, Trivy & SonarQube gates, blue/green rollout.

<span class="term-highlight">2. Cloud Infrastructure Provisioning & Resilient Microservices Deployment (Cloud & IaC)</span>
   Stack: Multi-Cloud (AWS, Azure, GCP), Terraform, Docker, Nginx, Linux, Bash
   Highlights: Modular VPC/VNet infrastructure, Spring Boot multi-stage containers, CloudWatch/SNS alerts.

<span class="term-highlight">3. Multi-Cloud Kubernetes Fleet & GitOps Management (Cloud-Native K8s)</span>
   Stack: Kubernetes (EKS/AKS/GKE), Helm, Prometheus, Grafana, Alertmanager, ArgoCD
   Highlights: Helm operator deployments, HPA dynamic autoscaling, p95/p99 latency tracking.
`,
    pillars: () => `
<span class="term-highlight">Core Engineering Capabilities:</span>
  • CI/CD & Automation:    Declarative pipelines enabling seamless & predictable releases
  • Multi-Cloud Infra:     Modular Terraform & Ansible across AWS, Azure, and GCP
  • Container Platforms:   Kubernetes (EKS/AKS/GKE) with auto-scaling & ingress control
  • SRE & Observability:   Full-stack Prometheus & Grafana telemetry to accelerate MTTR
  • DevSecOps Governance:  Integrated SonarQube & Trivy quality gates across pipelines
`,
    metrics: () => `
<span class="term-highlight">Core Engineering Capabilities:</span>
  • CI/CD & Automation:    Declarative pipelines enabling seamless & predictable releases
  • Multi-Cloud Infra:     Modular Terraform & Ansible across AWS, Azure, and GCP
  • Container Platforms:   Kubernetes (EKS/AKS/GKE) with auto-scaling & ingress control
  • SRE & Observability:   Full-stack Prometheus & Grafana telemetry to accelerate MTTR
  • DevSecOps Governance:  Integrated SonarQube & Trivy quality gates across pipelines
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
Multi-Cloud Topology: AWS ap-south-1, Azure Central India, GCP asia-south1
Cluster Nodes: 12/12 Ready | Pods: Active & Healthy | Status: 100% Operational
`
  };

  commands['cat resume.txt'] = () => `
=====================================================================
                    DOLAI RAJESH KUMAR
      DevOps Engineer | Multi-Cloud & Automation Specialist
   Hyderabad, India • rajeshprabhakar2000@gmail.com • +91 7287839925
   LinkedIn: dolairajeshkumar • GitHub: dolairajeshkumar
=====================================================================
PROFESSIONAL SUMMARY:
Results-driven DevOps Engineer with hands-on experience architecting 
automated CI/CD pipelines, scalable Kubernetes clusters, and resilient 
multi-cloud infrastructure across AWS, Microsoft Azure, and GCP.

TECHNICAL SKILLS:
• Multi-Cloud: AWS (EKS, VPC, S3), Azure (AKS, VNet, VMs), GCP (GKE, VPC)
• Containers: Docker, Kubernetes, Helm, Multi-stage Builds, HPA
• CI/CD: Jenkins Declarative, GitHub Actions, Azure DevOps, ArgoCD
• IaC: Terraform (Multi-Cloud Providers), Ansible Playbooks & Roles
• SRE & Observability: Prometheus, Grafana, Alertmanager, CloudWatch

EXPERIENCE:
Associate Software Engineer (DevOps & Cloud) @ CW Suite India (2024-Present)
Retail ERP/POS SaaS • Hyderabad, India
- Declarative Jenkins CI/CD pipelines for microservices
- Docker & Kubernetes container orchestration on AWS with HPA
- Modular Terraform & Ansible multi-environment provisioning
- Prometheus & Grafana full-stack monitoring with SLIs/SLOs
- SonarQube static code analysis & Trivy container scanning
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
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const msg = document.getElementById('contact-msg').value.trim();

    if (!name || !email || !msg) {
      feedback.innerHTML = `<span style="color:#ef4444;">Please fill in all required fields.</span>`;
      return;
    }

    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = `<span>Sending Message...</span>`;
    }

    feedback.innerHTML = `<span style="color:#38bdf8;">Sending your message directly to Rajesh's inbox...</span>`;

    // If viewing locally as file://, use native form submit
    if (window.location.protocol === 'file:') {
      feedback.innerHTML = `<span style="color:#38bdf8;">Submitting via form service...</span>`;
      form.submit();
      return;
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/rajeshprabhakar2000@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `[Portfolio Inquiry] ${subject || 'New Message from Portfolio'}`,
          message: msg,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        feedback.innerHTML = `<span style="color:#10b981; font-weight:600;">✓ Message sent successfully! It has been delivered directly to Rajesh's inbox.</span>`;
        form.reset();
      } else {
        // Fallback to native form submission
        form.submit();
      }
    } catch (err) {
      console.warn('FormSubmit AJAX failed, falling back to native submit:', err);
      form.submit();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });
}
