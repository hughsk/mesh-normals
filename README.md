# mesh-normals [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Given a list of vertices and faces, generate the normals for a triangle mesh.

Geared more towards "soft" low-poly normals, as you can't use indexed draw
calls with the resulting normals. If you're just planning on straight smooth
vertex normals, use the [normals](http://github.com/mikolalysenko/normals)
module. If you want low-poly and only have a "triangle soup" mesh,
[face-normals](http://github.com/hughsk/face-normals) will still work for you.

[view demo](http://hughsk.github.io/mesh-normals)

## Installation ##

[![mesh-normals](https://nodei.co/npm/mesh-normals.png?mini=true)](https://nodei.co/npm/mesh-normals)

## Usage ##

### `normals(cells, positions, flatness, [output])` ###

`cells` is an indexed list of faces. Each face should be three elements long,
one element per point.

`positions` is a list of vertex positions.

`flatness` is a value between 0 and 1, where 0 will return results only from
the vertex normals and 1 will return results only from the face normals. 0.5
will be the middle ground between them.

Optionally, you can pass in an array-like `output` object to set the values
directly. If not, a `Float32Array` will be created for you - either way, the
new/updated array will be returned.
