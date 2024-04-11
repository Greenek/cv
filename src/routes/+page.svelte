<script>
  import Section from '../lib/components/Section.svelte';
  import Intro from '../lib/components/Intro.svelte';
  import ForkMe from '../lib/components/ForkMe.svelte';

  import Hello from '../lib/content/01-hello.md';
  import Experience from '../lib/content/02-experience.md';
  import Skills from '../lib/content/03-skills.md';
  import Education from '../lib/content/04-education.md';
  import Hobby from '../lib/content/05-hobby.md';
  import Footer from '../lib/content/06-footer.md';

  const sections = [
    { id: 'hello', component: Hello },
    { id: 'experience', component: Experience },
    { id: 'skills', component: Skills },
    { id: 'education', component: Education },
    { id: 'hobby', component: Hobby },
  ];
</script>

<Intro />

<main>
  {#each sections as section}
    <Section id={section.id}>
      <svelte:component this={section.component} />
    </Section>
  {/each}

  <enhanced:img src="/static/images/me.jpeg" id="me" alt="Me" />
</main>

<footer id="footer">
  <Footer />
</footer>

<ForkMe />

<style lang="scss" global>
  @import '$lib/styles/theme';

  #me {
    width: 100%;
  }

  #footer {
    background-color: darken($background-color, 2%);
    font-size: 0.875em;
    padding-block: 3em;
    text-align: center;
  }
</style>
