document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.skill-progress');

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const target = bar.dataset.width || bar.getAttribute('data-width') || bar.getAttribute('aria-valuenow');
                    bar.style.width = (target ? target : 0) + '%';
                    bar.classList.add('animate');
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        progressBars.forEach(bar => {
            obs.observe(bar);
        });
    } else {
        // fallback: set widths immediately
        progressBars.forEach(bar => {
            const target = bar.dataset.width || bar.getAttribute('data-width') || bar.getAttribute('aria-valuenow');
            bar.style.width = (target ? target : 0) + '%';
        });
    }
});
