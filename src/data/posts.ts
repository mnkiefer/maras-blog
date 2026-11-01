export interface PostSection {
  heading: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  category: 'Artificial Intelligence' | 'Research Notes' | 'Perspectives';
  date: string;
  dateTime: string;
  readTime: string;
  tone: 'blue' | 'peach' | 'sage';
  symbol: string;
  title: string;
  excerpt: string;
  intro: string;
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: 'github-central-agentic-ops',
    category: 'Artificial Intelligence',
    date: 'October 31, 2026',
    dateTime: '2026-10-31',
    readTime: '5 MIN READ',
    tone: 'blue',
    symbol: 'CAO',
    title: 'GitHub Central Agentic Ops: From AI Agents to Governed Operations',
    excerpt:
      'A first look at GitHub Next’s experimental control plane for monitoring and governing agentic workflows across repositories.',
    intro:
      'The interesting question is no longer only what an AI coding agent can do in one repository. It is how we observe, coordinate, and govern that work when it happens across many.',
    sections: [
      {
        heading: 'From individual agents to coordinated operations',
        paragraphs: [
          'An individual coding agent can investigate a bug or propose a change. GitHub Agentic Workflows put such tasks in GitHub Actions, with instructions, tools, and permissions defined for each workflow. But as teams run more of them across repositories, a new problem appears: who can tell what ran, what it cost, what it produced, and whether anyone accepted the result?',
          'GitHub Next’s Central Agentic Ops (CAO) is a research prototype for that operational layer. It collects evidence about Agentic Workflow activity in explicitly configured repositories and presents it in a shared dashboard. For workflows deliberately integrated with its control plane, it also supports policy-governed execution from a control repository. Observation and execution are distinct: seeing a workflow in CAO does not move it, alter its permissions, or put it under central control.',
        ],
      },
      {
        heading: 'Visibility is more than a run counter',
        paragraphs: [
          'CAO brings runs, costs, and available outputs into one view, with links back to GitHub for investigation. That matters when a successful Actions run produced only a proposal, a proposal was never accepted, or a costly series of attempts did not improve the repository. The dashboard reads collected snapshots rather than a live stream; a quiet chart may reflect stale, partial, or unavailable evidence, not an absence of work.',
          'The useful unit of analysis is therefore not just “did the agent finish?” but “what happened afterward?” A run, its declared output, a human decision, and a measurable repository outcome are different events. Central monitoring can help connect them, but it does not turn a count of completed runs into proof of value.',
        ],
      },
      {
        heading: 'Operations need a scope before they need a campaign',
        paragraphs: [
          'For shared work, CAO asks operators to define an intended outcome, eligible targets, execution requirements, and output destination. Sometimes the right answer is to observe existing workflows. A bounded task with named targets may be a direct operation; work that needs independently retried, single-target workers may warrant a campaign. Campaigns package reusable work and coordinate rollout, but they are not required for monitoring or for every governed operation.',
          'This distinction is practical, not just architectural. Selecting a fleet of repositories, dispatching workers, and correlating their runs introduces more authority and more ways to fail than a one-off investigation. Explicit scope makes it possible to review what the system is allowed to touch before repeating the work at scale.',
        ],
      },
      {
        heading: 'Governance still lives in GitHub',
        paragraphs: [
          'CAO’s control repository holds reviewed rollout policy for workflows that opt into governance. Execution is bounded by that policy, the specific request, credential reach, and the capabilities compiled into the Agentic Workflow. A review-mode run is still real execution and may create a proposal in a review destination; sending live output to a target requires separate, explicit authorization. A dashboard view, a target file, or a previous successful run cannot grant that authority.',
          'Just as importantly, CAO does not supersede repository permissions, branch protections, rulesets, or human review. A centrally produced pull request still has to pass the target repository’s own checks and acceptance process. This separation is a feature: it keeps operational coordination from quietly becoming permission to merge changes.',
        ],
      },
      {
        heading: 'The research questions are the point',
        paragraphs: [
          'Reliability asks whether an operation reaches the intended target with the intended limits, how retries behave, and whether incomplete evidence is reported as unknown rather than zero. Evaluation asks what counts as success: a green run, a useful proposal, an accepted change, or a lasting improvement in the repository? These questions need evidence about downstream outcomes, not only agent activity.',
          'Cost-effectiveness adds another test. Would the same outcome have been cheaper or more reliable with a conventional Actions job or a human-maintained script? How much review and recovery time does an agentic approach require? Comparing like-for-like outcomes, including rejected proposals and failed attempts, is more informative than counting generated artifacts.',
        ],
      },
      {
        heading: 'An interesting prototype, not a universal control plane',
        paragraphs: [
          'CAO is compelling because it treats agents as operational systems with boundaries, evidence, and people accountable for decisions. Its own documentation calls it a research prototype, and its interfaces may change. It governs explicitly integrated workflows, not every Actions job or agent that happens to run in an organization; observing a repository is not equivalent to controlling it.',
          'That limited scope is worth taking seriously. A shared dashboard and reviewed rollout can make coordinated work easier to study, but they do not eliminate missing data, mistaken evaluations, credential risks, or the need for local maintainers to decide what belongs in their codebase. The most useful next step is to test the model on small, well-scoped operations and measure whether the results justify the complexity.',
        ],
      },
    ],
  },
];
