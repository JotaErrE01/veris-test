import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParams } from '../navigator/StackNavigator';
import { AppBar } from '../components';
import { Badge } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParams, 'ProductDetailScreen'>;

export const ProductDetailScreen = ({ route, navigation }: Props) => {
  const { product } = route.params;

  return (
    <>
      <AppBar
        title={product.sku}
        onBackAction={() => navigation.pop()}
      />

      <View style={styles.productDetailContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: product.images[0] }}
            width={250}
            height={250}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginBottom: 10 }}>
            <Badge style={[styles.brand, { backgroundColor: '#eab308' }]}>
              {product.rating}
            </Badge>

            <Badge style={styles.brand}>
              {product.brand}
            </Badge>
          </View>
        </View>

        <Text
          style={styles.productTitle}
          numberOfLines={2}
        >{product.title}</Text>

        <Text
          style={styles.productDesc}
        >{product.description}</Text>

        <Text
          style={styles.price}
        >$ {product.price}</Text>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  productDetailContainer: {
    padding: 10,
    flex: 1
  },
  imgContainer: {
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
  },
  brand: {
    fontSize: 12,
    backgroundColor: 'indigo',
    paddingHorizontal: 8
  },
  productTitle: {
    marginTop: 10,
    fontSize: 18,
    color: 'indigo',
    fontWeight: '500',
  },
  productDesc: {
    marginTop: 10,
    fontSize: 14,
  },
  price: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 'auto',
    marginRight: 20
  }
});
