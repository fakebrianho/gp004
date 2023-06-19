import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Vector3 } from 'three'
const SimulationMaterial = shaderMaterial(
	{
		uCurrentPosition: null,
		uOriginalPosition: null,
		uOriginalPosition1: null,
		uMouse: new Vector3(-10, -10, 10),
	},
	`
    varying vec2 vUv; 
    void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 15.0;
    }
    `,
	`
	varying vec2 vUv;
	uniform float uProgress;
	uniform sampler2D uCurrentPosition;
	uniform sampler2D uOriginalPosition;
	uniform sampler2D uOriginalPosition1;
	uniform vec3 uMouse;
	void main() {
	    vec2 position = texture2D( uCurrentPosition, vUv ).xy;
	    vec2 original = texture2D( uOriginalPosition, vUv ).xy;
	    vec2 original1 = texture2D( uOriginalPosition1, vUv ).xy;

	    vec2 finalOriginal = mix(original, original1, uProgress);

	    vec2 force = finalOriginal - uMouse.xy;

	    float len = length(force);
	    float forceFactor = 1./max(1.,len*50.);

	    vec2 positionToGo = finalOriginal + normalize(force)*forceFactor *3.;

	    position.xy += (positionToGo - position.xy) * 0.05;

	    // position.xy += normalize(position.xy ) * 0.001;

	    gl_FragColor = vec4( position, 0.0, 1.0);
	}
	`
	// `
	// varying vec2 vUv;
	// uniform sampler2D uPosition;
	// uniform sampler2D uOriginalPosition;
	// uniform vec3 uMouse;
	// void main(){

	//     vec2 position = texture2D(uPosition, vUv).xy;
	//     vec2 original = texture2D(uOriginalPosition, vUv).xy;
	//     vec2 velocity = texture2D(uPosition, vUv).zw;
	//     velocity *= 0.99;

	//     // float dist = length(original - position);
	//     vec2 force = original - uMouse.xy;
	//     float dist = length(force);
	//     float forceFactor = 1./max(1., dist);

	//     vec2 target = original + normalize(force)* forceFactor*3.;
	//     position.xy += (target - position.xy) * 0.1;

	//     // vec2 direction = normalize(original-position);
	//     // if(dist > 0.01){
	//     //     velocity += direction * 0.0001;
	//     // }

	//     // float mouseDistance = distance(position, uMouse.xy);
	//     // float maxDistance = 0.4;
	//     // if(mouseDistance < maxDistance){
	//     //     vec2 direction = normalize(position - uMouse.xy);
	//     //     velocity += direction * (1.0 - mouseDistance / maxDistance) * 0.01;
	//     // }

	//     // position.xy += velocity;

	//     // gl_FragColor = vec4(position, velocity);
	//     gl_FragColor = vec4(position, 0.0, 1.0);

	// }
	// `
)
extend({ SimulationMaterial })
