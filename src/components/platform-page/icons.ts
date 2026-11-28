import {
  Box, Braces, Code2, Database, FileCode2, Filter, Gauge, Globe, Hexagon, Layers, MessageSquare, Puzzle, Repeat, Route, Server, ShoppingBag, type LucideIcon,
} from "lucide-react";
import type { AreaIcon, Platform } from "@content/data";

/** Same mapping the platform cards use for each platform. */
export const icons: Record<Platform["icon"], LucideIcon> = { bag: ShoppingBag, chat: MessageSquare, hex: Hexagon, box: Box, code: Code2 };

export const areaIcons: Record<AreaIcon, LucideIcon> = {
  layers: Layers, puzzle: Puzzle, gauge: Gauge, braces: Braces, globe: Globe, filter: Filter, route: Route, server: Server,
  repeat: Repeat, database: Database, "file-code": FileCode2, "shopping-bag": ShoppingBag,
};
