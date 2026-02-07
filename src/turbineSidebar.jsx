import TurbineCard from './turbineCard'
import React from 'react'

function TurbineSidebar(props) {
  const current_turbines = props.turbines
  const setTurbines = props.setTurbines
  const username = props.username

  return (
    <div className="scrolldiv-2 turbine-sidebar">
      <h3 className="panel-label">Your Turbines</h3>
      {current_turbines.map((turbine, i) =>
        turbine.valid ? (
          <TurbineCard key={i} turb={turbine} username={username} allturbs={current_turbines} setTurbines={setTurbines} />
        ) : null
      )}
    </div>
  )
}
export default TurbineSidebar