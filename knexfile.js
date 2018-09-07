module.exports = {

  development: {
    client: 'pg',
    connection: "postgres://localhost:/customers"
  },

  production: {
    client: 'pg',
      connection: ""
  }

};
