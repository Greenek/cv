<script>
  import { onMount } from 'svelte';
  import Header from '../content/00-header.md';
  import { figletText } from '../utils/figlet';

  let header;

  class Intro {
    #animationRef;
    #backgroundColor;
    #cellWidth;
    #cellHeight;
    #ctx;
    #lastFrame = Date.now();
    #observer;
    #shape;

    constructor(container) {
      this.#ctx = this.#setupCanvas(container);

      this.#observer = this.#observeVisibility(container);
    }

    destroy() {
      this.#cancelAnimation();
      this.#observer.disconnect();
    }

    #cancelAnimation() {
      if (this.#animationRef) {
        window.cancelAnimationFrame(this.#animationRef);
        this.#animationRef = null;
      }
    }

    #draw() {
      this.#ctx.clearRect(
        0,
        0,
        this.#ctx.canvas.width,
        this.#ctx.canvas.height
      );

      this.#ctx.fillStyle = this.#backgroundColor;
      this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);

      this.#shape.forEach((line, y) => {
        line.split('').forEach((char, x) => {
          if (char !== ' ') {
            const drawX = x * this.#cellWidth;
            const drawY = (y + 1) * this.#cellHeight;

            this.#ctx.fillStyle = this.#getColor(x, y);
            this.#ctx.fillText(char, drawX, drawY);
          }
        });
      });

      this.#ctx.canvas.previousElementSibling.style.backgroundImage =
        this.#getGradient(
          0,
          this.#ctx.canvas.previousElementSibling.textContent.trim().length
        );

      this.#ctx.canvas.nextElementSibling.style.backgroundImage =
        this.#getGradient(
          this.#shape.length,
          this.#ctx.canvas.nextElementSibling.textContent.trim().length
        );
    }

    #getColor(x, y) {
      const h = Math.floor(((this.#lastFrame / 50 + x + y) % 360) / 12) * 12;

      return `hsl(${h}, 100%, 50%)`;
    }

    #getGradient(y, length) {
      const start = this.#getColor(0, y);
      const middle = this.#getColor(length / 2, y);
      const end = this.#getColor(length, y);

      return `linear-gradient(to left, ${end}, ${middle}, ${start})`;
    }

    #observeVisibility(node) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.#render();
            } else {
              this.#cancelAnimation();
            }
          });
        },
        {
          rootMargin: '100% 0px 100% 0px',
          threshold: [0.01, 0.99],
        }
      );

      observer.observe(node);

      return observer;
    }

    #render() {
      if (Date.now() - this.#lastFrame > 60) {
        this.#draw();
        this.#lastFrame = Date.now();
      }

      this.#animationRef = window.requestAnimationFrame(() => this.#render());
    }

    #setupCanvas(parentElement) {
      const h1 = parentElement.querySelector('h1');
      const title = h1.textContent.trim();

      // Convert title to ascii art
      this.#shape = figletText(title).split('\n');

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-label', title);
      canvas.setAttribute('role', 'img');

      // Get context
      const ctx = canvas.getContext('2d');

      // Setup font
      let font;

      if ('computedStyleMap' in parentElement) {
        // Chrome
        const styles = parentElement.computedStyleMap();

        font = ['font-weight', 'font-size', 'font-family'].map((key) =>
          styles.get(key)
        );
        this.#backgroundColor = styles.get('background-color');
      } else {
        // Firefox
        const styles = window.getComputedStyle(parentElement);

        font = ['font-weight', 'font-size', 'font-family'].map((key) =>
          styles.getPropertyValue(key)
        );
        this.#backgroundColor = styles.getPropertyValue('background-color');
      }

      font = font.join(' ');

      // Calculate width and height
      ctx.font = font;
      this.#cellWidth = Math.floor(ctx.measureText('0').width - 0.5);
      this.#cellHeight = Math.floor(this.#cellWidth * 1.4);

      const shapeWidth = Math.max(...this.#shape.map((line) => line.length));
      const shapeHeight = this.#shape.length;

      canvas.width = shapeWidth * this.#cellWidth;
      canvas.height = shapeHeight * this.#cellHeight;

      // Context is losing font settings after resizing canvas
      ctx.font = font;
      ctx.imageSmoothingEnabled = false;

      h1.replaceWith(canvas);

      return ctx;
    }
  }

  onMount(() => {
    const intro = new Intro(header);

    return () => intro.destroy();
  });
</script>

<header bind:this={header}>
  <div class="wrapper">
    <svelte:component this={Header} />
  </div>
</header>

<style lang="scss">
  @import '../styles/theme.scss';

  header {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 1.25em;
    justify-content: flex-end;
    min-height: 80vh;
    padding: 3em;

    .wrapper {
      max-width: 85vw;
      width: 800px;
    }

    @media screen and (orientation: portrait) {
      min-height: 60vh;
      padding: 0;
    }
  }

  :global(header canvas) {
    margin-block: 1em;
    max-width: 100%;
  }

  :global(header *) {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
