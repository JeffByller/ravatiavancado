export function setContact(summary) {
  document.getElementById('contact').dataset.external =
    'https://wa.me/5583988984828?text=' + encodeURIComponent('Olá, RAVA! ' + summary);
}

export function showVideo(title, videoId) {
  const player = document.getElementById('player');
  document.getElementById('video-title').textContent = title;
  player.title = title + ' · TI Avançado';
  player.src = 'https://www.youtube-nocookie.com/embed/' + videoId;
  document.getElementById('watch').dataset.external = 'https://www.youtube.com/watch?v=' + videoId;
  document.querySelector('.service-media').hidden = false;
}

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-external]');
  if (button) window.open(button.dataset.external, '_blank', 'noopener,noreferrer');
});

document.getElementById('back').addEventListener('click', () => {
  if (parent !== window) parent.postMessage('rava:voltar', location.origin);
  else location.assign('./');
});
