cube(`WindKPIs`, {
  extends: WindInstallations,

  title: `Wind KPIs`,
  description: `Key Performance Indicators for Wind Installations`,

  measures: {
    // Total Pipeline
    totalPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.status_id IN (
            SELECT id FROM public.statuses 
            WHERE name IN ('Under Development', 'Under Construction', 'Pre Construction')
          )
          THEN ${CUBE}.wind_capacity_mw
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    // Project Stages
    totalInOperation: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `Total In-Operation (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation')` }],
    },

    preConstruction: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `Pre Construction (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Pre Construction')` }],
    },

    underDevelopment: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `Under Development (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Development')` }],
    },

    underConstructionCapacity: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `Under Construction (MW)`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Construction')` }],
    },

    // Project Categories by Status
    centralInOperation: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `Central In-Operation (MW)`,
      filters: [
        {
          sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation') AND ${CUBE}.project_category_id IN (SELECT id FROM public.project_categories WHERE name = 'Central')`,
        },
      ],
    },

    openAccessInOperation: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `Open Access In-Operation (MW)`,
      filters: [
        {
          sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation') AND ${CUBE}.project_category_id IN (SELECT id FROM public.project_categories WHERE name = 'Open Access')`,
        },
      ],
    },

    stateInOperation: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `State In-Operation (MW)`,
      filters: [
        {
          sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation') AND ${CUBE}.project_category_id IN (SELECT id FROM public.project_categories WHERE name = 'State')`,
        },
      ],
    },

    // Growth metrics
    weeklyGrowth: {
      sql: `
        CASE 
          WHEN (SELECT SUM(wind_capacity_mw) 
                FROM public.solar_chart_view 
                WHERE commissioned_date >= CURRENT_DATE - INTERVAL '14 days' 
                  AND commissioned_date < CURRENT_DATE - INTERVAL '7 days') > 0
          THEN ((SELECT SUM(wind_capacity_mw) 
                 FROM public.solar_chart_view 
                 WHERE commissioned_date >= CURRENT_DATE - INTERVAL '7 days') - 
                (SELECT SUM(wind_capacity_mw) 
                 FROM public.solar_chart_view 
                 WHERE commissioned_date >= CURRENT_DATE - INTERVAL '14 days' 
                   AND commissioned_date < CURRENT_DATE - INTERVAL '7 days')) * 100.0 / 
                (SELECT SUM(wind_capacity_mw) 
                 FROM public.solar_chart_view 
                 WHERE commissioned_date >= CURRENT_DATE - INTERVAL '14 days' 
                   AND commissioned_date < CURRENT_DATE - INTERVAL '7 days')
          ELSE 0 
        END
      `,
      type: `number`,
      title: `Weekly Growth (%)`,
    },

    // Count metrics
    totalProjects: {
      type: `count`,
      title: `Total Projects`,
    },

    completedProjectsCount: {
      type: `count`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Completed')` }],
      title: `Completed Projects Count`,
    },
  },
});
