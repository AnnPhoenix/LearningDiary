/*
 * conslog
 * 
 *
 * Copyright (c) 2016 AnnPhoenix
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  // 自定义grunt任务
  // A very basic default task.
  grunt.registerTask('conslog', 'Log some stuff.', function() {
    grunt.log.write('conslog some stuff...').ok();
  });

};
