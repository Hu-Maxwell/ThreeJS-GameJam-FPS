import Lamp from "../resourcepage_misc/lamp"
import Grainstore from "../resourcespage_buildings/grainstore"
import House from "../resourcespage_buildings/House"
import Workshop from "../resourcespage_buildings/Workshop"

const Sound_Tools_Path_Buildings = () => {
    return (
        <>
            {/*Sound tools buildings left side*/}
            <House
                scale={[0.02, 0.02, 0.02]} 
                position={[-30, 0, 7.5]} 
                rotation={[-Math.PI / 2, 0, Math.PI]}
            />
            <Lamp
                scale={[0.5, 0.5, 0.7]} 
                position={[-26.5, 0, 5.5]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[-21.5, 0.4, 8]} 
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[-16.5, 0, 5.5]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />
            <House 
                scale={[0.02, 0.02, 0.02]} 
                position={[-13, 0, 7.5]} 
                rotation={[-Math.PI / 2, 0, Math.PI]}
            />
            <Workshop
                rotation={[0, 0, 0]}
                position={[-39, 0, -2]} 
            />
            {/*Sound tools right side */}
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[-14, 0.4, -7.5]} 
                rotation={[-Math.PI / 2, 0, -Math.PI]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[-18.5, 0, -6]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            />
            <House 
                scale={[0.02, 0.02, 0.02]} 
                position={[-22, 0, -7]} 
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[-25.5, 0, -6]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            />
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[-30, 0.4, -7.5]} 
                rotation={[-Math.PI / 2, 0, -Math.PI]}
            />
        </>
    )
}

export default Sound_Tools_Path_Buildings