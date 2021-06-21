import React from "react";
import Product from "./Product";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://www.allclash.com/wp-content/uploads/2020/11/hero-wars-best-heroes-tier-list-732x310.jpg?ezimgfmt=ng%3Awebp%2Fngcb23%2Frs%3Adevice%2Frscb23-2"
          alt=""
        />
        <div className="home__row">
          <Product
            id="6367892"
            title="the lean startup"
            price="29.99"
            image="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1333576876l/10127019.jpg"
            rating={5}
          />
          <Product
            id="1208798"
            title="Acer Aspire 5 A515-55-56VK, 15.6 Full HD IPS Display, 10th Gen Intel Core i5-1035G1, 8GB DDR4, 256GB NVMe SSD"
            price={239.0}
            rating={4}
            image="https://m.media-amazon.com/images/I/71S-XwHaGzL._AC_UL320_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            title="New apple ipad pro (12.9-inch, WI-FI, 128GB) - Silver (4th generaton)"
            price={598.99}
            rating={4}
            image="data:image/jpeg;base64,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"
          />
          <Product
            title="Hanes Women's EcoSmart Crewneck Sweatshirt"
            price={28.75}
            rating={5}
            image="https://m.media-amazon.com/images/I/71N83eNYVqL._AC_UL320_.jpg"
          />
          <Product
            title="Redragon S101 Wired Gaming Keyboard and Mouse Combo RGB Backlit Gaming Keyboard with Multimedia"
            price={33.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY218_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            title="https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY218_.jpg"
            price={322.34}
            rating={4}
            image="https://m.media-amazon.com/images/I/71vvXGmdKWL._AC_UL320_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
