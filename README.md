# 🚀 Dolai Rajesh Kumar — DevOps Engineer Portfolio

A modern, high-performance, dark-mode developer portfolio tailored for **Dolai Rajesh Kumar** (DevOps Engineer & Cloud Specialist). Built with pure HTML5, CSS3, and modern JavaScript with zero external build dependencies.

---

## 🌟 Key Highlights & Features

1. **DevOps Aesthetic & Dark/Light Themes:**
   - Tech-forward dark theme with terminal glow, subtle background grid, and one-click light theme toggle.
2. **Interactive Linux Terminal Console:**
   - Recruiter-engaging CLI emulator with custom commands: `help`, `whoami`, `skills`, `experience`, `projects`, `pipeline --run`, `cat resume.txt`, `contact`, `uptime`.
3. **Visual DevSecOps Pipeline Simulator:**
   - Interactive 6-stage continuous delivery pipeline visualizer (Source → Build → DevSecOps Scan → Docker ECR → Kubernetes Blue/Green → SRE Telemetry) with live execution animations.
4. **Quantifiable Business Impact Metrics:**
   - Live animated metric counters showcasing key metrics:
     - **70%** Release cycle acceleration (4h down to 12m)
     - **99.9%** Production workload uptime on AWS EKS
     - **< 5 min** Zero-drift IaC provisioning with Terraform & Ansible
     - **60%** MTTR reduction with Prometheus & Grafana alerting
5. **Categorized Skills Matrix:**
   - Interactive filtering by domain: *Cloud & Infra*, *Containers & K8s*, *CI/CD & GitOps*, *IaC & Config*, and *SRE & DevSecOps*.
6. **Career Timeline & Featured Projects:**
   - Production experience at **CW Suite India Pvt Ltd** and deep dives into enterprise CI/CD and AWS microservices architectures.
7. **Infrastructure as Code (IaC) Included:**
   - Includes `deploy-aws.tf` for deploying this portfolio directly to AWS S3 with Terraform!

---

## 📂 Project Structure

```
devops-portfolio/
│
├── index.html       # Semantic single-page portfolio layout
├── style.css        # Responsive styling, glassmorphism, & animations
├── app.js           # Terminal logic, pipeline simulator, typewriter & events
├── resume.md        # Downloadable markdown resume
├── deploy-aws.tf    # Terraform configuration for AWS S3 hosting
└── README.md        # Project guide & deployment instructions
```

---

## ⚡ How to Preview Locally

### Option 1: Direct File Open (Instant)
Simply double click `index.html` or open it in your browser (Google Chrome, Edge, Brave, Firefox).

In PowerShell:
```powershell
Start-Process "C:\Users\admin\devops-portfolio\index.html"
```

### Option 2: Using Node.js (Installed on your machine)
```powershell
cd C:\Users\admin\devops-portfolio
npx serve .
```
Then open `http://localhost:3000` in your browser.

---

## 🌐 How to Deploy for Free

### Method A: Deploy to GitHub Pages (2 Minutes)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DevOps portfolio"
   git branch -M main
   git remote add origin https://github.com/dolairajeshkumar/portfolio.git
   git push -u origin main
   ```
2. Go to your GitHub repository: **Settings** → **Pages**.
3. Under **Branch**, select `main` / `root` and click **Save**.
4. Your portfolio will be live at `https://dolairajeshkumar.github.io/portfolio`!

---

### Method B: Deploy to AWS S3 with Terraform (IaC Flex)
As a DevOps engineer, deploying your portfolio via Terraform onto AWS is a great way to showcase your skills:
1. Ensure AWS CLI is configured with your credentials (`aws configure`).
2. Run:
   ```bash
   terraform init
   terraform plan
   terraform apply -auto-approve
   ```
3. Terraform will output your live S3 website endpoint!

---

## 📬 Contact & Information

- **Name:** Dolai Rajesh Kumar
- **Role:** DevOps Engineer | Cloud & Automation Specialist
- **Email:** [rajeshprabhakar2000@gmail.com](mailto:rajeshprabhakar2000@gmail.com)
- **Phone:** +91 7287839925
- **LinkedIn:** [linkedin.com/in/dolairajeshkumar](https://linkedin.com/in/dolairajeshkumar)
- **Location:** Hyderabad, India
