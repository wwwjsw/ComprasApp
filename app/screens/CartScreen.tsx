import React, { FC, useEffect, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Card, EmptyState, Header, Icon, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Cart, useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CartScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Cart">> {}

export const CartScreen: FC<CartScreenProps> = observer(function CartScreen(props) {
  const { navigation } = props
  const { produtoStore, cartStore } = useStores()

  useEffect(() => {
    produtoStore.fetchProducts()
  }, [produtoStore])

  useEffect(() => {
  }, [cartStore])
  
  const handlePressCart = () => navigation.navigate("Cart")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header titleTx='shopping.title' leftIcon="heart" rightIcon="cart" onRightPress={handlePressCart}/>,
    })
  }, [])
  return <></>
  //TODO : implementar o restante da lista do cart
  return (
    <Screen
      preset="fixed"
      style={$container}
    >
      <Text text={JSON.stringify(cartStore.total, null, 4)} size="sm" />
      <FlatList<Cart>
        data={cartStore.cartItems}
        numColumns={2}
        ListEmptyComponent={
          produtoStore.isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              //style={$emptyState}
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
                style={$addProductButton}
                tx="shopping.addProduct"
                RightAccessory={(props) => <Icon {...props} icon="check"/>}
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