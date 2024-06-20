import { useEffect, useRef } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { View } from "react-native";

interface Props {
  isLoadingMore: boolean
  isMoreData: boolean
  loadMoreData: () => void
  children: JSX.Element | JSX.Element[]
  loadingMoreComponent?: JSX.Element | null
  loadingColor?: string
  loadingSize?: number
  loadingMarginTop?: number
  loadingMarginBottom?: number
}

export const InfiniteScroll = ({
  isLoadingMore,
  isMoreData,
  loadMoreData,
  children,
  loadingMoreComponent = null,
  loadingColor = 'indigo',
  loadingSize = 30,
  loadingMarginTop = 15,
  loadingMarginBottom = 20,
}: Props) => {

  const scrollViewRef = useRef<ScrollView | null>(null);
  const contentOffsetYRef = useRef<number>(0);

  useEffect(() => {
    if (!!isLoadingMore) {
      scrollViewRef.current?.scrollTo({
        y: contentOffsetYRef.current + (loadingSize + loadingMarginTop + loadingMarginBottom - 5),
        animated: true
      })
    }
  }, [isLoadingMore]);

  return (
    <ScrollView
      ref={(props) => scrollViewRef.current = props}
      onScroll={({ nativeEvent }) => {
        const layoutHeight: number = nativeEvent.layoutMeasurement.height;
        const contentOffsetY: number = nativeEvent.contentOffset.y;

        const contentHeight: number = Number(nativeEvent.contentSize.height.toFixed(2));
        const contentHeightFinal: number = Number((contentOffsetY + layoutHeight).toFixed(2));

        if (contentHeightFinal - contentHeight >= 0 && !isLoadingMore && !!isMoreData) {
          contentOffsetYRef.current = contentOffsetY;
          loadMoreData();
        }
      }}
    >

      {children}

      {
        !!isLoadingMore
        && (
          !!loadingMoreComponent
            ? loadingMoreComponent
            : <View style={{ alignItems: 'center', marginTop: loadingMarginTop, marginBottom: loadingMarginBottom }}>
              <ActivityIndicator color={loadingColor} size={loadingSize} />
            </View>
        )
      }
    </ScrollView>
  )
}