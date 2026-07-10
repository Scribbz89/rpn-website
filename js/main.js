function toggleMenu() {
    document.getElementById('nav-mobile').classList.toggle('open');
}

// Close mobile menu on scroll
window.addEventListener('scroll', function() {
    document.getElementById('nav-mobile').classList.remove('open');
});

// Smooth nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(function(s) {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(function(a) {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--green-bright)' : '';
    });
});
