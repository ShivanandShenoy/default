cube(`RegulatoryUpdateTrackerKPIs`, {
  extends: RegulatoryUpdateTracker,

  title: `RegulatoryUpdateTracker KPIs`,
  description: `Key Performance Indicators for Hybrid Installations`,

  measures: {
  rooftopPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Rooftop'` }]
  },

  solarPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Solar'` }]
  },

  transmissionPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Transmission'` }]
  },

  hydelPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Hydel'` }]
  },

  renewableEnergyPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Renewable energy'` }]
  },

  dsmPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'DSM'` }]
  },

  powerPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Power'` }]
  },

  smartMetersPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Smart Meters'` }]
  },

  openAccessPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Open Access'` }]
  },

  rpoPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'RPO'` }]
  },

  biomassPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Biomass'` }]
  },

  tariffPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Tariff'` }]
  },

  hybridPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Hybrid'` }]
  },

  netMeteringPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Net Metering'` }]
  },

  miniHydelPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Mini Hydel'` }]
  },

  wasteToEnergyPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Waste to Energy'` }]
  },

  windPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Wind'` }]
  },

  electricVehiclesPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Electric Vehicles'` }]
  },

  greenHydrogenPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Green Hydrogen'` }]
  },

  bagassePolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Bagasse'` }]
  },

  biogasPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Biogas'` }]
  },

  energyStoragePolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Energy Storage'` }]
  },

  cogenerationPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Cogeneration'` }]
  },

  rtcPowerPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'RTC Power'` }]
  },

  storagePolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Storage'` }]
  },

  recPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'REC'` }]
  },

  biofuelPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Biofuel'` }]
  },

  antiDumpingPolicyCount: {
    type: `count`,
    filters: [{ sql: `${PolicyType}.name = 'Anti-Dumping'` }]
  }
}

    
});
