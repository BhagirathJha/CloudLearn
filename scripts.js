// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  if (!themeToggle) return

  const themeIcon = themeToggle.querySelector("i")

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark") {
    document.body.classList.add("dark")
    document.body.classList.remove("auto-theme")
    themeIcon.classList.remove("fa-sun")
    themeIcon.classList.add("fa-moon")
  } else if (savedTheme === "light") {
    document.body.classList.remove("dark")
    document.body.classList.remove("auto-theme")
    themeIcon.classList.add("fa-sun")
    themeIcon.classList.remove("fa-moon")
  }

  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
      // Switch to light mode
      document.body.classList.remove("dark")
      document.body.classList.remove("auto-theme")
      localStorage.setItem("theme", "light")
      themeIcon.classList.add("fa-sun")
      themeIcon.classList.remove("fa-moon")
    } else {
      // Switch to dark mode
      document.body.classList.add("dark")
      document.body.classList.remove("auto-theme")
      localStorage.setItem("theme", "dark")
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
    }
  })
}

// Image slider functionality
function initImageSlider() {
  const slider = document.querySelector(".slider")
  if (!slider) return

  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".slider-dot")
  const prevBtn = document.querySelector(".slider-btn.prev")
  const nextBtn = document.querySelector(".slider-btn.next")

  let currentSlide = 0
  const slideCount = slides.length

  function goToSlide(index) {
    if (index < 0) index = slideCount - 1
    if (index >= slideCount) index = 0

    slider.style.transform = `translateX(-${index * 100}%)`

    // Update active dot
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })

    currentSlide = index
  }

  // Initialize dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
  })

  // Previous and next buttons
  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlide - 1)
  })

  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlide + 1)
  })

  // Auto slide
  let slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1)
  }, 5000)

  // Pause auto slide on hover
  const sliderContainer = document.querySelector(".slider-container")

  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval)
  })

  sliderContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1)
    }, 5000)
  })
}

// Sign in modal functionality
function initSignInModal() {
  const signInBtn = document.getElementById("sign-in-btn")
  if (!signInBtn) return

  const signInModal = document.getElementById("sign-in-modal")
  const closeModal = document.getElementById("close-modal")

  signInBtn.addEventListener("click", () => {
    signInModal.classList.add("active")
  })

  closeModal.addEventListener("click", () => {
    signInModal.classList.remove("active")
  })

  // Close modal when clicking outside
  signInModal.addEventListener("click", (e) => {
    if (e.target === signInModal) {
      signInModal.classList.remove("active")
    }
  })

  // Form submission
  const signInForm = document.getElementById("sign-in-form")

  signInForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // In a real app, you would handle authentication here
    alert("Sign in functionality would be implemented in a real application.")
    signInModal.classList.remove("active")
  })
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById("search-input")
  if (!searchInput) return

  const searchResults = document.getElementById("search-results")

  // Sample search data (in a real app, this would come from a database or API)
  const searchData = [
    { title: "AWS", category: "Provider", url: "providers/aws.html" },
    { title: "Azure", category: "Provider", url: "providers/azure.html" },
    { title: "Google Cloud Platform", category: "Provider", url: "providers/gcp.html" },
    { title: "IBM Cloud", category: "Provider", url: "providers/ibm.html" },
    { title: "Oracle Cloud", category: "Provider", url: "providers/oci.html" },
    { title: "Cloud Fundamentals", category: "Course", url: "courses/cloud-fundamentals.html" },
    { title: "AWS Solutions Architect", category: "Course", url: "courses/aws-solutions-architect.html" },
    { title: "Multi-Cloud Strategy", category: "Course", url: "courses/multi-cloud-strategy.html" },
    { title: "Cloud Security", category: "Resource", url: "resources/cloud-security.html" },
    { title: "Serverless Computing", category: "Resource", url: "resources/serverless.html" },
    { title: "Kubernetes", category: "Technology", url: "resources/kubernetes.html" },
    { title: "Docker", category: "Technology", url: "resources/docker.html" },
    { title: "Microservices", category: "Architecture", url: "resources/microservices.html" },
    { title: "DevOps", category: "Practice", url: "resources/devops.html" },
    { title: "Infrastructure as Code", category: "Practice", url: "resources/iac.html" },
  ]

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim()

    if (query.length < 2) {
      searchResults.classList.add("hidden")
      return
    }

    const filteredResults = searchData.filter(
      (item) => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query),
    )

    if (filteredResults.length > 0) {
      searchResults.innerHTML = filteredResults
        .map(
          (result) => `
        <div class="search-result-item" data-url="${result.url}">
          <div class="search-result-title">${result.title}</div>
          <div class="search-result-category">${result.category}</div>
        </div>
      `,
        )
        .join("")

      searchResults.classList.remove("hidden")

      // Add click event to search results
      document.querySelectorAll(".search-result-item").forEach((item) => {
        item.addEventListener("click", () => {
          window.location.href = item.dataset.url
        })
      })
    } else {
      searchResults.innerHTML = `<div class="search-result-item">No results found</div>`
      searchResults.classList.remove("hidden")
    }
  })

  // Hide search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add("hidden")
    }
  })
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// Add this function to handle the mobile menu
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  if (!mobileMenuToggle || !mobileMenu) return

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")

    // Change icon based on menu state
    const icon = mobileMenuToggle.querySelector("i")
    if (mobileMenu.classList.contains("hidden")) {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    } else {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    }
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      const icon = mobileMenuToggle.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    })
  })
}

// Add the mobile menu initialization to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear()
  initThemeToggle()
  initImageSlider()
  initSignInModal()
  initSearch()
  initMobileMenu() // Add this line
})
