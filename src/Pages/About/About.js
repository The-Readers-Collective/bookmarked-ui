import React from "react"
import { Link } from 'react-router-dom'

const About = () => {

  return (
    <section data-cy='' className=''>
      <h3 data-cy='page-name' className='page-name'>Welcome to Bookmarked!</h3>
      <p className=''>Here you can add books you want to share, find books you want to borrow,
 and manage your bookshelves.</p>
      <h4>Lend</h4>
      <p>Add your books to lend out</p>
      <Link to='/add'><button>Add Book</button></Link>
      <h4>Browse</h4>
      <p>Browse to your heart’s content</p>
      <Link to='/browse'><button>Browse Books</button></Link>
      <h4>Manage</h4>
      <p>Manage your bookshelves</p>
      <Link to='/manage'><button>Manage Books</button></Link>
    </section>
  )
}

export default About