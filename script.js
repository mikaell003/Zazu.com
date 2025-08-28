// Mobile menu toggle functionality
document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-bars');
});

// Mobile dropdown toggle functionality
document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// Close menu when a nav link is clicked (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.menu-toggle i').classList.remove('fa-times');
        document.querySelector('.menu-toggle i').classList.add('fa-bars');
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const toolCards = document.querySelectorAll('.tool-card');
const noResults = document.getElementById('noResults');
const sectionHeaders = document.querySelectorAll('.section-header');

// Function to perform the search filtering
function filterTools() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let hasResults = false;
    let visibleSections = new Set();

    // First hide all cards and show matching ones
    toolCards.forEach(card => {
        const searchData = card.getAttribute('data-search').toLowerCase();
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardText = card.querySelector('p').textContent.toLowerCase();

        if (searchTerm === '' ||
            searchData.includes(searchTerm) ||
            cardTitle.includes(searchTerm) ||
            cardText.includes(searchTerm)) {
            card.classList.remove('hidden');
            hasResults = true;
            // Track which sections have visible cards
            let prevSibling = card.previousElementSibling;
            while (prevSibling && !prevSibling.classList.contains('section-header')) {
                prevSibling = prevSibling.previousElementSibling;
            }
            if (prevSibling) {
                visibleSections.add(prevSibling.id || prevSibling.textContent.toLowerCase().replace(/\s/g, '-'));
            }

        } else {
            card.classList.add('hidden');
        }
    });

    // Then, show/hide section headers based on whether they have visible cards
    sectionHeaders.forEach(header => {
        // Determine header ID/identifier
        const headerId = header.id || header.textContent.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '');

        // Check if any card in this section is visible
        let sectionHasVisibleCards = false;
        let nextSibling = header.nextElementSibling;
        while (nextSibling && !nextSibling.classList.contains('section-header') && !nextSibling.classList.contains('no-results')) {
            if (nextSibling.classList.contains('tool-card') && !nextSibling.classList.contains('hidden')) {
                sectionHasVisibleCards = true;
                break;
            }
            nextSibling = nextSibling.nextElementSibling;
        }

        if (searchTerm === '' || sectionHasVisibleCards) {
            header.style.display = 'block'; // Show the header
        } else {
            header.style.display = 'none'; // Hide the header
        }
    });

    // Show/hide no results message
    if (!hasResults && searchTerm !== '') {
        noResults.classList.add('show');
    } else {
        noResults.classList.remove('show');
    }
}

searchInput.addEventListener('keyup', filterTools);
// Also run filter on input change (e.g., clear button)
searchInput.addEventListener('input', filterTools);

// Initial filter to set up visibility correctly on load
filterTools();

// Scroll to top button functionality
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Simulate loading for demonstration (remove in production)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('active'); // Show loader immediately on page load
    setTimeout(() => {
        loader.classList.remove('active');
    }, 800); // Hide after 0.8 second
});

function navigateTo(url) {
    document.getElementById('loader').classList.add('active');
    setTimeout(() => {
        window.location.href = url;
    }, 300); // Small delay for loader animation
}