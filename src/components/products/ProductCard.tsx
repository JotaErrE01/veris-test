import { TouchableOpacity } from 'react-native';
import { IProduct } from '../../interfaces'
import { Avatar, Card, Text } from 'react-native-paper';

interface Props {
  product: IProduct;
  onTouchCard: () => void;
}

export const ProductCard = ({ product, onTouchCard }: Props) => {
  return (
    <TouchableOpacity 
      style={{ flexBasis: '45%' }} 
      activeOpacity={0.7}
      onPress={onTouchCard}
    >
      <Card>
        <Card.Cover source={{ uri: (product.images[0] || '') }} style={{ borderEndEndRadius: 0, borderEndStartRadius: 0 }} />
        <Card.Content>
          <Text variant="titleMedium" style={{ color: 'indigo', marginTop: 4 }}
            numberOfLines={1}
          >{product.title}</Text>
          <Text variant="bodySmall" numberOfLines={2}>{product.description}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}


