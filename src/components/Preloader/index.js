import React from 'react'
import './style.css'

const Preloader = () => {
  return (
    <div className="preloader-background">
        <div className="rotation-red">
            <div className="red-circle">
              <div className="rotation-blue">
                  <div className="blue-circle">
                    <div className="rotation-yellow">
                        <div className="yellow-circle">
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Preloader