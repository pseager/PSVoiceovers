export function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

export function isMailtoHref(href) {
  return /^mailto:/i.test(href);
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

export function mailtoLinkProps(href) {
  if (!isMailtoHref(href)) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}
