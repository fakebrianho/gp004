const fragmentShader = `
uniform sampler2D uTexture;
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;


void main() {
  vec4 ttt = texture2D(uTexture, vUv);
  float opacity = mix(0.0, ttt.r, uOpacity);
  gl_FragColor = vec4(uColor, ttt.r );
  // gl_FragColor = vec4(uColor, opacity);
  // gl_FragColor = vec4(uColor, 1.0);
  // gl_FragColor = ttt;
}

`

export default fragmentShader 