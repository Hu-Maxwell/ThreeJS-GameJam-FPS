import Lamp from "../resourcepage_misc/lamp"
import Grainstore from "../resourcespage_buildings/grainstore"
import House from "../resourcespage_buildings/House"
import Workshop from "../resourcespage_buildings/Workshop"

const Game_Engine_Path_Buildings = () => {
    return (
        <>
            {/*Game Engine Path Left Buildings */}
            <House 
                scale={[0.02, 0.02, 0.02]} 
                position={[14, 0, -7]} 
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Lamp
                scale={[0.5, 0.5, 0.7]} 
                position={[18, 0, -6]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            />
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[23, 0.4, -7.5]} 
                rotation={[-Math.PI / 2, 0, -Math.PI]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[28, 0, -6]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            /> 
            <House 
                scale={[0.02, 0.02, 0.02]} 
                position={[32, 0, -7]} 
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Workshop 
                rotation={[0, -Math.PI, 0]}
                position={[40, 0, 2]} 
            />
            {/*Game Engine Path Right Buildings */}
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[15, 0.4, 7.5]} 
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[19.5, 0, 5.5]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />
            <House
                scale={[0.02, 0.02, 0.02]} 
                position={[23, 0, 7.5]} 
                rotation={[-Math.PI / 2, 0, Math.PI]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[26.5, 0, 5.5]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[31, 0.4, 7.5]} 
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </>
    )
}

export default Game_Engine_Path_Buildings