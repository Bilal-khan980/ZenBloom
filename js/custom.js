// Import jQuery if it's not already available
if (typeof $ === "undefined") {
  console.warn("jQuery is not loaded. Some functionality may not work properly.")
}

$(() => {
  // Preloader
  $(window).on("load", () => {
    $(".preloader").fadeOut(1000) // set duration in milliseconds
  })

  // MENU
  $(".navbar-collapse a").on("click", () => {
    $(".navbar-collapse").collapse("hide")
  })

  // Smooth scrolling
  $(() => {
    $(".custom-navbar a, #home a").on("click", function (event) {
      var $anchor = $(this)
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000,
        )
      event.preventDefault()
    })
  })

  // Navbar scroll effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse")
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse")
    }

    if ($(this).scrollTop() > 100) {
      $(".navbar-default").addClass("scrolled")
    } else {
      $(".navbar-default").removeClass("scrolled")
    }
  })

  // Mobile menu
  $(".navbar-toggle").click(function () {
    $(this).toggleClass("active")
  })

  // HOME SLIDER & COURSES & CLIENTS
  $(".home-slider").owlCarousel({
    animateOut: "fadeOut",
    items: 1,
    loop: true,
    dots: false,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
  })

  $(".owl-courses").owlCarousel({
    animateOut: "fadeOut",
    loop: true,
    autoplayHoverPause: false,
    autoplay: true,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  })

  // Counter animation
  $(".counter").each(function () {
    var $this = $(this),
      countTo = $this.attr("data-count")

    $({ countNum: $this.text() }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 3000,
        easing: "linear",
        step: function () {
          $this.text(Math.floor(this.countNum))
        },
        complete: function () {
          $this.text(this.countNum)
        },
      },
    )
  })

  // Trigger counter animation when in viewport
  function checkCounters() {
    $(".counter").each(function () {
      var elementTop = $(this).offset().top
      var elementBottom = elementTop + $(this).outerHeight()
      var viewportTop = $(window).scrollTop()
      var viewportBottom = viewportTop + $(window).height()

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        if (!$(this).hasClass("animated")) {
          $(this).addClass("animated")
        }
      }
    })
  }

  $(window).scroll(checkCounters)

  // PARALLAX EFFECT
  $.stellar({
    horizontalScrolling: false,
  })

  // BACKSTRETCH - HERO SLIDER
  if ($(".home-slider").length === 0) {
    $(".home-bg-slider").backstretch(["images/home-bg-slider-img1.jpg", "images/home-bg-slider-img2.jpg"], {
      duration: 5000,
      fade: 1200,
    })
  }

  // Owl Carousel for testimonials
  $("#owl-testimonial").owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
    },
  })

  // Form validation and submission
  $("#contact-form").submit(function (e) {
    e.preventDefault()

    var form = $(this)
    var formData = form.serialize()

    // Basic validation
    var isValid = true
    form.find("input[required], textarea[required], select[required]").each(function () {
      if (!$(this).val()) {
        isValid = false
        $(this).addClass("error")
      } else {
        $(this).removeClass("error")
      }
    })

    if (isValid) {
      // Simulate form submission
      var submitBtn = form.find('input[type="submit"]')
      var originalText = submitBtn.val()

      submitBtn.val("Sending...").prop("disabled", true)

      setTimeout(() => {
        submitBtn.val("Message Sent!").removeClass("btn-primary").addClass("btn-success")
        form[0].reset()

        setTimeout(() => {
          submitBtn.val(originalText).prop("disabled", false).removeClass("btn-success").addClass("btn-primary")
        }, 3000)
      }, 2000)
    }
  })

  // Newsletter subscription
  $(".newsletter-form, .newsletter-signup form").submit(function (e) {
    e.preventDefault()

    var form = $(this)
    var email = form.find('input[type="email"]').val()

    if (email) {
      var submitBtn = form.find('button[type="submit"]')
      var originalText = submitBtn.text()

      submitBtn.text("Subscribing...").prop("disabled", true)

      setTimeout(() => {
        submitBtn.text("Subscribed!").removeClass("btn-primary").addClass("btn-success")
        form[0].reset()

        setTimeout(() => {
          submitBtn.text(originalText).prop("disabled", false).removeClass("btn-success").addClass("btn-primary")
        }, 3000)
      }, 1500)
    }
  })

  // Pricing plan selection
  $(".pricing__action").click(function (e) {
    e.preventDefault()

    var planName = $(this).closest(".pricing__item").find(".pricing__title").text()
    var planPrice = $(this).closest(".pricing__item").find(".pricing__price").text()

    // Store selected plan in localStorage
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({
        name: planName,
        price: planPrice,
      }),
    )

    // Redirect to contact page or show modal
    window.location.href = "contact.html"
  })

  // Load selected plan on contact page
  if (window.location.pathname.includes("contact.html")) {
    var selectedPlan = localStorage.getItem("selectedPlan")
    if (selectedPlan) {
      selectedPlan = JSON.parse(selectedPlan)
      $('#contact-form select[name="interest"]').val("membership")
      $('#contact-form textarea[name="message"]').val(
        "I am interested in the " +
          selectedPlan.name +
          " plan (" +
          selectedPlan.price +
          "/month). Please contact me with more information.",
      )
    }
  }

  // Search functionality
  $(".search-form").submit(function (e) {
    e.preventDefault()
    var searchTerm = $(this).find("input").val()
    if (searchTerm) {
      // Simulate search - in real implementation, this would filter blog posts
      alert("Searching for: " + searchTerm)
    }
  })

  // Category filter
  $(".category-list a").click(function (e) {
    e.preventDefault()
    var category = $(this).text().split("(")[0].trim()
    // Simulate category filtering
    console.log("Filtering by category:", category)
  })

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Back to top button
  var backToTop = $('<div class="back-to-top"><i class="fa fa-arrow-up"></i></div>')
  $("body").append(backToTop)

  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      backToTop.fadeIn()
    } else {
      backToTop.fadeOut()
    }
  })

  backToTop.click(() => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800,
    )
  })

  // Add CSS for back to top button
  $("<style>")
    .prop("type", "text/css")
    .html(`
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #FF6B35 0%, #F39C12 100%);
                border-radius: 50%;
                display: none;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .back-to-top:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            .back-to-top i {
                font-size: 1.2rem;
            }
        `)
    .appendTo("head")

  // Animate elements on scroll
  function animateOnScroll() {
    $(".wow").each(function () {
      var elementTop = $(this).offset().top
      var elementBottom = elementTop + $(this).outerHeight()
      var viewportTop = $(window).scrollTop()
      var viewportBottom = viewportTop + $(window).height()

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        if (!$(this).hasClass("animated")) {
          $(this).addClass("animated")
          var animationClass = $(this).data("wow-animation") || "fadeInUp"
          $(this).addClass(animationClass)
        }
      }
    })
  }

  $(window).scroll(animateOnScroll)
  animateOnScroll() // Run on page load

  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip()

  // Initialize popovers
  $('[data-toggle="popover"]').popover()

  // Add loading states to buttons
  $(".btn").click(function () {
    var btn = $(this)
    if (!btn.hasClass("no-loading")) {
      btn.addClass("loading")
      setTimeout(() => {
        btn.removeClass("loading")
      }, 2000)
    }
  })

  // Add CSS for button loading state
  $("<style>")
    .prop("type", "text/css")
    .html(`
            .btn.loading {
                position: relative;
                color: transparent !important;
            }
            .btn.loading:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `)
    .appendTo("head")

  // Sticky navigation
  var stickyNavTop = $(".navbar").offset().top

  function stickyNav() {
    var scrollTop = $(window).scrollTop()

    if (scrollTop > stickyNavTop) {
      $(".navbar").addClass("sticky-navigation")
    } else {
      $(".navbar").removeClass("sticky-navigation")
    }
  }

  $(window).scroll(stickyNav)

  // Add CSS for sticky navigation
  $("<style>")
    .prop("type", "text/css")
    .html(`
            .sticky-navigation {
                position: fixed !important;
                top: 0;
                width: 100%;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(10px);
                box-shadow: 0 2px 20px rgba(0,0,0,0.1) !important;
                animation: slideDown 0.3s ease;
            }
            @keyframes slideDown {
                from {
                    transform: translateY(-100%);
                }
                to {
                    transform: translateY(0);
                }
            }
        `)
    .appendTo("head")

  // Initialize WOW.js if available
  // Check if WOW is defined before using it
  if (typeof window.WOW !== "undefined") {
    new window.WOW({ mobile: false }).init()
  }

  // Page transition effect
  $('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])').click(function (e) {
    if (this.hostname === window.location.hostname) {
      e.preventDefault()
      var href = this.href

      $("body").fadeOut(300, () => {
        window.location.href = href
      })
    }
  })

  // Show page with fade in effect
  $("body").hide().fadeIn(300)
})

// Additional utility functions
function showNotification(message, type = "success") {
  var notification = $('<div class="notification notification-' + type + '">' + message + "</div>")
  $("body").append(notification)

  setTimeout(() => {
    notification.addClass("show")
  }, 100)

  setTimeout(() => {
    notification.removeClass("show")
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

// Add CSS for notifications
$("<style>")
  .prop("type", "text/css")
  .html(`
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-success {
            background: linear-gradient(135deg, #27AE60, #2ECC71);
        }
        .notification-error {
            background: linear-gradient(135deg, #E74C3C, #C0392B);
        }
        .notification-info {
            background: linear-gradient(135deg, #3498DB, #2980B9);
        }
    `)
  .appendTo("head")

// Performance optimization
$(window).on("load", () => {
  // Remove unused CSS classes
  setTimeout(() => {
    $("*").each(function () {
      var element = $(this)
      var classes = element.attr("class")
      if (classes) {
        var classList = classes.split(" ")
        var usedClasses = []
        classList.forEach((className) => {
          if (className && element.hasClass(className)) {
            usedClasses.push(className)
          }
        })
        if (usedClasses.length !== classList.length) {
          element.attr("class", usedClasses.join(" "))
        }
      }
    })
  }, 5000)
})
