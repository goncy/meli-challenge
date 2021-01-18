import {Product} from "../types";

import {MercadoLibreSearchResponse, RawProduct} from "./types";

export default {
  search: (query: string): Promise<Product[]> => {
    return fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then((res) => res.json())
      .then((response: MercadoLibreSearchResponse) =>
        response.results.map((rawProduct) => ({
          id: rawProduct.id,
          title: rawProduct.title,
          image: rawProduct.thumbnail,
          price: rawProduct.price,
          location: rawProduct.address.state_name,
        })),
      );
  },
  fetch: (id: string): Promise<Product> => {
    return fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((res) => res.json())
      .then((rawProduct: RawProduct) => ({
        id: rawProduct.id,
        price: rawProduct.price,
        title: rawProduct.title,
        image: rawProduct.thumbnail,
        location: rawProduct.seller_address.state.name,
      }));
  },
};
