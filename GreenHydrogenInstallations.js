cube(`GreenHydrogenInstallations`, {
  sql: `
    SELECT *
    FROM public.green_hydrogen_trackers
    WHERE to_regclass('vw_greenhydrogeninstallations_${COMPILE_CONTEXT.securityContext.tenant_id}') IS NOT NULL AND status_id IN (
      SELECT status_sub_tracker_masters.status_id FROM status_sub_tracker_masters
      JOIN sub_tracker_masters ON sub_tracker_masters.id = status_sub_tracker_masters.sub_tracker_master_id 
      AND sub_tracker_masters.name = 'Green Hydrogen'
    ) and project_type_id IN (
      SELECT project_type_sub_tracker_masters.project_type_id FROM project_type_sub_tracker_masters
      JOIN sub_tracker_masters ON sub_tracker_masters.id = project_type_sub_tracker_masters.sub_tracker_master_id 
      AND sub_tracker_masters.name = 'Green Hydrogen'
    ) AND data_live = true
  `,
// sql_table: `vw_greenhydrogeninstallations_${COMPILE_CONTEXT.securityContext.tenant_id}`,
  
  data_source: `default`,

  title: `GreenHydrogen Installations`,
  description: `GreenHydrogen installation projects with capacity, status, and location information`,

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
      sql: `${CUBE}.commissioned_date`,
      type: `time`,
      title: `Commissioning Date`,
    },

    developerId: {
      sql: `developer_id`,
      type: `number`,
      title: `Developer ID`,
    },

    developer: {
      sql: `(SELECT name FROM public.firms WHERE id = ${CUBE}.developer_id)`,
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
      sql: `(SELECT name FROM public.firms WHERE id = ${CUBE}.developer_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter Developer`,
    },

  },

  measures: {
    count: {
      type: `count`,
      title: `Number of Projects`,
    },
    // filter measures
    filterCommissioningYearStart: {
      sql: `MIN(${CUBE}.commissioned_date)`,
      type: `time`,
      title: `Filter Commissioning Year Start`,
    },

    filterCommissioningYearEnd: {
      sql: `MAX(${CUBE}.commissioned_date)`,
      type: `time`,
      title: `Filter Commissioning Year End`,
    },

    totalCapacity: {
      sql: `COALESCE(${CUBE}.capacity, 0)`,
      type: `sum`,
      title: `Total GreenHydrogen Capacity (MW)`,
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

  // pre_aggregations: {
  //   monthlyRollup: {
  //     measures: [
  //       GreenHydrogenInstallations.count,
  //       GreenHydrogenInstallations.totalCapacity,
  //     ],
  //     dimensions: [
  //       GreenHydrogenInstallations.state,
  //       GreenHydrogenInstallations.statusId,
  //     ],
  //     timeDimension: GreenHydrogenInstallations.commissioning_date,
  //     granularity: `month`,
  //     partitionGranularity: `year`,
  //     refreshKey: {
  //       every: `1 hour`,
  //     },
  //   },

  //   stateRollup: {
  //     measures: [
  //       GreenHydrogenInstallations.count,
  //       GreenHydrogenInstallations.totalCapacity,
  //       GreenHydrogenInstallations.completedCapacity,
  //     ],
  //     dimensions: [
  //       GreenHydrogenInstallations.state,
  //       GreenHydrogenInstallations.statusId,
  //       GreenHydrogenInstallations.projectTypeId,
  //     ],
  //     refreshKey: {
  //       every: `1 hour`,
  //     },
  //   },

  //   developerRollup: {
  //     measures: [
  //       GreenHydrogenInstallations.count,
  //       GreenHydrogenInstallations.totalCapacity,
  //     ],
  //     dimensions: [
  //       GreenHydrogenInstallations.developer,
  //       GreenHydrogenInstallations.status,
  //     ],
  //     refreshKey: {
  //       every: `1 hour`,
  //     },
  //   },
  // },
});
