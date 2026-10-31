export interface PostSection {
  heading: string;
  body: string;
}

export interface Post {
  slug: string;
  category: 'Artificial Intelligence' | 'Research Notes' | 'Perspectives';
  date: string;
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
    slug: 'thinking-with-ai',
    category: 'Artificial Intelligence',
    date: 'IDEA / 01',
    readTime: '6 MIN READ',
    tone: 'blue',
    symbol: '✳',
    title: 'Thinking with AI, not just using it',
    excerpt:
      'What changes when we treat intelligent tools as partners for inquiry rather than shortcuts to answers?',
    intro:
      'AI tools can accelerate familiar tasks. The more interesting question is whether they can also improve the way we think.',
    sections: [
      {
        heading: 'Beyond the first answer',
        body: 'The speed of an answer is not the same as the quality of a conclusion. A useful AI workflow can make space for counterarguments, alternate framings and the evidence we would otherwise overlook.',
      },
      {
        heading: 'A more thoughtful workflow',
        body: 'Start by writing down what you think you know. Ask what evidence would change your mind. Then let AI help explore the possibilities—but keep the responsibility for judgment with the human researcher.',
      },
      {
        heading: 'The question worth keeping',
        body: 'Perhaps the best use of AI is not to remove the work of thinking, but to make the work of thinking more deliberate.',
      },
    ],
  },
  {
    slug: 'research-questions',
    category: 'Research Notes',
    date: 'IDEA / 02',
    readTime: '5 MIN READ',
    tone: 'peach',
    symbol: '?',
    title: 'The art of a better research question',
    excerpt:
      'A small shift in how we frame a problem can completely change the quality of what we discover.',
    intro:
      'Good research often begins before the first search. It begins with noticing what, exactly, we are trying to understand.',
    sections: [
      {
        heading: 'From topic to question',
        body: 'A topic gives us territory; a question gives us direction. “AI in education” is a topic. “When does AI feedback improve a learner’s own judgment?” is a question worth investigating.',
      },
      {
        heading: 'Make uncertainty visible',
        body: 'The most revealing questions often contain a tension, an assumption or an exception. Naming these explicitly makes it easier to gather evidence rather than confirm a preference.',
      },
      {
        heading: 'Leave room to be surprised',
        body: 'A working question is a tool, not a destination. Let it evolve as the evidence changes.',
      },
    ],
  },
  {
    slug: 'human-curiosity',
    category: 'Perspectives',
    date: 'IDEA / 03',
    readTime: '4 MIN READ',
    tone: 'sage',
    symbol: '∞',
    title: 'On staying curious in a fast-moving world',
    excerpt:
      'A gentle case for slowing down, paying attention, and choosing what deserves our focus.',
    intro:
      'New tools and ideas arrive faster than we can absorb them. Curiosity helps us choose where to spend our attention.',
    sections: [
      {
        heading: 'Depth over novelty',
        body: 'It is easy to mistake constant updates for progress. Sometimes the most useful thing we can do is stay with one question long enough to develop a point of view.',
      },
      {
        heading: 'The value of wandering',
        body: 'Not every interesting connection appears in a plan. Reading across disciplines, talking to people with different backgrounds and following unexpected details can reveal fresh approaches.',
      },
      {
        heading: 'A practice, not a personality',
        body: 'Curiosity is built through small habits: asking why, checking assumptions and remaining willing to revise our understanding.',
      },
    ],
  },
];
