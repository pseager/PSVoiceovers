export function openEmailClient(event, href = '') {
  event.preventDefault();
  window.open(href, '_blank', 'noopener,noreferrer');
}
