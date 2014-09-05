module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
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
  	  beforeconcat: ['scripts/**/*.js'],
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
          'scripts/vendor/**/*.js',
          'scripts/app/**/*.js'
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
        files: 'scripts/**/*.js',
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

  grunt.registerTask('package', ['sass:dist','jshint:beforeconcat','concat','uglify']);
  grunt.registerTask('build',   ['sass:dev','jshint:beforeconcat','concat','uglify']);
  grunt.registerTask('default', ['build','server','watch']);

}