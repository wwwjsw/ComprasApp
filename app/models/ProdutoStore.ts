import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { ProdutoModel } from "./Produto"
import { api } from "../services/api"

export const ProdutoStoreModel = types
  .model("ProdutoStore")
  .props({
    produtos: types.array(ProdutoModel),
    loading: types.optional(types.boolean, true)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchProducts() {
      store.setProp('loading', true)

      const response = await api.getProducts()
        .then(() => store.setProp('loading', false))
        .then(() => response)

      if (response.kind === "ok") {
        store.setProp("produtos", response.produtos)
      } else {
        console.error(`Error fetching produtos: ${JSON.stringify(response)}`, [])
      }
    }
  }))
  .views((store) => ({
    get produtosForList() {
      return store.produtos
    },
    get isLoading() {
      return store.loading
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CategoryStore extends Instance<typeof ProdutoStoreModel> {}
export interface CategoryStoreSnapshotOut extends SnapshotOut<typeof ProdutoStoreModel> {}
export interface CategoryStoreSnapshotIn extends SnapshotIn<typeof ProdutoStoreModel> {}
export const createCategoryStoreDefaultModel = () => types.optional(ProdutoStoreModel, {})
