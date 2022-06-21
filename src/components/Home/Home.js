import React from 'react';

import './Home.css';
import Combobox from './Combobox/Combobox';

import { fetchGet, createSelectItems, retryRequest, fetchPost } from "../../scripts/utils";

class Home extends React.Component {
  constructor() {
    super();
  
    this.state = {
      actions: [{value: 1, text: "Park"}, {value: 2, text: "Unpark"}, {value: 3, text: "Map"}],
      selectedAction: false,
      entryPoints: [{value: 1, text: "1: row: 2, col: 0"}, {value: 2, text: "row: 0, col: 5"}, {value: 3, text: "row: 10, col: 10"}],
      vehicleTypes: [{value: 0, text: "S"}, {value: 1, text: "M"}, {value: 2, text: "L"}],
      currentEntryPoint: false,
      currentVehicleType: false,
      map: [],
      unparkRow: "",
      unparkCol: "",
      currentFee: null,
      currentParkingRow: [],
      currentParkingCol: []
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  handleChangeSelect = (e) => {

  this.setState({selectedAction: e.target.value, map: []})

  if (e.target.value == 2) {
    this.getParkingSlots()
    this.setState({currentFee: null})
  }
  };

  handleChangeEntryPoint = (e) => {

    this.setState({currentEntryPoint: e.target.value})
  };

  handleChangeVehicleType = (e) => {

    this.setState({currentVehicleType: e.target.value})
  };



  park = async(e) =>  {

    let data = await fetchPost(`http://localhost:3000/park`, {vehicleType: this.state.currentVehicleType, entryPoint: this.state.currentEntryPoint});
  
    if (data.data) {

      this.setState({currentVehicleType: false, currentEntryPoint: false});
    }
  }

  unpark = async(e) =>  {

    let data = await fetchPost(`http://localhost:3000/unpark`, {row: this.state.unparkRow, col: this.state.unparkCol});
  
  this.setState({currentFee: data.data})
  this.getParkingSlots()
  }


  map = async(e) =>  {

    let data = await fetchGet(`http://localhost:3000/map`);

    this.setState({map: data.data})
  }

  getParkingSlots = async(e) =>  {

    let data = await fetchGet(`http://localhost:3000/map`);

    let activeParking = data.data.map(e => e.find(element => 
      !element.isAvailable && element.isParkingLot
    )).filter(e => e !== undefined)

    this.setState({currentParkingRow: activeParking.map(o => ({value: o.row, text: o.row})), 
    currentParkingCol: activeParking.map(o => ({value: o.col, text: o.col}))});
  }

  renderMap=()=>{
    const mapArr = this.state.map
  

    return mapArr.map(arr => (<tr>
      {arr.map(obj=>  <td> {!obj.isParkingLot ? `x` : obj.isAvailable ? `o` : `i`}</td>)}
    </tr>))
   }

  render() {
    return (
      <div className="container mt-3">
        <div className="pb-2 mt-4 mb-2 border-bottom">
 

        </div>
        <div className="row-fluid">
          <div>

           
            <div className="row mb-3">
              <div className="col-md">
                <Combobox
                  label="Actions"
                  onChange={this.handleChangeSelect}
                  className="custom-select mr-1"
                  options={createSelectItems(this.state.actions)} />
              </div>
            </div>

           
              {
               
this.state.selectedAction == 1 && <> <div className="row mb-3">

              <div className="col">
    <Combobox id="vehicleType" label="Vehicle Type"  value={this.state.currentVehicleType} onChange={this.handleChangeVehicleType}  className="custom-select" options={createSelectItems(this.state.vehicleTypes)} /></div>
  

       
              <div className="col">

  <Combobox id="entryPoint" label="Entry Point"  value={this.state.currentEntryPoint} onChange={this.handleChangeEntryPoint}  className="custom-select" options={createSelectItems(this.state.entryPoints)} />
  </div>
            </div>
            <button onClick={this.park} class="btn btn-primary form-control">Park</button>
            </>

           
}
           
     {
      this.state.selectedAction == 3 && <div className="col">

      <table id="table">
        {this.renderMap()}
      </table>  
      <button onClick={this.map} class="btn btn-primary form-control">Map</button>
    </div>
     }
          
     {
               
               this.state.selectedAction == 2 && <> <div className="row mb-3">
               
                             <div className="col">
                      
    <Combobox label="Row"  value={this.state.unparkRow} onChange={e => this.setState({unparkRow: e.target.value})}  className="custom-select" options={createSelectItems(this.state.currentParkingRow)} />
                  </div>
                 
               
                      
                             <div className="col">
                          
    <Combobox label="Row"  value={this.state.unparkCol} onChange={e => this.setState({unparkCol: e.target.value})}  className="custom-select" options={createSelectItems(this.state.currentParkingCol)} />
                 </div>
                           </div>
                           <button onClick={this.unpark} class="btn btn-primary form-control"> Unpark</button>

                        {this.state.currentFee &&   <h1> Total Fee: {this.state.currentFee}</h1>}
                           </>
               
                          
               }

          </div>
        </div>

      </div>
    );
  }
}


export default Home;
