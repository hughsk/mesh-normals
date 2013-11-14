var normals = require('./')
var unindex = require('unindex-mesh')

var shell = require('gl-now')({ clearColor: [1, 1, 1, 1] })
var camera = require('game-shell-orbit-camera')(shell)
var perlin = require('perlin').noise.perlin2
var fill = require('ndarray-fill')
var zero = require('zeros')
var fs = require('fs')

var createShader = require('gl-shader')
var createBuffer = require('gl-buffer')
var createVAO = require('gl-vao')
var glm = require('gl-matrix')
var mat4 = glm.mat4
var quat = glm.quat
var vec2 = glm.vec2

shell.on('gl-init', init)
shell.on('gl-render', render)

var shader
var meshes

function init() {
  var gl = shell.gl

  meshes = []
  for (var i = 0; i < 5; i += 1) meshes.push(
    createMesh(gl, i)
  )

  shader = createShader(gl
    , fs.readFileSync(__dirname + '/shaders/bunny.vert', 'utf8')
    , fs.readFileSync(__dirname + '/shaders/bunny.frag', 'utf8')
  )

  camera.distance = 25
  camera.center[1] += 2.5
  quat.rotateY(camera.rotation, camera.rotation, Math.PI * 0.5)
  quat.rotateX(camera.rotation, camera.rotation, Math.PI * -0.125)
}

function render() {
  var gl = shell.gl

  var projection = mat4.perspective(new Float32Array(16), 0.25*Math.PI, shell.width/shell.height, 0.05, 1000)
  var model = mat4.identity(new Float32Array(16))
  var view = camera.view()

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)

  shader.bind()
  shader.uniforms.projection = projection
  shader.uniforms.view = view

  shader.attributes.position.location = 0
  shader.attributes.normal.location = 1

  for (var i = 0; i < meshes.length; i += 1) {
    var mesh = meshes[i]
    shader.uniforms.model = mesh.model
    mesh.vao.bind()
    gl.drawArrays(gl.TRIANGLES, 0, mesh.length)
  }
  if (mesh) mesh.vao.unbind()
}

function createMesh(gl, i) {
  var bunny = require('bunny')
  var norms = normals(bunny.cells, bunny.positions, i * 0.2)
  var pos = unindex(bunny.positions, bunny.cells)
  var model = mat4.identity(new Float32Array(16))

  mat4.translate(model, model, [0, 0, (i - 2.25) * 6])

  var quads = createVAO(gl, null, [{
    buffer: createBuffer(gl, pos)
    , type: gl.FLOAT
    , size: 3
  }, {
    buffer: createBuffer(gl, norms)
    , type: gl.FLOAT
    , size: 3
  }])

  return { vao: quads, length: pos.length / 3, model: model }
}
