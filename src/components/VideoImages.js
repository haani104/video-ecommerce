import React from 'react'

const VideoImages = ({ images, onImageClick, products }) => {
  console.log(images)
  return (
    <div>
      <div className="video-images-container">
        {
          images.map((img, i) => (
            <div
              onClick={() => onImageClick(img.productIds)}
              key={i}
              className="video-image fadeIn">
              <img width='100' height='100' src={require('../assets/' + img.src)} />
            </div>
          ))
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          products.map((product, i) =>
            <div
              onClick={() => { window.open(product.url, '_blank') }}
              key={i}
              className="fadeIn"
              style={{ fontSize: '10px', width: '100px', border: '1px solid #ddd', padding: '9px' }}>
              <img height='100' width='100' src={product.image_url} style={{ cursor: 'pointer', borderRadius: '4px', padding: '5px' }} src={product.image_url} />
              <div style={{ marginTop: '10px' }}>{product.name}</div>
              <div style={{ marginTop: '10px', color: '#ff5722' }}>{product.price}</div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default VideoImages