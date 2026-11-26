
describe("Pizza Sipariş Formu Testleri", () => {
  it("Sipariş formu başarıyla açılmalı", () => {
    cy.visit("http://localhost:5173/order");

    cy.contains("Boyut Seç").should("be.visible");
    cy.contains("Hamur Seç").should("be.visible");
  });

it("Kullanıcı isim alanına metin girebilmeli", () => {
  cy.visit("http://localhost:5173/order");

  cy.get('input[name="customerName"]')
    .type("Mustafa")
    .should("have.value", "Mustafa");
});

it("Kullanıcı birden fazla malzeme seçebilmeli", () => {
  cy.visit("http://localhost:5173/order");

  cy.get('input[name="ingredients"]').eq(0).check();
  cy.get('input[name="ingredients"]').eq(1).check();
  cy.get('input[name="ingredients"]').eq(2).check();
  cy.get('input[name="ingredients"]').eq(3).check();

  cy.get('input[name="ingredients"]:checked')
    .should("have.length", 4);
});


it("Geçerli bilgiler girildiğinde sipariş butonu aktif olmalı", () => {
  cy.visit("http://localhost:5173/order");

  cy.get('input[name="customerName"]').type("Mustafa");

  cy.get('input[name="size"]').check("Orta");

  cy.get("#dough").select("Normal");

  cy.get('input[name="ingredients"]').eq(0).check();
  cy.get('input[name="ingredients"]').eq(1).check();
  cy.get('input[name="ingredients"]').eq(2).check();
  cy.get('input[name="ingredients"]').eq(3).check();

  cy.contains("button", "SİPARİŞ VER")
    .should("be.enabled");
});

it("Geçerli sipariş gönderildiğinde başarı sayfasına yönlendirmeli", () => {
  cy.intercept("POST", "https://reqres.in/api/pizza", {
    statusCode: 201,
    body: {
      id: "test-order",
      createdAt: "2026-11-23",
    },
  }).as("createOrder");

  cy.visit("http://localhost:5173/order");

  cy.get('input[name="customerName"]').type("Mustafa");
  cy.get('input[name="size"]').check("Orta");
  cy.get("#dough").select("Normal");

  cy.get('input[name="ingredients"]').eq(0).check();
  cy.get('input[name="ingredients"]').eq(1).check();
  cy.get('input[name="ingredients"]').eq(2).check();
  cy.get('input[name="ingredients"]').eq(3).check();

  cy.contains("button", "SİPARİŞ VER").click();

  cy.wait("@createOrder");

  cy.url().should("include", "/success");
});

it("API hatası olduğunda kullanıcıya hata mesajı göstermeli", () => {
  cy.intercept("POST", "https://reqres.in/api/pizza", {
    statusCode: 500,
    body: { error: "Server error" },
  }).as("failedOrder");

  cy.visit("http://localhost:5173/order");

  cy.get('input[name="customerName"]').type("Mustafa");
  cy.get('input[name="size"]').check("Orta");
  cy.get("#dough").select("Normal");

  cy.get('input[name="ingredients"]').eq(0).check();
  cy.get('input[name="ingredients"]').eq(1).check();
  cy.get('input[name="ingredients"]').eq(2).check();
  cy.get('input[name="ingredients"]').eq(3).check();

  cy.contains("button", "SİPARİŞ VER").click();

  cy.wait("@failedOrder");

  cy.contains(
    "Siparişiniz gönderilemedi. Lütfen tekrar deneyiniz."
  ).should("be.visible");
});
it("Artı butonuna basıldığında sipariş adedi artmalı", () => {
  cy.visit("http://localhost:5173/order");

  cy.get(".quantity-control span").should("have.text", "1");

  cy.get(".quantity-control button").last().click();

  cy.get(".quantity-control span").should("have.text", "2");
});

it("Eksi butonuna basıldığında sipariş adedi azalmalı ve 1'in altına düşmemeli", () => {
  cy.visit("http://localhost:5173/order");

  cy.get(".quantity-control button").first().should("be.disabled");

  cy.get(".quantity-control button").last().click();
  cy.get(".quantity-control span").should("have.text", "2");

  cy.get(".quantity-control button").first().click();

  cy.get(".quantity-control span").should("have.text", "1");
  cy.get(".quantity-control button").first().should("be.disabled");
});

it("Sipariş adedi arttığında toplam fiyat güncellenmeli", () => {
  cy.visit("http://localhost:5173/order");

  cy.get('input[name="ingredients"]').eq(0).check();
  cy.get('input[name="ingredients"]').eq(1).check();
  cy.get('input[name="ingredients"]').eq(2).check();
  cy.get('input[name="ingredients"]').eq(3).check();

  cy.get(".quantity-control button").last().click();

  cy.contains("div", "Pizza")
    .should("contain", "171.00₺");

  cy.contains("div", "Seçimler")
    .should("contain", "40.00₺");

  cy.get(".total-price")
    .should("contain", "211.00₺");
});

it("Sipariş adedi API'ye gönderilmeli ve onay sayfasında gösterilmeli", () => {
  cy.intercept("POST", "https://reqres.in/api/pizza", {
    statusCode: 201,
    body: {
      id: "test-order",
      createdAt: "2026-11-24",
    },
  }).as("createOrder");

  cy.visit("http://localhost:5173/order");

  cy.get('input[name="customerName"]').type("Mustafa");
  cy.get('input[name="size"]').check("Orta");
  cy.get("#dough").select("Normal");

  cy.get('input[name="ingredients"]').eq(0).check();
  cy.get('input[name="ingredients"]').eq(1).check();
  cy.get('input[name="ingredients"]').eq(2).check();
  cy.get('input[name="ingredients"]').eq(3).check();

  cy.get(".quantity-control button").last().click();

  cy.contains("button", "SİPARİŞ VER").click();

  cy.wait("@createOrder").then((interception) => {
    expect(interception.request.body.adet).to.equal(2);
  });

  cy.url().should("include", "/success");

  cy.contains("p", "Sipariş Adedi:")
    .should("contain", "2");
});
});
