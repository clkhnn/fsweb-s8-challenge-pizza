
import "./SuccessPage.css";

function SuccessPage({ orderData }) {
  if (!orderData) {
    return (
      <main className="success-page">
        <div className="success-container">
          <h2>Sipariş bilgisi bulunamadı.</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="success-page">
      <div className="success-container">
        <h1 className="success-title">SİPARİŞİNİZ ALINDI!</h1>

        <h2 className="success-subtitle">Sipariş Özeti</h2>

        <div className="success-details">
          {orderData.apiResponse && (
  <div className="api-response">
    <h3>Sunucu Yanıtı</h3>
    <p>
      <strong>Sipariş ID:</strong>{" "}
      {orderData.apiResponse.id}
    </p>
    <p>
      <strong>Oluşturulma Tarihi:</strong>{" "}
      {new Date(orderData.apiResponse.createdAt).toLocaleString("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
})}
    </p>
  </div>
)}
          <p><strong>İsim:</strong> {orderData.isim}</p>
          <p><strong>Boyut:</strong> {orderData.boyut}</p>
          <p><strong>Sipariş Adedi:</strong> {orderData.adet}</p>
          <p><strong>Hamur:</strong> {orderData.hamur}</p>
          <p>
            <strong>Malzemeler:</strong>{" "}
            {orderData.malzemeler.join(", ")}
          </p>
          <p><strong>Özel Not:</strong> {orderData.ozel || "Yok"}</p>
        </div>
      </div>
    </main>
  );
}

export default SuccessPage;
