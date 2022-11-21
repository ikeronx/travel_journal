import React, { useState, useEffect } from 'react'
import Card from './Card'
import { data } from '../data/cardData'
// import globeIcon from '../assets/icons/globe.svg'
import { capitalizedCase, lowerCase, formatUrl, formatDate  } from '../utils/formatStrings'
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Button, IconButton,} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import {
    FormControl,
    FormLabel,
    Input
  } from '@chakra-ui/react'

  import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'

const CardsSection = () => {

    const [trips, setTrips] = useState(data)
    const [active, setActive] = useState('allTrips')
    console.log(trips)

    const showForm = () => {
        document.querySelector('.form').classList.toggle('hide')
        document.querySelector('.form__input-title').focus()
    }

    const hideForm = () => {
        document.querySelector('.form__input-title').value = ''
        document.querySelector('.form').classList.add('hide')
    }

    const handleAddTripSubmit = () => {
        const newTrip = {
            id: trips.length ? trips[trips.length - 1].id + 1 : 1,
            title: capitalizedCase(document.querySelector('.form__input-title').value),
            location: lowerCase(document.querySelector('.form__input-country').value),
            googleMapsUrl: formatUrl(document.querySelector('.form__input-google-map-url').value),
            startDate: formatDate(document.querySelector('.form__input-start-date').value),
            endDate:  formatDate(document.querySelector('.form__input-end-date').value),
            description: document.querySelector('.form__input-description').value,
            imageUrl: formatUrl (document.querySelector('.form__input-img-url').value),
        }
        setTrips(prevTrips => [...prevTrips, newTrip])
        localStorage.setItem('newTrips', JSON.stringify(newTrip))
    }

    const loadTrips = () => {
        const tripItems = JSON.parse(localStorage.getItem('newTrips'));
        if (tripItems) {
            setTrips(tripItems);
        }
    }
    

 
    const handleDelete = (id) => {
        const tripsItem = trips.filter((trip) => trip.id !== id)
        setTrips(tripsItem)
        localStorage.setItem('trips', JSON.stringify(tripsItem))
    }

    const cardElements = trips.map(cardItem => (
        <Card
            key={cardItem.id}
            {...cardItem} />
    
    ))

/* 👷🏾‍♂️🛠 how to use sort or filter cards */
    const filterNorway = trips
        .filter(country => country.location === 'Norway')
        .map(cardItem => (
            <Card key={cardItem.id}
                {...cardItem}
            />
        ))
    
        const filterBrazil = trips
        .filter(country => country.location === 'Brazil')
        .map(cardItem => (
            <Card key={cardItem.id}
                {...cardItem}
            />
        ))

    const sortCountryAlp = [...trips] // ❗️the sort method mutates / modifies the original array so spread it fist
        .sort((a, b) => a.location.localeCompare(b.location))
        .map(cardItem => (
    <Card
        key={cardItem.id}
            {...cardItem} /> 
    ))

    return (
        <section>
            <nav className="card-nav container">
                <div className="card-nav__heading">
                    <div className = 'nav__content'>
                            <h1 className="nav__heading">Travel Journal</h1>
                    </div>
                </div>
                <div className="card-nav__btns">
                    <Menu>
                        <MenuButton
                            onClick={() =>  hideForm()}
                            as={IconButton}
                            icon={<HamburgerIcon/>}
                            bg='teal'
                            _hover={{ bg: '#2C7A7B'}}
                            size={['xs', 'sm', 'md']}
                        >
                            Menu
                        </MenuButton>
                        <MenuList bg ='#42484c' color='white'>
                            <MenuItem onClick={() => setActive('allTrips')} _hover={{ bg: 'transparent', color: '#aaaaaa' }}>See All Trips</MenuItem>
                            <MenuDivider/>
                            <MenuGroup title='Sort Trips:'>
                            <MenuItem onClick={() => setActive('sortTripsAlp')} _hover={{ bg: 'transparent', color: '#aaaaaa' }}>Country (A-Z)</MenuItem>
                                <MenuItem padding-left='20px' onClick={() => setActive('filterBrazil')}  _hover={{ bg: 'transparent', color: '#aaaaaa' }}>Brazil</MenuItem>
                                <MenuItem  onClick={() => setActive('filterNorway')}  _hover={{ bg: 'transparent', color: '#aaaaaa' }}>Norway</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </div>
            </nav>

            <div className="form container hide">
                <FormControl className="form__control" display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                        {/* <FormLabel >id</FormLabel>
                        <Input type='number' /> */}
    
                    <div className='form__input-row'>
                        <div className='form__input-row--first form__input-row--padding'>
                           <div>
                            <FormLabel>Title:</FormLabel>
                                <Input className='form__input-title' type='text' />
                            </div>
                           <div>
                            <FormLabel >Country:</FormLabel>
                                <Input className='form__input-country' type='text' />
                            </div>
                        </div>
                    </div>
                    <div className='form__input-row'>
                    <div className='form__input-row--padding'>
                           <div>
                            <FormLabel>Image Url:</FormLabel>
                                <Input className='form__input-img-url' type='url' />
                            </div>
                            <div>
                            <FormLabel>Google Maps Url:</FormLabel>
                                <Input className='form__input-google-map-url' type='url' />
                            </div>
                        </div>
                    </div> 

                    <div className='form__input-row'>
                    <div className='form__input-row--padding'>
                        <div className='form__textarea'>
                           <FormLabel >Description:</FormLabel>
                            <textarea className='form__input-description form__textarea-input' type='text' name="paragraph_text" maxLength = "225"></textarea>
                        </div>
                    </div>
                    </div>
                              <div className='form__input-row'>
                        <div className='form__input-row--padding form__dates'>
                            <div className='form__input-start-date--padding' >
                                <FormLabel>Start Date:</FormLabel>
                                <Input className='form__input-start-date' type='date' />
                            </div>
                            <div>
                                <FormLabel >End Date:</FormLabel>
                                <Input className='form__input-end-date ' type='date' />
                            </div>

                            <div>
                                <FormLabel >Rating:</FormLabel>
                                <NumberInput defaultValue={5} min={1} max={5}>
                                    <NumberInputField bg='white' color='black' />
                                    <NumberInputStepper bg='gray'>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                    </NumberInput>
                            </div>
                        </div>
                    </div>



                    <div className='form__input-row'>
                        <div className='form__input-row--last'>
                           <div>
                                {/* <FormLabel>Google Maps Url:</FormLabel>
                                <I`nput type='url' />
                            </div>
                            <div>
                                <div>   
                                <FormLabel>Submit</FormLabel> */}
                           <Button className='form__submit-btn' width={{ base: '100%', sm: 'auto' }}
                        onClick={() => handleAddTripSubmit() } 
                        colorScheme='teal'
                                
                        size={['xs', 'sm']}
                        _hover={{ bg: '#B2F5EA', color: '#000'}}
                        _active={{
                            bg: '#dddfe2',
                            transform: 'scale(0.98)',
                            borderColor: '#bec3c9',
                        }}
                        _focus={{
                            boxShadow:
                            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                        }}
                    >
                        Submit
                        </Button>
                     </div>    
                     </div>
                        {/* </div> */}
                    </div> 
                </FormControl>
            </div>

            <div className="cards container">
                {/* then conditionally render the cards base on the active state that matches the set state that was click above */}
                {active === 'allTrips' && cardElements}
                {active === 'sortTripsAlp'&& sortCountryAlp}
                {active === 'filterBrazil' && filterBrazil} 
                {active === 'filterNorway'&& filterNorway} 
            </div>
        </section>
    )
}
export default CardsSection