document.addEventListener('DOMContentLoaded', () => {

    /* ===== Navbar Scroll Effect ===== */
    const nav = document.getElementById('siteNav');

    const handleNav = () => {
        if (!nav) return;
        nav.classList.toggle('scrolled', window.scrollY > 15);
    };

    handleNav();
    window.addEventListener('scroll', handleNav, { passive: true });


    /* ===== Reveal Animation on Scroll ===== */
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.18 });

        reveals.forEach((el) => observer.observe(el));
    }


    /* ===== Animated Counters ===== */
    const counters = document.querySelectorAll('.counter');

    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const target = Number(el.dataset.target || '0');
                if (!Number.isFinite(target) || target <= 0) return;

                let current = 0;
                const duration = 1400;
                const startTime = performance.now();

                const tick = (now) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    current = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
                    el.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        el.textContent = target.toLocaleString();
                    }
                };

                requestAnimationFrame(tick);
                obs.unobserve(el);
            });
        }, { threshold: 0.35 });

        counters.forEach((counter) => counterObserver.observe(counter));
    }

});