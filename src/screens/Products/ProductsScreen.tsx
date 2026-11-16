// Components
import { RetryError } from './components/RetryError/RetryError';
import { ProductListSkeleton } from './components/ProductListSkeleton/ProductListSkeleton';
import { ProductsInitialSkeleton } from './components/ProductsInitialSkeleton/ProductsInitialSkeleton';
import { ProductCard } from '../../components/ProductCard/ProductCard';

// Libraries
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

// Presenter
import { ProductsPresenter } from './ProductsPresenter';

// Styles
import { ProductStyles } from './ProductsStyle';
import { colors } from '../../shared/theme/colors';

export const Products = () => {
  const {
    // Variables
    error,
    loading,
    filterProduct,
    activeCategory,
    optionsProducts,
    isInitialLoading,
    optionsCategories,
    categoriesError,

    // Actions
    retry,
    retryCategories,
    loadMore,
    setFilterProduct,
    getFilterCategory,
  } = ProductsPresenter();

  return (
    <SafeAreaView style={ProductStyles.safe} edges={['top']}>
      {isInitialLoading ? (
        <ProductsInitialSkeleton />
      ) : (
        <>
          <View style={ProductStyles.searchBox}>
            <Ionicons size={22} name="search" color={colors.mutedLight} />
            <TextInput
              value={filterProduct}
              placeholder="Buscar productos..."
              style={ProductStyles.searchInput}
              placeholderTextColor={colors.mutedLight}
              returnKeyType="search"
              onChangeText={setFilterProduct}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <View>
            <ScrollView
              horizontal
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={ProductStyles.chips}
            >
              {optionsCategories.map(category => (
                <Pressable
                  key={category.slug}
                  onPress={() => {
                    Keyboard.dismiss();
                    getFilterCategory(category);
                  }}
                  style={[
                    ProductStyles.chip,
                    category?.slug === activeCategory?.slug &&
                      ProductStyles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      ProductStyles.chipText,
                      category?.slug === activeCategory?.slug &&
                        ProductStyles.chipTextActive,
                    ]}
                  >
                    {category?.name || ''}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          {categoriesError && (
            <RetryError message={categoriesError} onRetry={retryCategories} />
          )}
          <FlatList
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            data={optionsProducts.products}
            keyboardShouldPersistTaps="handled"
            keyExtractor={item => String(item.id)}
            contentContainerStyle={ProductStyles.listContent}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListFooterComponent={
              loading && optionsProducts.products.length > 0 ? (
                <ActivityIndicator
                  color={colors.primary}
                  style={ProductStyles.indicator}
                />
              ) : error && optionsProducts.products.length > 0 ? (
                <RetryError message={error} onRetry={retry} />
              ) : undefined
            }
            ListEmptyComponent={
              loading ? (
                <ProductListSkeleton />
              ) : error ? (
                <RetryError message={error} onRetry={retry} />
              ) : (
                <View style={ProductStyles.empty}>
                  <View style={ProductStyles.emptyWrap}>
                    <Text style={ProductStyles.emptyTitle}>
                      Aún no contamos con este producto
                    </Text>
                    <Text style={ProductStyles.emptyDescription}>
                      No encontramos productos que coincidan con tu búsqueda.
                      Revisa lo que escribiste e inténtalo de nuevo.
                    </Text>
                  </View>
                </View>
              )
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};
