import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// export default function RenderMaterial() {
// 	return <></>
// }

const RenderMaterial = shaderMaterial(
	{
		time: 0,
		uTexture: null,
		uTex: null,
	},
	`
    attribute vec2 ref;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    varying vec2 vref;
    void main(){
        vref = ref;
        vUv = uv;
        vec3 newpos = position;
        vec4 color = texture2D(uTexture, vUv);
        newpos.xy = color.xy;
        vec4 mvPosition = modelViewMatrix * vec4( newpos, 1.0 );
        gl_PointSize =  ( 2.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;


    }
    `,
	`
    varying vec2 vUv;
    uniform sampler2D uTex;
    uniform vec3 uColor;
    void main(){
        // gl_FragColor.rgba = vec4(vref, 0.0, 1.0);
        // gl_FragColor.rgba = vec4(uColor, 0.5);
        // 0.00, 0.28, 0.53, 0.03
        gl_FragColor = vec4(0., 0.28 ,0.54, 0.03);
        // gl_FragColor.rgba = texture2D(uTex, vref);
    }
    `
)
extend({ RenderMaterial })
