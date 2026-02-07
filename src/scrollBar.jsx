import {useEffect, useState} from 'react'
import './App.css'
import TurbineSpinner from './turbineSpinner'


function ScrollBar(props) {

    const turbineOptions = ['Siemens SWT-2.3-93', 'Siemens SWT-2.3-108', 'Siemens SWT-2.3-101', 'Siemens SWT-2.3-82', 
                            'Repower MM92', 'Siemens SWT-3.2-113', 'Siemens SWT-2.625-120', 'Siemens SWT-3.0-101', 
                            'Dewind D8.2', 'Dewind D9.2', 'Nordex N117/3000', 'Siemens SWT-6.0-154'];

    const [selected, setSelected] = useState(-1);

    const selector = props.setSelected;
    const choice = props.selectedTurbine;

    return (
        <div className='scrolldiv'>
            {
                turbineOptions.map((turbineName, i) => {
                    return (
                        <div key={i} className={selected === i ? "option-item-2" : "option-item"} onClick={() => { setSelected(i); selector(turbineName); }}>
                            <span className="option-item__name">{turbineName}</span>
                            <TurbineSpinner size={24} speed={0.4} />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ScrollBar
