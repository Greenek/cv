export function reveal(node) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');

          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px 50px 0px',
    },
  );

  observer.observe(node);

  setTimeout(() => {
    if (node.offsetTop < window.scrollY) {
      node.classList.add('show', 'show-no-animation');
      observer.disconnect();
    }
  }, 50);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
