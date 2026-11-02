export interface PostFigure {
  src: string;
  animatedSrc?: string;
  alt: string;
  caption: string;
  label: string;
  width: number;
  height: number;
  placement: 'aside-left' | 'aside-right' | 'center' | 'wide';
  sourceLabel: string;
  sourceUrl: string;
}

export interface PostSection {
  heading: string;
  paragraphs: string[];
  figure?: PostFigure;
}

export interface Post {
  slug: string;
  category: 'Artificial Intelligence' | 'Research Notes' | 'Perspectives';
  date: string;
  dateTime: string;
  readTime: string;
  title: string;
  excerpt: string;
  intro: string;
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: 'github-central-agentic-ops',
    category: 'Artificial Intelligence',
    date: 'November 2, 2026',
    dateTime: '2026-11-02',
    readTime: '4 min read',
    title: 'Central Agentic Ops: Shared Workflows, Clear Boundaries',
    excerpt:
      'How GitHub Next’s research prototype monitors Agentic Workflows, coordinates shared ownership, and makes rollout decisions reviewable.',
    intro:
      'A workflow can be useful in one repository. Across many, the harder questions are who owns it, where it may run, and what the evidence says about its results.',
    sections: [
      {
        heading: 'An operational layer, not a new kind of agent',
        paragraphs: [
          'GitHub Agentic Workflows are authored in Markdown and run in GitHub Actions with declared permissions and safe outputs. GitHub Next’s Central Agentic Ops (CAO) builds on that foundation: it monitors participating workflows across explicitly enrolled repositories and adds policy-governed execution for workflows integrated with its control plane.',
          'Monitoring is not the same as taking control. A repository can contribute evidence to the dashboard without handing its local workflows to a central operator. CAO is a research prototype, and its interfaces may change.',
        ],
      },
      {
        heading: 'See the work, then ask what it achieved',
        paragraphs: [
          'The CAO dashboard brings workflow runs, costs, and available outcomes into a cross-repository view. Its Overview snapshot shows rhythm, health, coverage, retained issues and pull requests, and observed grader results. These are operational signals, not proof that a repository improved.',
          'A completed run, a proposed output, a human decision, and a lasting outcome are different things. Collected evidence can be delayed or incomplete; an empty chart should not be read as a definitive absence of activity.',
        ],
        figure: {
          src: '/cao-overview-light.webp',
          alt: 'Central Agentic Ops mobile dashboard showing weekly workflow rhythm, workflow health, repository coverage, retained issues and pull requests, and observed grader results.',
          caption: 'Example Overview snapshot. Runtime signals and grader observations are not verified improvements.',
          label: 'Overview dashboard',
          width: 780,
          height: 1688,
          placement: 'aside-right',
          sourceLabel: 'CAO landing page',
          sourceUrl: 'https://githubnext.github.io/gh-cao/',
        },
      },
      {
        heading: 'Shared workflows, explicit ownership',
        paragraphs: [
          'CAO’s workflow ecosystem places enterprise-, organization-, and repository-owned workflows side by side. Shared workflows run in their owning control repositories and can send declared safe outputs to enrolled targets without being copied into every repository; repository-owned workflows run locally. Ownership and target scope remain visible rather than disappearing into a fleet-wide label.',
          'The diagram is an example of that relationship, not a claim that visual connections grant permission. Reviewed policy, credentials, and each target repository’s protections still determine what work can reach it.',
        ],
        figure: {
          src: '/cao-shared-workflows.webp',
          animatedSrc: '/cao-shared-workflows-animated.webp',
          alt: 'CAO workflow ecosystem diagram showing enterprise- and organization-owned shared workflows alongside local repository workflows and their safe outputs across enrolled repositories.',
          caption: 'Illustrative workflow ecosystem: runs move from queued to done, then safe outputs appear. This is not live operational evidence.',
          label: 'shared-workflows diagram',
          width: 3048,
          height: 1040,
          placement: 'wide',
          sourceLabel: 'CAO landing page',
          sourceUrl: 'https://githubnext.github.io/gh-cao/',
        },
      },
      {
        heading: 'Maintain centrally; roll out deliberately',
        paragraphs: [
          'Central maintenance can update source-tracked workflows and upgrade the underlying GitHub Agentic Workflows tooling, while version pins and local changes still need review. Central upkeep is not a guarantee that every enrolled repository is current or secure.',
          'Rollout starts with an outcome and explicit repository scope, credentials, reviewed policy, and review or live mode. Review mode is real execution, but live outputs require separate authorization. Campaigns can coordinate bounded work across targets; they are not a prerequisite for monitoring. CAO does not override repository permissions, branch protection, or human review.',
        ],
      },
      {
        heading: 'Events across repositories, within policy',
        paragraphs: [
          'CAO’s Webhook Gateway lets an event in one enrolled repository dispatch an approved workflow in another. Authentication, queuing, batching, reviewed enrollment, and fresh access checks bound that path. It is a specific cross-repository event route, not a blanket grant of authority over every workflow.',
        ],
      },
      {
        heading: 'Evidence before expansion',
        paragraphs: [
          'The case for scaling an operation rests on outcomes, reliability, and cost, including failed attempts and review effort, not merely on the number of runs or generated pull requests. Start with a small, well-scoped rollout, inspect the evidence, and expand only when it supports that decision. CAO makes those questions easier to ask; it cannot answer them from activity counts alone.',
        ],
      },
    ],
  },
];
