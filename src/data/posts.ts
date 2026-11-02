export interface PostFigure {
  src: string;
  animatedSrc?: string;
  alt: string;
  caption: string;
  label: string;
  width: number;
  height: number;
  placement: 'aside-left' | 'aside-right' | 'center' | 'wide';
  sourceLabel?: string;
  sourceUrl?: string;
}

export type PostBlock =
  | {
      type: 'paragraph';
      html: string;
    }
  | {
      type: 'ordered-list' | 'unordered-list';
      items: string[];
    }
  | {
      type: 'code';
      code: string;
    }
  | {
      type: 'figure';
      figure: PostFigure;
    };

export interface PostSource {
  id?: string;
  html: string;
}

export interface PostSection {
  heading: string;
  paragraphs?: string[];
  figure?: PostFigure;
  blocks?: PostBlock[];
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
  introHtml?: string;
  leadParagraphs?: string[];
  sections: PostSection[];
  sources: PostSource[];
  sourcesHeading?: string;
  sourcesOrdered?: boolean;
}

export const posts: Post[] = [
  {
    slug: 'beyond-it-ran-operational-value',
    category: 'Research Notes',
    date: 'November 2, 2026',
    dateTime: '2026-11-02',
    readTime: '11 min read',
    title: 'Beyond “It Ran”: Measuring Whether Agentic Workflows Create Operational Value',
    excerpt:
      'A practical evidence chain from workflow execution to accepted implementation and bounded, repository-native measures of change.',
    intro:
      'Peli’s Agent Factory made the next problem unavoidable: determining whether routine agentic workflow activity created operational value.',
    introHtml:
      '<a href="https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/">Peli’s Agent Factory</a> asked what happens when natural-language, agent-driven repository automation becomes routine. We ran more than 100 specialized workflows in real repositories to expose useful patterns and failure modes.<sup><a class="citation" href="#source-agent-factory" aria-label="Source 1">[1]</a></sup> That experiment made the next problem unavoidable: determining whether any of this activity created operational value.',
    leadParagraphs: [
      'Run success, AI Credit consumption, and safe-output counts are factory telemetry. Operational value requires a longer evidence chain: the workflow ran, produced an authorized output, that output was accepted, and the accepted work measurably improved the repository. This article describes how we began constructing that chain.',
    ],
    sections: [
      {
        heading: 'From production to acceptance',
        blocks: [
          {
            type: 'paragraph',
            html: 'This line of thinking felt familiar. Early GitHub Copilot measurement placed considerable emphasis on <strong>acceptance rate</strong>: the percentage of code suggestions that developers accepted. GitHub still describes code-completion acceptance rate as an indication of trust and usefulness. A suggestion being shown is activity; a developer accepting it is a stronger signal that it was relevant enough to enter their work.<sup><a class="citation" href="#source-copilot-metrics" aria-label="Source 2">[2]</a></sup>',
          },
          {
            type: 'paragraph',
            html: 'Acceptance was never the whole story, however. GitHub later described how optimizing too heavily for acceptance rate could favor a large number of short, simple completions. The completions team consequently expanded its evaluation to signals such as <strong>accepted and retained characters</strong>—whether accepted code remained in the final code rather than being deleted shortly afterward.<sup><a class="citation" href="#source-better-completions" aria-label="Source 3">[3]</a></sup> The lesson was useful for agentic workflows as well: <strong>acceptance is an important boundary, but it is not yet proof of durable value.</strong>',
          },
          {
            type: 'paragraph',
            html: 'GitHub’s earlier productivity research made the broader version of the same point. Developer productivity is difficult to reduce to “outputs over inputs”; speed, successful task completion, cognitive load, satisfaction, and the ability to make meaningful progress all capture different parts of the experience.<sup><a class="citation" href="#source-copilot-productivity" aria-label="Source 4">[4]</a></sup>',
          },
          {
            type: 'paragraph',
            html: 'For agentic workflows, the first boundary was therefore acceptance.',
          },
          {
            type: 'paragraph',
            html: 'That question gave us the first of three distinct evidence boundaries. We needed to move from execution to output, from output to acceptance, and only then from acceptance to measured repository change.',
          },
          {
            type: 'figure',
            figure: {
              src: '/operational-value-overview.svg',
              alt: 'Three-stage evidence flow: freeze a repository-native function with a baseline of two files, prove one accepted implementation from three retained safe outputs, then measure a change from two oversized files to one.',
              caption:
                'Output production is not acceptance, and acceptance is not a measured repository outcome.',
              label: 'operational-value evidence overview',
              width: 1440,
              height: 700,
              placement: 'wide',
            },
          },
        ],
      },
      {
        heading: 'Acceptance arrives after the run',
        blocks: [
          {
            type: 'paragraph',
            html: 'Code-completion acceptance has a convenient property: it happens in the editor, close to the moment when the suggestion is shown. A safe output from an agentic workflow has a different lifecycle.',
          },
          {
            type: 'paragraph',
            html: 'A workflow might open an issue today. A maintainer might review it next week. A different person—or another agent—might implement it in a pull request several weeks later. The issue might then be closed after the pull request merges. The workflow run is long finished by the time the repository records the meaningful decision.',
          },
          {
            type: 'paragraph',
            html: 'That created our first measurement problem. Acceptance does not occur when the workflow runs. It occurs later, outside the run, and often through a different GitHub object.',
          },
          {
            type: 'paragraph',
            html: 'Our early approach was therefore a collector that returned to previously created safe outputs and inspected their later state. This at least gave us a way to observe whether a workflow had been allowed to do its work.',
          },
          {
            type: 'paragraph',
            html: 'But “closed” quickly proved too weak. An issue can be closed as a duplicate, rejected, made obsolete, or simply cleaned up. A pull request can be closed without merging. A recommendation can be superseded by a different recommendation. Treating every terminal state as acceptance would convert repository housekeeping into apparent workflow success.',
          },
          {
            type: 'paragraph',
            html: 'The collector therefore had to follow evidence rather than labels:',
          },
          {
            type: 'ordered-list',
            items: [
              'retain the safe output’s durable identity;',
              'observe its lifecycle without interpreting creation as acceptance;',
              'find an explicit relationship to an implementation;',
              'verify the implementation’s authoritative disposition;',
              'preserve the original acceptance time and immutable revision.',
            ],
          },
          {
            type: 'figure',
            figure: {
              src: '/safe-output-acceptance.svg',
              alt: 'Evidence table for three retained safe outputs. Issue 101 links explicitly to merged pull request 201 and is accepted; issue 102 is open and pending; issue 103 is closed without implementation lineage and remains unknown.',
              caption:
                'Three retained outputs produce one accepted implementation. Closure without implementation lineage remains unknown, so no conversion rate is inferred.',
              label: 'safe-output acceptance evidence',
              width: 1440,
              height: 940,
              placement: 'wide',
            },
          },
          {
            type: 'paragraph',
            html: 'In the example above, three safe outputs exist. One open issue is still pending. One closed issue has no implementation lineage, so acceptance remains unknown. Only one issue has an explicit relationship to a merged pull request. The accepted-implementation count is therefore <strong>one</strong>, not three.',
          },
          {
            type: 'paragraph',
            html: 'This separation also prevents a tempting but invalid “conversion rate.” The output population and accepted-implementation population have different evidence coverage. Missing historical receipts, incomplete lifecycle data, and right-censored pending work can make a simple ratio misleading. Unknown is not zero, and unresolved work is not automatically failure.',
          },
          {
            type: 'paragraph',
            html: 'At that point we could determine whether an authorized output led to an accepted implementation. But that immediately exposed the harder problem.',
          },
        ],
      },
      {
        heading: 'Landing is not the same as helping',
        blocks: [
          {
            type: 'paragraph',
            html: 'Suppose the recommendation was accepted and its pull request merged. We still needed to know whether it actually improved the repository.',
          },
          {
            type: 'paragraph',
            html: 'The change might be a no-op. It might solve only the visible symptom. It might improve one dimension while degrading another. It might be reverted a day later. Or the same repository outcome might have been achieved by a maintainer, Dependabot, or another automation without the measured workflow.',
          },
          {
            type: 'paragraph',
            html: 'We did not want to make the same mistake twice by replacing “merged” with “valuable.” Nor did we want to ask a judge agent to read every outcome and declare whether it was good. That would add another model opinion, additional AI Credit consumption, and a new source of evaluator drift precisely where we wanted reproducible evidence.',
          },
        ],
      },
      {
        heading: 'Ask the agent once, not every time',
        blocks: [
          {
            type: 'paragraph',
            html: 'The alternative was to ask the agent <strong>once</strong>, at design time, rather than on every observation. Its task was to translate the workflow’s stated intent, deterministic precomputes, selection rules, and acceptance checks into a fixed function for measuring the intended repository outcome.',
          },
          {
            type: 'paragraph',
            html: 'After that function is reviewed and frozen, ordinary collection can evaluate it deterministically. The agent helps translate intent into an executable measurement contract; it does not repeatedly grade its own work.',
          },
          {
            type: 'paragraph',
            html: 'This changes the role of AI in the measurement system. AI is useful at the language boundary, where prose, workflow configuration, imports, and precomputed facts need to be consolidated. The resulting function, evidence population, units, filters, and missing-data behavior are then explicit code and data—not an open-ended judgment prompt.',
          },
        ],
      },
      {
        heading: 'One score was the wrong place to start',
        blocks: [
          {
            type: 'paragraph',
            html: 'A universal operational-value function is attractive. In principle, it could map every workflow, repository, and domain onto one comparable score.',
          },
          {
            type: 'paragraph',
            html: 'In practice, the domains disagree about almost everything:',
          },
          {
            type: 'unordered-list',
            items: [
              'whether higher, lower, maintenance, or proximity to a target is better;',
              'what constitutes an eligible opportunity;',
              'which repository owns the outcome;',
              'whether the evidence is a snapshot, interval, event, or matured state;',
              'how long an outcome must persist;',
              'which safety and quality checks gate acceptance;',
              'whether historical evidence can be reconstructed;',
              'and what missing evidence means.',
            ],
          },
          {
            type: 'paragraph',
            html: 'A security workflow might reduce an alert backlog. A maintenance workflow might shorten dependency-update latency. A documentation workflow might improve discoverability under a fixed retrieval test. A code-structure workflow might reduce oversized production files while preserving behavior. Collapsing these into a premature universal score would hide the native meaning of each outcome.',
          },
          {
            type: 'paragraph',
            html: 'Perhaps, after studying enough domains, we will discover reusable abstractions and stable common factors. But we did not want to assume that result before the evidence existed.',
          },
          {
            type: 'paragraph',
            html: 'So we started small.',
          },
        ],
      },
      {
        heading: 'Start with the intent already there',
        blocks: [
          {
            type: 'paragraph',
            html: 'Every GitHub Agentic Workflow already contains a description of what it is trying to do. The intent may be distributed across natural-language instructions, frontmatter, imported guidance, deterministic precomputes, filters, tools, permissions, and safe-output declarations. It is not always a clean metric specification, but it is the closest thing we have to an adoption-time measurement contract.',
          },
          {
            type: 'paragraph',
            html: 'The first step is therefore extraction:',
          },
          {
            type: 'ordered-list',
            items: [
              'recover the workflow’s goal at the reviewed adoption revision;',
              'identify the pre-existing repository problem that motivated it;',
              'identify eligible opportunities and affected repositories;',
              'separate repository outcomes from workflow mechanisms and output proxies;',
              'preserve deterministic checks, populations, thresholds, and missing-data rules already present in the workflow;',
              'translate the result into one or more candidate value functions;',
              'test whether the same function can be applied before adoption.',
            ],
          },
          {
            type: 'paragraph',
            html: 'This is a familiar use of AI. We already use language models every day to turn prose into code, tests, schemas, and queries. Here, the translation target is a small, inspectable measurement function.',
          },
          {
            type: 'paragraph',
            html: 'For example, consider a workflow whose intent is to reduce oversized production Go files. Its instructions and precomputes establish the relevant population and threshold:',
          },
          {
            type: 'code',
            code: 'Count non-test .go files under pkg/ with at least 800 lines.\nLower is better.\nIncomplete file evidence is unavailable, not zero.',
          },
          {
            type: 'paragraph',
            html: 'That becomes a frozen repository-native function. The function can be applied to the adoption commit’s actual first parent to determine whether the measured phenomenon existed before the workflow and whether a valid baseline can be reconstructed.',
          },
          {
            type: 'figure',
            figure: {
              src: '/frozen-function-baseline.svg',
              alt: 'Frozen-function baseline diagram and horizontal bars for five Go files. Two non-test files under pkg have at least 800 lines and qualify; a test file and a file outside pkg are excluded; one eligible file is below the threshold.',
              caption:
                'The frozen population rule yields an immutable baseline of two oversized production files. Exclusions are explicit rather than absorbed into a model score.',
              label: 'frozen-function baseline',
              width: 1440,
              height: 980,
              placement: 'wide',
            },
          },
          {
            type: 'paragraph',
            html: 'The plot makes the classification visible. Two files qualify. A large test file is excluded by the frozen population rule. A large file outside <code>pkg/</code> is also excluded. A smaller eligible file remains in the population but below the threshold. The baseline is therefore <strong>two oversized production files</strong>, not a model-generated score.',
          },
          {
            type: 'paragraph',
            html: 'This matters because the baseline determines what we can later claim. If the same repository-native phenomenon existed and can be reconstructed before adoption, the workflow is <strong>baseline-comparable</strong>. If the outcome contract is valid but historical evidence genuinely cannot be reconstructed, measurement may begin at adoption without pretending the first post-adoption result is a baseline.',
          },
        ],
      },
      {
        heading: 'Measure the accepted change',
        blocks: [
          {
            type: 'paragraph',
            html: 'Once an output has authoritative acceptance evidence, its acceptance time locates the relevant repository revisions. For a merged pull request, the actual first parent is the “before” state and the merge commit is the “after” state.',
          },
          {
            type: 'paragraph',
            html: 'The measurement system applies the same frozen function to both revisions. It does not ask the agent whether the change looks good, and it does not rewrite the function after seeing the result.',
          },
          {
            type: 'figure',
            figure: {
              src: '/accepted-change-before-after.svg',
              alt: 'Before-and-after bars anchored at acceptance. The actual first parent has two oversized production files and the accepted merge has one, a decrease of one. Delivery lineage and the structural metric are complete; behavior preservation and exclusive causation are not established.',
              caption:
                'Narrow claim: the accepted implementation is associated with one fewer oversized production file under the frozen measurement contract. Behavior preservation and exclusive causation remain unverified.',
              label: 'accepted-change before and after evidence',
              width: 1200,
              height: 900,
              placement: 'wide',
            },
          },
          {
            type: 'paragraph',
            html: 'In this example, the metric moves from two oversized files before the merge to one afterward. For a decrease-oriented metric, that is a direction-aware gain of one file.',
          },
          {
            type: 'paragraph',
            html: 'The evidence supports a narrow statement: the accepted implementation is associated with one fewer oversized production file under the frozen measurement contract.',
          },
          {
            type: 'paragraph',
            html: 'It does not yet prove that behavior was preserved. It does not prove the workflow was the exclusive cause. It does not prove that the improvement persisted. Those require their own evidence.',
          },
          {
            type: 'paragraph',
            html: 'This is the emerging shape of operational-value measurement:',
          },
          {
            type: 'code',
            code: 'workflow intent\n    → frozen repository-native function\n    → independent baseline or attainment window\n    → safe output\n    → explicit accepted implementation\n    → immutable before/after evidence\n    → bounded claim with visible limitations',
          },
          {
            type: 'paragraph',
            html: 'The important move is not a more elaborate score. It is preserving each evidence boundary so that execution, production, acceptance, repository change, quality, cost, and causality cannot silently substitute for one another.',
          },
        ],
      },
      {
        heading: 'What we still need to learn',
        blocks: [
          {
            type: 'paragraph',
            html: 'This approach gives us a practical starting point, not a universal theory of agentic value.',
          },
          {
            type: 'paragraph',
            html: 'We still need to study how well intent can be extracted across domains, how often adoption-time evidence supports valid baselines, how acceptance latency affects cohort comparisons, and which repository-native measures remain stable under changing workloads. We also need to understand when several native measures can be summarized without erasing disagreement between them.',
          },
          {
            type: 'paragraph',
            html: 'The immediate objective is simpler: build a growing set of frozen, domain-specific measurement functions and examine what they have in common. Only then should we attempt to crystallize a broader operational-value model.',
          },
        ],
      },
    ],
    sourcesHeading: 'Sources',
    sourcesOrdered: true,
    sources: [
      {
        id: 'agent-factory',
        html: 'GitHub Agentic Workflows, <a href="https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/">“Welcome to Peli’s Agent Factory.”</a> The factory was designed as a broad, heterogeneous collection of real workflows used continuously to observe what worked, what failed, and which safe and effective patterns could be reused.',
      },
      {
        id: 'copilot-metrics',
        html: 'GitHub Docs, <a href="https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics">“Interpreting usage and adoption metrics for GitHub Copilot.”</a> GitHub defines code-completion acceptance rate as the percentage of suggestions accepted and describes a rising rate as a signal of increasing trust and usefulness.',
      },
      {
        id: 'better-completions',
        html: 'GitHub Blog, <a href="https://github.blog/ai-and-ml/github-copilot/the-road-to-better-completions-building-a-faster-smarter-github-copilot-with-a-new-custom-model/">“The road to better completions: Building a faster, smarter GitHub Copilot with a new custom model.”</a> GitHub explains why optimizing only for acceptance rate could favor short, simple suggestions and why evaluation expanded to accepted-and-retained characters and other production signals.',
      },
      {
        id: 'copilot-productivity',
        html: 'GitHub Blog, <a href="https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/">“Research: quantifying GitHub Copilot’s impact on developer productivity and happiness.”</a> The study discusses the difficulty of reducing developer productivity to outputs over inputs and combines telemetry, surveys, and a controlled experiment.',
      },
    ],
  },
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
    sources: [
      {
        html: '<a href="https://githubnext.github.io/gh-cao/">Central Agentic Ops: Official site</a>',
      },
      {
        html: '<a href="https://githubnext.github.io/gh-cao/architecture-at-a-glance/">What is Central Agentic Ops?</a>',
      },
      {
        html: '<a href="https://github.github.com/gh-aw/">GitHub Agentic Workflows</a>',
      },
    ],
  },
];
