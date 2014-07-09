---
title: Spotlight: Three.js
excerpt: Recently, I've begun messing with an amazing framework called [Three.js](http://threejs.org/). Three.js is a JavaScript framework that can produce WebGL and Canvas-based 3D elements. It is completely [open-sourced](https://github.com/mrdoob/three.js/) with plenty of examples. I want to show a really simple example of Three.js that renders a simple cube.
layout: generic
---

Recently, I've begun messing with an amazing framework called [Three.js](http://threejs.org/). Three.js is a JavaScript framework that can produce WebGL and Canvas-based 3D elements. It is completely [open-sourced](https://github.com/mrdoob/three.js/) with plenty of examples.

I want to show a really simple example of Three.js that renders a simple cube.

Suppose we have the following little bit of html:

    <div id="three"></div>

Assuming we've [downloaded Three.js](https://raw.github.com/mrdoob/three.js/master/build/three.min.js) and included the JavaScript file in the HTML page, all we need to display a simple spinning cube is the following code:

    // our DOM element
    var el = document.getElementById("three");

    // size
    var width = 250;
    var height = 250;

    // field of view
    var fov = 60;

    // near render limit
    var near = 0.1;

    // far render limit
    var far = 10;

    // Three.js Canvas Renderer (WebGLRenderer also available)
    var renderer = new THREE.CanvasRenderer();
    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    // Three.js scene
    var scene = new THREE.Scene();

    // Three.js camera
    var camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
    camera.position.y = 2;
    camera.lookAt(scene.position);

    // Three.js material
    var material = new THREE.MeshNormalMaterial();

    // Three.js geometry
    var geometry = new THREE.CubeGeometry(1, 1, 1);

    // Three.js cube mesh
    var cube = new THREE.Mesh(geometry, material);

    // add cube to scene
    scene.add(cube);

    // call render function
    render();

    // render function
    function render() {
      renderer.render(scene, camera);

      // animate the cube every frame
      cube.rotation.x += 0.01;
      cube.rotation.z += 0.02;

      requestAnimationFrame(render);
    }

And now, we have the following result:

<center><div id="three"></div></center>
<script src="http://threejs.org/build/three.min.js"></script>
<script>
var el = document.getElementById("three");
var width = 250;
var height = 250;
var fov = 60;
var near = 0.1;
var far = 10;
var renderer = new THREE.CanvasRenderer();
renderer.setSize(width, height);
el.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(fov, width/height, near, far);
camera.position.y = 2;
camera.lookAt(scene.position);
var material = new THREE.MeshNormalMaterial();
var geometry = new THREE.CubeGeometry(1, 1, 1);
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
render();
function render() {
  renderer.render(scene, camera);
  cube.rotation.x += 0.01;
  cube.rotation.z += 0.02;
  requestAnimationFrame(render);
}
</script>

The code is really fairly self-explanatory - the simplicity of Three.js was fairly startling to me when I first learned about the framework.

In this example, I used CanvasRenderer instead of WebGLRenderer so that this cube can also be seen on mobile devices. WebGL has far better performance (because WebGL is allowed to use the GPU for processing, whereas Canvas is not) and a larger feature set, especially when it comes to lighting/shaders, but for this small sample, it doesn't make a difference.

I'm hoping that WebGL becomes a supported feature in mobile devices. I believe that there are beta versions of Chrome available on Android devices that *do* support WebGL, but as an Apple user, I'm hoping that support comes to the iPhone and iPad soon.
