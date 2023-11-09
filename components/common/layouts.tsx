import layout from "../layout";
import layoutNoSidebar from "../layoutNoSidebar";

export const Layouts = {
  Main: layout,
  NoSidebar: layoutNoSidebar,
};
export type LayoutKeys = keyof typeof Layouts;
