import { getSnapshot, applySnapshot } from "mobx-state-tree";
import {
  CartStoreModel,
  CartStore,
  CartStoreSnapshotIn,
  CartStoreSnapshotOut,
} from "./CartStore";
import { ProdutoModel } from "./Produto";

describe("CartStore", () => {
  let cartStore: CartStore;
  const defaultList = [
    {
      id: 1,
      nome: "Product 1",
      inCart: true,
      regiao: "Serrado mineiro",
      avaliacao: 80,
      imagem: "http://",
      descricao: "descricao",
    },
    {
      id: 2,
      nome: "Product 2",
      inCart: true,
      regiao: "Serrado mineiro",
      avaliacao: 80,
      imagem: "http://",
      descricao: "descricao",
    },
  ]
  
  const defaultItem = {
    id: 3,
    nome: "Product 3",
    inCart: false,
    regiao: "Serrado mineiro",
    avaliacao: 80,
    imagem: "http://",
    descricao: "descricao",
  }

  const defaultItemInCart = {
    ...defaultItem,
    inCart: true
  }

  beforeEach(() => {
    cartStore = CartStoreModel.create({
      cartItems: defaultList,
    });
  });

  it("should add a product to the cart", () => {
    const itemToAdd = ProdutoModel.create(defaultItem);

    cartStore.addOrRemoveProduct(itemToAdd);

    expect(cartStore.cartItems.length).toBe(3);
    expect(cartStore.cartItems[2]).toEqual(defaultItemInCart);
  });

  it("should remove a product from the cart", () => {
    const itemToRemove = cartStore.cartItems[0];

    cartStore.addOrRemoveProduct(itemToRemove);

    expect(cartStore.cartItems.length).toBe(1);
    expect(cartStore.cartItems[0]).toEqual(defaultList[1]);
  });

  it("should return the cart items for list", () => {
    const cartItemsForList = cartStore.cartItemsForList;

    expect(cartItemsForList).toEqual(cartStore.cartItems);
  });

  it("should return the total number of cart items", () => {
    const total = cartStore.total;

    expect(total).toBe(cartStore.cartItems.length);
  });

  it("should serialize to a snapshot", () => {
    const snapshot = getSnapshot<CartStoreSnapshotOut>(cartStore);

    expect(snapshot).toEqual({
      cartItems: defaultList
    });
  });

  it("should apply a snapshot", () => {
    const snapshot: CartStoreSnapshotIn = {
      cartItems: [defaultList[0]]
    };

    applySnapshot(cartStore, snapshot);

    expect(cartStore.cartItems.length).toBe(1);
    expect(cartStore.cartItems[0]).toEqual(defaultList[0]);
  });
});
