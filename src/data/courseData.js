export const courseData = {
  "full-stack": {
    id: "full-stack",
    title: "Full Stack Web Development",
    description: "Complete web development course",
    lessons: [
      { id: 1, title: "Introduction to Web Development", completed: true },
      { id: 2, title: "HTML Fundamentals", completed: true },
      { id: 3, title: "CSS & Responsive Design", completed: false },
      { id: 4, title: "JavaScript Basics", completed: false },
      { id: 5, title: "Frontend Framework", completed: false },
    ],
    topics: [
      {
        id: 1,
        icon: "📌",
        title: "Introduction to Web Development",
        description: "Overview of how the web works, including client-server architecture, browsers, HTTP/HTTPS, domains, hosting, and the difference between frontend and backend development."
      },
      {
        id: 2,
        icon: "🧑‍💻",
        title: "HTML (HyperText Markup Language)",
        subtopics: [
          "HTML syntax and structure",
          "Elements and attributes",
          "Forms and input types",
          "Semantic HTML",
          "Media tags (images, video, audio)"
        ],
        description: "HTML is the backbone of all web pages — it defines structure and content, like headings, paragraphs, lists, tables, links, and forms."
      },
      {
        id: 3,
        icon: "🎨",
        title: "CSS (Cascading Style Sheets)",
        subtopics: [
          "Selectors and properties",
          "Box model",
          "Flexbox & CSS Grid",
          "Layout and positioning",
          "Responsive design with media queries",
          "Preprocessors (Sass)"
        ],
        description: "CSS styles web pages — it controls colors, fonts, layout, spacing, responsiveness, and visual presentation."
      },
      {
        id: 4,
        icon: "🧠",
        title: "JavaScript Fundamentals",
        subtopics: [
          "Variables, data types",
          "Functions and control flow",
          "DOM manipulation",
          "Events and event handling",
          "ES6+ features (let/const, arrow functions, promises)"
        ],
        description: "JavaScript adds interactivity to websites — from simple button actions to dynamic content updates and API requests."
      },
      {
        id: 5,
        icon: "⚛️",
        title: "Frontend Frameworks / Libraries",
        subtopics: [
          "React.js",
          "Angular",
          "Vue.js",
          "Components",
          "State and props",
          "Routing",
          "Hooks (React)",
          "Single Page Applications (SPA)"
        ],
        description: "Modern frontend frameworks help build complex UI with reusable components, smoother navigation, and enhanced performance."
      },
      {
        id: 6,
        icon: "📦",
        title: "Package Managers & Build Tools",
        subtopics: [
          "npm / yarn",
          "Webpack / Vite / Parcel",
          "Transpilers (Babel)",
          "Linters & formatters (ESLint, Prettier)"
        ],
        description: "These tools help manage dependencies, bundle code, optimize assets, and enforce code quality."
      },
      {
        id: 7,
        icon: "🗂️",
        title: "Version Control (Git & GitHub)",
        subtopics: [
          "Git basics (commit, branch, merge)",
          "Collaboration workflows (pull requests)",
          "GitHub repositories",
          "Branch strategies"
        ],
        description: "Version control is essential for tracking code changes, teamwork, and collaboration on large projects."
      },
      {
        id: 8,
        icon: "🛠️",
        title: "Backend Development",
        subtopics: [
          "Node.js (JavaScript)",
          "Python (Django/Flask)",
          "Server-side logic",
          "APIs and routing",
          "Authentication & authorization",
          "Middleware"
        ],
        description: "Backend programming powers server logic, handles databases, processes requests, and builds secure APIs."
      },
      {
        id: 9,
        icon: "🗄️",
        title: "Databases",
        subtopics: [
          "SQL (MySQL, PostgreSQL)",
          "NoSQL (MongoDB)",
          "CRUD operations",
          "Schema design",
          "Indexing & optimization",
          "Joins & relationships (SQL)"
        ],
        description: "Databases store, organize, and retrieve data that your applications use (user accounts, posts, messages)."
      },
      {
        id: 10,
        icon: "🔗",
        title: "RESTful APIs & GraphQL",
        subtopics: [
          "REST principles",
          "Endpoints and HTTP verbs",
          "JSON format",
          "Authentication (JWT, OAuth)",
          "Introduction to GraphQL"
        ],
        description: "APIs allow different systems (frontend & backend) to communicate. REST is the standard, and GraphQL is an advanced alternative."
      },
      {
        id: 11,
        icon: "☁️",
        title: "Deployment & DevOps Basics",
        subtopics: [
          "Hosting (Netlify, Vercel, Heroku, AWS)",
          "CI/CD pipelines",
          "Environment variables",
          "Docker basics"
        ],
        description: "Deployment makes your application live on the internet; DevOps aids automation, scalability, and reliability."
      },
      {
        id: 12,
        icon: "🔐",
        title: "Security Essentials",
        subtopics: [
          "HTTPS / SSL",
          "Password hashing",
          "Authentication & sessions",
          "Common attacks (XSS, CSRF, SQL injection)"
        ],
        description: "Security practices keep your application and users safe from common vulnerabilities."
      },
      {
        id: 13,
        icon: "📱",
        title: "Responsive & Mobile-First Design",
        subtopics: [
          "Fluid layouts",
          "Media queries",
          "Adaptive UI",
          "Progressive Web Apps (PWAs)"
        ],
        description: "Ensures websites look great and function well across different screen sizes and devices."
      },
      {
        id: 14,
        icon: "⚙️",
        title: "Advanced Topics",
        subtopics: [
          "WebSockets (real-time apps)",
          "Serverless functions",
          "Microservices",
          "Testing (Jest, Cypress)",
          "Performance optimization"
        ],
        description: "These topics deepen your skills and prepare you for larger, production-level systems."
      }
    ]
  },
  "data-science": {
    id: "data-science",
    title: "Data Science",
    description: "Complete data science course with real-world applications",
    lessons: [
      { id: 1, title: "Introduction to Data Science", completed: true },
      { id: 2, title: "Python for Data Science", completed: true },
      { id: 3, title: "Mathematics & Statistics", completed: false },
      { id: 4, title: "Machine Learning", completed: false },
      { id: 5, title: "Deep Learning & Deployment", completed: false },
    ],
    topics: [
      {
        id: 1,
        icon: "1️⃣",
        title: "Introduction to Data Science",
        subtopics: [
          "Data-driven decision making",
          "Types of data (structured, unstructured)",
          "Data science workflow",
          "Roles (Data Analyst, Data Scientist, ML Engineer)",
          "Real-world applications in healthcare, finance, marketing, and AI"
        ],
        description: "Overview of the data science lifecycle, roles, and real-world applications in healthcare, finance, marketing, and AI."
      },
      {
        id: 2,
        icon: "2️⃣",
        title: "Python for Data Science",
        subtopics: [
          "Variables, loops, functions",
          "NumPy – numerical computing",
          "Pandas – data manipulation",
          "Matplotlib – visualization",
          "Seaborn – advanced visualization"
        ],
        description: "Python is the most widely used programming language in data science. Master essential libraries for data analysis and visualization."
      },
      {
        id: 3,
        icon: "3️⃣",
        title: "Mathematics & Statistics",
        subtopics: [
          "Linear algebra (matrices, vectors)",
          "Probability",
          "Descriptive statistics",
          "Inferential statistics",
          "Hypothesis testing",
          "Normal distribution"
        ],
        description: "Foundation for understanding machine learning models. Learn statistical concepts essential for data analysis and predictive modeling."
      },
      {
        id: 4,
        icon: "4️⃣",
        title: "Data Cleaning & Preprocessing",
        subtopics: [
          "Handling missing values",
          "Removing duplicates",
          "Feature scaling",
          "Encoding categorical data",
          "Outlier detection"
        ],
        description: "Preparing raw data for analysis. Master techniques to clean and transform data into formats suitable for analysis and modeling."
      },
      {
        id: 5,
        icon: "5️⃣",
        title: "Exploratory Data Analysis (EDA)",
        subtopics: [
          "Data visualization",
          "Correlation analysis",
          "Pattern identification",
          "Data storytelling",
          "Statistical summaries"
        ],
        description: "Analyzing datasets to summarize their main characteristics. Uncover patterns and insights before building predictive models."
      },
      {
        id: 6,
        icon: "6️⃣",
        title: "Machine Learning",
        subtopics: [
          "Linear Regression",
          "Logistic Regression",
          "Decision Trees",
          "Random Forest",
          "Support Vector Machine (SVM)",
          "K-Means Clustering",
          "Hierarchical Clustering",
          "PCA (Dimensionality Reduction)",
          "Scikit-learn library"
        ],
        description: "Building predictive models from data. Learn both supervised learning (regression, classification) and unsupervised learning (clustering) techniques."
      },
      {
        id: 7,
        icon: "7️⃣",
        title: "Deep Learning",
        subtopics: [
          "Artificial Neural Networks (ANN)",
          "Convolutional Neural Networks (CNN)",
          "Recurrent Neural Networks (RNN)",
          "TensorFlow framework",
          "PyTorch framework",
          "Activation functions and backpropagation"
        ],
        description: "Advanced machine learning using neural networks. Explore frameworks for building deep learning models for complex tasks."
      },
      {
        id: 8,
        icon: "8️⃣",
        title: "Databases & SQL",
        subtopics: [
          "SQL queries (SELECT, JOIN, GROUP BY)",
          "Database design",
          "Data warehousing",
          "ETL processes",
          "Working with large datasets"
        ],
        description: "Working with large datasets stored in databases. Master SQL and database concepts for data extraction and management."
      },
      {
        id: 9,
        icon: "9️⃣",
        title: "Big Data Technologies",
        subtopics: [
          "Apache Hadoop",
          "Apache Spark",
          "Distributed computing",
          "PySpark for data processing",
          "Handling very large datasets"
        ],
        description: "Handling very large datasets efficiently. Learn distributed computing frameworks essential for big data applications."
      },
      {
        id: 10,
        icon: "🔟",
        title: "Data Visualization Tools",
        subtopics: [
          "Tableau for interactive dashboards",
          "Power BI for business intelligence",
          "Dashboard design principles",
          "Presenting insights effectively"
        ],
        description: "Presenting insights clearly and effectively. Master tools for creating interactive visualizations and dashboards."
      },
      {
        id: 11,
        icon: "1️⃣1️⃣",
        title: "Model Deployment",
        subtopics: [
          "APIs with Flask / FastAPI",
          "Cloud deployment (AWS, Azure, GCP)",
          "Docker basics",
          "Model monitoring",
          "Production best practices"
        ],
        description: "Putting models into production. Learn to deploy, manage, and monitor machine learning models in real-world environments."
      },
      {
        id: 12,
        icon: "1️⃣2️⃣",
        title: "Capstone Projects",
        subtopics: [
          "Sales prediction system",
          "Customer churn analysis",
          "Stock price prediction",
          "Recommendation system",
          "Fraud detection model"
        ],
        description: "Real-world projects demonstrating end-to-end data science workflow. Build a portfolio with practical applications."
      }
    ]
  },
  "ui-ux": {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Master user interface and user experience design principles",
    lessons: [
      { id: 1, title: "Introduction to UI/UX Design", completed: true },
      { id: 2, title: "User Research & Personas", completed: true },
      { id: 3, title: "Wireframing & Prototyping", completed: false },
      { id: 4, title: "Visual Design & UI", completed: false },
      { id: 5, title: "Testing & Usability", completed: false },
    ],
    topics: [
      {
        id: 1,
        icon: "🧠",
        title: "Introduction to UI/UX Design",
        subtopics: [
          "User-centered design",
          "Design thinking process",
          "UX vs UI differences",
          "Product lifecycle"
        ],
        description: "Overview of design thinking, user-centered design principles, and the difference between UI and UX."
      },
      {
        id: 2,
        icon: "🔍",
        title: "User Research (UX Foundation)",
        subtopics: [
          "User interviews",
          "Surveys",
          "Personas",
          "User journey mapping",
          "Competitive analysis"
        ],
        description: "Understanding user needs before designing. Learn research methods to inform design decisions."
      },
      {
        id: 3,
        icon: "🗂️",
        title: "Information Architecture",
        subtopics: [
          "Sitemap creation",
          "Navigation design",
          "Content hierarchy",
          "Card sorting"
        ],
        description: "Organizing content logically so users can easily navigate. Structure information for intuitive user interaction."
      },
      {
        id: 4,
        icon: "✏️",
        title: "Wireframing",
        subtopics: [
          "Figma for wireframing",
          "Adobe XD",
          "Sketch",
          "Low-fidelity layouts",
          "Planning structure"
        ],
        description: "Creating low-fidelity layouts to plan structure before visual design. Sketch your ideas quickly and efficiently."
      },
      {
        id: 5,
        icon: "🎨",
        title: "Visual (UI) Design",
        subtopics: [
          "Color theory",
          "Typography",
          "Spacing & layout",
          "Grid systems",
          "Iconography",
          "Design systems"
        ],
        description: "Designing the look and feel of the product. Master color, typography, and visual hierarchy principles."
      },
      {
        id: 6,
        icon: "📱",
        title: "Responsive & Mobile Design",
        subtopics: [
          "Mobile-first design",
          "Breakpoints",
          "Adaptive layouts",
          "Multi-device design",
          "Touch interfaces"
        ],
        description: "Designing for multiple screen sizes (mobile, tablet, desktop). Ensure consistent experience across devices."
      },
      {
        id: 7,
        icon: "🔄",
        title: "Prototyping",
        subtopics: [
          "Clickable prototypes",
          "Micro-interactions",
          "Animation basics",
          "Usability flows",
          "Interactive models"
        ],
        description: "Creating interactive models of the design. Bring your designs to life with interactive prototypes."
      },
      {
        id: 8,
        icon: "🧪",
        title: "Usability Testing",
        subtopics: [
          "A/B testing",
          "Heuristic evaluation",
          "Feedback analysis",
          "Iterative improvements",
          "User testing sessions"
        ],
        description: "Testing designs with real users to identify problems. Gather insights to improve your designs iteratively."
      },
      {
        id: 9,
        icon: "♿",
        title: "Accessibility (UX Best Practice)",
        subtopics: [
          "Color contrast",
          "Screen reader support",
          "WCAG guidelines",
          "Inclusive design principles",
          "Keyboard navigation"
        ],
        description: "Designing inclusive products for all users. Ensure your designs are accessible to everyone."
      },
      {
        id: 10,
        icon: "💻",
        title: "Basic Frontend Knowledge (Optional but Helpful)",
        subtopics: [
          "HTML basics",
          "CSS basics",
          "Design-to-code handoff",
          "Developer collaboration",
          "CSS Grid and Flexbox"
        ],
        description: "Understanding how designs are implemented. Learn enough frontend to collaborate effectively with developers."
      },
      {
        id: 11,
        icon: "📦",
        title: "Design Systems",
        subtopics: [
          "Component libraries",
          "UI kits",
          "Style guides",
          "Brand consistency",
          "Design tokens"
        ],
        description: "Creating reusable components and consistent styles. Build scalable design systems for large products."
      },
      {
        id: 12,
        icon: "🎯",
        title: "Portfolio & Real Projects",
        subtopics: [
          "Landing page design",
          "E-commerce app",
          "Banking app UI",
          "Dashboard design",
          "Mobile app redesign"
        ],
        description: "Real-world projects demonstrating design skills. Build a portfolio with diverse, polished design work."
      }
    ]
  }
};

export const getCourseById = (courseId) => {
  return courseData[courseId] || null;
};
