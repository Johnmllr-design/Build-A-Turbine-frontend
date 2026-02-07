import { useState } from 'react'
import './App.css'

function TurbineCard(props) {
  const turbine = props.turb
  const [pred, setPred] = useState('?')
  const [loading, setLoading] = useState(false)
  const current_turbines = props.allturbs
  const setTurbines = props.setTurbines

  async function removeTurbine() {
    const arr = current_turbines.filter((t) => t.valid)
    setTurbines(arr)
  }

  async function getModelPrediction() {
    setLoading(true)
    const apiString = "https://buildaturbine-deep-learning-production.up.railway.app/prediction"
    const payload = { type: turbine.type, longitude: turbine.long, latitude: turbine.lat }

    try {
      const result = await fetch(apiString, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const json = await result.json()
      const textResults = await json.returnedVal
      setPred(textResults)
    } catch (err) {
      setPred('Error')
    }
    setLoading(false)
  }

  return (
    <div className="div2 turbine-card">
      <div className="turbine-card__header">
        <span className="turbine-card__type">{turbine.type}</span>
        <span className="turbine-card__coords">
          {Math.floor(turbine.lat)}°, {Math.floor(turbine.long)}°
        </span>
      </div>

      <div className="turbine-card__actions">
        <button
          className="btn"
          onClick={() => getModelPrediction()}
          disabled={loading}
        >
          {loading ? 'Calculating…' : 'Get AI Value Estimate'}
        </button>
      </div>

      <div className="div3 turbine-card__pred">
        {pred}
      </div>

      <button
        className="btn btn--ghost"
        onClick={() => {
          turbine.valid = false
          removeTurbine()
        }}
      >
        Remove turbine
      </button>
    </div>
  )
}

export default TurbineCard
