
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'AboutQualitecButton': typeof import("../../app/components/AboutQualitecButton.vue")['default']
  'BackToProductsButton': typeof import("../../app/components/BackToProductsButton.vue")['default']
  'CartIconButton': typeof import("../../app/components/CartIconButton.vue")['default']
  'CartModal': typeof import("../../app/components/CartModal.vue")['default']
  'CatalogFilterSidebar': typeof import("../../app/components/CatalogFilterSidebar.vue")['default']
  'CompareSidebar': typeof import("../../app/components/CompareSidebar.vue")['default']
  'FallingStarsBg': typeof import("../../app/components/FallingStarsBg.vue")['default']
  'FavoriteIconButton': typeof import("../../app/components/FavoriteIconButton.vue")['default']
  'FavoritesModal': typeof import("../../app/components/FavoritesModal.vue")['default']
  'GradientButton': typeof import("../../app/components/GradientButton.vue")['default']
  'HeaderButtons': typeof import("../../app/components/HeaderButtons.vue")['default']
  'LoginForm': typeof import("../../app/components/LoginForm.vue")['default']
  'LogoutButton': typeof import("../../app/components/LogoutButton.vue")['default']
  'MobileDeviceFrame': typeof import("../../app/components/MobileDeviceFrame.vue")['default']
  'OrderEmailModal': typeof import("../../app/components/OrderEmailModal.vue")['default']
  'ProductActionButtons': typeof import("../../app/components/ProductActionButtons.vue")['default']
  'ProductCardContent': typeof import("../../app/components/ProductCardContent.vue")['default']
  'ProductDetailsModal': typeof import("../../app/components/ProductDetailsModal.vue")['default']
  'ProductsGrid': typeof import("../../app/components/ProductsGrid.vue")['default']
  'ProfileIcon': typeof import("../../app/components/ProfileIcon.vue")['default']
  'ProfileIconButton': typeof import("../../app/components/ProfileIconButton.vue")['default']
  'ProfileModal': typeof import("../../app/components/ProfileModal.vue")['default']
  'RegisterForm': typeof import("../../app/components/RegisterForm.vue")['default']
  'RippleButton': typeof import("../../app/components/RippleButton.vue")['default']
  'ShaderToy': typeof import("../../app/components/ShaderToy.vue")['default']
  'ShimmerButton': typeof import("../../app/components/ShimmerButton.vue")['default']
  'SilkBg': typeof import("../../app/components/SilkBg.vue")['default']
  'TesteFiltros': typeof import("../../app/components/TesteFiltros.vue")['default']
  'UiAddButton': typeof import("../../app/components/UiAddButton.vue")['default']
  'UiClearCartButton': typeof import("../../app/components/UiClearCartButton.vue")['default']
  'UiClearCompareButton': typeof import("../../app/components/UiClearCompareButton.vue")['default']
  'UiComparePanel': typeof import("../../app/components/UiComparePanel.vue")['default']
  'UiDetailsButton': typeof import("../../app/components/UiDetailsButton.vue")['default']
  'UiDownloadButton': typeof import("../../app/components/UiDownloadButton.vue")['default']
  'UiNextButton': typeof import("../../app/components/UiNextButton.vue")['default']
  'UiPaginationButton': typeof import("../../app/components/UiPaginationButton.vue")['default']
  'UiPanel': typeof import("../../app/components/UiPanel.vue")['default']
  'UiPrevButton': typeof import("../../app/components/UiPrevButton.vue")['default']
  'UiRemoveButton': typeof import("../../app/components/UiRemoveButton.vue")['default']
  'UiRemoveTextButton': typeof import("../../app/components/UiRemoveTextButton.vue")['default']
  'UiSendOrderButton': typeof import("../../app/components/UiSendOrderButton.vue")['default']
  'UserRegisterForm': typeof import("../../app/components/UserRegisterForm.vue")['default']
  'WelcomeOverlay': typeof import("../../app/components/WelcomeOverlay.vue")['default']
  'UiButton': typeof import("../../app/components/ui/Button.vue")['default']
  'UiInput': typeof import("../../app/components/ui/Input.vue")['default']
  'UiMobileDeviceFrame': typeof import("../../app/components/ui/MobileDeviceFrame.vue")['default']
  'UiRainbowButton': typeof import("../../app/components/ui/RainbowButton.vue")['default']
  'UiSpan': typeof import("../../app/components/ui/Span.vue")['default']
  'UiTabButton': typeof import("../../app/components/ui/TabButton.vue")['default']
  'UiThemeToggle': typeof import("../../app/components/ui/ThemeToggle.vue")['default']
  'UiFormField': typeof import("../../app/components/ui/UiFormField.vue")['default']
  'UiModal': typeof import("../../app/components/ui/UiModal.vue")['default']
  'UiSendEmailModal': typeof import("../../app/components/ui/UiSendEmailModal.vue")['default']
  'UiTextarea': typeof import("../../app/components/ui/UiTextarea.vue")['default']
  'UnoIcon': typeof import("../../node_modules/@unocss/nuxt/runtime/UnoIcon.vue")['default']
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyAboutQualitecButton': LazyComponent<typeof import("../../app/components/AboutQualitecButton.vue")['default']>
  'LazyBackToProductsButton': LazyComponent<typeof import("../../app/components/BackToProductsButton.vue")['default']>
  'LazyCartIconButton': LazyComponent<typeof import("../../app/components/CartIconButton.vue")['default']>
  'LazyCartModal': LazyComponent<typeof import("../../app/components/CartModal.vue")['default']>
  'LazyCatalogFilterSidebar': LazyComponent<typeof import("../../app/components/CatalogFilterSidebar.vue")['default']>
  'LazyCompareSidebar': LazyComponent<typeof import("../../app/components/CompareSidebar.vue")['default']>
  'LazyFallingStarsBg': LazyComponent<typeof import("../../app/components/FallingStarsBg.vue")['default']>
  'LazyFavoriteIconButton': LazyComponent<typeof import("../../app/components/FavoriteIconButton.vue")['default']>
  'LazyFavoritesModal': LazyComponent<typeof import("../../app/components/FavoritesModal.vue")['default']>
  'LazyGradientButton': LazyComponent<typeof import("../../app/components/GradientButton.vue")['default']>
  'LazyHeaderButtons': LazyComponent<typeof import("../../app/components/HeaderButtons.vue")['default']>
  'LazyLoginForm': LazyComponent<typeof import("../../app/components/LoginForm.vue")['default']>
  'LazyLogoutButton': LazyComponent<typeof import("../../app/components/LogoutButton.vue")['default']>
  'LazyMobileDeviceFrame': LazyComponent<typeof import("../../app/components/MobileDeviceFrame.vue")['default']>
  'LazyOrderEmailModal': LazyComponent<typeof import("../../app/components/OrderEmailModal.vue")['default']>
  'LazyProductActionButtons': LazyComponent<typeof import("../../app/components/ProductActionButtons.vue")['default']>
  'LazyProductCardContent': LazyComponent<typeof import("../../app/components/ProductCardContent.vue")['default']>
  'LazyProductDetailsModal': LazyComponent<typeof import("../../app/components/ProductDetailsModal.vue")['default']>
  'LazyProductsGrid': LazyComponent<typeof import("../../app/components/ProductsGrid.vue")['default']>
  'LazyProfileIcon': LazyComponent<typeof import("../../app/components/ProfileIcon.vue")['default']>
  'LazyProfileIconButton': LazyComponent<typeof import("../../app/components/ProfileIconButton.vue")['default']>
  'LazyProfileModal': LazyComponent<typeof import("../../app/components/ProfileModal.vue")['default']>
  'LazyRegisterForm': LazyComponent<typeof import("../../app/components/RegisterForm.vue")['default']>
  'LazyRippleButton': LazyComponent<typeof import("../../app/components/RippleButton.vue")['default']>
  'LazyShaderToy': LazyComponent<typeof import("../../app/components/ShaderToy.vue")['default']>
  'LazyShimmerButton': LazyComponent<typeof import("../../app/components/ShimmerButton.vue")['default']>
  'LazySilkBg': LazyComponent<typeof import("../../app/components/SilkBg.vue")['default']>
  'LazyTesteFiltros': LazyComponent<typeof import("../../app/components/TesteFiltros.vue")['default']>
  'LazyUiAddButton': LazyComponent<typeof import("../../app/components/UiAddButton.vue")['default']>
  'LazyUiClearCartButton': LazyComponent<typeof import("../../app/components/UiClearCartButton.vue")['default']>
  'LazyUiClearCompareButton': LazyComponent<typeof import("../../app/components/UiClearCompareButton.vue")['default']>
  'LazyUiComparePanel': LazyComponent<typeof import("../../app/components/UiComparePanel.vue")['default']>
  'LazyUiDetailsButton': LazyComponent<typeof import("../../app/components/UiDetailsButton.vue")['default']>
  'LazyUiDownloadButton': LazyComponent<typeof import("../../app/components/UiDownloadButton.vue")['default']>
  'LazyUiNextButton': LazyComponent<typeof import("../../app/components/UiNextButton.vue")['default']>
  'LazyUiPaginationButton': LazyComponent<typeof import("../../app/components/UiPaginationButton.vue")['default']>
  'LazyUiPanel': LazyComponent<typeof import("../../app/components/UiPanel.vue")['default']>
  'LazyUiPrevButton': LazyComponent<typeof import("../../app/components/UiPrevButton.vue")['default']>
  'LazyUiRemoveButton': LazyComponent<typeof import("../../app/components/UiRemoveButton.vue")['default']>
  'LazyUiRemoveTextButton': LazyComponent<typeof import("../../app/components/UiRemoveTextButton.vue")['default']>
  'LazyUiSendOrderButton': LazyComponent<typeof import("../../app/components/UiSendOrderButton.vue")['default']>
  'LazyUserRegisterForm': LazyComponent<typeof import("../../app/components/UserRegisterForm.vue")['default']>
  'LazyWelcomeOverlay': LazyComponent<typeof import("../../app/components/WelcomeOverlay.vue")['default']>
  'LazyUiButton': LazyComponent<typeof import("../../app/components/ui/Button.vue")['default']>
  'LazyUiInput': LazyComponent<typeof import("../../app/components/ui/Input.vue")['default']>
  'LazyUiMobileDeviceFrame': LazyComponent<typeof import("../../app/components/ui/MobileDeviceFrame.vue")['default']>
  'LazyUiRainbowButton': LazyComponent<typeof import("../../app/components/ui/RainbowButton.vue")['default']>
  'LazyUiSpan': LazyComponent<typeof import("../../app/components/ui/Span.vue")['default']>
  'LazyUiTabButton': LazyComponent<typeof import("../../app/components/ui/TabButton.vue")['default']>
  'LazyUiThemeToggle': LazyComponent<typeof import("../../app/components/ui/ThemeToggle.vue")['default']>
  'LazyUiFormField': LazyComponent<typeof import("../../app/components/ui/UiFormField.vue")['default']>
  'LazyUiModal': LazyComponent<typeof import("../../app/components/ui/UiModal.vue")['default']>
  'LazyUiSendEmailModal': LazyComponent<typeof import("../../app/components/ui/UiSendEmailModal.vue")['default']>
  'LazyUiTextarea': LazyComponent<typeof import("../../app/components/ui/UiTextarea.vue")['default']>
  'LazyUnoIcon': LazyComponent<typeof import("../../node_modules/@unocss/nuxt/runtime/UnoIcon.vue")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
