module.exports = function(grunt, option) {
	return {
		options: {
			banner: "/**uglify banner 'options' balabalabala */\n"
		},
		build: {
			src: "<%=src %>/<%=jsfile %>.js",
			dest: "<%=build %>/<%=jsfile %>.min.js"
		}
	};
};