document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    counters.forEach((counter) => {
        const target = Number(counter.getAttribute('data-target'));
        if (!Number.isFinite(target) || target <= 0) return;

        let current = 0;
        const increment = Math.ceil(target / 100);

        const animate = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                return;
            }
            counter.textContent = current.toLocaleString();
            requestAnimationFrame(animate);
        };

        animate();
    });
});
