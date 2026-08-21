export const starters = [
  { id: 's1', name: 'TRUFFLE ARANCINI', img: '/dish_3.jpg', price: 950, priceLabel: '₹950', desc: 'Crispy risotto spheres, wild mushroom, black truffle aioli, parmesan snow.' },
  { id: 's2', name: 'BURRATA HEIRLOOM', img: '/value_fresh.jpg', price: 1200, priceLabel: '₹1200', desc: 'Fresh burrata, heirloom tomatoes, basil oil, aged balsamic reduction.' },
  { id: 's3', name: 'SEARED SCALLOPS', img: '/dish_3.jpg', price: 1500, priceLabel: '₹1500', desc: 'Pan-seared scallops, cauliflower purée, crispy pancetta, herb oil.' },
  { id: 's4', name: 'WAGYU CARPACCIO', img: '/value_craft.jpg', price: 1800, priceLabel: '₹1800', desc: 'Thinly sliced wagyu beef, truffle oil, shaved parmesan, rocket leaves.' },
  { id: 's5', name: 'CRISPY CALAMARI', img: '/home_hero.jpg', price: 1500, priceLabel: '₹1500', desc: 'Lightly fried calamari, lemon, herbs and house seasoning.' },
  { id: 's6', name: 'ROASTED MUSHROOMS', img: '/value_craft.jpg', price: 1100, priceLabel: '₹1100', desc: 'Wild mushrooms, garlic butter, herbs and parmesan.' }
];

export const mains = [
  { id: 'm1', name: 'TRUFFLE PASTA', img: '/dish_1.jpg', price: 1200, priceLabel: '₹1200', desc: 'Handmade taglierini, shaved black truffle, butter emulsion, parmigiano reggiano.' },
  { id: 'm2', name: 'WAGYU STEAK', img: '/dish_2.jpg', price: 2800, priceLabel: '₹2800', desc: 'Premium grilled wagyu, potato fondant, roasted asparagus, red wine jus.' },
  { id: 'm3', name: 'MISO BLACK COD', img: '/value_craft.jpg', price: 2400, priceLabel: '₹2400', desc: 'Sustainably sourced black cod, sweet miso glaze, pickled ginger, bok choy.' },
  { id: 'm4', name: 'ROASTED DUCK BREAST', img: '/home_hero.jpg', price: 2200, priceLabel: '₹2200', desc: 'Pan-roasted duck, cherry gastrique, parsnip purée, seasonal vegetables.' }
];

export const desserts = [
  { id: 'd1', name: 'GOLDEN CHOCOLATE SPHERE', img: '/dish_3.jpg', price: 850, priceLabel: '₹850', desc: 'Dark chocolate shell, hazelnut mousse, salted caramel center, edible gold.' },
  { id: 'd2', name: 'LEMON TARTLET', img: '/value_fresh.jpg', price: 750, priceLabel: '₹750', desc: 'Shortcrust pastry, tangy lemon curd, toasted Italian meringue.' },
  { id: 'd3', name: 'VANILLA PANNA COTTA', img: '/cta_chef.jpg', price: 700, priceLabel: '₹700', desc: 'Madagascar vanilla bean, mixed berry compote, micro mint.' },
  { id: 'd4', name: 'ARTISANAL CHEESE BOARD', img: '/home_hero.jpg', price: 1400, priceLabel: '₹1400', desc: 'Selection of imported cheeses, honeycomb, candied walnuts, crackers.' }
];

export const allMenuData = [...starters, ...mains, ...desserts];
