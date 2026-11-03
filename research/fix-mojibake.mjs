import fs from "node:fs";

const patches = [
  [
    "app/pages/index.vue",
    [["Discover all projects ?", "Discover all projects →"]],
  ],
  [
    "app/pages/services.vue",
    [
      ["Meet the team ?", "Meet the team →"],
      ["Discover all projects ?", "Discover all projects →"],
      ["{{ a.date }} {{ a.title }} ?", "{{ a.date }} {{ a.title }} ↗"],
      ["VISIT OUR PRESS PAGE ?", "VISIT OUR PRESS PAGE →"],
      ["Let?s work ? together", "Let’s work → together"],
      ["GO TO THE CONTACT PAGE ?", "GO TO THE CONTACT PAGE →"],
      ['v-else-if="i === 0"', 'v-else-if="i === 1"'],
    ],
  ],
  [
    "app/pages/press.vue",
    [
      ["          ? {{ c }}", "          → {{ c }}"],
      ["{{ s.title }} ?", "{{ s.title }} ↗"],
      ["{{ item.category }} ?", "{{ item.category }} ↗"],
      ["?? LOAD MORE ??", "↓↓ LOAD MORE ↓↓"],
      ["{{ site.press.contactLabel }} ?", "{{ site.press.contactLabel }} →"],
    ],
  ],
  [
    "app/pages/contact.vue",
    [
      ["{{ c.email }} ?", "{{ c.email }} →"],
      ["SUBMIT ?", "SUBMIT →"],
    ],
  ],
  [
    "app/pages/work/index.vue",
    [
      [
        "We choose a different ? starting point",
        "We choose a different → starting point",
      ],
      [
        "Click here to discover more collections ?",
        "Click here to discover more collections →",
      ],
    ],
  ],
  [
    "app/pages/work/[uid].vue",
    [
      ["? back to work", "← back to work"],
      ['join(" ? ")', 'join(" · ")'],
    ],
  ],
  [
    "app/pages/team/index.vue",
    [
      ['join(" ? ")', 'join(" · ")'],
      ['"visit" }} ?', '"visit" }} ↗'],
    ],
  ],
  [
    "app/pages/team/[uid].vue",
    [["? back to team", "← back to team"]],
  ],
  [
    "app/components/ProjectGrid.vue",
    [
      ['split("?")', 'split("‣")'],
      ['join(" ? ")', 'join(" · ")'],
    ],
  ],
];

for (const [file, reps] of patches) {
  let t = fs.readFileSync(file, "utf8");
  let n = 0;
  for (const [a, b] of reps) {
    const c = t.split(a).length - 1;
    if (c) {
      t = t.split(a).join(b);
      n += c;
    } else {
      console.log("MISS", file, JSON.stringify(a));
    }
  }
  fs.writeFileSync(file, t);
  console.log(file, "replacements", n);
}
