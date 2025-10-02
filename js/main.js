// --- Navigation and Page Logic ---

// Function to handle page and fragment navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }
}

// Function to manage active class on navigation links
function setActiveLink(linkElement) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    if (linkElement) {
        linkElement.classList.add('active');
    }
}

// --- Event Listeners and Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial page load based on URL or default to 'home'
    const pageIdFromUrl = window.location.hash ? window.location.hash.substring(1) : 'home';
    showPage(pageIdFromUrl);

    // Initial link activation based on URL or default to 'home'
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');

    // Determine the initial active link based on the current page URL
    const currentPage = window.location.pathname.split("/").pop();
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage || (link.href.includes("index.html") && currentPage === "")) {
            setActiveLink(link);
        }
    });

    // Add click event listeners to main nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            setActiveLink(link);
            const targetPageId = link.getAttribute('onclick')?.match(/showPage\('([^']+)'\)/)?.[1];
            if (targetPageId) {
                showPage(targetPageId);
            }
        });
    });

    // Add click event listeners to dropdown links
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            const parentNavListItem = link.closest('.nav-item');
            if (parentNavListItem) {
                const parentNavLink = parentNavListItem.querySelector('.nav-link');
                setActiveLink(parentNavLink);
            }
            // Logic to show the correct page for dropdowns
            const targetPageId = link.getAttribute('onclick')?.match(/showPage\('([^']+)'\)/)?.[1];
            if (targetPageId) {
                showPage(targetPageId);
            }
        });
    });

    // --- Other Functionality ---

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const body = document.body;
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Back-to-top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // News slider animation
    const slider = document.getElementById('news-slider');
    const track = document.getElementById('track');
    if (track && slider) {
        const originalItems = Array.from(track.children);
        if (originalItems.length > 0) {
            originalItems.forEach(node => track.appendChild(node.cloneNode(true)));
            let pxPerMs = 0.05;
            let x = 0;
            let lastTime = null;
            let animId = null;

            function step(ts) {
                if (!lastTime) lastTime = ts;
                const dt = ts - lastTime;
                lastTime = ts;
                x -= pxPerMs * dt;
                const resetPoint = -track.scrollWidth / 2;
                if (x <= resetPoint) {
                    x += -resetPoint;
                }
                track.style.transform = `translateX(${x}px)`;
                animId = requestAnimationFrame(step);
            }

            animId = requestAnimationFrame(step);

            slider.addEventListener('mouseenter', () => {
                if (animId) cancelAnimationFrame(animId);
                animId = null;
                lastTime = null;
            });
            slider.addEventListener('mouseleave', () => {
                if (!animId) animId = requestAnimationFrame(step);
            });
            window.addEventListener('resize', () => {
                x = 0;
                track.style.transform = 'translateX(0)';
            });
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('footer.html') // Adjust path relative to HTML file
        .then(response => {
            if (!response.ok) throw new Error('Footer not found');
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(err => console.error('Failed to load footer:', err));
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    if (!form) {
        console.error('Form not found!');
        return;
    }

    console.log('Form found, adding event listener...');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log('Form submitted, preventDefault called');

        const submitBtn = document.getElementById('submit-btn');
        const successMessageDiv = document.getElementById('success-message');

        successMessageDiv.style.display = 'none';

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        };

        console.log('Sending data:', formData);

        try {
            const response = await fetch("http://127.0.0.1:8000/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok && data.status === 'success') {
                successMessageDiv.textContent = data.message;
                successMessageDiv.style.display = 'block';
                successMessageDiv.style.color = 'green';
                successMessageDiv.style.backgroundColor = '#d4edda';
                successMessageDiv.style.border = '1px solid #c3e6cb';
                successMessageDiv.style.padding = '10px';
                successMessageDiv.style.borderRadius = '5px';

                form.reset();
            } else {
                successMessageDiv.textContent = data.detail || 'An error occurred. Please try again.';
                successMessageDiv.style.display = 'block';
                successMessageDiv.style.color = '#721c24';
                successMessageDiv.style.backgroundColor = '#f8d7da';
                successMessageDiv.style.border = '1px solid #f5c6cb';
                successMessageDiv.style.padding = '10px';
                successMessageDiv.style.borderRadius = '5px';
            }
        } catch (error) {
            console.error('Error:', error);
            successMessageDiv.textContent = 'Failed to submit. Please check your connection.';
            successMessageDiv.style.display = 'block';
            successMessageDiv.style.color = '#721c24';
            successMessageDiv.style.backgroundColor = '#f8d7da';
            successMessageDiv.style.border = '1px solid #f5c6cb';
            successMessageDiv.style.padding = '10px';
            successMessageDiv.style.borderRadius = '5px';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("searchToggle");
  const searchBox = document.getElementById("searchBox");

  // Show search box and hide button
  searchToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    searchToggle.style.display = "none";     // hide button
    searchBox.classList.add("active");       // show form
    searchBox.querySelector("input").focus();
  });

  // Close search box when clicking outside
  document.addEventListener("click", function (event) {
    if (
      searchBox.classList.contains("active") &&
      !searchBox.contains(event.target)
    ) {
      searchBox.classList.remove("active");  // hide form
      setTimeout(() => {
        searchBox.style.display = "none";    // ensure it's hidden
        searchToggle.style.display = "inline-flex"; // bring back button
      }, 300); // wait for animation
    }
  });
});
