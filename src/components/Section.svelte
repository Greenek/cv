<script>
  import { reveal } from '../actions/reveal';

  export let id;
</script>

<section {id} class="slide">
  <div class="wrapper" use:reveal>
    <slot />
  </div>
</section>

<style lang="scss">
  @import '../styles/theme.scss';

  .slide {
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    padding: 4em 0;

    &:nth-child(2n) {
      background-color: lighten($background-color, 1%);
    }
  }

  .wrapper {
    max-width: 85vw;
    opacity: 0;
    transition: opacity 0.5s, transform 1s;
    transition-timing-function: ease-out;
    transform: translateY(50px);
    width: 800px;

    &:global(.show) {
      opacity: 1;
      transform: none;
    }

    &:global(.show-no-animation) {
      transition: none;
    }
  }
</style>
