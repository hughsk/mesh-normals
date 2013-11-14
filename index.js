var vertexNormals = require('normals').vertexNormals
var faceNormals = require('face-normals')
var unindex = require('unindex-mesh')

module.exports = mesh

function mesh(cells, positions, flatness, output) {
  var vertex = unindex(vertexNormals(cells, positions), cells)
  var faces = faceNormals(unindex(positions, cells))

  if (!flatness) flatness = 0
  if (!output) output = new Float32Array(vertex.length)

  for (var i = 0, l = vertex.length; i < l; i += 1) {
    output[i] = vertex[i] + (faces[i] - vertex[i]) * flatness
  }

  return output
}
