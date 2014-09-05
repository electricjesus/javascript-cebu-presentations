module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bowercopy : {      
      revealjs: {
        files : {
        'css/vendor/reveal.js/reveal.css' : 'reveal.js/css/reveal.css',
        'css/vendor/reveal.js/theme' : 'reveal.js/css/theme',
        'css/vendor/reveal.js/print' : 'reveal.js/css/print',
        'js/vendor/reveal.js/reveal.js' : 'reveal.js/js/reveal.js'         
        }  
      }      
    },
    
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    },

    sass: {
      options: {
        includePaths: []
      },
      dist: {
        options:  { outputStyle: 'compressed', errLogToConsole: true },
        files:    { 'css/app.css': 'scss/app.scss' }        
      },
      dev: {                              
        options: {
          sourceMap: true, sourceComments: 'map', errLogToConsole: true
        },
        files: {
            'css/app/app.css': 'scss/app.scss'
        }
      }
    },

    jshint:  {
  	  beforeconcat: ['js/app/*.js'],
    	options: {
    		"lastsemic" : true,
    		"globals": { jQuery: true, console: true, Handlebars: true, "_" : true }
    	}
    },

    concat: {
      options: {
        separator: ';',
        sourceMap: true
      }, 
      dist: {
        src: [
          'js/vendor/**/*.js',
          'js/app/**/*.js'
        ],
        dest: 'dist/app.js'
      },   
      css: {
        src: [
          'css/vendor/**/*.css',
          'css/app/**/*.css'
        ],
        dest: 'dist/app.css'
      }
    },


    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: 'dist/app.js.map'
      },      
      dist: {
        files: {
          'dist/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      javascripts: {
        files: 'js/**/*.js',
        tasks: ['jshint:beforeconcat','concat','uglify'],
        options: {
          livereload: true
        }
      },
      dist : {
        files: ['js/**/*.js','dist/**/*.js','dist/**/*.css','index.html'],
        options: {
          livereload: true
        }
      },
      handlebars: {
        files: 'handlebars/**/*.handlebars',
        tasks: ['exec:handlebars','concat','uglify']
      }
    }
  });

  
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('package', ['bowercopy','sass:dist','jshint:beforeconcat','concat','uglify']);
  grunt.registerTask('build',   ['bowercopy','sass:dev','jshint:beforeconcat','concat','uglify']);
  grunt.registerTask('default', ['build','connect:server','watch']);

}

