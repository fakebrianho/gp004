import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// export default function RenderMaterial() {
// 	return <></>
// }

const RenderMaterial = shaderMaterial(
	{
		time: 0,
		uPosition: null,
		uTex: null,
	},
	`
    attribute vec2 ref;
    uniform sampler2D uPosition;
    varying vec2 vref;
    void main(){
        vref = ref;
        vec3 pos = texture2D(uPosition, ref).rgb;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 20.0;
    }
    `,
	`
    varying vec2 vref;
    uniform sampler2D uTex;
    void main(){
        // gl_FragColor.rgba = vec4(vref, 0.0, 1.0);
        // gl_FragColor.rgba = vec4(1.0, 1.0, 1.0, 0.5);
        gl_FragColor.rgba = texture2D(uTex, vref);
    }
    `
)
extend({ RenderMaterial })
