uniform float time;

varying vec2 vUv;

float PI = 3.141592653589793238;

void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1. );
  gl_PointSize = 50. * ( 1. / - mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}