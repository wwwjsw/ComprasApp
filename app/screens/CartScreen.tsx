import React, { FC, useEffect, useLayoutEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, ImageStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Card, EmptyState, Header, Icon, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Cart, Produto, useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CartScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Cart">> {}

export const CartScreen: FC<CartScreenProps> = observer(function CartScreen(props) {
  const { navigation } = props
  const { produtoStore, cartStore } = useStores()

  useEffect(() => {
  }, [produtoStore, cartStore])
  
  const handlePressBackButton = () => navigation.goBack()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header titleTx='cart.title' leftIcon="caretLeft" onLeftPress={handlePressBackButton} />,
    })
  }, [])

  return (
    <Screen
      preset="fixed"
      style={$container}
    >
      <View style={$infoContainer}>
        <Text tx='cart.headerIndicator' txOptions={{ total: cartStore.total }} text={cartStore.total} />
        <Icon icon='cart' />
      </View>
      <FlatList<Cart>
        data={cartStore.cartItems}
        numColumns={1}
        ListEmptyComponent={
          <EmptyState
            preset="generic"
            ImageProps={{ resizeMode: "contain" }}
            buttonOnPress={handlePressBackButton}
          />
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

const $infoContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
  paddingHorizontal: spacing.sm,
  flexDirection: "row",
  alignSelf: "center",
  marginBottom: spacing.sm,
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