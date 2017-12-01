module.exports = function(grunt) {


    grunt.initConfig({
     pkg:grunt.file.readJSON('package.json'),
     banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
     app:{
    	 source:'src/main/sourceapp',
    	 dist:'src/main/webapp',
    	 staticOutput:'target/'
     },
    jshint:{
        files:['<%= app.source %>/com/demo/**/*.js']
    },
    clean:{
        js_css:['.tmp',
              '<%= app.dist %>/assets/**/*',
              '<%= app.dist %>/com/demo/*',
              '<%= app.dist %>/css/*',
              '<%= app.dist %>/js/**/*',
              '<%= app.dist %>/lib/*',
              '<%= app.dist %>/locale/**/*',
              '<%= app.dist %>/scripts/**/*',
              '<%= app.dist %>/styles/**/*',
              '<%= app.dist %>/index.html',
              '<%= app.dist %>/quick-index.html',
             ]
    },
    compress: {
  	  main: {
  	    options: {
  	      archive: '<%= app.staticOutput%>/demo-ui.tar'
  	    },
  	  files: [
  	    {expand: true, cwd: '<%= app.dist %>/', src:['**/*', '!**/WEB-INF/**'], dest:'/'}
  	    ]
  	  }
  	},
    copy:{
    	assets: {
    	 expand:true,
         cwd:'<%= app.source %>/assets/',
         src:"**/*",
         dest:'<%= app.dist %>/assets/',
        },
        locale: {
       	 expand:true,
         cwd:'<%= app.source %>/locale/',
         src:"**/*",
         dest:'<%= app.dist %>/locale/',
        },
        html:{
            expand:true,
            cwd:'<%= app.source %>/com/demo/',
            src:"**/*.html",
            dest:'<%= app.dist %>/com/demo/',
        },
        jsSupport:{
            expand:true,
            cwd:'<%= app.source %>/js/',
            src:"**/*",
            dest:'<%= app.dist %>/js/',
        },
        jsDemo:{
         expand:true,
         cwd:'<%= app.source %>/com/demo/',
         src:"**/*",
         dest:'<%= app.dist %>/com/demo/',
        },
        jsVendor:{
        	expand:true,
            cwd:'<%= app.source %>/lib/',
            src:"**/*",
            dest:'<%= app.dist %>/lib',
         },
        css:{
         expand:true,
          cwd:'<%= app.source %>/css/',
          src:"**/*",
          dest:'<%= app.dist %>/css/',
        },
        fontBootstrap : {
        	expand : true,
        	cwd:'<%= app.source %>/lib/bootstrap/dist/fonts/',
            src:"**/*",
            dest:'<%= app.dist %>/fonts/',
        },
        imgfromLib : {
        	expand:true,
	        cwd:'<%= app.source %>/lib/select2/',
	        src:"**/select2.png",
	        dest:'<%= app.dist %>/styles/',
        },
        indexToRelease: {
           src: '<%= app.source %>/index.html',
           dest: '<%= app.dist %>/index.html',
        },
        quickIndexToRelease: {
            src: '<%= app.source %>/demo-index.html',
            dest: '<%= app.dist %>/demo-index.html',
         },
	    jsMinToDev: {
	    	expand:true,
	        cwd:'<%= app.dist %>/scripts/',
	        src:"**/*",
	        dest: '<%= app.source %>/scripts/',
	    },
	    cssMinToDev: {
	    	expand:true,
	        cwd:'<%= app.dist %>/styles/',
	        src:"**/*",
	        dest:'<%= app.source %>/styles/',
	    }
    },
    includeSource:{
       options:{
    	   basePath:'<%= app.source %>',
           templates:{
                html:{
                    js:'<script src="{filePath}"></script>',
                    css:'<link rel="stylesheet" type="text/css" href="{filePath}" />'
                }
            }
         },
        myTarget:{
           files:{
                '<%= app.source %>/index.html':'<%= app.source %>/index.template.html',
                '<%= app.source %>/demo-index.html':'<%= app.source %>/demo.index.template.html'
            }
        }
    },
    wiredep:{
        task1:{
        	src:['<%= app.source %>/index.html'],
        	ignorePath: /\.\.\/sourceapp\//,
        	devDependencies:true
        },
        task2:{
        	src:['<%= app.source %>/demo-index.html'],
        	ignorePath: /\.\.\/sourceapp\//,
        	devDependencies:true
        }
    },
    useminPrepare: {
	 	options: {
        	dest: '<%= app.dist %>'
        },
        html:['<%= app.source %>/index.html'],
	},
	useminPrepareQuickAdmin: {
		options: {
        	dest: '<%= app.dist %>'
        },
        html:['<%= app.source %>/demo-index.html'],
    },

	usemin:{
	  	html:['<%= app.source %>/index.html', '<%= app.source %>/demo-index.html']
	},
    watch:{
      
        local: {
            files: ['<%= jshint.files %>', '<%= app.source %>/css/**/*.css', '<%= app.source %>/**/*.html', 'lib/*'],
            tasks: ['local'],
            
            options: {
                livereload: true
            }
        }
    },
    connect: {
        options: {
            port: process.env.PORT || 3000,
            base: '<%= app.dist %>',
            hostname: 'localhost'
        },
        local: {
            options: {
                livereload: true
            }
        }
    },
    ngconstant: {
    	  // Options for all targets
    	  options: {
    	    space: '  ',
    	    wrap: '(function() {"use strict";\n\n {%= __ngModule %}})();',
    	    name: 'config',
    	  },
    	  // Environment targets
    	  local: {
      	    options: {
      	      dest: '<%= app.source %>/com/demo/config/config.js'
      	    },
      	    constants: {
      	      Config: {
      	        name: 'local',
      	        SOCKET_ENDPOINT: 'http://127.0.0.1:8080/gateway-server/ws/',
      	        logEnabled : true
      	      }
      	    }
      	  },
    	  development: {
    	    options: {
    	      dest: '<%= app.source %>/com/demo/config/config.js'
    	    },
    	    constants: {
    	    	Config: {
    	        name: 'development',
    	        SOCKET_ENDPOINT: '/gateway-server/ws/',
    	        logEnabled : true
    	      }
    	    }
    	  },
    	  production: {
    	    options: {
    	      dest: '<%= app.source %>/com/demo/config/config.js'
    	    },
    	    constants: {
    	    	Config: {
    	        name: 'production',
    	        SOCKET_ENDPOINT: '/gateway-server/ws/',
    	        logEnabled : false
    	      }
    	    }
    	  }
    	}
 });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('useminPrepareDemo', function () {
        var useminPrepareDemoConfig = grunt.config('useminPrepareDemo');
        grunt.config.set('useminPrepare', useminPrepareDemoConfig);
        grunt.task.run('useminPrepare');
     });


    grunt.registerTask('default',['jshint','clean', 'ngconstant:production', 'copy:assets','copy:locale', 'copy:jsSupport', 'copy:fontBootstrap', 'copy:imgfromLib', 'copy:html','includeSource','wiredep', 'useminPrepare','concat','uglify','cssmin','usemin','copy:indexToRelease','copy:demoIndexToRelease','copy:jsMinToDev','copy:cssMinToDev','compress']);
    grunt.registerTask('local',['jshint','clean', 'ngconstant:local', 'copy','includeSource','wiredep','copy:indexToRelease','copy:quickIndexToRelease','compress']);
    grunt.registerTask('dev',['jshint','clean', 'copy', 'ngconstant:development', 'includeSource','wiredep','copy:indexToRelease','copy:quickIndexToRelease','compress']);
    grunt.registerTask('qa',['jshint','clean', 'ngconstant:production', 'copy:assets','copy:locale', 'copy:jsSupport', 'copy:fontBootstrap', 'copy:imgfromLib', 'copy:html','includeSource','wiredep','useminPrepare','useminPrepareDemo','concat','uglify','cssmin','usemin','copy:indexToRelease','copy:demoIndexToRelease','copy:jsMinToDev','copy:cssMinToDev','compress']);
    grunt.registerTask('prod',['jshint','clean', 'ngconstant:production', 'copy:assets','copy:locale','copy:jsSupport', 'copy:fontBootstrap','copy:imgfromLib', 'copy:html','includeSource','wiredep', 'useminPrepare','useminPrepareDemo','concat','uglify','cssmin','usemin','copy:indexToRelease','copy:demoIndexToRelease','copy:jsMinToDev','copy:cssMinToDev','compress']);
    grunt.registerTask('serve:local', ['local', 'connect:local', 'watch:local']);
    grunt.registerTask('serve:dev', ['dev', 'connect:local', 'watch:local']);
};
