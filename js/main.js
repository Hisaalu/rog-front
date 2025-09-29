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


let isSearchOpen = false;

function toggleSearch() {
    if (isSearchOpen) {
        closeSearch();
    } else {
        openSearch();
    }
}

function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    const backdrop = document.getElementById('backdrop');
    const searchInput = document.getElementById('searchInput');
    
    overlay.classList.add('active');
    backdrop.classList.add('active');
    isSearchOpen = true;
    
    // Focus on input with slight delay for smooth animation
    setTimeout(() => {
        searchInput.focus();
    }, 200);
}

function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    const backdrop = document.getElementById('backdrop');
    
    overlay.classList.remove('active');
    backdrop.classList.remove('active');
    isSearchOpen = false;
    
    // Clear input when closing
    document.getElementById('searchInput').value = '';
}

function performSearch() {
    const searchValue = document.getElementById('searchInput').value.trim();
    if (searchValue) {
        // Replace this alert with your actual search functionality
        alert(`Searching for: "${searchValue}"`);
        closeSearch();
    }
}

function fillSearch(term) {
    document.getElementById('searchInput').value = term;
    document.getElementById('searchInput').focus();
}

// Close search with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
    }
    if (e.key === 'Enter' && isSearchOpen) {
        performSearch();
    }
});

// Keyboard navigation within overlay
document.addEventListener('keydown', function(e) {
    if (isSearchOpen && e.key === 'Tab') {
        const searchInput = document.getElementById('searchInput');
        const closeButton = document.querySelector('.close-button');
        const submitButton = document.querySelector('.search-submit');
        
        if (!e.shiftKey && document.activeElement === submitButton) {
            e.preventDefault();
            closeButton.focus();
        } else if (e.shiftKey && document.activeElement === searchInput) {
            e.preventDefault();
            submitButton.focus();
        }
    }
});

