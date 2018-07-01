import React, { Component } from 'react';
import YTPlayer from 'react-youtube'
import axios from 'axios';
import VideoImages from './components/VideoImages'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vidImages: {},
      vidImageProducts: [],
      normImgList: []
    }
  }

  componentDidMount() {
    axios.get('./sampleVidData.json')
      .then(data => {
        const imageData = data.data
        this.setState({
          vidImages: imageData,
        })
      })
  }

  isVidImgExists = (imagesrc) => {
    let exists = false;
    this.state.normImgList.some(item => {
      console.log(imagesrc)
      console.log(item.src)
      if (item.src === imagesrc) {
        exists = true
      }
    })
    return exists
  }

  setNormImages = (time) => {
    const keys = Object.keys(this.state.vidImages)
    keys.forEach(k => {
      if (time === this.state.vidImages[k].start) {
        if (!this.isVidImgExists(k)) {
          this.setState({
            normImgList: [...this.state.normImgList, {
              src: k,
              productIds: this.state.vidImages[k].product_ids,
              time: this.state.vidImages[k].start,
            }]
          })
        }
      }
    })
  }

  stopInterval = () => {
    clearInterval(this.pollIntervalId)
  }

  handlePlay = (event) => {
    this.pollIntervalId = setInterval(() => {
      const currentTime = Math.ceil(event.target.getCurrentTime())
      this.setNormImages(currentTime)
    }, 1000)
  }

  handlePause = (event) => {
    this.stopInterval()
  }

  handleVidImgClick = (pids) => {
    const url = "https://ace.tokopedia.com/search/v1/product/by_id?id=" + pids.join(',') + '&device=web&rows=5&source=im'
    axios.get(url)
      .then((response) => {
        this.setState({ vidImageProducts: response.data.data.products });
        console.log(response);
      })
      .catch((error) => {
        this.setState({ error: 'network error' })
        console.log(error);
      });
  }

  render() {
    const opts = {
      height: '280',
      width: '800',
      playerVars: { // https://developers.google.com/youtube/player_parameters
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="navbar-inner">
            <span className="site-logo"></span>
            <span className="tv-logo">
              <img src={require('./assets/television-icon.png')} width='50px' height= '50px'/>
            </span>
          </div>
        </header>
        <div id="video-container">
          <YTPlayer
            videoId="eov1ov-xKgE"
            opts={opts}
            onPlay={this.handlePlay}
            onPause={this.handlePause}
          />
        </div>
        <VideoImages
          images={this.state.normImgList}
          onImageClick={this.handleVidImgClick}
          products={this.state.vidImageProducts}
        />
      </div>
    );
  }
}

export default App;
