import { ResourcesCamera } from "../Camera"
import Crown from "../Crown"
import Ground from "../Ground"
import Fountain from "../resourcespage_buildings/fountain"
import Art_Tools_Path_Buildings from "./Art-Tools-Path"
import Game_Engine_Path_Buildings from "./game-engine-path"
import Sound_Tools_Path_Buildings from "./Sound-Tools-Path"
import Workshop_Path_Buildings from "./workshop-path"


const ResourcesScene = ({ setGroundLoaded, setCurrentScene }) => {
    return (
        <>
            <Ground setGroundLoaded={setGroundLoaded}/>
            <Workshop_Path_Buildings/>
            <Fountain 
                scale={[0.25, 0.25, 0.25]} 
                position={[0, 0, 0]} 
            /> 
            <Game_Engine_Path_Buildings />
            <Sound_Tools_Path_Buildings />
            <Art_Tools_Path_Buildings/>    
            <Crown 
                position={[16, 45, 2]} 
                scale={1.5} 
                rotation={[0, Math.PI, 0.3]} 

                setCurrentScene={setCurrentScene}
            />                          
            <ambientLight intensity={0.5} />
            <directionalLight 
                position={[5, 10, 5]} 
                intensity={1} 
                castShadow 
                shadow-mapSize={[2048, 2048]} 
            />
            <ResourcesCamera />      
        </>
    )
}

export default ResourcesScene