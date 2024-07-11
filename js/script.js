let photo = document.querySelector(".profile__photo");
let cube_f = document.querySelectorAll(".cube__face--front");
let cube_r = document.querySelectorAll(".cube__face--right");
let cube_l = document.querySelectorAll(".cube__face--left");
let cube_ba = document.querySelectorAll(".cube__face--back");
let cube_t = document.querySelectorAll(".cube__face--top");
let cube_bo = document.querySelectorAll(".cube__face--bottom");
let blue_cubes = [cube_r, cube_l, cube_ba, cube_t, cube_bo];

photo.addEventListener("mouseenter", () => {
  // Cube colors
  blue_cubes.forEach((cube) => {
    cube.forEach(
      (face) => (face.style.backgroundColor = "rgba(248, 108, 69, 0.655)")
    );
  });
  cube_f.forEach(
    (face) => (face.style.backgroundColor = "rgba(240, 248, 255, 0.655)")
  );

  // Cube rotation
  document.documentElement.style.setProperty("--cube-rotate-x", "-360deg");
  document.documentElement.style.setProperty("--cube-rotate-y", "-360deg");
});

photo.addEventListener("mouseleave", () => {
  blue_cubes.forEach((cube) => {
    cube.forEach(
      (face) => (face.style.backgroundColor = "rgba(240, 248, 255, 0.655)")
    );
  });
  cube_f.forEach(
    (face) => (face.style.backgroundColor = "rgba(248, 108, 69, 0.655)")
  );

  // Cube rotation
  document.documentElement.style.setProperty("--cube-rotate-x", "360deg");
  document.documentElement.style.setProperty("--cube-rotate-y", "360deg");
});
