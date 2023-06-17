import { Instance, SnapshotIn, SnapshotOut, types, detach } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { ProdutoModel, Produto } from "./Produto"

import { CartModel, Cart } from "./Cart"
import { api } from "../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const CartStoreModel = types
  .model("CartStore")
  .props({
    cartItems: types.array(CartModel)
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    addOrRemoveProduct(item: Produto) {
      const existingItem = self.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        const indexOfObject = self.cartItems.findIndex((cartItem) => cartItem.id === item.id);
        detach(self.cartItems[indexOfObject]);
        self.cartItems.splice(indexOfObject, 1);
      } else {
        const newItem = CartModel.create({ ...item, inCart: true, quantity: 1 });
        self.cartItems.push(newItem);
      }
    },
  }))
  .views((store) => ({
    get cartItemsForList() {
      return store.cartItems
    },
    get total() {
      return store.cartItems.length;
    }
  }))


export interface CartStore extends Instance<typeof CartStoreModel> {}
export interface CartStoreSnapshotOut extends SnapshotOut<typeof CartStoreModel> {}
export interface CartStoreSnapshotIn extends SnapshotIn<typeof CartStoreModel> {}
export const createCartStoreDefaultModel = () => types.optional(CartStoreModel, {})
