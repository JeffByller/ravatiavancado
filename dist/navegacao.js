const home = document.querySelector('.rava-bio');
const services = new Map(Array.from(home.querySelectorAll('[data-view]'), button => [button.dataset.view, button]));
const homeTitle = document.title;
let frame;
let lastButton;

function showService(view) {
  const button = services.get(view);
  frame?.remove();
  frame = null;
  home.hidden = Boolean(button);
  if (!button) {
    document.title = homeTitle;
    if (lastButton) lastButton.focus({preventScroll:true});
    return;
  }

  lastButton = button;
  frame = document.createElement('iframe');
  frame.id = 'service-view';
  frame.title = button.querySelector('strong').textContent;
  frame.allowFullscreen = true;
  frame.src = view;
  document.title = frame.title + ' | RAVA';
  document.body.append(frame);
  frame.focus();
}

home.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.external) {
    window.open(button.dataset.external, '_blank', 'noopener,noreferrer');
    return;
  }
  if (services.has(button.dataset.view)) {
    history.pushState({view:button.dataset.view}, '');
    showService(button.dataset.view);
  }
});

window.addEventListener('message', event => {
  if (frame && event.source === frame.contentWindow && event.origin === location.origin && event.data === 'rava:voltar') history.back();
});
window.addEventListener('popstate', () => showService(history.state?.view));
showService(history.state?.view);
