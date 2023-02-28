import React from "react"
import './card.css'

export default function Card({data, handleClickClap, handleClickHeart}) {
    return (
      <div className="card">
        <div className="card-wrapper">

          <div className="card-top-section">
            <img src={data.image} alt="" className="card-image" />
          </div>

          <div className="card-middle-section">
            <div className="date-time">
              <span className="date">{data.date}</span>
              <span className="time">{data.readingTime}</span>
            </div>
            <span className="card-title">{data.title}</span>
            <div className="card-description">{data.description}</div>
          </div>

          <div className="card-bottom-section">
            <hr />
            <div className="claps-heart-section">
              <div className="clap-count-wrapper">
                <img src="./clapping.svg" alt="" className="claps" onClick = {() => handleClickClap(data.id)} />
                <span data-testid = 'clap-count' >{data.claps}</span>
              </div>

              <img src = {data.liked === true ? "./heart-red.svg" : "./heart-black.svg"} alt="" className="heart" onClick = {() => handleClickHeart(data.id)}/>
            </div>
          </div>



        </div>
      </div>
    )
}