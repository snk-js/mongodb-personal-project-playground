export const getProject = (properties: Record<string, '1' | '0' | 1 | 0>) => ({
  $project: {
    ...properties,
  },
});
