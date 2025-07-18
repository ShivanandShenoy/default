cube(`StatePVOverview`, {
  sql_table: `public.state_pv_overviews`,
  
  data_source: `default`,
  
  title: `StatePVOverview`,
  description: `State-wise power distribution companies`,
  
  joins: {
    States: {
      relationship: `belongsTo`,
      sql: `${CUBE}.state_id = ${States}.id`
    },
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true,
    },

     // State
    stateId: {
      sql: `state_id`,
      type: `number`,
      title: `State ID`,
    },

    // Time dimensions
    quarter: {
      sql: `quarter`,
      type: `string`,
      title: `Quarter`,
    },

    year: {
      sql: `year`,
      type: `number`,
      title: `Year`,
    },

    TotalInstPowerCapacity: {
      sql: `total_installed_power_capacity_mw`,
      type: `number`,
      title: `Total Installed Power Capacity`,
    },

    TotalREInstCapacity: {
      sql: `total_re_installed_capacity_mw`,
      type: `number`,
      title: `Total RE Installed capacity (Includes Hydro)`,
    },

    ShareRECapacity: {
      sql: `share_of_re_capacity`,
      type: `number`,
      title: `Share of RE Capacity (Includes Hydro)`,
    },

    ShareSolarWind: {
      sql: `share_of_solar_and_wind`,
      type: `number`,
      title: `Share of Solar and Wind`,
    },
    
    CumulativeLargeScalePVInst: {
      sql: `cumulative_large_scale_solar_pv_installations_mw`,
      type: `number`,
      title: `Cumulative Large Scale Solar PV Installations`,
    },
    
    ShareSolarPVInTotalCapacity: {
      sql: `share_of_solar_pv_in_total_installed_capacity`,
      type: `number`,
      title: `Share of Solar PV in Total Installed Capactiy`,
    },
    
    ShareSolarPVInRECapacity: {
      sql: `share_of_solar_pv_in_re_installed_capacity`,
      type: `number`,
      title: `Share of Solar PV in RE Installed Capacity`,
    },
  },
   segments: {
    latestQuarter: {
      sql: `(year, quarter) = (
            SELECT year, quarter FROM power_mixes ORDER BY year DESC, quarter DESC LIMIT 1
           )`,
    }
  }
});