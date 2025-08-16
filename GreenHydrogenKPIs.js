cube(`GreenHydrogenKPIs`, {
  extends: GreenHydrogenInstallations,

  title: `GreenHydrogen KPIs`,
  description: `Key Performance Indicators for GreenHydrogen Installations`,

  measures: {
    // Total Pipeline
    totalPipeline: {
      sql: `capacity`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses)` }],
      // No filters - includes all projects
    },

    // Project Stages
    totalInOperation: {
      sql: `capacity`,
      type: `sum`,
      title: `Total In-Operation (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation')` }],
    },

    totalAnnounced: {
      sql: `capacity`,
      type: `sum`,
      title: `Pre Construction (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Announced')` }],
    },

    underConstructionCapacity: {
      sql: `capacity`,
      type: `sum`,
      title: `Under Construction (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Construction')` }],
    },

  },
});
