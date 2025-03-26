import Lamp from "../resourcepage_misc/lamp"
import Grainstore from "../resourcespage_buildings/grainstore"
import House from "../resourcespage_buildings/House"
import Workshop from "../resourcespage_buildings/Workshop"

const Workshop_Path_Buildings = () => {
    return (
        <>  
            {/* Workshop Left buildings */}
            <House
                scale={[0.02, 0.02, 0.02]} 
                position={[-8, 0, -14]} 
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            /> 
            <Lamp
                scale={[0.5, 0.5, 0.7]} 
                position={[-6, 0, -17.5]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 1]}
            /> 
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[-8, 0.4, -22]} 
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />  
            <Lamp
                scale={[0.5, 0.5, 0.7]} 
                position={[-6, 0, -27]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 1]}
            />           
            <House 
                scale={[0.02, 0.02, 0.02]} 
                position={[-8, 0, -30.5]} 
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            />
            <Workshop
                rotation={[0, -Math.PI / 2, 0]}
                position={[2, 0, -42]} 
            />
            {/*Workshop Right Buildings */}
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[8, 0.4, -13]} 
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[6, 0, -17.5]}
                rotation={[-Math.PI / 2, 0, 0]}
            />  
            <House
                scale={[0.02, 0.02, 0.02]} 
                position={[8, 0, -21]} 
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />
            <Lamp 
                scale={[0.5, 0.5, 0.7]} 
                position={[6, 0, -24.5]}
                rotation={[-Math.PI / 2, 0, 0]}
            />  
            <Grainstore
                scale={[0.14, 0.14, 0.14]} 
                position={[8, 0.4, -29]} 
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            />
        </>
    )
}

export default Workshop_Path_Buildings