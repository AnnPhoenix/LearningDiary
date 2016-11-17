/**
 * 1.module.exports 初始值为一个空对象 {}
 * 2.exports 是指向的 module.exports 的引用
 * 3.require() 返回的是 module.exports 而不是 exports
 */

/**
 * Gruntfile.js组成
 * 
 * wrapper函数 ↓↓↓↓
 */
const path = require('path');
const pro = require('process');

exports = module.exports = function(grunt) {
	// 任务配置，大多数任务都需要配置某些数据，
	// 这些数据定义在grunt.initConfig中，以object形式
	
	// display the elapsed execution time of grunt tasks 
	require('time-grunt')(grunt);
	// 配置项的几种写法
	// 【1. grunt原生】
	// grunt.initConfig({
	// 	pkg: grunt.file.readJSON('./package.json'),
	// 	uglify: {
	// 		options: {
	// 			banner: "/**uglify banner 'options' balabalabala */\n"
	// 		},
	// 		build: {
	// 			src: "src/jquery.js",
	// 			dest: "build/jquery.min.js"
	// 		}
	// 	}
	// });

	// 【2.initConfig 可以使用 load-grunt-config配置】
	// [github；https://github.com/firstandthird/load-grunt-config]
	require("load-grunt-config")(grunt, {
		// path to task.js files, defaults to grunt dir
		// 【任务配置文件目录地址】
		configPath: path.join(pro.cwd(), 'grunt-config', 'config'),
		// configPath: './grunt/',

		// auto grunt.initConfig
		init: true,

		// data passed into config.  Can use with <%= test %>
		// 【同grunt.initConfig中配置的变量 可通过<%= test%>方式引用】
		data: {
			test: false,
			jsfile: "jquery",
			src: "src",
			build: "build"
		},

		// use different function to merge config files
		mergeFunction: require('recursive-merge'),

		// can optionally pass options to load-grunt-tasks.
		// If you set to false, it will disable auto loading tasks.
		// 【load-grunt-config 内置依赖 load-grunt-tasks 参考 load-grunt-tasks 配置方法】
		// 
		// loadGruntTasks: {
		// 	pattern: 'grunt-*',
		// 	config: require('./package.json'),
		// 	scope: 'devDependencies'
		// },

		// can post process config object before it gets passed to grunt
		// 【在config对象被传入grunt前的处理，感觉用不到】
		// postProcess: function(config) {},

		// allows to manipulate the config object before it gets merged with the data object
		// 【与data对象合并之前对config的处理，同上】
		// preMerge: function(config, data) {}
	});

	// 插件加载，否则无法引用到该任务

	/**
	 * 可以使用 load-grunt-tasks 配置
	 * [github: https://github.com/sindresorhus/load-grunt-tasks]
	 * load-grunt-task 默认集成在 load-grunt-config
	 * 可配合使用
	 *
	 * 几种写法
	 */
	// 1. grunt原生
	// grunt.loadNpmTasks("grunt-contrib-uglify");

	// 2. 使用load-grunt-tasks
	// grunt读取模块的时候，会找
	// root="node_modules"
	// 
	// var tasksdir = path.join(root, name, 'tasks');
	// 因此要进行相对定位找到我们自定义的任务模块
	// 自定义任务必须有tasks文件夹
	require("load-grunt-tasks")(grunt, {
		pattern: ['grunt-*', '@*/grunt-*', '../grunt-config/*'],
		config: './package.json',
		scope: ['devDependencies', 'dependiencies', 'myCustomModule']
	});

	// 任务定义 defaullt
	// grunt.registerTask("default", ["uglify"]);
};