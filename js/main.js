/**
 * AUTO STUDIO - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Accordion Logic for FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close currently open item
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
            }
            
            // Toggle current item
            item.classList.toggle('active');
            
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Before/After Slider Logic
    const slider = document.querySelector('.image-comparison-slider');
    if (slider) {
        const beforeImage = slider.querySelector('.image-before');
        const sliderHandle = slider.querySelector('.slider-handle');
        let isSliding = false;

        const slide = (e) => {
            if (!isSliding) return;
            
            // Get position
            let position;
            const rect = slider.getBoundingClientRect();
            
            if (e.type.includes('mouse')) {
                position = e.clientX - rect.left;
            } else if (e.type.includes('touch')) {
                position = e.touches[0].clientX - rect.left;
            }
            
            // Clamp position between 0 and width
            position = Math.max(0, Math.min(position, rect.width));
            
            // Calculate percentage based on RTL or LTR
            // Since it's RTL but the slider visual logic goes left to right physically:
            const percentage = (position / rect.width) * 100;
            
            // Adjust clip-path and handle position
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

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 17, 21, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(15, 17, 21, 0.85)';
            header.style.boxShadow = 'none';
        }
    }, { passive: true });

});
