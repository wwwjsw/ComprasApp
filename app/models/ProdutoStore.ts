import { Instance, SnapshotIn, SnapshotOut, types, getRoot } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { ProdutoModel } from "./Produto"
import { CartStoreModel } from "./CartStore"
import { api } from "../services/api"
import { RootStore, RootStoreModel } from "./RootStore"

export const ProdutoStoreModel = types
  .model("ProdutoStore")
  .props({
    produtos: types.array(ProdutoModel),
    loading: types.optional(types.boolean, true),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchProducts() {
      store.setProp('loading', true)

      const response = await api.getProducts()
        .finally(() => store.setProp('loading', false))

      if (response.kind === "ok") {
        store.setProp("produtos", response.produtos)
      } else {
        console.error(`Error fetching produtos: ${JSON.stringify(response)}`, [])
      }
    }
  }))
  .views((store) => ({
    get produtosForList() {
      const { cartStore } = getRoot(store) as Instance<typeof RootStoreModel>
      return store.produtos.map((produto) => {
        const isItemInCart = cartStore.cartItems && cartStore.cartItems.some((item) => item.id === produto.id);
        
        return {
          ...produto,
          inCart: isItemInCart || false,
        };
      });
    },
    get isLoading() {
      return store.loading
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ProdutoStore extends Instance<typeof ProdutoStoreModel> {}
export interface ProdutoStoreSnapshotOut extends SnapshotOut<typeof ProdutoStoreModel> {}
export interface ProdutoStoreSnapshotIn extends SnapshotIn<typeof ProdutoStoreModel> {}
export const createProdutoStoreDefaultModel = () => types.optional(ProdutoStoreModel, {})
