This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

Después de instalar o actualizar `@react-native-vector-icons/ionicons`, ejecuta este comando desde la raíz del proyecto para agregar los archivos de fuentes a `UIAppFonts` en el `Info.plist` de la aplicación iOS:

```sh
npx rnvi-update-plist package.json ios/productStoreTopaz/Info.plist
```

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

## Decisiones técnicas

### Estado global de favoritos

Para manejar el estado global de favoritos se eligió `zustand` por su simplicidad, bajo costo de configuración y porque evita el prop drilling entre pantalla de productos, detalle y favoritos. El store centraliza la lista de productos favoritos y expone acciones para agregarlos y quitarlos desde cualquier punto de la app.

La implementación usa `immer` como middleware de Zustand para mantener los updates del estado más legibles y seguros desde el punto de vista de la inmutabilidad. Esto permite escribir cambios en el array de favoritos con una sintaxis más directa y predecible, sin mutar el estado original de forma manual.

Ejemplo conceptual del patrón usado:

```ts
import { create } from 'zustand';
import { devtools, immer } from 'zustand/middleware';

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductState = {
  products: Product[];
};

export const useProductStore = create<ProductState>()(
  devtools(
    immer((set) => ({
      products: [],
      addProductsFavorites: (product: Product) =>
        set((state) => {
          state.products.push(product);
        }),
      removeProductsFavorites: (id: number) =>
        set((state) => {
          state.products = state.products.filter((p) => p.id !== id);
        }),
    })),
  ),
);
```

Esta solución es adecuada para una app de este tamaño porque centraliza el estado y mantiene la UI reactiva sin depender de un store más pesado o de una configuración compleja como Redux Toolkit.

### Imágenes y rendimiento de listas

Las imágenes remotas de las tarjetas de producto y del carrusel de detalle usan `@d11/react-native-fast-image` (`8.13.0`) en lugar de `Image`. Se configura `cacheControl.immutable` porque las URLs públicas de imágenes de producto son estables; la caché usa la URI como identificador y evita volver a descargar recursos ya almacenados. En el carrusel se conserva `contain` para mostrar las imágenes completas.

### Networking

La capa de red usa `fetch` y se concentra en `src/api/http.ts` y `src/api/services.ts`, evitando llamadas directas desde las pantallas. La URL base se lee desde `API_BASE_URL` mediante `react-native-config` y se centraliza en `src/shared/utils/constants.ts` (`BASE_URL`), para poder cambiar el host por entorno sin modificar los servicios individuales. `buildUrl()` agrega los parámetros de consulta.

Para configurar el entorno local, copia `.env.example` a `.env`. Para usar otro servidor, cambia `API_BASE_URL` en el archivo de entorno correspondiente. Los archivos `.env` locales están excluidos de Git; `.env.example` documenta las variables requeridas. Estas variables se empaquetan en la aplicación, así que no deben contener secretos.

`react-native-config` se instala con Yarn y se autolinkea. En iOS, instala los Pods y reconstruye la app:

```sh
cd ios && bundle exec pod install && cd ..
yarn ios
```

En Android, aplica el paso adicional de la librería en `android/app/build.gradle`:

```gradle
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

Después reconstruye la app:

```sh
yarn android
```

Para seleccionar otro archivo de entorno, por ejemplo `.env.production`, ejecuta `ENVFILE=.env.production yarn ios` o `ENVFILE=.env.production yarn android`.

El cliente HTTP centralizado aplica los headers comunes y convierte respuestas HTTP no exitosas en `HttpError`. También informa explícitamente de fallos de conexión, respuestas JSON inválidas y timeout (15 segundos). Las cancelaciones iniciadas por desmontaje o cambio de filtro se propagan sin mostrarse como errores al usuario.

Las pantallas/presenters crean un `AbortController` por ciclo de vida de solicitud y cancelan las solicitudes pendientes al desmontarse. La lista, la carga de categorías y el detalle muestran errores recuperables con una opción para reintentar. Un Error Boundary global en `src/App.tsx` ofrece una pantalla de recuperación ante errores de renderizado no controlados. No se usa un cliente adicional como Axios porque `fetch` nativo cubre las necesidades actuales y el wrapper centralizado aporta la configuración y el manejo de errores comunes.

### Persistencia local

Los favoritos se persisten localmente con `@react-native-async-storage/async-storage` (`2.2.0`) integrado al store global mediante el middleware `persist` de Zustand. Se eligió AsyncStorage porque la app solo necesita guardar una lista pequeña de productos en JSON; su API asíncrona y el autolinking de React Native cubren este caso sin añadir una solución de almacenamiento más compleja. No se envían favoritos a ningún backend o servicio cloud.

La clave persistida es `productStore-favorites`. La opción `partialize` limita el contenido guardado a `products` (la lista de favoritos), y `createJSONStorage` serializa e hidrata ese estado al iniciar la app. La hidratación es asíncrona: la interfaz no debe asumir que el store ya terminó de restaurarse en el primer render. Para verificar la persistencia manualmente, agrega un favorito, cierra y vuelve a abrir la app y confirma que sigue en Favoritos; después elimínalo y comprueba que no reaparece.

### Arquitectura

La solución adopta una organización por capas con separación de responsabilidades:

- `api/`: clientes HTTP y contratos de respuesta
- `store/`: estado global reactivo
- `screens/`: pantallas y composición visual
- `components/`: UI reutilizable
- `hooks/`: lógica reutilizable como debounce
- `shared/`: utilidades y constantes compartidas

Esto ayuda a mantener el flujo de la app más predecible y facilita la prueba unitaria sin mezclar lógica de negocio con render.

### Navegación

La navegación usa un stack raíz con el dashboard de tabs (Productos y Favoritos) y la pantalla de detalle. Productos conserva un stack interno para su lista. Detalle se presenta encima del dashboard, por lo que al abrirlo desde Productos o Favoritos, la acción Atrás regresa a la pestaña que estaba activa. Los tipos `RootTabParamList` y `ProductsStackParamList` describen las rutas anidadas; `RootStackParamList` tipa el detalle y su parámetro `ProductId`.

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
