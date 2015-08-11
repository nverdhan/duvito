// if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;

var camera, controls, scene, renderer, mesh, material;
var group;
var atomShape = new THREE.SphereGeometry(1, 10, 10);

init();
render();

function animate() {
	requestAnimationFrame(animate);
	controls.update();
}

function init() {
	scene = new THREE.Scene();

	aspectRatio = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
	camera.position.z = 100;
	scene.add(camera);

	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	material = new THREE.MeshLambertMaterial({
		color: 'white'
	});

	var ambientLight = new THREE.AmbientLight(0x000044);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.bottom = '0px';
	// stats.domElement.style.zIndex = 100;
	// document.body.appendChild(stats.domElement);

	window.addEventListener('resize', onWindowResize, false);
}

function addAtom(x, y, z) {
	var atom = new THREE.Mesh(atomShape, material);
	scene.add(atom);
	atom.position.set(x, y, z);
}

function renderAtoms() {
	var xLen = dump.box.x.len;
	var yLen = dump.box.y.len;
	var zLen = dump.box.z.len;
	var X, Y, Z;
	for (var i = 0; i < dump.atoms.length; i++) {
		X = dump.atoms[i].xs * xLen;
		Y = dump.atoms[i].ys * yLen;
		Z = dump.atoms[i].zs * zLen;
		addAtom(X, Y, Z);
	};
	render();
}

function render() {
	renderer.render(scene, camera);
	stats.update();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();
}