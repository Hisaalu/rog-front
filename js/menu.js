function toggleMobileDropdown(dropdownId, iconElement) {
    const dropdown = document.getElementById(dropdownId);
    
    // Toggle the 'active' class on the dropdown
    dropdown.classList.toggle('active');
    
    // Change the icon based on the active state
    if (dropdown.classList.contains('active')) {
        iconElement.textContent = '-';
    } else {
        iconElement.textContent = '+';
    }
}
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  const menuToggle = document.getElementById('menu-toggle');

  mobileNav.classList.toggle('active');
  overlay.classList.toggle('active');
  menuToggle.classList.toggle('active'); // This line is what makes the icons switch
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  const menuToggle = document.getElementById('menu-toggle');

  mobileNav.classList.remove('active');
  overlay.classList.remove('active');
  menuToggle.classList.remove('active');
}

window.addEventListener('resize', function() {
  const mobileNav = document.getElementById('mobileNav');
  const menuToggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('overlay');

  // Check if the screen width is greater than your mobile breakpoint (e.g., 768px)
  if (window.innerWidth > 768) {
    // If it is, ensure the mobile menu is closed and the classes are removed
    mobileNav.classList.remove('active');
    menuToggle.classList.remove('active');
    overlay.classList.remove('active');
  }
});