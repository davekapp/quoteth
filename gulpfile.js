var gulp     = require("gulp")
    , concat = require("gulp-concat")
    , rename = require("gulp-rename")
    , rev    = require("gulp-rev")
    , react  = require("gulp-react");

gulp.task("react-components", function() {
  var componentFolder = "./priv/static/js/components";
  var productionFolder = "./priv/static/prod"

  return gulp.src("./priv/static/js/components/*.js.jsx")
    .pipe(concat("components.jsx"))
    .pipe(react({harmony: true}))
    .pipe(gulp.dest(componentFolder)) // write non-revisioned version out
    .pipe(rev())
    .pipe(gulp.dest(productionFolder)) // write revisioned version
    .pipe(rev.manifest({merge: true}))
    .pipe(gulp.dest(productionFolder)); // write manifest
});

gulp.task("react", ["react-components"], function() {

});

gulp.task("default", function() {

});

