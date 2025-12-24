cube(`SolarPVTrackerKPIs`, {
  extends: SolarPVTrackerInstallations,

  title: `SolarPVTracker KPIs`,
  description: `Key Performance Indicators for Hybrid Installations`,

  measures: {
    // Total Pipeline
    totalModulePipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Module'
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    totalCellPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Cell'
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    totalWaferIngotsPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Wafers/Ingots'
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    totalPolysiliconPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Polysilicon'
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    totalModuleUAPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Module' AND ${CUBE}.status_id IN (
              SELECT id FROM public.statuses WHERE name IN ('Under Development', 'Announced')
          )
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    totalCellUAPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Cell' AND ${CUBE}.status_id IN (
              SELECT id FROM public.statuses WHERE name IN ('Under Development', 'Announced')
          )
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    totalWafersIngotsUAPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Wafers/Ingots' AND ${CUBE}.status_id IN (
              SELECT id FROM public.statuses WHERE name IN ('Under Development', 'Announced')
          )
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },

    totalPolysiliconUAPipeline: {
      sql: `CASE 
          WHEN ${CUBE}.category = 'Polysilicon' AND ${CUBE}.status_id IN (
              SELECT id FROM public.statuses WHERE name IN ('Under Development', 'Announced')
          )
          THEN COALESCE(capacity,0)
          ELSE 0
        END`,
      type: `sum`,
      title: `Total Pipeline (MW)`,
    },
  },
    
});
