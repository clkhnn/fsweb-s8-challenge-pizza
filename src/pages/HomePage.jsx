import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

const products = [
  {
    id: 1,
    image: "/assets/iteration-2/pictures/food-1.png",
    name: "Terminal Pizza",
    rating: "4.9",
    reviewCount: "(200)",
    price: "60₺",
  },
  {
    id: 2,
    image: "/assets/iteration-2/pictures/food-2.png",
    name: "Position Absolute Acı Pizza",
    rating: "4.9",
    reviewCount: "(200)",
    price: "60₺",
  },
  {
    id: 3,
    image: "/assets/iteration-2/pictures/food-3.png",
    name: "useEffect Tavuklu Burger",
    rating: "4.9",
    reviewCount: "(200)",
    price: "60₺",
  },
];
function HomePage() {
  return (
    <>
      {/* HERO / BANNER */}
      <header className="hero">
        <div className="hero-content">
          <a href="#" className="logo" aria-label="Teknolojik Yemekler ana sayfa">
            <img
              src="/assets/iteration-1/logo.svg"
              alt="Teknolojik Yemekler"
            />
          </a>

          <p className="hero-script">fırsatı kaçırma</p>

          <h1>
            KOD ACIKTIRIR
            <br />
            PİZZA, DOYURUR
          </h1>

          <Link to="/order" className="hero-button">
  ACIKTIM
</Link>
        </div>
      </header>
            {/* KATEGORİ MENÜSÜ */}
      <nav className="categories" aria-label="Yemek kategorileri">
        <a href="#menu">
          <img src="/assets/iteration-2/icons/1.svg" alt="" />
          <span>YENİ! Kore</span>
        </a>

        <a href="#menu">
          <img src="/assets/iteration-2/icons/2.svg" alt="" />
          <span>Pizza</span>
        </a>

        <a href="#menu">
          <img src="/assets/iteration-2/icons/3.svg" alt="" />
          <span>Burger</span>
        </a>

        <a href="#menu">
          <img src="/assets/iteration-2/icons/4.svg" alt="" />
          <span>Kızartmalar</span>
        </a>

        <a href="#menu">
          <img src="/assets/iteration-2/icons/5.svg" alt="" />
          <span>Fast food</span>
        </a>

        <a href="#menu">
          <img src="/assets/iteration-2/icons/6.svg" alt="" />
          <span>Gazlı içecek</span>
        </a>
      </nav>
            <main>
        {/* KAMPANYA KARTLARI */}
        <section className="promotions" aria-label="Kampanyalar">
          <a href="#menu" className="promo promo-large">
            <img
              src="/assets/iteration-2/cta/kart-1.png"
              alt=""
            />

            <span className="promo-content">
              <strong className="promo-title">
                Özel
                <br />
                Lezzetetus
              </strong>

              <span className="promo-description">
                Position: Absolute Acı Burger
              </span>

              <span className="promo-button">
                SİPARİŞ VER
              </span>
            </span>
          </a>

          <div className="promo-column">
            <a href="#menu" className="promo promo-burger">
              <img
                src="/assets/iteration-2/cta/kart-2.png"
                alt=""
              />

              <span className="promo-content">
                <strong className="promo-title">
                  Hackathlon
                  <br />
                  Burger Menü
                </strong>

                <span className="promo-button">
                  SİPARİŞ VER
                </span>
              </span>
            </a>

            <a href="#menu" className="promo promo-courier">
              <img
                src="/assets/iteration-2/cta/kart-3.png"
                alt=""
              />

              <span className="promo-content">
                <strong className="promo-title">
                  <span>Çoooook</span> hızlı
                  <br />
                  npm gibi kurye
                </strong>

                <span className="promo-button">
                  SİPARİŞ VER
                </span>
              </span>
            </a>
          </div>
        </section>
                {/* ÜRÜN MENÜSÜ */}
        <section className="menu-section" id="menu">
          <p className="section-script">
            en çok paketlenen menüler
          </p>

          <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>

          <nav className="menu-tabs" aria-label="Menü kategorileri">
            <a href="#menu">
              <img src="/assets/iteration-2/icons/1.svg" alt="" />
              <span>Ramen</span>
            </a>

            <a href="#menu" className="active">
              <img src="/assets/iteration-2/icons/2.svg" alt="" />
              <span>Pizza</span>
            </a>

            <a href="#menu">
              <img src="/assets/iteration-2/icons/3.svg" alt="" />
              <span>Burger</span>
            </a>

            <a href="#menu">
              <img src="/assets/iteration-2/icons/4.svg" alt="" />
              <span>French fries</span>
            </a>

            <a href="#menu">
              <img src="/assets/iteration-2/icons/5.svg" alt="" />
              <span>Fast food</span>
            </a>

            <a href="#menu">
              <img src="/assets/iteration-2/icons/6.svg" alt="" />
              <span>Soft drinks</span>
            </a>
          </nav>

          <div className="product-grid">
  {products.map((product) => (
    <ProductCard
      key={product.id}
      image={product.image}
      name={product.name}
      rating={product.rating}
      reviewCount={product.reviewCount}
      price={product.price}
    />
  ))}
</div>
        </section>
      </main>
            
      <footer className="footer">
        <div className="footer-main">
          <section className="footer-contact">
            <Link to="/" className="logo">
              <img
                src="/assets/iteration-2/footer/logo-footer.svg"
                alt="Teknolojik Yemekler"
              />
            </Link>

            <p>
              <img src="/assets/iteration-2/footer/icons/icon-1.png" alt="" />
              <span>
                Mustafa Kemal Atatürk Bulvarı,
                <br />
                İzmir Türkiye
              </span>
            </p>

            <p>
              <img src="/assets/iteration-2/footer/icons/icon-2.png" alt="" />
              <span>aciktim@teknolojikyemekler.com</span>
            </p>

            <p>
              <img src="/assets/iteration-2/footer/icons/icon-3.png" alt="" />
              <span>+90 999 999 99 99</span>
            </p>
          </section>

          <section className="footer-links">
            <h2>Hot Menu</h2>
            <a href="#menu">Terminal Pizza</a>
            <a href="#menu">6 Kişilik Hackathlon Pizza</a>
            <a href="#menu">useEffect Tavuklu Pizza</a>
            <a href="#menu">Beyaz Console Frosty</a>
            <a href="#menu">Testleri Geçen Html Burger</a>
            <a href="#menu">Position Absolute Acı Burger</a>
          </section>

          <section className="footer-gallery">
            <h2>Instagram</h2>

            <div className="gallery-grid">
              <img src="/assets/iteration-2/footer/insta/li-0.png" alt="Yemek fotoğrafı" />
              <img src="/assets/iteration-2/footer/insta/li-1.png" alt="Yemek fotoğrafı" />
              <img src="/assets/iteration-2/footer/insta/li-2.png" alt="Yemek fotoğrafı" />
              <img src="/assets/iteration-2/footer/insta/li-3.png" alt="Yemek fotoğrafı" />
              <img src="/assets/iteration-2/footer/insta/li-4.png" alt="Yemek fotoğrafı" />
              <img src="/assets/iteration-2/footer/insta/li-5.png" alt="Yemek fotoğrafı" />
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <span>© 2023 Teknolojik Yemekler.</span>
          <span aria-label="Sosyal medya">♥</span>
        </div>
      </footer>
    </>
  );
}

export default HomePage;