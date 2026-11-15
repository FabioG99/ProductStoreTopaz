// Components
import { ProductCard } from '../../components/ProductCard/ProductCard';

// Libraries
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@react-native-vector-icons/ionicons';
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

// Presenter
import { ProductsPresenter } from './ProductsPresenter';

// Styles
import { ProductStyles } from './ProductsStyle';
import { colors } from '../../shared/theme/colors';

export const Products = () => {

  const {
    // Variables
    loading,
    filterProduct,
    activeCategory,
    optionsProducts,
    optionsCategories,

    // Actions
    loadMore,
    setFilterProduct,
    getFilterCategory,
  } = ProductsPresenter();

  return (
    <SafeAreaView style={ProductStyles.safe} edges={['top']}>
      <View style={ProductStyles.searchBox}>
        {/* <Ionicons
          size={22}
          name="home"
          color={colors.mutedLight}
        /> */}
        <TextInput
          value={filterProduct}
          placeholder="Buscar productos..."
          style={ProductStyles.searchInput}
          placeholderTextColor={colors.mutedLight}
          onChangeText={(value) => setFilterProduct(value)}
        />
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={ProductStyles.chips}>
          {optionsCategories.map((category) => (
            <Pressable
              key={category.slug}
              onPress={() => getFilterCategory(category)}
              style={[ProductStyles.chip, category?.slug === activeCategory?.slug && ProductStyles.chipActive]}
            >
              <Text style={[ProductStyles.chipText, category?.slug === activeCategory?.slug && ProductStyles.chipTextActive]}>
                {category?.name || ''}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        data={optionsProducts.products}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={ProductStyles.listContent}
        renderItem={({ item }) => <ProductCard item={item} />}
        ListFooterComponent={
          (loading)
            ? <ActivityIndicator color={colors.primary} style={ProductStyles.indicator} />
            : undefined
        }
        ListEmptyComponent={
          loading ? undefined : (
            <View style={ProductStyles.empty}>
              <View style={ProductStyles.emptyWrap}>
                <Text style={ProductStyles.emptyTitle}>
                  Aún no contamos con este producto
                </Text>
                <Text style={ProductStyles.emptyDescription}>
                  No encontramos productos que coincidan con tu búsqueda. Revisa lo que escribiste e inténtalo de nuevo.
                </Text>
              </View>
            </View>
          )
        }
      />
    </SafeAreaView>
  )
}