import { View } from 'react-native'
import { AppBar } from '../components'
import { ActivityIndicator } from 'react-native-paper';
import { useProduct } from '../hooks/useProduct';
import { ProductCard } from '../components/products';
import { InfiniteScroll } from '../components/shared/InfiniteScroll';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParams } from '../navigator/StackNavigator';

type Props = NativeStackScreenProps<RootStackParams, 'ProductsScreen'>;

export const ProductsScreen = ({ navigation }: Props) => {
  const { isLoadingProducts, products, hasMore, onLoadMore } = useProduct();

  return (
    <>
      <AppBar title='Nuestros Productos' />

      {
        isLoadingProducts && !products.length ?
          <ActivityIndicator />
          :
          <InfiniteScroll
            isLoadingMore={isLoadingProducts && !!products.length}
            isMoreData={hasMore}
            loadMoreData={onLoadMore}
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'space-evenly', rowGap: 12 }}>
              {
                products.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onTouchCard={() => navigation.push('ProductDetailScreen', { product })}
                  />
                ))
              }
            </View>
          </InfiniteScroll>
      }
    </>
  )
}

