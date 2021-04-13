import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

document
  .querySelector('.open-modal')
  .addEventListener('click', modal.open)

const toggleActiveJob = document.getElementById("job-finished-toggle");

toggleActiveJob.onclick = () => {

  toggleActiveJob.classList.toggle("finished");

  if (toggleActiveJob.classList.contains("finished")) {
    document.getElementById("finished").checked = true;
  } else {
    document.getElementById("finished").checked = false;
  }
}