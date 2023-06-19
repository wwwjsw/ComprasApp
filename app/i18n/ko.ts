import { Translations } from "./en"

const ko: Translations = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  shopping: {
    title: 'Shopping',
    addProduct: 'Add',
    removeProduct: 'Remove product'
  },
  cart: {
    title: 'Cart',
    headerIndicator: '{{total}} Products(s) in Car'
  },
  errorScreen: {
    title: "Erro",
    friendlySubtitle: 'Consider contact with us if you get stuck in some error',
    reset: "Reset App",
  },
  emptyStateComponent: {
    generic: { 
      heading: 'Add products in home page =D',
      content: "For now you don't have products here!",
      button: 'Back Home'
    }
  }
}

export default ko
