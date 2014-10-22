module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            jsx: {
                files: ['app/jsx/**/*.jsx'],
                tasks: ['build']
            },
            jsxTest: {
                files: ['test/jsx/**/*.jsx'],
                tasks: ['build']
            }
        },

        less: {
          development: {
            options: {
              sourceMap: true
            },
            files: {
              "styles/style.css": "app/**/*.less"
            }
          }
        },        

        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/jsx/**/*.jsx'],
                        dest: './app/build_jsx/',
                        ext: '.js'
                    }
                ]
            }                
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                            'test/utilities/**/*.js',       
                            'scripts/vendor/q.js',
                            'app/scripts/**/*.js',
                            'test/**/*.js'
                        ],
                    exclude: [
                            'test/jsx/**/*.js',
                            'app/scripts/app.js'
                    ]    
                }
            },
            react: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                            'test/utilities/**/*.js',
                            'test_libs/react-with-addons.js',
                            'scripts/vendor/q.js',
                            'app/build_jsx/**/*.js',        
                            'app/scripts/**/*.js',
                            'test/jsx/**/*.js'                            
                        ] 
                }
            },
            file: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        'test/utilities/**/*.js',
                        'test_libs/react-with-addons.js',
                        'app/scripts/**/*.js',
                        'app/build_jsx/**/*.js',
                        '<%= path %>'
                        ],
                    exclude: [
                        'app/scripts/app.js'
                    ]
                }                
            }
        },
     
    });

    grunt.registerTask('test', function(type){
        console.log(type)
        if(type){
            switch(type){
                case 'react':
                    grunt.task.run('build', 'karma:react')
                    break;
                case 'unit':
                    grunt.task.run('karma:unit')
                    break;                
                default:
                    grunt.config('path', type);
                    grunt.task.run('build', 'karma:file')
                    break;
            }            
        }
        else{
            grunt.task.run('build', 'karma:react', 'karma:unit');
        }
    })

    grunt.registerTask('serve', ['watch:jsx']);
    grunt.registerTask('build', ['react']);
    //grunt.registerTask('test', ['build', 'karma:unit', 'karma:react']);

};