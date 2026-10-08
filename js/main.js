/**
 * AUTO STUDIO - Premium Automotive Detailing
 * Core Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // --------------------------------------------------------------------------
    // Header Scroll Effect
    // --------------------------------------------------------------------------
    const header = document.querySelector('.header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init
    }

    // --------------------------------------------------------------------------
    // FAQ Accordion Logic
    // --------------------------------------------------------------------------
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
            }
            
            item.classList.toggle('active');
            
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --------------------------------------------------------------------------
    // Before/After Slider Logic
    // --------------------------------------------------------------------------
    const slider = document.querySelector('.image-comparison-slider');
    if (slider) {
        const beforeImage = slider.querySelector('.image-before');
        const sliderHandle = slider.querySelector('.slider-handle');
        let isSliding = false;

        const slide = (e) => {
            if (!isSliding) return;
            
            let position;
            const rect = slider.getBoundingClientRect();
            
            if (e.type.includes('mouse')) {
                position = e.clientX - rect.left;
            } else if (e.type.includes('touch')) {
                position = e.touches[0].clientX - rect.left;
            }
            
            position = Math.max(0, Math.min(position, rect.width));
            const percentage = (position / rect.width) * 100;
            
            beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            sliderHandle.style.left = `${percentage}%`;
        };

        slider.addEventListener('mousedown', () => isSliding = true);
        slider.addEventListener('touchstart', () => isSliding = true, { passive: true });
        
        window.addEventListener('mouseup', () => isSliding = false);
        window.addEventListener('touchend', () => isSliding = false);
        
        window.addEventListener('mousemove', slide);
        window.addEventListener('touchmove', slide, { passive: true });
    }

});
