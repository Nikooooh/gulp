const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imageminPromise = import("gulp-imagemin");
const uglify = require("gulp-uglify");

gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("imagemin", async function () {
  const imagemin = (await imageminPromise).default;
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task("uglify", function () {
  return gulp.src("src/js/**/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

gulp.task("default", gulp.parallel("sass", "imagemin", "uglify"));

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/images/*", gulp.series("imagemin"));
  gulp.watch("src/js/**/*.js", gulp.series("uglify"));
});
