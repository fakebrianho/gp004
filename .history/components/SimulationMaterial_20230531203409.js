import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Vector3 } from 'three'
const SimulationMaterial = shaderMaterial(
	{
		uCurrentPosition: null,
		uOriginalPosition: null,
		uOriginalPosition1: null,
		uMouse: new Vector3(0, 0, 0),
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
    uniform float uTime;
	uniform vec3 uMouse;

    mat2 rotationMatrix(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
    }

	void main() {
	    // vec2 position = texture2D( uCurrentPosition, vUv ).xy;
	    // vec2 original = texture2D( uOriginalPosition, vUv ).xy;
	    // vec2 original1 = texture2D( uOriginalPosition1, vUv ).xy;

	    // vec2 finalOriginal = mix(original, original1, uProgress);

        // vec2 velocity = texture2D(uCurrentPosition, vUv).zw;
        // velocity *= 0.99;

        // vec2 direction = normalize(finalOriginal - position);
        // float dist = length(finalOriginal - position);
        // if(dist > 0.01){
        //     velocity += direction;
        // }


        // // float mouseDistance = distance(position, uMouse.xy);
        // // float maxDistance = 0.1;
        // // if(mouseDistance < maxDistance){
        // //     vec2 direction = normalize(position - uMouse.xy);
        // //     velocity += direction * (1.0 - mouseDistance / maxDistance) * 0.0001;
        // // }


	    // // vec2 force = finalOriginal - uMouse.xy;

	    // // float len = length(force);
	    // // float forceFactor = 1./max(1.,len*50.);

	    // // vec2 positionToGo = finalOriginal + normalize(force)*forceFactor *0.1;

	    // // position.xy += (positionToGo - position.xy) * 0.05;
        // position.xy += velocity;

	    // // position.xy += normalize(position.xy );

	    // gl_FragColor = vec4( position, 0,1.0);
        vec2 position = texture2D( uCurrentPosition, vUv ).xy;
        vec2 original = texture2D( uOriginalPosition, vUv ).xy;
        vec2 original1 = texture2D( uOriginalPosition1, vUv ).xy;
    
        vec2 velocity = texture2D( uCurrentPosition, vUv ).zw;
    
        vec2 finalOriginal = mix(original, original1, uProgress);
        vec2 rotatedOriginal = rotationMatrix(uTime) * finalOriginal;
        vec2 rotatedVel = rotationMatrix(uTime) * velocity;

    
        velocity *= 0.95;
    
        // particle attraction to shape force
        // vec2 direction = normalize( finalOriginal - position );
        vec2 direction = normalize( rotatedOriginal - position );
        // float dist = length( finalOriginal - position );
        float dist = length( rotatedOriginal - position );
        if( dist > 0.01 ) {
            velocity += direction  * 0.0001;
        }
        
    
    
    
        float mouseDistance = distance( position, uMouse.xy );
        float maxDistance = 0.05;
        if( mouseDistance < maxDistance ) {
            vec2 direction = normalize( position - uMouse.xy );
            velocity += direction * ( 1.0 - mouseDistance / maxDistance ) * 0.0005;
        }
    
    
    
    
        position.xy += rotatdVel;
    
        
        gl_FragColor = vec4( position, velocity);
	}
	`
)
extend({ SimulationMaterial })
