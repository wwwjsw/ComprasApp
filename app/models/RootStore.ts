import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { ProdutoStoreModel } from "./ProdutoStore"
import { CartStoreModel } from "./CartStore"
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    produtoStore: types.optional(ProdutoStoreModel, {}),
    cartStore: types.optional(CartStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
