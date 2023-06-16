import { Instance, SnapshotIn, SnapshotOut, types, getSnapshot } from "mobx-state-tree"

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
        const indexOfObject = self.cartItems.findIndex((cartItem) => {
          return cartItem.id === item.id;
        });
  
        self.cartItems.splice(indexOfObject, 1);
      } else {
        const itemSnapshot = getSnapshot(item);
        const copiedItem = ProdutoModel.create(itemSnapshot);
  
        self.cartItems.push({ quantity: 1, ...copiedItem });
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
