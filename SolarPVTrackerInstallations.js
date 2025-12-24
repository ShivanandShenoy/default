cube(`SolarPVTrackerInstallations`, {
  sql: `
    SELECT *
    FROM public.solar_pv_trackers
    WHERE to_regclass('vw_solarpvtrackerinstallations_${COMPILE_CONTEXT.securityContext.tenant_id}') IS NOT NULL AND data_live = true
  `,
  
  data_source: `default`,

  title: `Solar PV Installations`,
  description: `Solar PV installation projects with capacity, status, and location information`,

  joins: {
    States: {
      relationship: `belongsTo`,
      sql: `${CUBE}.state_id = ${States}.id`
    },
    
    Status: {
      relationship: `belongsTo`,
      sql: `${CUBE}.status_id = ${Status}.id`
    },
    
    ProjectType: {
      relationship: `belongsTo`,
      sql: `${CUBE}.project_type_id = ${ProjectType}.id`
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true,
    },

    statusId: {
      sql: `status_id`,
      type: `number`,
      title: `Status ID`,
    },

    status: {
      sql: `(SELECT name FROM public.statuses WHERE id = ${CUBE}.status_id)`,
      type: `string`,
      title: `Status`,
    },

    commissioning_date: {
      sql: `${CUBE}.commissioned_expected_by`,
      type: `time`,
      title: `Commissioning Date`,
    },

    developer: {
      sql: `manufacturer`,
      type: `string`,
      title: `Developer`,
    },

    projectTypeId: {
      sql: `project_type_id`,
      type: `number`,
      title: `Project Type ID`,
    },

    project_type: {
      sql: `(SELECT name FROM public.project_types WHERE id = ${CUBE}.project_type_id)`,
      type: `string`,
      title: `Project Type`,
    },

    stateId: {
      sql: `state_id`,
      type: `number`,
      title: `State ID`,
    },

    state: {
      sql: `(SELECT name FROM public.states WHERE id = ${CUBE}.state_id)`,
      type: `string`,
      title: `State`,
    },

    wafer_type: {
      sql: `wafer_type`,
      type: `string`,
      title: `wafer_type`,
    },

    capacity: {
      sql: `COALESCE(${CUBE}.capacity, 0)`,
      type: `number`,
      title: `Capacity`,
    },

    // chart filters
    filterStatus: {
      sql: `(SELECT name FROM public.statuses WHERE id = ${CUBE}.status_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter Status`,
    },

    filterState: {
      sql: `(SELECT name FROM public.states WHERE id = ${CUBE}.state_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter State`,
    },

    filterDeveloper: {
      sql: `(SELECT DISTINCT(manufacturer) FROM public.${CUBE} ORDER BY manufacturer ASC)`,
      type: `string`,
      title: `Filter Developer`,
    },

    commissioning_year: {
      sql: `EXTRACT(
              YEAR FROM ${CUBE}.commissioned_expected_by
            )`,
      type: `number`,
      title: `Commissioning Year`,
    },
  },

  measures: {
    count: {
      type: `count`,
      title: `Number of Projects`,
    },
    // filter measures
    filterCommissioningYearStart: {
      sql: `MIN(${CUBE}.commissioned_expected_by)`,
      type: `time`,
      title: `Filter Commissioning Year Start`,
    },

    filterCommissioningYearEnd: {
      sql: `MAX(${CUBE}.commissioned_expected_by)`,
      type: `time`,
      title: `Filter Commissioning Year End`,
    },

    totalCapacity: {
      sql: `COALESCE(${CUBE}.capacity, 0)`,
      type: `sum`,
      title: `Total Solar PV Capacity (MW)`,
      format: `number`,
    },

    // Calculated measures
    completedCapacity: {
      sql: `capacity`,
      type: `sum`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation')` }],
      title: `In-Operation Capacity (MW)`,
    },
  },

});
