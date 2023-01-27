import React from "react"
import { Link } from 'react-router-dom'
import './About.css'

const About = () => {

  return (
    <section data-cy='' className='about-container'>
      <h3 data-cy='page-name' className='about-title'>Welcome to Bookmarked!</h3>
      <p className=''>Add books you want to share, find books you want to borrow,
 and manage your bookshelves.</p>
      <div className='cta-section'>
        <div className='cta-item'>
          <h3 className='cta-title'>Add</h3>
          <p>Add your books to lend out</p>
          <Link to='/add'><button className='cta-buttons'>Add Book</button></Link>
        </div>
        <div className='cta-item'>
          <h3 className='cta-title'>Browse</h3>
          <p>Browse to your heart’s content</p>
          <Link to='/browse'><button className='cta-buttons'>Browse Books</button></Link>
        </div>
        <div className='cta-item'>
          <h3 className='cta-title'>Manage</h3>
          <p>Manage your bookshelves</p>
          <Link to='/manage'><button className='cta-buttons'>Manage Books</button></Link>
        </div>
      </div>
    </section>
  )
}

export default About