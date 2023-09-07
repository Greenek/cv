<a href="https://github.com/Greenek/cv">Fork me on GitHub</a>

<style lang="scss">
  @import '../styles/theme.scss';

  a {
    background-color: lighten($background-color, 3%);
    color: #fff;
    font-size: 0.7em;
    opacity: 0.5;
    padding: 0.5em 6em;
    position: fixed;
    right: 0;
    text-decoration: none;
    text-transform: uppercase;
    top: 0;
    transform: rotate(45deg) translate(32%, -100%);

    &:hover {
      color: #fff;
      opacity: 1;
    }
  }

  @media screen and (max-width: 800px) {
    a {
      display: none;
    }
  }
</style>
