import { useState } from "react";
import axios from "axios";
import "./OrderForm.css";

const ingredients = [
  "Peperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Jalapeno",
  "Sarımsak",
  "Biber",
  "Sucuk",
  "Ananas",
  "Kabak",
];

const sizes = ["Küçük", "Orta", "Büyük"];

function OrderForm({ setOrderData, history }) {
  const [formData, setFormData] = useState({
  customerName: "",
  size: "",
  dough: "",
  ingredients: [],
  orderNote: "",
  quantity: 1,
});

const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      customerName: event.target.value,
    });
  };

  const handleSizeChange = (event) => {
    setFormData({
      ...formData,
      size: event.target.value,
    });
  };

  const handleDoughChange = (event) => {
    setFormData({
      ...formData,
      dough: event.target.value,
    });
  };

  const handleIngredientChange = (event) => {
    const ingredient = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (formData.ingredients.length >= 10) {
        return;
      }

      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredient],
      });
    } else {
      setFormData({
        ...formData,
        ingredients: formData.ingredients.filter(
          (item) => item !== ingredient
        ),
      });
    }
  };

  const handleNoteChange = (event) => {
    setFormData({
      ...formData,
      orderNote: event.target.value,
    });
  };
const handleQuantityChange = (amount) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    quantity: Math.max(1, prevFormData.quantity + amount),
  }));
};
  
  const basePrice = 85.5;
const ingredientPrice = 5;
const pizzaTotal = basePrice * formData.quantity;
const selectionsPrice =
  formData.ingredients.length * ingredientPrice * formData.quantity;
  
const totalPrice = pizzaTotal + selectionsPrice;
const isFormValid =
    formData.customerName.trim().length >= 3 &&
    formData.size !== "" &&
    formData.dough !== "" &&
    formData.ingredients.length >= 4 &&
    formData.ingredients.length <= 10;

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!isFormValid) {
    return;
  }
const orderData = {
  isim: formData.customerName,
  boyut: formData.size,
  hamur: formData.dough,
  malzemeler: formData.ingredients,
  adet: formData.quantity,
  ozel: formData.orderNote,
};

  try {
    setErrorMessage("");

    const response = await axios.post(
      "https://reqres.in/api/pizza",
  orderData,
      {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    setOrderData({
      ...orderData,
      apiResponse: response.data,
    });

    history.push("/success");

    console.log("Sipariş başarıyla gönderildi!");
    console.log("Sipariş özeti:", orderData);
    console.log("API yanıtı:", response.data);
  } catch (error) {
    console.error("Sipariş gönderilemedi:", error);
    setErrorMessage(
      "Siparişiniz gönderilemedi. Lütfen tekrar deneyiniz."
    );
  }
};
  return (
    <div className="order-page">
      <header className="order-header">
        <h1>Teknolojik Yemekler</h1>
        <p>Anasayfa - Sipariş Oluştur</p>
      </header>

      <main className="order-container">
        <section className="product-information">
          <h2>Position Absolute Acı Pizza</h2>

          <div className="product-rating">
            <strong>85.50₺</strong>
            <span>4.9</span>
            <span>(200)</span>
          </div>

          <p className="product-description">
            Frontend developerların favorisi olan
            özel pizza. Lezzetiyle kodlarına enerji kat!
          </p>
        </section>

        <form className="order-form" onSubmit={handleSubmit}>
          {errorMessage && (
  <p className="error-message" role="alert">
    {errorMessage}
  </p>
)}
          <div className="form-row">
            <fieldset className="form-group">
              <legend>
                Boyut Seç <span>*</span>
              </legend>

              {sizes.map((size) => (
                <label key={size} className="radio-option">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={formData.size === size}
                    onChange={handleSizeChange}
                    required
                  />
                  {size}
                </label>
              ))}
            </fieldset>

            <div className="form-group">
              <label htmlFor="dough">
                Hamur Seç <span>*</span>
              </label>

              <select
                id="dough"
                name="dough"
                value={formData.dough}
                onChange={handleDoughChange}
                required
              >
                <option value="" disabled>
                  Hamur Kalınlığı
                </option>
                <option value="İnce">İnce</option>
                <option value="Normal">Normal</option>
                <option value="Kalın">Kalın</option>
              </select>
            </div>
          </div>

          <fieldset className="ingredients-group">
            <legend>Ek Malzemeler</legend>
            <p>En fazla 10 malzeme seçebilirsiniz. Her biri 5₺</p>

            <div className="ingredients-grid">
              {ingredients.map((ingredient) => (
                <label key={ingredient} className="checkbox-option">
                  <input
                    type="checkbox"
                    name="ingredients"
                    value={ingredient}
                    checked={formData.ingredients.includes(ingredient)}
                    onChange={handleIngredientChange}
                    disabled={
                      formData.ingredients.length >= 10 &&
                      !formData.ingredients.includes(ingredient)
                    }
                  />
                  {ingredient}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="form-group name-group">
            <label htmlFor="customer-name">
              İsim <span>*</span>
            </label>

            <input
              type="text"
              id="customer-name"
              name="customerName"
              placeholder="Adınızı giriniz"
              value={formData.customerName}
              onChange={handleNameChange}
              minLength={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="order-note">Sipariş Notu</label>

            <textarea
              id="order-note"
              name="orderNote"
              placeholder="Siparişinize eklemek istediğiniz bir not var mı?"
              rows={3}
              value={formData.orderNote}
              onChange={handleNoteChange}
            />
          </div>

          <div className="order-bottom">
            <div className="quantity-control">
  <button
    type="button"
    onClick={() => handleQuantityChange(-1)}
    disabled={formData.quantity === 1}
  >
    -
  </button>

  <span>{formData.quantity}</span>

  <button
    type="button"
    onClick={() => handleQuantityChange(1)}
  >
    +
  </button>
</div>

            <section className="order-summary">
              <h3>Sipariş Toplamı</h3>
              <div>
                <span>Pizza</span>
                <span>{pizzaTotal.toFixed(2)}₺</span>
              </div>

              <div>
                <span>Seçimler</span>
                <span>{selectionsPrice.toFixed(2)}₺</span>
              </div>

              <div className="total-price">
                <span>Toplam</span>
                <strong>{totalPrice.toFixed(2)}₺</strong>
                </div>

              <button type="submit" disabled={!isFormValid}>
                SİPARİŞ VER
              </button>
            </section>
          </div>
        </form>
      </main>
    </div>
  );
}

export default OrderForm;
