import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

const api = axios.create({
  baseURL: "https://localhost:4000",
});

`      <tr>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
</tr>
<tr>
<td>Jacob</td>
<td>Thornton</td>
<td>@fat</td>
</tr>`
class App extends Component {

  constructor() {
    super()


 
    this.state = {
      apitrack:"&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2850%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce",
      search:"",
      apiResponse:[],
      outputtable: this.tabletemplate
    }

    this.fetch = this.fetch.bind(this);


  }

  async fetch() {
      let url=this.get_url(this.state.search)
      return await api
        .get("http://localhost:4000/?url="+url)
        .then((response) => {
          this.setState({apiResponse:response.data})
          console.log("result", response.data);
        })
  }

  get_url(searchParam) {
    return `https://apibay.org/q.php?q=${searchParam}&cat=100,200,300,400,600`
  }


  render() {
    return (
      <div >
      
  <div className="container text-center">
    <input style={{"font-weight":"bold","font-size":"25px"}} onChange={(e)=>{this.setState({search:e.target.value}); this.fetch()}} type="search" id="form1" className="form-control" />
      <button onClick={this.fetch} type="button" className="btn btn-primary">
    <i style={{"font-weight":"bold","font-size":"25px"}} className="fas fa-search">search</i>
  </button>
  </div>


<div className='container'>
<table className="table">
    <thead >
      <tr >
        <th scope="col" style={{"font-weight":"bold","font-size":"25px"}}>name</th>
        <th scope="col" style={{"font-weight":"bold","font-size":"25px"}}>magent</th>
        <th scope="col" style={{"font-weight":"bold","font-size":"25px"}}>seeds</th>
        <th scope="col" style={{"font-weight":"bold","font-size":"25px"}}>leecher</th>
      </tr>
    </thead>
    <tbody className="tableclass" style={{color:"white","font-weight":"bold","font-size":"25px", overflow: "auto", height: "100px"}}>
    {this.state.apiResponse.map((item)=> {return <tr><td>{item.name}</td> <td><button onClick={() => {navigator.clipboard.writeText('magnet:?xt=urn:btih:'+item.info_hash+'&dn='+item.name+this.state.apitrack)}}>copy_magnet_link</button></td> <td>{item.seeders}</td> <td>{item.leechers}</td></tr> })}
    </tbody>
  </table>
  </div>
</div>
    );
  }
}

export default App;
