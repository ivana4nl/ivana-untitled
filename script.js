// Enable hotspots after 3 seconds
setTimeout(() => {
  document.querySelectorAll('.hotspot').forEach(el => {
    el.classList.add('active');
  });
}, 3000);

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.getElementById('closeBtn');
const modalHeader = document.getElementById('modalHeader');

// Hotspot content dictionary
const hotspotTexts = {
  hotspot1: `
    <h3 style="color: #b3e5fc;">contact info</h3>
    <p>email: <a href="ivana4nl@gmail.com" style="color: #90caf9;">ivana4nl@gmail.com</a></p>
    <p>number: <a href="607-374-9613" target="_blank" style="color: #90caf9;">607-374-9613</a></p>
  `,
  hotspot2: `
    <h3 style="color: #b3e5fc;">skills</h3>
    <p>HTML / JavaScript</p>
    <p>after effects and davinci resolve</p>
  `,
  hotspot3: `
    <h3 style="color: #b3e5fc;">links</h3>
    <p><a href="https://github.com/ivana4nl" target="_blank" style="color: #90caf9;">GitHub</a></p>
  `,
  hotspot4: `
    <h3 style="color: #b3e5fc;">info</h3>
    <p>hi! i'm ivana, a high school student trying to learn as much as i can about my interests before i go to college!</p>
  `
};

// Variables for drag position
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

// Show modal with content, center it with transform
function showModal(id) {
  modalBody.innerHTML = hotspotTexts[id] || "<p>No content available.</p>";
  modal.style.display = 'flex';

  // Reset top and left to 0
  modalContent.style.top = '0';
  modalContent.style.left = '0';

  // Calculate center position
  const modalWidth = modalContent.offsetWidth;
  const modalHeight = modalContent.offsetHeight;
  const centerX = (window.innerWidth - modalWidth) / 2;
  const centerY = (window.innerHeight - modalHeight) / 2;

  currentX = centerX;
  currentY = centerY;

  modalContent.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
}

// Drag start
function dragStart(e) {
  isDragging = true;
  let clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  let clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

  startX = clientX - currentX;
  startY = clientY - currentY;

  modalHeader.style.cursor = 'grabbing';

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('touchmove', dragMove, { passive: false });
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);
}

// Drag move
function dragMove(e) {
  if (!isDragging) return;
  e.preventDefault();

  let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

  let newX = clientX - startX;
  let newY = clientY - startY;

  const maxX = window.innerWidth - modalContent.offsetWidth;
  const maxY = window.innerHeight - modalContent.offsetHeight;

  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX > maxX) newX = maxX;
  if (newY > maxY) newY = maxY;

  currentX = newX;
  currentY = newY;

  modalContent.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
}

// Drag end
function dragEnd() {
  isDragging = false;
  modalHeader.style.cursor = 'grab';

  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('touchmove', dragMove);
  document.removeEventListener('mouseup', dragEnd);
  document.removeEventListener('touchend', dragEnd);
}

// Close modal function
function closeModal() {
  modal.style.display = 'none';
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

modalHeader.addEventListener('mousedown', dragStart);
modalHeader.addEventListener('touchstart', dragStart);

// Hotspot click event to open modal
document.querySelectorAll('.hotspot').forEach(hotspot => {
  hotspot.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(hotspot.id);
  });
});
