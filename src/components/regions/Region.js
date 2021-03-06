import React, { Component } from 'react';
import './Region.scss';
import ShowRegion from './ShowRegion';
import RegionButton from './RegionButton';

class Region extends Component {
    constructor(props) {
        super();
        this.state={
                regions: {
                    US: ['us'],
                    Europe: ['de'],
                    AsiaPacific: ['au', 'kr']
                },

                region:[]
            }
     
    }
    
     clickRegion(event) {
           this.setState({
               regionVisible:true,
               region: event.currentTarget.dataset.id,
            //    regionName: event.currentTarget.dataset.id,
           });
        }
     render() {
         return (
             <div className="region-container">
             
             <div className="region-buttons-container">
               <button onClick={this.clickRegion.bind(this)} data-id={this.state.regions.US} className="region-labels"> USA </button>
               <button onClick={this.clickRegion.bind(this)} data-id={this.state.regions.Europe} className="region-labels"> Europe </button>
               <button onClick={this.clickRegion.bind(this)} data-id={this.state.regions.AsiaPacific} className="region-labels"> Asia-Pacific </button>
             </div>

             <div className="regions-go-here">
                 <ShowRegion regions={this.state.region} visible={this.state.regionVisible}/>
             </div>

             </div>
         )
     }
 }
 
 export default Region;