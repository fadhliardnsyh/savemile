# Task 1 Brief: Update HomePage Global Schema in CMS

## File to modify
- [src/globals/HomePage.ts](file:///Users/haikal/Documents/work/treffix/savemile/src/globals/HomePage.ts)

## Task Requirements
Add the following field definition to the `fields` array inside `HomePage` (`src/globals/HomePage.ts`):

```ts
    {
      name: 'successStories',
      type: 'relationship',
      relationTo: 'success-stories',
      hasMany: true,
      label: 'Selected Success Stories (First item will be the large featured card)',
    },
```

## Report Contract
Write the report to `/Users/haikal/Documents/work/treffix/savemile/.superpowers/sdd/2026-08-04-cms-success-story-selection/task-1-report.md`.
Return status `DONE` with details of changes made and git commit.
