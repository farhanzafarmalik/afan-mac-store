"use client";

// ---------------------------------------------------------------------------
// context/ShopActionsContext.tsx — Phase 12B
// ---------------------------------------------------------------------------
// Global state for Saved items + Inquiry Bag (Cart).
// localStorage keys: "afan_saved" and "afan_cart" (never "afan_saved_items").
// No backend. No payment. No checkout.
// ---------------------------------------------------------------------------

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  getCartMode,
  getProductType,
  type CartItem,
  type ProductInput,
  type SavedItem,
} from "@/lib/shopUtils";
import type { Product } from "@/data/products";

// ---------------------------------------------------------------------------
// localStorage keys — IMPLEMENTATION_LOCK §1 §2
// ---------------------------------------------------------------------------

const SAVED_KEY = "afan_saved";
const CART_KEY = "afan_cart";
const MAX_QTY = 9;

// ---------------------------------------------------------------------------
// State + actions
// ---------------------------------------------------------------------------

interface ShopState {
  savedItems: SavedItem[];
  cartItems: CartItem[];
  activeDrawer: "saved" | "cart" | "details" | null;
  detailsProduct: Product | null;
  hydrated: boolean;
}

type ShopAction =
  | { type: "HYDRATE"; savedItems: SavedItem[]; cartItems: CartItem[] }
  | { type: "TOGGLE_SAVED"; product: ProductInput }
  | { type: "REMOVE_SAVED"; id: string }
  | { type: "CLEAR_SAVED" }
  | { type: "ADD_TO_CART"; product: ProductInput }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "MOVE_TO_CART"; id: string }
  | { type: "OPEN_SAVED_DRAWER" }
  | { type: "OPEN_CART_DRAWER" }
  | { type: "OPEN_DETAILS_DRAWER"; product: Product }
  | { type: "CLOSE_DRAWERS" };

const initialState: ShopState = {
  savedItems: [],
  cartItems: [],
  activeDrawer: null,
  detailsProduct: null,
  hydrated: false,
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    // ── Hydration ──
    case "HYDRATE":
      return {
        ...state,
        savedItems: action.savedItems,
        cartItems: action.cartItems,
        hydrated: true,
      };

    // ── Saved ──
    case "TOGGLE_SAVED": {
      const exists = state.savedItems.some((s) => s.id === action.product.id);
      if (exists) {
        return {
          ...state,
          savedItems: state.savedItems.filter((s) => s.id !== action.product.id),
        };
      }
      const newItem: SavedItem = {
        ...action.product,
        productType: getProductType(action.product.categorySlug),
        savedAt: Date.now(),
      };
      return { ...state, savedItems: [...state.savedItems, newItem] };
    }

    case "REMOVE_SAVED":
      return {
        ...state,
        savedItems: state.savedItems.filter((s) => s.id !== action.id),
      };

    case "CLEAR_SAVED":
      return { ...state, savedItems: [] };

    // ── Cart ──
    case "ADD_TO_CART": {
      const productType = getProductType(action.product.categorySlug);
      const existing = state.cartItems.find((c) => c.id === action.product.id);
      if (existing) {
        // Accessory: increase quantity (capped at MAX_QTY)
        if (productType === "accessory") {
          return {
            ...state,
            cartItems: state.cartItems.map((c) =>
              c.id === action.product.id
                ? { ...c, quantity: Math.min(c.quantity + 1, MAX_QTY) }
                : c
            ),
          };
        }
        // Device already in bag — no duplicate
        return state;
      }
      const newItem: CartItem = {
        ...action.product,
        productType,
        cartMode: getCartMode(action.product.categorySlug),
        quantity: 1,
        addedAt: Date.now(),
      };
      return { ...state, cartItems: [...state.cartItems, newItem] };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.id !== action.id),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((c) =>
          c.id === action.id
            ? {
                ...c,
                quantity: Math.min(Math.max(1, action.quantity), MAX_QTY),
              }
            : c
        ),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    // ── Move saved → cart ──
    case "MOVE_TO_CART": {
      const savedItem = state.savedItems.find((s) => s.id === action.id);
      if (!savedItem) return state;

      const newSaved = state.savedItems.filter((s) => s.id !== action.id);
      const existing = state.cartItems.find((c) => c.id === action.id);

      let newCart: CartItem[];
      if (existing) {
        // Accessory already in bag: bump quantity
        if (savedItem.productType === "accessory") {
          newCart = state.cartItems.map((c) =>
            c.id === action.id
              ? { ...c, quantity: Math.min(c.quantity + 1, MAX_QTY) }
              : c
          );
        } else {
          // Device already in bag — no duplicate; still remove from saved
          newCart = state.cartItems;
        }
      } else {
        const cartItem: CartItem = {
          id: savedItem.id,
          name: savedItem.name,
          categorySlug: savedItem.categorySlug,
          category: savedItem.category,
          productType: savedItem.productType,
          cartMode: getCartMode(savedItem.categorySlug),
          quantity: 1,
          addedAt: Date.now(),
        };
        newCart = [...state.cartItems, cartItem];
      }

      return {
        ...state,
        savedItems: newSaved,
        cartItems: newCart,
        activeDrawer: "cart",
      };
    }

    // ── Drawer control ──
    case "OPEN_SAVED_DRAWER":
      return { ...state, activeDrawer: "saved" };
    case "OPEN_CART_DRAWER":
      return { ...state, activeDrawer: "cart" };
    case "OPEN_DETAILS_DRAWER":
      return { ...state, activeDrawer: "details", detailsProduct: action.product };
    case "CLOSE_DRAWERS":
      return { ...state, activeDrawer: null, detailsProduct: null };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// localStorage helpers — guarded for SSR
// ---------------------------------------------------------------------------

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silent: private browsing or quota exceeded
  }
}

// ---------------------------------------------------------------------------
// Context type
// ---------------------------------------------------------------------------

interface ShopActionsContextValue {
  savedItems: SavedItem[];
  cartItems: CartItem[];
  activeDrawer: "saved" | "cart" | "details" | null;
  detailsProduct: Product | null;
  hydrated: boolean;
  savedCount: number;
  cartCount: number;
  isSaved: (id: string) => boolean;
  toggleSaved: (product: ProductInput) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
  addToCart: (product: ProductInput) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  moveSavedToCart: (id: string) => void;
  openSavedDrawer: () => void;
  openCartDrawer: () => void;
  openDetailsDrawer: (product: Product) => void;
  closeDrawers: () => void;
}

const ShopActionsContext = createContext<ShopActionsContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function ShopActionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate once after mount — never touches localStorage on the server
  useEffect(() => {
    const savedItems = readStorage<SavedItem[]>(SAVED_KEY, []);
    const cartItems = readStorage<CartItem[]>(CART_KEY, []);
    dispatch({ type: "HYDRATE", savedItems, cartItems });
  }, []);

  // Centralised body scroll lock — single source of truth for all drawers.
  // Prevents race conditions when transitioning between drawer types
  // (e.g. Details → Cart where per-drawer cleanups could clear each other).
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = state.activeDrawer !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.activeDrawer]);

  // Persist on change, but only after initial hydration
  useEffect(() => {
    if (!state.hydrated) return;
    writeStorage(SAVED_KEY, state.savedItems);
  }, [state.savedItems, state.hydrated]);

  useEffect(() => {
    if (!state.hydrated) return;
    writeStorage(CART_KEY, state.cartItems);
  }, [state.cartItems, state.hydrated]);

  // Stable action callbacks
  const toggleSaved = useCallback(
    (product: ProductInput) => dispatch({ type: "TOGGLE_SAVED", product }),
    []
  );
  const removeSaved = useCallback(
    (id: string) => dispatch({ type: "REMOVE_SAVED", id }),
    []
  );
  const clearSaved = useCallback(() => dispatch({ type: "CLEAR_SAVED" }), []);
  const addToCart = useCallback(
    (product: ProductInput) => dispatch({ type: "ADD_TO_CART", product }),
    []
  );
  const removeFromCart = useCallback(
    (id: string) => dispatch({ type: "REMOVE_FROM_CART", id }),
    []
  );
  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", id, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const moveSavedToCart = useCallback(
    (id: string) => dispatch({ type: "MOVE_TO_CART", id }),
    []
  );
  const openSavedDrawer = useCallback(
    () => dispatch({ type: "OPEN_SAVED_DRAWER" }),
    []
  );
  const openCartDrawer = useCallback(
    () => dispatch({ type: "OPEN_CART_DRAWER" }),
    []
  );
  const openDetailsDrawer = useCallback(
    (product: Product) => dispatch({ type: "OPEN_DETAILS_DRAWER", product }),
    []
  );
  const closeDrawers = useCallback(
    () => dispatch({ type: "CLOSE_DRAWERS" }),
    []
  );

  const value = useMemo<ShopActionsContextValue>(
    () => ({
      savedItems: state.savedItems,
      cartItems: state.cartItems,
      activeDrawer: state.activeDrawer,
      detailsProduct: state.detailsProduct,
      hydrated: state.hydrated,
      savedCount: state.savedItems.length,
      cartCount: state.cartItems.length,
      isSaved: (id: string) => state.savedItems.some((s) => s.id === id),
      toggleSaved,
      removeSaved,
      clearSaved,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      moveSavedToCart,
      openSavedDrawer,
      openCartDrawer,
      openDetailsDrawer,
      closeDrawers,
    }),
    [
      state.savedItems,
      state.cartItems,
      state.activeDrawer,
      state.detailsProduct,
      state.hydrated,
      toggleSaved,
      removeSaved,
      clearSaved,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      moveSavedToCart,
      openSavedDrawer,
      openCartDrawer,
      openDetailsDrawer,
      closeDrawers,
    ]
  );

  return (
    <ShopActionsContext.Provider value={value}>
      {children}
    </ShopActionsContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useShopActions(): ShopActionsContextValue {
  const ctx = useContext(ShopActionsContext);
  if (!ctx) {
    throw new Error("useShopActions must be used within a ShopActionsProvider");
  }
  return ctx;
}
