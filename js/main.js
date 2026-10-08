/**
 * AUTO STUDIO - Premium Automotive Detailing & Paint Correction JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
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

    // Open first accordion item by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
        const firstContent = accordionItems[0].querySelector('.accordion-content');
        if (firstContent) {
            firstContent.style.maxHeight = firstContent.scrollHeight + "px";
        }
    }

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

    // --------------------------------------------------------------------------
    // Header Scroll Glassmorphism Effect
    // --------------------------------------------------------------------------
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.style.background = 'rgba(9, 10, 13, 0.95)';
                header.style.borderBottomColor = 'rgba(212, 175, 55, 0.2)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(9, 10, 13, 0.85)';
                header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // --------------------------------------------------------------------------
    // Interactive Estimator / Treatment Wizard
    // --------------------------------------------------------------------------
    const wizardState = {
        condition: null,
        goal: null
    };

    const wizardOptions = document.querySelectorAll('.wizard-option-btn');
    const wizardResult = document.getElementById('wizard-result');
    const resultTitle = document.getElementById('result-package-title');
    const resultDesc = document.getElementById('result-package-desc');
    const resultCta = document.getElementById('result-package-cta');

    const packagesMap = {
        'new_showroom': {
            title: 'חבילת Ceramic Protection & PPF',
            desc: 'הגנה היקפית מלאה לרכב חדש. ציפוי קרמי מתקדם (Gtechniq/Modesta) או ציפוי PPF שקוף השומר על צבע היצרן ללא שריטה ומקל על השטיפה.',
            msg: 'היי%20Auto%20Studio,%20מעוניין%20בחבילת%20הגנה%20לרכב%20חדש%20מהסוכנות.%20אשמח%20לפרטים.'
        },
        'swirls_shine': {
            title: 'חבילת Paint Correction & Gloss Reset',
            desc: 'פוליש רב-שלבי מדויק להעלמת 85-95% מסימני הסווירל והשריטות, בשילוב ציפוי קרמי נאנו להעמקת הברק ומניעת חמצון.',
            msg: 'היי%20Auto%20Studio,%20מעוניין%20בחידוש%20ברק%20והעלמת%20שריטות%20לרכב%20שלי.%20אשמח%20לפרטים.'
        },
        'full_restore': {
            title: 'AUTO STUDIO SIGNATURE DETAIL',
            desc: 'שיקום טוטאלי מקיף (פנים וחוץ). אבחון בלייזר, תיקון לכה עמוק, דיטיילינג פנים מלא וריענון עור, בשילוב ציפוי קרמי מלא.',
            msg: 'היי%20Auto%20Studio,%20מעוניין%20בטיפול%20Signature%20הטוטאלי%20לשיקום%20מלא%20של%20הרכב.'
        }
    };

    wizardOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.dataset.group;
            const val = btn.dataset.val;

            // Remove active from sibling buttons in group
            document.querySelectorAll(`.wizard-option-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            wizardState[group] = val;

            // Check if both selected
            if (wizardState.condition) {
                let pkgKey = 'swirls_shine';
                if (wizardState.condition === 'new') pkgKey = 'new_showroom';
                else if (wizardState.condition === 'used') pkgKey = 'full_restore';

                const pkg = packagesMap[pkgKey];
                if (resultTitle && resultDesc && resultCta) {
                    resultTitle.textContent = pkg.title;
                    resultDesc.textContent = pkg.desc;
                    resultCta.href = `https://wa.me/972509571597?text=${pkg.msg}`;
                    wizardResult.style.display = 'block';
                    wizardResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

});
