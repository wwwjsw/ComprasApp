import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useLayoutEffect } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, Dimensions, ActivityIndicator } from "react-native"
import {
  Header,
  Text,
  Screen,
  Card,
  AutoImage,
  Button,
  Icon,
  EmptyState
} from "../components"
import { Produto, useStores } from "../models"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { AppStackScreenProps } from "app/navigators"
import { FlatList } from "react-native-gesture-handler"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface LojaScreenProps extends AppStackScreenProps<"Loja"> {}

export const LojaScreen: FC<LojaScreenProps> = observer(function LojaScreen(props
) {
  const { navigation } = props
  const { produtoStore, cartStore } = useStores()

  useEffect(() => {
    produtoStore.fetchProducts()
  }, [])
  
  const handlePressCart = () => navigation.navigate("Cart")
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header leftTx="shopping.title" rightIcon="cart" onRightPress={handlePressCart} />
    })
  }, [])

  return (
    <Screen
      preset="fixed"
      style={$container}
    >
      <FlatList<Produto>
        data={produtoStore.produtosForList}
        numColumns={2}
        ListEmptyComponent={
          produtoStore.isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        renderItem={({ item }) => (
          <Card
            key={item.id}
            style={$cardContainer}
            heading={item.nome}
            ContentComponent={
              <>
                <Text
                  text={item.descricao}
                  size="sm"
                />
                <Text
                  text={item.regiao}
                  size="sm"
                  weight="light"
                />
                <AutoImage
                  source={{ uri: item.imagem }}
                  maxWidth={120}
                  style={$imageAuto}
                />
              </>
            }
            FooterComponent={
              <Button
                preset={item.inCart ? 'default' : 'filled'}
                style={$addProductButton}
                tx={item.inCart ? "shopping.removeProduct" : "shopping.addProduct"}
                RightAccessory={(props) => <Icon {...props} icon={item.inCart ? "x" : "check"} />}
                onPress={() => cartStore.addOrRemoveProduct(item)}
              />
            }
          />
        )}
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}


const $cardContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
  paddingHorizontal: spacing.sm,
  marginBottom: spacing.sm,
  flex: 1,
}

const $imageAuto: ImageStyle = {
  width: 120,
  height: 120,
  borderRadius: 60,
  alignSelf: "center",
}

const $addProductButton: ViewStyle = {
  paddingHorizontal: spacing.sm,
  marginVertical: spacing.md,
  flex: 1,
  alignSelf: "center",
}