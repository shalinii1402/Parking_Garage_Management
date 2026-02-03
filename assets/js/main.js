// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        if (window.lucide) lucide.createIcons();
    }
}

// Sidebar Toggle Logic (Dashboard)
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Reveal on Scroll
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
};

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        updateThemeIcon(savedTheme);
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (window.lucide) lucide.createIcons();
    reveal();

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Back to Top Logic
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // Load Footer Component
    const footerPlaceholder = document.getElementById('parksmart-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid reveal">
                    <div class="footer-brand">
                        <a href="index.html" class="logo"><i data-lucide="parking-circle"></i> ParkSmart</a>
                        <p>Revolutionizing urban mobility with smart parking solutions. Efficient, reliable, and
                            digital-first parking for everyone.</p>
                    </div>
                    <div>
                        <h4 class="footer-title">Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="index.html">Home 1</a></li>
                            <li><a href="home-2.html">Home 2</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="plans.html">Pricing Plans</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="footer-title">Resources</h4>
                        <ul class="footer-links">
                            <li><a href="locations.html">Our Locations</a></li>
                            <li><a href="map.html">Live Space Map</a></li>
                            <li><a href="#">Support Center</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="footer-title">Contact Info</h4>
                        <ul class="contact-info">
                            <li><i data-lucide="mail"></i> support@parksmart.com</li>
                            <li><i data-lucide="phone"></i> +1 (555) 123-4567</li>
                            <li><i data-lucide="map-pin"></i> 500 Innovation Way, Tech City</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="footer-title">Follow Us</h4>
                        <div class="social-links">
                            <a href="#" class="social-link"><i data-lucide="twitter"></i></a>
                            <a href="#" class="social-link"><i data-lucide="linkedin"></i></a>
                            <a href="#" class="social-link"><i data-lucide="github"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 ParkSmart. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
        `;
        // Re-initialize icons for the newly added footer
        if (window.lucide) lucide.createIcons();
        // Re-initialize reveal for footer elements
        reveal();
    }
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');

    // Icon toggle
    const toggleBtn = document.getElementById('mobileToggle');
    const icon = toggleBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    if (window.lucide) lucide.createIcons();
}
