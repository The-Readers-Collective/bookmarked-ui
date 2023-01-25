import React from 'react'
import Cover from '../Cover/Cover'
import './Shelf.css'
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Mousewheel, Keyboard } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

const Shelf = ({ myShelfBooks, ownedBooks, bookmarkedBooks, owned, deleteBook, updateStatus }) => {

  const bookCovers = (books) => books.map(book => {
    return (
      // <SwiperSlide className="swiper-slide">
        <Cover 
          fromShelf={true}
          cover={book.book.bookCover}
          id={book.book.id}
          key={Math.random()}
          available={book.book.available}
          deleteBook={deleteBook}
          updateStatus={updateStatus}
          owned={owned}
        />
      // </SwiperSlide>
    )
  }) 

  const shelfName = myShelfBooks ? "My Books" : "My Wishlist"
  
  return (
    <>
      <h3 data-cy={shelfName} className="shelf-name">{shelfName}</h3>
    <div data-cy="shelf-container" className="shelf-container">
        {/* <Swiper
              modules={[Navigation, Mousewheel, Keyboard]}
              spaceBetween={15}
              loop={true}
              initialSlide={2}
              centeredSlides={true}
              breakpoints={{
                200: {
                  slidesPerView: 1,
                },
                400: {
                  slidesPerView: 2,
                },
                600: {
                  slidesPerView: 3,
                },
                839: {
                  slidesPerView: 4,
                },
                1000: {
                  slidesPerView: 7,
                },
                1400: {
                  slidesPerView: 8,
                },
              }}
              slidesPerView={6}
              navigation={true}
              keyboard={true}
              mousewheel={true}
              className="all-swiper-paths"
            > */}
             {shelfName === 'My Books' ? bookCovers(ownedBooks) : bookCovers(bookmarkedBooks)}
        {/* </Swiper> */}
    </div>
        </>
  )
}

export default Shelf
