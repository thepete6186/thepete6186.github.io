document.body.addEventListener('contextmenu', e => e.preventDefault() & e.stopPropagation());
document.body.addEventListener('mousemove', onMouseMove);
document.body.addEventListener('touchmove', e => onMouseMove(e.touches[0]));

let anchorX = window.innerWidth / 2; // Center the wheel horizontally
let anchorY = window.innerHeight / 2; // Center the wheel vertically
let min = 100;
const wheel = document.querySelector('.wheel');

// Set the wheel's initial position and make it always visible
wheel.style.setProperty('--x', `${anchorX}px`);
wheel.style.setProperty('--y', `${anchorY}px`);
wheel.classList.add('on');

function onMouseMove({ clientX: x, clientY: y }) {
	if (!showing) return;

	let dx = x - anchorX;
	let dy = y - anchorY;
	let mag = Math.sqrt(dx * dx + dy * dy);
	let index = 0;

	if (mag >= min) {
		let deg = Math.atan2(dy, dx) + 0.625 * Math.PI;
		while (deg < 0) deg += Math.PI * 2;
		index = Math.floor(deg / Math.PI * 4) + 1;
	}

	wheel.setAttribute('data-chosen', index);
}

document.addEventListener("DOMContentLoaded", () => {
    const arcs = document.querySelectorAll(".arc");
    const contentSections = document.querySelectorAll(".content-section");

    arcs.forEach(arc => {
        arc.addEventListener("click", () => {
            const targetId = arc.getAttribute("data-target");

            // Hide all content sections
            contentSections.forEach(section => {
                section.style.display = "none";
            });

            // Show the targeted content section
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = "block";
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.querySelector('.wheel');
    const arcs = document.querySelectorAll('.arc');
    
    arcs.forEach(arc => {
        arc.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove previous selections
            wheel.removeAttribute('data-chosen');
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the target content
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
            
            // Set wheel selection (assuming data-target="content-1" means item 1)
            const itemNumber = targetId.replace('content-', '');
            wheel.setAttribute('data-chosen', itemNumber);
        });
    });
    
    // Click outside to deselect
    document.addEventListener('click', function(e) {
        if (!wheel.contains(e.target) && !e.target.closest('.content-display')) {
            wheel.removeAttribute('data-chosen');
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
        }
    });
});