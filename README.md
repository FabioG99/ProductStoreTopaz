# Product Store Topaz

Aplicación móvil creada con [**React Native**](https://reactnative.dev) y [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Inicio rápido

Antes de comenzar, instala las herramientas necesarias siguiendo la guía de [configuración del entorno de React Native](https://reactnative.dev/docs/set-up-your-environment). Este proyecto requiere Node.js 20 o posterior. Para compilar iOS también necesitas macOS, Xcode y CocoaPods.

### 1. Instalar dependencias del proyecto

Desde la raíz del repositorio, instala las dependencias de JavaScript:

```sh
yarn install
```

Si todavía no tienes un archivo `.env`, créalo con la plantilla:

```sh
cp .env.example .env
```

No ejecutes este segundo comando si ya tienes un `.env`, para evitar sobrescribirlo. La plantilla configura `API_BASE_URL` para DummyJSON; si necesitas otra URL, edita `.env`.

### 2. Preparar iOS (solo para ejecutar en iOS)

Desde la raíz del proyecto, instala las dependencias de Ruby definidas por el repositorio:

```sh
bundle install
```

Después instala los Pods de iOS:

```sh
cd ios
bundle exec pod install
cd ..
```

Ejecuta `bundle install` la primera vez que configures el proyecto y cuando cambie el `Gemfile`. Ejecuta `bundle exec pod install` la primera vez y después de cambios en las dependencias nativas de iOS. Para más información, consulta la [guía de CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

Si instalas o actualizas `@react-native-vector-icons/ionicons`, actualiza también la lista de fuentes de iOS en `Info.plist`:

```sh
npx rnvi-update-plist package.json ios/productStoreTopaz/Info.plist
```

### 3. Compilar y ejecutar en el dispositivo o emulador

Desde la raíz del proyecto, ejecuta **una** de estas opciones según la plataforma. El comando inicia Metro automáticamente si aún no está en ejecución; no hace falta ejecutar `yarn start` en otra terminal.

**Android:**

```sh
yarn android
```

**iOS:** (después de completar el paso 2)

```sh
yarn ios
```

La aplicación se abrirá en el emulador o simulador disponible, o en un dispositivo conectado. También puedes compilarla desde Android Studio o Xcode.

### 4. Modificar la aplicación

Abre `App.tsx` en tu editor y realiza un cambio. Al guardar, la aplicación se actualizará automáticamente mediante [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

Para recargar la aplicación por completo, por ejemplo, para restablecer su estado:

- **Android:** pulsa <kbd>R</kbd> dos veces o selecciona **Reload** en el menú de desarrollo. En macOS, abre ese menú con <kbd>Cmd ⌘</kbd> + <kbd>M</kbd>; en Windows/Linux, con <kbd>Ctrl</kbd> + <kbd>M</kbd>.
- **iOS:** pulsa <kbd>R</kbd> en el simulador de iOS.

Para integrar este código en una aplicación existente, consulta la [guía de integración](https://reactnative.dev/docs/integration-with-existing-apps). Para aprender más sobre React Native, visita la [documentación oficial](https://reactnative.dev/docs/getting-started).

## Decisiones técnicas

### Arquitectura

La app separa responsabilidades por capas: `api/` contiene el cliente HTTP, los servicios y los contratos; `screens/` compone las pantallas y sus presentadores; `components/` contiene la interfaz reutilizable; `hooks/` contiene lógica reutilizable como el debounce; `store/` mantiene los favoritos globales; y `shared/` contiene utilidades y configuración común.

Los componentes de pantalla no llaman directamente a `fetch`: delegan la coordinación del estado y las solicitudes a sus presentadores, que usan los servicios de `api/`. Así, la interfaz se enfoca en mostrar el estado y gestionar interacciones. No se agregó una capa `domain/` porque sería innecesaria para el alcance actual.

### Estado global de favoritos

Para manejar el estado global de favoritos se eligió `zustand` por su simplicidad, su baja carga de configuración y porque evita pasar propiedades de forma encadenada entre las pantallas de Productos, Detalle y Favoritos. El almacén centraliza la lista y expone acciones para agregar o quitar productos desde cualquier pantalla.

Se usa `immer` como middleware para que las actualizaciones inmutables de la colección sean legibles, y `devtools` para facilitar la inspección durante el desarrollo. Esta solución se ajusta al tamaño y las necesidades actuales de la app: mantiene el estado reactivo con poca configuración y evita incorporar una solución más compleja, como Redux Toolkit.

### Persistencia local

Los favoritos se guardan localmente con `@react-native-async-storage/async-storage` (`2.2.0`), integrado al almacén mediante el middleware `persist` de Zustand. Se eligió AsyncStorage porque se almacena una lista pequeña de productos serializable como JSON. No se necesita acceso síncrono ni una base de datos relacional, así que MMKV agregaría complejidad innecesaria para este alcance. Los favoritos no se envían a ningún servidor ni servicio en la nube.

La clave persistida es `productStore-favorites`. `partialize` limita el contenido guardado a `products`, y `createJSONStorage` serializa y restaura ese estado al iniciar. La restauración es asíncrona, por lo que la interfaz no debe asumir que terminó en el primer render. Para verificar la persistencia manualmente, agrega un favorito, cierra y vuelve a abrir la app y confirma que siga en Favoritos; luego elimínalo y verifica que no reaparezca.

### Comunicación con la API

La comunicación con la API usa `fetch` y está centralizada en `src/api/http.ts` y `src/api/services.ts`; las pantallas no hacen solicitudes directamente. La URL base se lee desde `API_BASE_URL` mediante `react-native-config` y se define en `src/shared/utils/constants.ts` (`BASE_URL`). Así se puede cambiar el servidor por entorno sin modificar cada servicio. `buildUrl()` agrega los parámetros de consulta.

Para configurar el entorno local, copia `.env.example` a `.env`. Para usar otro servidor, cambia `API_BASE_URL` en el archivo de entorno correspondiente. Los archivos `.env` locales están excluidos de Git; `.env.example` documenta las variables necesarias. Estas variables se incluyen en la aplicación, por lo que no deben contener secretos.

`react-native-config` se instala con Yarn y se enlaza automáticamente. En Android, el proyecto aplica la configuración de la librería en `android/app/build.gradle`:

```gradle
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
```

Los pasos para instalar los Pods de iOS y ejecutar la app están descritos en **Inicio rápido**. Para seleccionar otro archivo de entorno, por ejemplo `.env.production`, antepone `ENVFILE=.env.production` al comando de ejecución de la plataforma indicado en el paso 3.

El cliente HTTP centralizado aplica encabezados comunes y convierte las respuestas HTTP fallidas en `HttpError`. También informa explícitamente de problemas de conexión, respuestas JSON inválidas y tiempos de espera agotados (15 segundos). Las cancelaciones por desmontaje o cambio de filtro se propagan sin mostrarse como errores al usuario.

Las pantallas y sus presentadores crean un `AbortController` para cada solicitud y cancelan las solicitudes pendientes al desmontarse. La lista, la carga de categorías y el detalle muestran errores recuperables y permiten reintentar. Un límite global de errores en `src/App.tsx` ofrece una pantalla de recuperación ante errores de renderizado no controlados. No se usa Axios porque `fetch`, integrado en React Native, cubre las necesidades actuales; el cliente centralizado añade configuración, cancelación y manejo común de errores sin sumar otra dependencia.

### Rendimiento y caché de imágenes

Las imágenes remotas de las tarjetas y del carrusel usan `@d11/react-native-fast-image` (`8.13.0`) en lugar de `Image`. Se configura `cacheControl.immutable` porque las direcciones de las imágenes de productos son estables; la URI sirve como identificador de caché y evita descargas repetidas. En el carrusel se usa `contain` para mostrar la imagen completa.

Las listas usan `FlatList` y claves basadas en el ID del producto. No se añadieron `React.memo`, `useCallback` ni `useMemo` de forma generalizada: los cálculos actuales por tarjeta son pequeños, y las listas se renderizan de manera virtualizada y solicitan páginas de diez productos. No se ha medido un cuello de botella que justifique esas optimizaciones; antes de incorporarlas, conviene medir el rendimiento y optimizar solo los componentes o cálculos que resulten costosos. Así se evita añadir complejidad sin una mejora comprobada.

### Navegación

La navegación usa una pila raíz con las pestañas Productos y Favoritos, además de la pantalla de detalle. Productos conserva una pila interna para su lista. El detalle se presenta sobre las pestañas; al abrirlo desde Productos o Favoritos, la acción Atrás regresa a la pestaña que estaba activa. Los tipos `RootTabParamList` y `ProductsStackParamList` describen las rutas anidadas; `RootStackParamList` tipa el detalle y su parámetro `ProductId`.

# Solución de problemas

Si tienes problemas al seguir estos pasos, consulta la [guía de solución de problemas](https://reactnative.dev/docs/troubleshooting).

# Más información

Para aprender más sobre React Native, consulta estos recursos:

- [Sitio oficial de React Native](https://reactnative.dev).
- [Configuración del entorno](https://reactnative.dev/docs/environment-setup).
- [Conceptos básicos de React Native](https://reactnative.dev/docs/getting-started).
- [Blog oficial de React Native](https://reactnative.dev/blog).
- [Repositorio de React Native en GitHub](https://github.com/facebook/react-native).
