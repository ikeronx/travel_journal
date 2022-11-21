import React from 'react'
import {data} from '../data/cardData'
import mapMarker from '../assets/icons/map-marker.svg'


const Card = (props) => {
    console.log(data)

 const handleDelete = (id) => {
    const cards = data.filter(c => c.id !== id)
    setTrips(cards) 
    }

    return (
        <article className="card container">
            <aside className="card__aside">
                <figure className="card__figure">
                    <img className="card__image" src={props.imageUrl} alt="An image of a girl smiling while wearing a swimming cap" />
                </figure>
            </aside>
            <header className="card__header card-textbox">
                <div className="card-textbox__location-box">
                    <div className="card-textbox__country">
                        <img className="card__location--marker" src= {mapMarker} alt="map marker icon" />
                        <p className="card__location--country">{props.location}</p>  
                        <a className="card__location--link" href={props.googleMapsUrl} target="_blank"><ion-icon name="map-outline"></ion-icon></a>
                    </div>
                </div>
                <h2 className="card__title">{props.title}</h2>
                <div className="card__body">
                    <p className="card__date">{props.startDate} - {props.endDate}</p>
                    <p className="card__description">{props.description}</p>
                </div>
            </header>
        </article>
    )

}

export default Card;