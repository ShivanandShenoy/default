cube(`Agency`, {
  sql_table: `public.policy_types`,
  
  data_source: `default`,
  
  title: `Firms`,
  description: `Companies including developers, EPCs, suppliers, and other organizations`,

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true,
    },

    name: {
      sql: `name`,
      type: `string`,
      title: `Firm Name`,
    },

  },
});