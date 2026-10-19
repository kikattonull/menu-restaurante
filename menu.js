/*
  MENÚ DIGITAL — PRIMERA VERSIÓN
  Los productos de ejemplo viven en este archivo.
  En la siguiente etapa los conectaremos a Supabase para poder editarlos
  desde un panel privado sin cambiar el código.
*/
const products = [
  {
    id: 1,
    name: "Ensalada de la casa",
    category: "Ensaladas",
    price: 95,
    description: "Mezcla de hojas frescas, jitomate, pepino y aderezo de la casa.",
    available: true,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    symbol: "E"
  },
  {
    id: 2,
    name: "Café americano",
    category: "Cafés calientes",
    price: 35,
    description: "Café aromático, preparado al momento.",
    available: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85",
    symbol: "C"
  },
  {
    id: 3,
    name: "Latte cremoso",
    category: "Cafés calientes",
    price: 49,
    description: "Espresso con leche vaporizada y una capa suave de espuma.",
    available: true,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
    symbol: "L"
  },
  {
    id: 4,
    name: "Malteada de fresa",
    category: "Malteadas",
    price: 65,
    description: "Malteada fría y cremosa con sabor a fresa.",
    available: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
    symbol: "M"
  },
  {
    id: 5,
    name: "Soda italiana",
    category: "Sodas italianas",
    price: 55,
    description: "Bebida gasificada con jarabe frutal y hielo.",
    available: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=85",
    symbol: "S"
  },
  {
    id: 6,
    name: "Limonada mineral",
    category: "Bebidas frías",
    price: 42,
    description: "Limón fresco, agua mineral y hielo.",
    available: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=85",
    symbol: "L"
  },
  {
    id: 7,
    name: "Cheesecake",
    category: "Postres",
    price: 68,
    description: "Rebanada de cheesecake con una base crujiente.",
    available: true,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85",
    symbol: "P"
  },
  {
    id: 8,
    name: "Ramen clásico",
    category: "Ramen",
    price: 125,
    description: "Caldo sabroso con fideos, vegetales y toppings de la casa.",
    available: true,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
    symbol: "R"
  }
];

const categoryNav = document.querySelector("#categoryNav");
const menuGrid = document.querySelector("#menuGrid");
const searchInput = document.querySelector("#searchInput");
const productCount = document.querySelector("#productCount");
const emptyState = document.querySelector("#emptyState");

let activeCategory = "Todos";

function getCategories() {
  return ["Todos", ...new Set(products.map(product => product.category))];
}

function renderCategories() {
  categoryNav.innerHTML = "";
  getCategories().forEach(category => {
    const button = document.createElement("button");
    button.className = `category-btn${category === activeCategory ? " active" : ""}`;
    button.type = "button";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category;
      renderCategories();
      renderProducts();
    });
    categoryNav.appendChild(button);
  });
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = `menu-card${product.available ? "" : " is-unavailable"}`;

  const image = document.createElement("img");
  image.className = "product-photo";
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  image.onerror = () => {
    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder";
    placeholder.textContent = product.symbol || "✦";
    placeholder.setAttribute("aria-label", "Imagen no disponible");
    image.replaceWith(placeholder);
  };

  const content = document.createElement("div");
  content.className = "card-content";

  const topline = document.createElement("div");
  topline.className = "card-topline";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = new Intl.NumberFormat("es-MX", {
    style: "currency", currency: "MXN", maximumFractionDigits: 0
  }).format(product.price);

  topline.append(title, price);

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = product.description;

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";

  const category = document.createElement("span");
  category.className = "category-label";
  category.textContent = product.category;

  const status = document.createElement("span");
  status.className = `status ${product.available ? "available" : "unavailable"}`;
  status.textContent = product.available ? "Disponible" : "No disponible";

  bottom.append(category, status);
  content.append(topline, description, bottom);
  card.append(image, content);
  return card;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("es-MX");
  const filtered = products.filter(product => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const searchable = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("es-MX");
    return matchesCategory && searchable.includes(query);
  });

  menuGrid.innerHTML = "";
  filtered.forEach(product => menuGrid.appendChild(createProductCard(product)));
  productCount.textContent = `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;
  emptyState.hidden = filtered.length > 0;
  menuGrid.hidden = filtered.length === 0;
}

searchInput.addEventListener("input", renderProducts);
renderCategories();
renderProducts();
