import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ProdutoModel = types
  .model("Produto")
  .props({
    id: types.number,
    nome: types.string,
    regiao: types.string,
    avaliacao: types.number,
    imagem: types.string,
    descricao: types.string,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Produto extends Instance<typeof ProdutoModel> {}
export interface ProdutoSnapshotOut extends SnapshotOut<typeof ProdutoModel> {}
export interface ProdutoSnapshotIn extends SnapshotIn<typeof ProdutoModel> {}
export const createProdutoDefaultModel = () => types.optional(ProdutoModel, {})
