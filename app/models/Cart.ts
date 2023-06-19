import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const CartModel = types
  .model("Cart")
  .props({
    id: types.number,
    nome: types.string,
    regiao: types.string,
    avaliacao: types.number,
    imagem: types.string,
    descricao: types.string,
    inCart: types.optional(types.boolean, true),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Cart extends Instance<typeof CartModel> {}
export interface CartSnapshotOut extends SnapshotOut<typeof CartModel> {}
export interface CartSnapshotIn extends SnapshotIn<typeof CartModel> {}
export const createCartDefaultModel = () => types.optional(CartModel, {})
