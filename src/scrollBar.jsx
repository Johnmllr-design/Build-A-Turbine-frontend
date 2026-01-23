import {useEffect, useState} from 'react'
import './App.css'
import TurbineSpinner from './turbineSpinner'


function ScrollBar(props) {

    const turbineOptions = ['VestasV126-3.3', 'VestasV112-3.075', 'SiemensSWT-3.2-113', 'VestasV90-3.0', 
                            'VestasV112-3.0', 'REpowerMM92', 'VestasV112-3.3', 'VestasV100-1.8',
                             'VestasV126-3.45', 'VestasV117-3.3', 'VestasV117-3.6', 'VestasV112-3.45'];

    const [selected, setSelected] = useState(-1);

    const selector = props.setSelected;
    const choice = props.selectedTurbine;

    return (
        <div className='scrolldiv'>
            {
                turbineOptions.map((turbineName, i) => {
                    return (
                        <div key={i} className={selected == i? "option-item-2" : "option-item" } onClick={() => {setSelected(i); selector(turbineName);}}>
                            {turbineName}
                            <TurbineSpinner size={30} speed={0.3}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ScrollBar
