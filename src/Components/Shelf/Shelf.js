import React from 'react'
import Cover from '../Cover/Cover'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Shelf = ({ myShelfBooks, ownedBooks, bookmarkedBooks, deleteBook }) => {

  const bookCovers = (books) => books.map(book => {
    return (
      <SwiperSlide className="swiper-slide">
        <Cover 
          fromShelf={true}
          cover={book.book.bookCover}
          id={book.book.id}
          key={Math.random()}
          available={book.book.available}
          deleteBook={deleteBook}
        />
      </SwiperSlide>
    )
  }) 

  const shelfName = myShelfBooks ? "My Books" : "My Bookmarked Books"
  
  return (
    <div data-cy="shelf-container" className="shelf-container">
      <h3 data-cy={shelfName} className="shelf-name">{shelfName}</h3>
        <Swiper
              modules={[Navigation, Mousewheel, Keyboard]}
              spaceBetween={15}
              loop={true}
              initialSlide={2}
              centeredSlides={true}
              breakpoints={{
                200: {
                  slidesPerView: 1,
                },

                500: {
                  slidesPerView: 2,
                },
                769: {
                  slidesPerView: 3,
                },
              }}
              slidesPerView={6}
              navigation={true}
              keyboard={true}
              mousewheel={true}
              className="all-swiper-paths"
            >
             {shelfName === 'My Books' ? bookCovers(ownedBooks) : bookCovers(bookmarkedBooks)}
        </Swiper>
    </div>
  )
}

export default Shelf
