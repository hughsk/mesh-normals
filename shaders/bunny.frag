precision mediump float;

varying vec3 pos;
varying vec3 norm;
uniform mat4 view;

void main() {
  const float LOG2 = 1.442695;
  const float density = 0.01125;
  float z = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = 1.0 - clamp(exp2(-density * density * z * z * LOG2), 0.0, 1.0);

  gl_FragColor = vec4(mix((mat3(view) * norm.xyz).xyz, vec3(1.0,1.0,1.0), fogFactor), 1.0);
}
