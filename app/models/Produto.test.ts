import { ProdutoModel } from "./Produto"

test("can be created", () => {
  const instance = ProdutoModel.create({})

  expect(instance).toBeTruthy()
})
