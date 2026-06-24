export function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

export function externalLinkProps(href) {
  if (!isExternalHref(href)) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}
