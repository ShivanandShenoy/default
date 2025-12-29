cube(`RegulatoryUpdateTracker`, {
  sql: `
    SELECT *
    FROM public.regulatory_update_tracker
    WHERE to_regclass('vw_regulatoryupdatetracker_${COMPILE_CONTEXT.securityContext.tenant_id}') IS NOT NULL AND data_live = true
  `,
  
  data_source: `default`,

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

    PolicyType: {
      relationship: `belongsTo`,
      sql: `${CUBE}.policy_type_id = ${PolicyType}.id`
    },

    Agency: {
      relationship: `belongsTo`,
      sql: `${CUBE}.agency_id = ${Agency}.id`
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true,
    },

    date: {
      sql: `date`,
      type: `time`,
      title: `Date`,
    },
    
    policy_type: {
      sql: `(SELECT name FROM public.policy_types WHERE id = ${CUBE}.policy_type_id)`,
      type: `string`,
      title: `Policy Type`,
    },

    agency: {
      sql: `(SELECT name FROM public.firms WHERE id = ${CUBE}.agency_id)`,
      type: `string`,
      title: `agency`,
    },

    state: {
      sql: `(SELECT name FROM public.states WHERE id = ${CUBE}.state_id)`,
      type: `string`,
      title: `State`,
    },

    stateId: {
      sql: `state_id`,
      type: `number`,
      title: `State ID`,
    },

    // chart filters
    filterPolicyType: {
      sql: `(SELECT name FROM public.policy_types WHERE id = ${CUBE}.policy_type_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter Policy Type`,
    },

    filterAgency: {
      sql: `(SELECT name FROM public.firms WHERE id = ${CUBE}.agency_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter agency`,
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

    filterDate: {
      sql: `EXTRACT(
              YEAR FROM ${CUBE}.date
            )`,
      type: `number`,
      title: `date Year`,
    },
  },

  measures: {
    count: {
      type: `count`,
      title: `Number of Projects`,
    },
    // filter measures
    filterDateYearStart: {
      sql: `MIN(${CUBE}.date)`,
      type: `time`,
      title: `Filter date Year Start`,
    },

    filterDateYearEnd: {
      sql: `MAX(${CUBE}.date)`,
      type: `time`,
      title: `Filter date Year End`,
    },
  },

});