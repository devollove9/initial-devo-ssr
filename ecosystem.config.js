module.exports = {
  apps : [
	{
    		name: 'initial-devo-s',
		exec_mode : 'cluster', // enables clustering
        	script    : './node_modules/nuxt/bin/nuxt-start', // The magic key
		instance  : 'max',
    		env: { "HOST": "127.0.0.1", "PORT": 3002, "NODE_ENV": "production", } 
	}
  ]
};
