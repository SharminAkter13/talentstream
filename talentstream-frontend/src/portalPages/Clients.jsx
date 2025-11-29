import { useEffect } from "react";
import $ from "jquery";
import "owl.carousel";

function Clients() {
  useEffect(() => {
    $("#clients-scroller").owlCarousel({
      autoplay: true,
      nav: false,
      dots: false,
      loop: true,
      margin: 30,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        480: { items: 2 },
        768: { items: 4 },
        1200: { items: 6 }
      }
    });
  }, []);

  return (
    <section className="clients section">
      <div className="container">
        <h2 className="section-title text-center">Clients &amp; Partners</h2>
        <div className="row">
          <div id="clients-scroller">
            <div className="items"><img src="portal-assets/assets/img/clients/img1.png" alt="Client 1" /></div>
            <div className="items"><img src="portal-assets/assets/img/clients/img2.png" alt="Client 2" /></div>
            <div className="items"><img src="portal-assets/assets/img/clients/img3.png" alt="Client 3" /></div>
            <div className="items"><img src="portal-assets/assets/img/clients/img4.png" alt="Client 4" /></div>
            <div className="items"><img src="portal-assets/assets/img/clients/img5.png" alt="Client 5" /></div>
            <div className="items"><img src="portal-assets/assets/img/clients/img6.png" alt="Client 6" /></div>
            <div className="items"><img src="portal-assets/assets/img/clients/img6.png" alt="Client 7" /></div>
            <div className="items"><img src="portal-assets/assets/img/clients/img6.png" alt="Client 8" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
