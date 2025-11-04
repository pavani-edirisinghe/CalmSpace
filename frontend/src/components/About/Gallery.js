import React from "react";
import "./Gallery.css";

const Gallery = () => {
  const galleryImages = [
    "assets/img/gallery-1.jpg",
    "assets/img/gallery-2.jpg",
    "assets/img/gallery-3.jpg",
    "assets/img/gallery-4.jpg",
    "assets/img/gallery-5.jpg",
    "assets/img/gallery-6.jpg",
  ];

  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title text-center">
        <h2>Gallery</h2>
        <p>Explore our moments of connection, care, and calm.</p>
      </div>

      <div className="container-fluid">
        <div className="row g-0">
          {galleryImages.map((img, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="gallery-item">
                <a href={img} className="glightbox" data-gallery="images-gallery">
                  <img src={img} alt={`Gallery ${index + 1}`} className="img-fluid" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
