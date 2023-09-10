## Experience

- ##### November 2022 – present

  ### Aize

  #### Principal Software Engineer

  Leading the development of the **Design System and Data Visualization** libraries used in Aize applications.

  - Crafting a **unified and consistent user experience** across products by creating and refining design patterns, components, and guidelines.
  - **Collaborating with cross-functional teams**, including designers, developers, and product managers, to ensure efficient and cohesive development processes.
  - Contributing to **enhancing the quality and usability** of Aize products.
  - **Mentoring and guiding** fellow engineers, cultivating a culture of collaboration.

  > _Angular_ _Typescript_ _D3_ _NX_ _Storybook_ _GitLab_ _Figma_

- ##### May 2019 – October 2022

  ### Circle K Business Centre / Madiff

  #### Senior Front-end Developer

  Built a scalable system enabling the execution of Angular pages with content served by a decoupled Drupal using the JSON:API protocol.

  - Designed and implemented a solution that allowed for the creation of **customized landing pages** in the Drupal CMS and dynamically rendered them in an Angular application.
  - Developed an **e-commerce module** integrated with internal and external services such as Salesforce, Adyen, or Klarna.
  - Optimized the application for better **performance and accessibility**.
  - **Collaborated with business and team members** to provide the most valuable product.
  - Worked together with UI/UX designers on the implementation of the **design system**.
  - Improved the **branching and release workflows**.

  > _Angular_ _Typescript_ _NX_ _NestJS_ _SSR_ _JSONAPI_

- ##### July 2018 – May 2019

  ### ITDS Business Consultants

  #### Front-end Developer

  Developing applications and tools for banking company clients (i.e. **Credit Suisse**), such as:

  - **Credit risk** dashboards,
  - A **gamified** in-house platform for employee engagement.

  > _AngularJS_ _Angular_ _TypeScript_ _SASS_ _ag-Grid_

- ##### March 2015 – April 2018

  ### LogZilla Corporation

  #### Lead UI Architect

  **LogZilla** is the leader in delivering real-time network insight with an intelligent network operations platform.

  As a Lead UI Architect I was responsible for the entire process of creating the user interface for `LogZilla 5.x`, during which I:

  - Built an application capable of **processing huge volumes of data** (up to **1M events per seconds**) and rendering the results in real time.
  - Researched and **implemented new functionalities**.
  - **Refined existing UX/UI** projects and prototyped new components.
  - **Led an international team** of developers.
  - **Collaborated with the backend developers** team to improve communication performance between server and client.
  - Created and maintained an **automated build system**.

  > _AngularJS_ _JavaScript_ _LESS_ _Bootstrap_ _ECharts_ _WebSocket_ _NodeJS_ _ClosureCompiler_ _Grunt_ _Bower_

- ##### December 2013 – March 2015

  ### HOQS

  #### Senior Full-Stack Developer

  **HOQS** is a digital agency based in Kraków, Poland.

  - Led and managed web and interactive projects for the company's clients, including **landing pages**, **cultural events' websites**, **social games integrated with Facebook**, **custom e-learning platforms**, and many others.
  - Provided **support for websites** maintained by the company.
  - Built **tools for monitoring** the activity and health of internal systems.
  - Improved **developers' efficiency** through training them in new technologies and modern programming techniques.

  Major clients: **Nowe Motywacje**, **Digart.pl**, **nazwa.pl**, **Onet**, **LexisNexis**, **evercare**.

  > _PHP_ _Moodle_ _LESS_ _Bootstrap_ _JavaScript_ _AngularJS_ _NodeJS_

- ##### May 2012 – December 2013

  ### Professional design / CG2

  #### Back-end Developer

  CG2 is a digital agency based in Opole, Poland.

  - Designed and built a **dedicated development platform** with a rich **content management system** focused on stability, optimization, and easy extending.
  - Deployed websites for company clients.

  > _PHP_ _Kohana_ _MySQL_ _HTML_ _CSS_ _LESS_ _Bootstrap_ _JavaScript_ _jQuery_

- ##### 2007-2014

  ### Spoko Brand

  #### Full-Stack Developer

  **Spoko Brand** is a company with experience in creating and managing specialized online stores with global reach.

  - Created a scalable **e-commerce platform** running the company's online shops ([Hedonskate](http://hedonskate.com), Bladeville, and TwoTip).
  - Design an **optimized store database** with shared stock inventory.
  - Developed a full-text search system based on **Sphinx**.
  - Implemented a stock quote **SOAP web service** and integration with external APIs, e.g. Braintree, UPS, InPost.
  - Improved sites **SEO** under the guidance of Google experts.
  - Coded a variety of tools for maintaining, extending, and **enhancing security**.

  > _PHP_ _MySQL_ _LESS_ _jQuery_ _SOAP_

- ##### 2004 – December 2017

  ### Freelance

  #### Full-Stack Developer

  Major clients:

  - Online shops (**Be-Mag**, **Snapbox**, **Fandango Records**),
  - Music artists (**Miuosh**, **Lilu**, **Believe**, **Decybele Dizajnu**),
  - Sportsmen (**Szczepan Karpiel-Bułecka**, **Bartek Sibiga**, **Tomasz Kwiecień**),
  - Fashion and graphic designers (**The Hive**, **Aaaghr**, **From Froggy With Love**, **Admirable**, **CustomTop**).

  > _PHP_ _Kohana_ _Wordpress_ _MySQL_ _HTML_ _CSS_ _LESS_ _Bootstrap_ _JavaScript_ _jQuery_ _PayPal_ _PayU_ _WorldPay_ _LastFm_ _PrestaShop_

- ##### July 17th, 1988

  ### Born

<style lang="scss">
  @import '../styles/theme.scss';

  :global(.wrapper) > ul {
    position: relative;

    &::before {
      background-color: lighten($background-color, 5%);
      bottom: 0;
      content: ' ';
      left: 20%;
      margin-left: -1px;
      position: absolute;
      top: 0;
      width: 2px;
    }

    > li {
      margin: 0 0 0 20%;
      max-width: 66em;
      padding-left: 2em;
      position: relative;
      width: 80%;

      + li {
        margin-top: 3em;
      }

      > h3 {
        line-height: 1.1;
      }

      > h5 {
        background: darken($heading-color, 2%);
        border-radius: 8px;
        padding: 2px 10px;
        position: absolute;
        right: 104%;
        text-shadow: 0 1px darken($heading-color, 30%);
        white-space: nowrap;
      }

      &::before {
        left: 0;
        margin: 0;
        position: absolute;
        transform: translateX(-50%);
      }
    }

    @media screen and (max-width: 1022px) {
      &::before {
        left: -1.2em;
      }

      > li {
        margin-left: 0;
        max-width: 100%;
        padding-left: 0.5em;
        width: 100%;

        > h5 {
          display: inline-block;
          margin-bottom: 1.2em;
          position: static;
          right: auto;
        }

        &::before {
          transform: translateX(-1.5em);
        }
      }
    }
  }
</style>
