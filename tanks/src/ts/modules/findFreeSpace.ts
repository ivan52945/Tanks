import Phaser from 'phaser';
import tilemap1 from '../../assets/maps/tilemap1.json'
import { randIntFrZ } from './functions';

function setFinderEmpty(tilemap: typeof tilemap1) {
    let coordArr = [{x: 1, y: 1}]

    const sumArr: number[] = tilemap.layers[0].data.map((el, i)=>{ // сложение массивов
        return tilemap.layers[0].data[i] + tilemap.layers[2].data[i]
    })

    sumArr.forEach((el,i, arr) => {
        if(!arr[i] && !arr[i+1] && !arr[i+26] && !arr[i+27]){
            const x = ((i % 26) * 32) + 64 + 32
            const y = Math.floor(i / 26)*32 + 64 + 32
            coordArr.push({x, y})
        }
    });

    coordArr.splice(0,1)

    return coordArr[randIntFrZ(coordArr.length-1)]
}

export default setFinderEmpty;
