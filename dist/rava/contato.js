export function setContact(summary) {
  document.getElementById('contact').href =
    'https://wa.me/5583988984828?text=' + encodeURIComponent('Olá, RAVA! ' + summary);
}

export function showVideo(title, videoId) {
  const player = document.getElementById('player');
  document.getElementById('video-title').textContent = title;
  player.title = title + ' · TI Avançado';
  player.src = 'https://www.youtube-nocookie.com/embed/' + videoId;
  document.getElementById('watch').href = 'https://www.youtube.com/watch?v=' + videoId;
  document.querySelector('.service-media').hidden = false;
}
