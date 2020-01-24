import React, { Component } from 'react'
import './hmc.css'
import Linesvg from './Linesvg'
import Circlesvg from './Circlesvg'
import {svglineY, svglineYS, svglineX, svglineXS, 
    svglineSlant, strock, svglineYS1, svglineYSlnt1, svglineYSlnt2,
    svglineYS2, svglineYSlnt3, svglineYSlnt4} from './svgstyles'
import {connect} from 'react-redux'
import {map} from 'lodash'

class Hmchances extends Component {
    render() {
        const {store} = this.props
        const {hmdata, status} = store.getState()
        const {hmChanceList, chances} = hmdata
        const {isHMavailable} = status
        let hmCls = !isHMavailable ? 'elem-hide' : ''
        hmCls += ' container'
        return (
            <div className={hmCls}>
                <Linesvg style={svglineY}/>
                <Linesvg style={svglineX}/>
                <Linesvg style={svglineXS}/>
                <Linesvg style={svglineYS}/>
                <Linesvg style={svglineSlant}/>
                {
                    map (hmChanceList, (hmlst, i) => hmlst === 1 ?
                        <Circlesvg key={i} style={strock}/> :
                        hmlst === 2 ?
                        <Linesvg key={i} style={svglineYS1}/> :
                        hmlst === 3 ?
                        <Linesvg key={i} style={svglineYSlnt1}/> :
                        hmlst === 4 ?
                        <Linesvg key={i} style={svglineYSlnt2}/> :
                        hmlst === 5 ?
                        <Linesvg key={i} style={svglineYS2}/> :
                        hmlst === 6 ?
                        <Linesvg key={i} style={svglineYSlnt3}/> :
                        hmlst === 7 ?
                        <Linesvg key={i} style={svglineYSlnt4}/> : ''
                    )
                }
                <p className="chances">You have <strong>{chances}</strong> chances left</p>
            </div>
        )
    }
}

const hmChanceStateProps = state => state
export default connect(hmChanceStateProps)(Hmchances);