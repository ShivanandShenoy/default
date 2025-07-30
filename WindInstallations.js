cube(`WindInstallations`, {
  sql: `
    SELECT *
    FROM public.wind_trackers
    WHERE status_id IN (
      SELECT id FROM public.statuses WHERE filter = true
    ) and project_type_id IN (
      SELECT project_type_sub_tracker_masters.project_type_id FROM project_type_sub_tracker_masters
      JOIN sub_tracker_masters ON sub_tracker_masters.id = project_type_sub_tracker_masters.sub_tracker_master_id 
      AND sub_tracker_masters.name = 'Wind'
    )
  `,

  data_source: `default`,
// id, entry_date, status_id, analyst_id, acquired_projects, developer_id, company_id, project_id, park_id, location, district_id, state_id, project_type_id, wind_capacity_mw, repowered_projects, hybrid_project_breakdown, policy_type_id, tender_scheme_id, project_category_id, oa_id, commissioned_date, estimated_scod, loa, auction_date, ppa, psa, financial_closure, tariff, adopted_tariff_by_commission, project_cost, offtaker_type, offtaker, substation_place_id, connectivity_level_kv, hub_height_m, rotor_diameter_m, turbine_size_mw, turbine_supplier_id, epc_id, om_id, funding_groups_investors_id, last_call, additional_comments, contact_name, contact_number, link_1, link_2, additional
  title: `Wind Installations`,
  description: `Wind installation projects with capacity, status, and location information`,

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
    
    ProjectCategory: {
      relationship: `belongsTo`,
      sql: `${CUBE}.project_category_id = ${ProjectCategory}.id`
    },
    
   
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true,
    },
     // chart filters
    filterStatus: {
      sql: `(SELECT name FROM public.statuses WHERE id = ${CUBE}.status_id AND filter = true ORDER BY name ASC)`,
      type: `string`,
      title: `Filter Status`,
    },

    filterState: {
      sql: `(SELECT name FROM public.states WHERE id = ${CUBE}.state_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter State`,
    },

    filterProjectCategory: {
      sql: `(SELECT name FROM public.project_categories WHERE id = ${CUBE}.project_category_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter Project Category`,
    },

    filterProjectType: {
      sql: `(SELECT name FROM public.project_types WHERE id = ${CUBE}.project_type_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter Project Type`,
    },

    filterDeveloper: {
      sql: `(SELECT name FROM public.firms WHERE id = ${CUBE}.developer_id ORDER BY name ASC)`,
      type: `string`,
      title: `Filter Developer`,
    },

    statusId: {
      sql: `status_id`,
      type: `number`,
      title: `Status ID`,
    },

    status: {
      sql: `(SELECT name FROM public.statuses WHERE id = ${CUBE}.status_id AND filter = true)`,
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

    projectCategoryId: {
      sql: `project_category_id`,
      type: `number`,
      title: `Project Category ID`,
    },

    project_category: {
      sql: `(SELECT name FROM public.project_categories WHERE id = ${CUBE}.project_category_id)`,
      type: `string`,
      title: `Project Category`,
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


    // Additional dimensions
    location: {
      sql: `${CUBE}.location`,
      type: `string`,
      title: `Location`,
    },

    // Derived dimensions for better analysis
    commissioning_year: {
      sql: `EXTRACT(YEAR FROM ${CUBE}.commissioned_date)`,
      type: `number`,
      title: `Commissioning Year`,
    },

    commissioning_quarter: {
      sql: `EXTRACT(QUARTER FROM ${CUBE}.commissioned_date)`,
      type: `string`,
      title: `Commissioning Quarter`,
    },

    commissioning_month: {
      sql: `TO_CHAR(${CUBE}.commissioned_date, 'YYYY-MM')`,
      type: `string`,
      title: `Commissioning Month`,
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
      sql: `wind_capacity_mw`,
      type: `sum`,
      title: `Total Wind Capacity (MW)`,
      format: `number`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE filter = 'true')` }],
    },

    averageCapacity: {
      sql: `wind_capacity_mw`,
      type: `avg`,
      title: `Average Project Capacity (MW)`,
      format: `number`,
    },

    maxCapacity: {
      sql: `wind_capacity_mw`,
      type: `max`,
      title: `Largest Project Capacity (MW)`,
      format: `number`,
    },

    minCapacity: {
      sql: `wind_capacity_mw`,
      type: `min`,
      title: `Smallest Project Capacity (MW)`,
      format: `number`,
    },

    // Additional capacity measures
    windCapacity: {
      sql: `wind_capacity`,
      type: `sum`,
      title: `Total Wind Capacity (MW)`,
      format: `number`,
    },

    // Calculated measures
    completedProjects: {
      type: `count`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation')` }],
      title: `In-Operation Projects`,
    },

    underConstructionProjects: {
      type: `count`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Construction')` }],
      title: `Under Construction Projects`,
    },

    completedCapacity: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation')` }],
      title: `In-Operation Capacity (MW)`,
    },

    underConstructionCapacity: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Construction')` }],
      title: `Under Construction Capacity (MW)`,
    },

    // Additional measures for KPIs
    preConstructionProjects: {
      type: `count`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Pre Construction')` }],
      title: `Pre Construction Projects`,
    },

    preConstructionCapacity: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Pre Construction')` }],
      title: `Pre Construction Capacity (MW)`,
    },

    underDevelopmentProjects: {
      type: `count`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Development')` }],
      title: `Under Development Projects`,
    },

    underDevelopmentCapacity: {
      sql: `wind_capacity_mw`,
      type: `sum`,
      filters: [{ sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Development')` }],
      title: `Under Development Capacity (MW)`,
    },
  },

  segments: {
    inOperationSegment: {
      sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'In-Operation')`,
    },

    underConstructionSegment: {
      sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Construction')`,
    },

    preConstructionSegment: {
      sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Pre Construction')`,
    },

    underDevelopmentSegment: {
      sql: `${CUBE}.status_id IN (SELECT id FROM public.statuses WHERE name = 'Under Development')`,
    },

    largeScale: {
      sql: `${CUBE}.wind_capacity_mw >= 100`,
    },

    mediumScale: {
      sql: `${CUBE}.wind_capacity_mw >= 10 AND ${CUBE}.wind_capacity_mw < 100`,
    },

    smallScale: {
      sql: `${CUBE}.wind_capacity_mw < 10`,
    },

  },

  pre_aggregations: {
    monthlyRollup: {
      measures: [
        WindInstallations.count,
        WindInstallations.totalCapacity,
        WindInstallations.completedProjects,
        WindInstallations.underConstructionProjects,
        WindInstallations.preConstructionProjects,
        WindInstallations.underDevelopmentProjects,
      ],
      dimensions: [
        WindInstallations.state,
        WindInstallations.statusId,
        WindInstallations.commissioning_month,
      ],
      timeDimension: WindInstallations.commissioning_date,
      granularity: `month`,
      partitionGranularity: `year`,
      refreshKey: {
        every: `1 hour`,
      },
    },

    stateRollup: {
      measures: [
        WindInstallations.count,
        WindInstallations.totalCapacity,
        WindInstallations.averageCapacity,
        WindInstallations.completedCapacity,
        WindInstallations.underConstructionCapacity,
        WindInstallations.preConstructionCapacity,
        WindInstallations.underDevelopmentCapacity,
      ],
      dimensions: [
        WindInstallations.state,
        WindInstallations.statusId,
        WindInstallations.projectTypeId,
      ],
      refreshKey: {
        every: `1 hour`,
      },
    },

    developerRollup: {
      measures: [
        WindInstallations.count,
        WindInstallations.totalCapacity,
        WindInstallations.completedProjects,
        WindInstallations.underConstructionProjects,
      ],
      dimensions: [
        WindInstallations.developer,
        WindInstallations.status,
      ],
      refreshKey: {
        every: `1 hour`,
      },
    },
  },
});
