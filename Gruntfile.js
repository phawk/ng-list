/*global module:false*/
module.exports = function(grunt) {

    var WEB_SERVER_PORT = 8000,
        LIVERELOAD_PORT = 35729;

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        /**
        *  Watching
        *  ========
        *
        *  Automatically tests and builds your code
        *  whenever you edit the source files or tests.
        */
        watch: {
            markup: {
                files: ['index.html'],
                tasks: [],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            },
            scripts: {
                files: ['Gruntfile.js', 'src/**/*.js'],
                tasks: ['build'],
                options: {
                    interrupt: true,
                    livereload: LIVERELOAD_PORT
                }
            },
            styles: {
                files: ['src/sass/**/*.scss'],
                tasks: ['styles'],
                options: {
                    interrupt: true,
                    livereload: LIVERELOAD_PORT
                }
            }
        },


        /**
        *  Linting
        *  =======
        *
        *  Catch errors quickly with JS Hint
        */
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                curly: true, // Always use curlys {}
                eqeqeq: true, // No more == for you, === only
                immed: true, // prohibits the use of immediate function invocations without wrapping them in parentheses
                latedef: true, // no setting variables before they are defined
                newcap: true, // Always call constructors with a Cap
                noarg: true, // prohibits arguments.caller and arguments.callee
                sub: true, // This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
                undef: true, // prohibits the use of explicitly undeclared variables
                boss: true, // Allows assignments in ifs - if (a = 10) {}
                eqnull: true, // Allows == null check for null or undefined
                browser: true, // Sets up globals for browser like window and document
                maxdepth: 3, // Max nesting of methods 3 layers deep
                unused: true, // Warns on unused variables
                expr: true, // Allowed for chais expect(false).to.be.false; assertion style.
                devel: true, // Allows console.log's etc
                trailing: true, // Prohibits trailing whitespace

                globals: {
                    App: true,
                    angular: true
                }
            }
        },

        /**
         *  Stylesheets
         *  ===========
         *
         *  Compile, concat & lint css and less files into a single output file
         */
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/stylesheets/styles.css': 'src/sass/main.scss'
                }
            }
        },

        /**
         *  JavaScripts
         *  ===========
         *
         *  Compile, concat js files into a single output file
         */
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/app.js', 'src/directives/*.js', 'src/services/*.js', 'src/controllers/*.js'],
                dest: 'assets/javascripts/built.js',
            }
        },

        /**
         *  Server
         *  ======
         *
         *  Runs a local web server
         */
        connect: {
            server: {
                options: {
                    port: WEB_SERVER_PORT,
                    base: '.',
                    livereload: LIVERELOAD_PORT,
                    open: {
                        target: 'http://localhost:'+ WEB_SERVER_PORT
                    }
                }
            }
        }

    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Define tasks
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('styles', ['sass']);
    grunt.registerTask('build', ['test', 'concat', 'styles']);
    grunt.registerTask('dev', ['connect', 'watch']);
    grunt.registerTask('default', 'build');

};
