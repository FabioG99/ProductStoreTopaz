// Components
import { ProductCard } from '../../components/ProductCard/ProductCard';

// Librarie
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { colors } from '../../shared/theme/colors';
import { FavoriteDetailStyles } from './FavoriteProductStyle';

// Presenter
import { FavoriteProductsPresenter } from './FavoriteProductsPresenter';

export const FavoriteProducts = () => {
  const {
    // Variables
    productStore,

    // Actions
    handlePressProducst,
  } = FavoriteProductsPresenter();

  return (
    <SafeAreaView style={FavoriteDetailStyles.safe} edges={['top']}>
      <View style={FavoriteDetailStyles.header}>
        <View style={FavoriteDetailStyles.circle}>
          <Text style={FavoriteDetailStyles.circleIcon}>♥</Text>
        </View>
        <View>
          <Text style={FavoriteDetailStyles.headerTitle}>Mis Favoritos</Text>
          <Text style={FavoriteDetailStyles.headerDescription}>
            {productStore?.length || 0} Guardados
          </Text>
        </View>
      </View>
      <FlatList
        bounces={false}
        data={productStore}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={FavoriteDetailStyles.listContent}
        ListEmptyComponent={
          <View style={FavoriteDetailStyles.empty}>
            <View style={FavoriteDetailStyles.emptyWrap}>
              <Text style={FavoriteDetailStyles.emptyTitle}>
                Aún no tienes favoritos
              </Text>
              <Text style={FavoriteDetailStyles.emptyDescription}>
                Guarda los artículos que más te gusten tocando el ícono de
                corazón <Text style={{ color: colors.danger }}>♥ </Text>
                en el catálogo o en el detalle. Se almacenarán al instante en
                esta sección.
              </Text>
              <Pressable
                onPress={() => handlePressProducst()}
                style={FavoriteDetailStyles.btnExplore}
              >
                <Text style={FavoriteDetailStyles.btnExploreText}>
                  Explorar Productos
                </Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};
