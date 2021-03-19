import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { ReactMic } from 'react-mic';
import {Button,Typography} from '@material-ui/core';
import Kk  from './Kk';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      record: false,
      link: "",
      complete: false
    }
  }

  startRecording = () => {
    this.setState({ record: true });
  }

  stopRecording = () => {
    this.setState({ record: false, complete: true });
    // this.setState({link:recordedBlob})
  }

  onData = (recordedBlob) => {
    // this.setState({link:recordedBlob})
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop = (recordedBlob) => {
    // this.setState({link:recordedBlob})
    console.log('recordedBlob is: ', recordedBlob);
    // alert(JSON.stringify(recordedBlob.blobURL))
    this.setState({ link: recordedBlob.blobURL })
  }


  render() {

    return (

      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#ad3f21"
            backgroundColor="#5982eb" />
        </div>
        <div>
          <br></br>
        </div>
        <div style={{display:'flex',justifyContent:'space-evenly'}}>
          <div >
            <Button onClick={this.startRecording} type="button" variant="contained" color="primary">Start</Button>
            </div>
            <div>
            <Button onClick={this.stopRecording} type="button" variant="contained" color="secondary">Stop</Button>
          </div>
        </div>



        {
          this.state.complete ?
            <div>
              <Button type="button" variant="contained" color="secondary" href={this.state.link} target='blank'>download</Button>
              <br></br><br></br>
              <Typography variant="subtitle1">Here is your recorded voice</Typography>
              <br></br>
              <audio src={this.state.link} controls></audio>
              <br></br>
            </div>
            :
            <Typography variant="subtitle1">Press start to record the voice</Typography>
        }
        
      </>
    )
  }

}
// export default App;
